import test from "node:test";
import assert from "node:assert/strict";
import { activeDoctorIpdAdmissions, admissionVitals, resolveAdmissionPatient } from "../src/modules/doctor/ipd-patients.js";

class MemoryStorage {
  constructor() { this.data = new Map(); }
  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) { this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

globalThis.localStorage = new MemoryStorage();
globalThis.__HOCC_ENV__ = { VITE_API_MODE: "local" };
const { saveStore } = await import("../src/services/local-store.js");
const { api } = await import("../src/services/api.js");

const doctor = { id: "DOC-1", name: "Test Doctor", jobRole: "Doctor", branchId: "BR-1", department: "General Medicine" };
const patient = { id: "PAT-1", name: "Rahul", mrn: "MRN-1", branchId: "BR-1" };
const activeAdmission = { id: "ADM-1", patientId: patient.id, patientName: patient.name, branchId: "BR-1", doctorId: doctor.id, department: doctor.department, ward: "General Ward", bedNumber: "G-101", status: "Admitted" };

test("Doctor IPD list includes only active, valid, assigned admissions", () => {
  const rows = activeDoctorIpdAdmissions([
    activeAdmission,
    { ...activeAdmission, id: "ADM-REQUEST", status: "Admission Requested" },
    { ...activeAdmission, id: "ADM-DISCHARGED", status: "Discharged" },
    { ...activeAdmission, id: "ADM-NOBED", bedNumber: "" },
    { ...activeAdmission, id: "ADM-OTHER", doctorId: "DOC-2" }
  ], doctor);
  assert.deepEqual(rows.map((row) => row.id), ["ADM-1"]);
  assert.equal(resolveAdmissionPatient([patient], activeAdmission)?.mrn, "MRN-1");
});

test("IPD vitals are matched to the exact admission and sorted newest first", () => {
  const rows = admissionVitals([
    { id: "V-OLD", patientId: patient.id, admissionId: "ADM-1", recordedAt: "2026-08-15T08:00:00Z" },
    { id: "V-NEW", patientId: patient.id, admissionId: "ADM-1", recordedAt: "2026-08-16T08:00:00Z" },
    { id: "V-WRONG-ADMISSION", patientId: patient.id, admissionId: "ADM-2", recordedAt: "2026-08-17T08:00:00Z" },
    { id: "V-WRONG-PATIENT", patientId: "PAT-2", admissionId: "ADM-1", recordedAt: "2026-08-18T08:00:00Z" }
  ], activeAdmission);
  assert.deepEqual(rows.map((row) => row.id), ["V-NEW", "V-OLD"]);
});

test("Doctor progress drafts append, persist, and do not mutate admission status", async () => {
  localStorage.clear();
  saveStore({ patients: [patient], admissions: [activeAdmission] });
  const first = await api.saveDoctorProgressNote(doctor, { admissionId: "ADM-1", subjective: "Improving", objective: "Stable", assessment: "Recovering", plan: "Continue observation" });
  const second = await api.saveDoctorProgressNote(doctor, { admissionId: "ADM-1", subjective: "Comfortable", objective: "Stable", assessment: "Improving", plan: "Continue care" });
  assert.match(first.id, /^DPR-\d{6}$/);
  assert.notEqual(first.id, second.id);
  assert.equal(first.patientId, patient.id);
  assert.equal(first.status, "Draft");
  assert.equal(api.doctorProgressNotes(doctor).length, 2);
  assert.equal(api.admissions(doctor).find((item) => item.id === "ADM-1").status, "Admitted");
});
