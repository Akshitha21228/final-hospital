import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

class MemoryStorage { constructor(){this.data=new Map();} getItem(k){return this.data.has(k)?this.data.get(k):null;} setItem(k,v){this.data.set(k,String(v));} removeItem(k){this.data.delete(k);} clear(){this.data.clear();} }
globalThis.localStorage = new MemoryStorage();
globalThis.__HOCC_ENV__ = { VITE_API_MODE: "local" };
const { api } = await import("../src/services/api.js");

test("Doctor Queue button and delegated click handler use the same action", () => {
  const page = readFileSync(new URL("../src/pages/patient-flow.js", import.meta.url), "utf8");
  const application = readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
  assert.match(page, /data-action="doctor-start-consultation"/);
  assert.match(application, /action === "doctor-start-consultation"/);
  assert.match(application, /api\.startConsultation\(currentUser, encounter\)/);
  const clickHandler = application.slice(application.indexOf('document.addEventListener("click"'), application.indexOf('document.addEventListener("change"'));
  const changeHandler = application.slice(application.indexOf('document.addEventListener("change"'), application.indexOf('document.addEventListener("input"'));
  assert.match(clickHandler, /action === "doctor-start-consultation"/);
  assert.doesNotMatch(changeHandler, /action === "doctor-start-consultation"/);
});

test("Ready-for-Doctor encounter starts one persistent consultation and saves its draft", async () => {
  localStorage.clear();
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name:"Doctor Test OPD", mobile:"9777700001", branchId:reception.branchId });
  const appointment = await api.createAppointment(reception, { patientId:patient.id, department:"General Medicine", doctor:"Dr. Murli", doctorId:"local-doctor", date:"2026-08-16", time:"09:30" });
  await api.checkInAppointment(reception, appointment.id);
  const token = await api.checkInAppointment(reception, appointment.id);
  assert.equal(token.status, "Vitals Pending");
  const nurse = await api.login("nurse@hocctest.local", "HoccTest@2026!");
  await api.recordVitals(nurse, { patientId:patient.id, appointmentId:appointment.id, queueTokenId:token.id, temperature:"98.6", bloodPressure:"120/80", pulse:"78", spo2:"98", respiratoryRate:"18", painScore:"1" });
  assert.equal(api.queueTokens(nurse).find((item) => item.id === token.id).status, "Ready for Doctor");
  const doctor = await api.login("doctor@hocctest.local", "HoccTest@2026!");
  const first = await api.startConsultation(doctor, token.id);
  const resumed = await api.startConsultation(doctor, token.id);
  assert.match(first.id, /^CON-\d{6}$/);
  assert.equal(resumed.id, first.id);
  assert.equal(api.consultations(doctor).filter((item) => item.appointmentId === appointment.id).length, 1);
  assert.equal(api.queueTokens(doctor).find((item) => item.id === token.id).status, "With Doctor");
  await api.saveConsultationDraft(doctor, first.id, { chiefComplaint:"Fever and body pain", historyOfPresentIllness:"Symptoms for 2 days", examination:"Stable", notes:"Test draft" });
  const persisted = api.consultations(doctor).find((item) => item.id === first.id);
  assert.equal(persisted.chiefComplaint, "Fever and body pain");
  assert.equal(persisted.notes, "Test draft");
  assert.equal(api.vitals(doctor).filter((item) => item.queueTokenId === token.id).length, 1);
});

test("one unambiguous legacy patient-only vital can start its OPD consultation", async () => {
  localStorage.clear();
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name:"JOHN Legacy", mobile:"9777700002", branchId:reception.branchId });
  const appointment = await api.createAppointment(reception, { patientId:patient.id, department:"General Medicine", doctorId:"local-doctor", doctor:"Dr. Murli" });
  await api.checkInAppointment(reception, appointment.id);
  const token = await api.checkInAppointment(reception, appointment.id);
  const store = JSON.parse(localStorage.getItem("hospital_operations_data"));
  store.vitals.push({ id:"VITAL-LEGACY", patientId:patient.id, bloodPressure:"120/80", status:"Recorded" });
  store.queueTokens = store.queueTokens.map((item) => item.id === token.id ? { ...item, status:"Ready for Doctor" } : item);
  localStorage.setItem("hospital_operations_data", JSON.stringify(store));
  const doctor = await api.login("doctor@hocctest.local", "HoccTest@2026!");
  const consultation = await api.startConsultation(doctor, token.id);
  assert.match(consultation.id, /^CON-\d{6}$/);
  assert.equal(api.queueTokens(doctor).find((item) => item.id === token.id).status, "With Doctor");
});

async function startFreshDoctorEncounter(suffix = "1") {
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name:`Full Consultation ${suffix}`, mobile:`98888000${String(suffix).padStart(2, "0")}`, branchId:reception.branchId });
  const appointment = await api.createAppointment(reception, { patientId:patient.id, department:"General Medicine", doctor:"Dr. Murli", doctorId:"local-doctor", date:"2026-08-16", time:"10:00" });
  await api.checkInAppointment(reception, appointment.id);
  const token = await api.checkInAppointment(reception, appointment.id);
  const nurse = await api.login("nurse@hocctest.local", "HoccTest@2026!");
  await api.recordVitals(nurse, { patientId:patient.id, appointmentId:appointment.id, queueTokenId:token.id, temperature:"99", bloodPressure:"118/76", pulse:"80", spo2:"99" });
  const doctor = await api.login("doctor@hocctest.local", "HoccTest@2026!");
  const consultation = await api.startConsultation(doctor, token.id);
  return { reception, patient, appointment, token, doctor, consultation };
}

