import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

class MemoryStorage {
  constructor() { this.data = new Map(); }
  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) { this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

globalThis.localStorage = new MemoryStorage();
globalThis.__HOCC_ENV__ = { VITE_API_MODE: "local" };
const { api } = await import("../src/services/api.js");
const { canAccessPage } = await import("../src/lib/rbac.js");

test("Reception queue → Nurse OPD vitals → Doctor ready handoff preserves IDs", async () => {
  localStorage.clear();
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name: "Tyson", mobile: "9111111111", age: 30, gender: "Male" });
  const appointment = await api.createAppointment(reception, { patientId: patient.id, department: "General Medicine", doctor: "Doctor / Surgeon", date: "2026-08-16", time: "10:00" });
  await api.checkInAppointment(reception, appointment.id);
  const token = await api.checkInAppointment(reception, appointment.id);
  assert.equal(token.status, "Vitals Pending");

  await api.logout(reception);
  const nurse = await api.login("nurse@hocctest.local", "HoccTest@2026!");
  assert.equal(canAccessPage(nurse, "vitals"), true);
  const vital = await api.recordVitals(nurse, { patientId: patient.id, appointmentId: appointment.id, queueTokenId: token.id, temperature: "98.6", bloodPressure: "120/80", pulse: 78, respiratoryRate: 18, spo2: 98, painScore: 1 });
  assert.equal(vital.patientId, patient.id);
  assert.equal(vital.appointmentId, appointment.id);
  assert.equal(vital.queueTokenId, token.id);
  assert.equal(vital.recordedBy, "Nurse");
  assert.ok(vital.recordedAt);
  assert.equal(api.queueTokens(nurse).find((item) => item.id === token.id).status, "Ready for Doctor");

  await api.logout(nurse);
  const doctor = await api.login("doctor@hocctest.local", "HoccTest@2026!");
  assert.equal(api.queueTokens(doctor).some((item) => item.patientId === patient.id && item.status === "Ready for Doctor"), true);
});

test("OPD and IPD vitals renderers use separate sources", () => {
  const patientFlow = readFileSync(new URL("../src/pages/patient-flow.js", import.meta.url), "utf8");
  const ipd = readFileSync(new URL("../src/pages/ipd-clinical.js", import.meta.url), "utf8");
  const application = readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
  assert.match(patientFlow, /checkedInPatients = queue\.filter\(\(token\) => \["Waiting", "Vitals Pending"\]\.includes\(token\.status\)\)/);
  assert.match(patientFlow, /name="queueTokenId"/);
  assert.match(ipd, /\["Admitted", "Under Treatment"\]\.includes/);
  assert.match(ipd, /Boolean\(item\.bedId \|\| item\.bedNumber\)/);
  assert.match(application, /\["vitals", "OPD Vitals", "Clinical"\]/);
  assert.match(application, /\["ipdVitals", "IPD Vitals", "Clinical"\]/);
});

test("existing local Nurse sessions receive OPD Vitals permission migration", () => {
  localStorage.setItem("hocc_mvp_session_v1", JSON.stringify({ id: "local-nurse", email: "nurse@hocctest.local", role: "BRANCH_USER", jobRole: "Nurse", allowedPages: ["dashboard", "ipdVitals"] }));
  const nurse = api.currentUser();
  assert.equal(nurse.allowedPages.includes("vitals"), true);
  assert.equal(nurse.allowedPages.includes("queue"), true);
  assert.equal(canAccessPage(nurse, "vitals"), true);
});

test("IPD vitals append by admission and feed Daily Sheets without OPD queue IDs", async () => {
  localStorage.clear();
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name: "Rahul IPD", mobile: "9222222222", age: 45, gender: "Male" });
  const admission = await api.createAdmissionRequest(reception, { patientId: patient.id, patientName: patient.name, mrn: patient.mrn });
  await api.createBed(reception, { id: "BED-204", bed: "204", bedNumber: "204", ward: "Ward 2A", status: "Available" });
  await api.assignBed(reception, admission.id, { bedId: "BED-204", bedNumber: "204", ward: "Ward 2A" });
  const activeAdmission = await api.admitPatient(reception, admission.id);
  assert.equal(activeAdmission.status, "Admitted");

  await api.logout(reception);
  const nurse = await api.login("nurse@hocctest.local", "HoccTest@2026!");
  const first = await api.recordIPDVitals(nurse, { admissionId: activeAdmission.id, bloodPressure: "120/80", pulse: 78, spo2: 98, temperature: "98.6" });
  const second = await api.recordIPDVitals(nurse, { admissionId: activeAdmission.id, bloodPressure: "122/82", pulse: 80, spo2: 97, temperature: "98.8" });
  assert.equal(first.patientId, patient.id);
  assert.equal(second.patientId, patient.id);
  assert.equal(first.queueTokenId, undefined);
  assert.equal(api.ipdVitals(nurse).filter((item) => item.admissionId === activeAdmission.id).length, 2);
  assert.equal(api.dailyPatientSheets(nurse).filter((item) => item.admissionId === activeAdmission.id).length, 2);
});