test("doctor draft persists diagnosis and multiple medicines, then prescription-only completion routes to Pharmacy", async () => {
  localStorage.clear();
  const { doctor, consultation, token } = await startFreshDoctorEncounter("11");
  const payload = {
    chiefComplaint:"Fever", historyOfPresentIllness:"Fever for 2 days", examination:"Stable",
    diagnosis:["Viral fever", "Mild dehydration"], diagnosisNotes:["Primary", "Secondary"],
    medicine:["Paracetamol", "ORS"], strength:["500 mg", "1 sachet"], dose:["1 tablet", "1 sachet"],
    route:["Oral", "Oral"], frequency:["Twice daily", "After loose stool"], duration:["3 days", "3 days"],
    instructions:["After food", "Mix with clean water"], advice:"Rest and hydration", followUpRequired:"Yes",
    followUpDate:"2026-08-19", followUpReason:"Review fever", followUpNotes:"Return sooner for warning signs"
  };
  await api.saveConsultationDraft(doctor, consultation.id, payload);
  const refreshedDraft = api.consultations(doctor).find((item) => item.id === consultation.id);
  assert.equal(refreshedDraft.diagnoses.length, 2);
  assert.equal(refreshedDraft.medicines.length, 2);
  assert.equal(api.prescriptions(doctor).filter((item) => item.consultationId === consultation.id).length, 1);
  assert.equal(api.prescriptionItems(doctor).filter((item) => item.consultationId === consultation.id).length, 2);
  const completed = await api.completeDoctorConsultation(doctor, consultation.id, payload);
  assert.equal(completed.status, "Completed");
  assert.equal(completed.downstreamStatus, "Pharmacy Pending");
  assert.equal(api.queueTokens(doctor).find((item) => item.id === token.id).status, "Pharmacy Pending");
  assert.equal(api.followUps(doctor).find((item) => item.consultationId === consultation.id).status, "Scheduled");
  assert.equal(api.prescriptions(doctor).filter((item) => item.consultationId === consultation.id).length, 1);
  await assert.rejects(() => api.completeDoctorConsultation(doctor, consultation.id, payload), /already completed/i);
});

test("completion requires a primary diagnosis", async () => {
  localStorage.clear();
  const { doctor, consultation } = await startFreshDoctorEncounter("12");
  await assert.rejects(() => api.completeDoctorConsultation(doctor, consultation.id, { chiefComplaint:"Fever", examination:"Stable" }), /Primary Diagnosis/i);
  assert.equal(api.consultations(doctor).find((item) => item.id === consultation.id).status, "In Progress");
});

test("lab, radiology and admission recommendation persist once and route to investigations", async () => {
  localStorage.clear();
  const { doctor, consultation, token } = await startFreshDoctorEncounter("13");
  const payload = {
    chiefComplaint:"Fever and cough", examination:"Stable", diagnosis:"Respiratory infection",
    labTest:"CBC", labIndication:"Fever", labPriority:"Urgent", labNotes:"Baseline count",
    radiologyTest:"Chest X-ray", radiologyIndication:"Cough", radiologyPriority:"Routine", radiologyNotes:"Rule out infiltrate",
    admissionRecommended:"Yes", admissionReason:"Observe if oxygen saturation drops"
  };
  await api.saveConsultationDraft(doctor, consultation.id, payload);
  await api.saveConsultationDraft(doctor, consultation.id, payload);
  assert.equal(api.labOrders(doctor).filter((item) => item.consultationId === consultation.id).length, 1);
  assert.equal(api.radiologyOrders(doctor).filter((item) => item.consultationId === consultation.id).length, 1);
  const completed = await api.completeDoctorConsultation(doctor, consultation.id, payload);
  assert.equal(completed.downstreamStatus, "Investigations Pending");
  assert.equal(api.queueTokens(doctor).find((item) => item.id === token.id).status, "Investigations Pending");
  assert.equal(api.labOrders(doctor).find((item) => item.consultationId === consultation.id).status, "Ordered");
  assert.equal(api.radiologyOrders(doctor).find((item) => item.consultationId === consultation.id).report, "");
  const recommendation = api.admissionRecommendations(doctor).find((item) => item.consultationId === consultation.id);
  assert.equal(recommendation.status, "Admission Recommended");
  assert.equal(recommendation.wardId, "");
  assert.equal(recommendation.bedId, "");
});

test("a later appointment creates a new consultation for the same patient", async () => {
  localStorage.clear();
  const first = await startFreshDoctorEncounter("14");
  await api.completeDoctorConsultation(first.doctor, first.consultation.id, { chiefComplaint:"Visit one", examination:"Stable", diagnosis:"Viral fever" });
  const appointment = await api.createAppointment(first.reception, { patientId:first.patient.id, department:"General Medicine", doctor:"Dr. Murli", doctorId:"local-doctor", date:"2026-08-20", time:"11:00" });
  await api.checkInAppointment(first.reception, appointment.id);
  const token = await api.checkInAppointment(first.reception, appointment.id);
  const nurse = await api.login("nurse@hocctest.local", "HoccTest@2026!");
  await api.recordVitals(nurse, { patientId:first.patient.id, appointmentId:appointment.id, queueTokenId:token.id, bloodPressure:"120/80" });
  const second = await api.startConsultation(first.doctor, token.id);
  assert.notEqual(second.id, first.consultation.id);
  assert.equal(api.consultations(first.doctor).filter((item) => item.patientId === first.patient.id).length, 2);
});
