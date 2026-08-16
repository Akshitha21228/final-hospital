import test from "node:test";
import assert from "node:assert/strict";
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
const { buildNursePatientRows } = await import("../src/modules/nursing/nurse-patient-data.js");

test("Reception admission request becomes visible to Nurse only after bed assignment and admit", async () => {
  localStorage.clear();
  const reception = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(reception, { name: "Rahul IPD Test", mobile: "9888800011", dob: "1990-01-01", branchId: reception.branchId });
  const request = await api.createAdmissionRequest(reception, { patientId: patient.id, department: "General Medicine", reason: "Observation" });
  assert.match(request.id, /^ADM-\d{6}$/);
  assert.equal(request.status, "Admission Requested");
  const nurseScope = { branchId: reception.branchId, jobRole: "Nurse" };
  assert.equal(buildNursePatientRows({ currentUser: nurseScope, patients: [patient], admissions: [request] }).length, 0);
  await assert.rejects(() => api.createAdmissionRequest(reception, { patientId: patient.id, reason: "Duplicate" }), /already exists/);

  await api.createBed(reception, { id: "BED-IPD-1", bed: "G-101", bedNumber: "G-101", ward: "General Ward", status: "Available" });
  const assigned = await api.assignBed(reception, request.id, { bedId: "BED-IPD-1", bedNumber: "G-101", ward: "General Ward" });
  assert.equal(assigned.status, "Bed Assigned");
  assert.equal(buildNursePatientRows({ currentUser: nurseScope, patients: [patient], admissions: [assigned] }).length, 0);

  const admitted = await api.admitPatient(reception, request.id);
  assert.equal(admitted.status, "Admitted");
  const persisted = JSON.parse(localStorage.getItem("hospital_operations_data"));
  assert.equal(persisted.admissions.find((item) => item.id === request.id).bedNumber, "G-101");
  assert.equal(persisted.admissions.find((item) => item.id === request.id).status, "Admitted");
  assert.equal(persisted.beds.find((item) => item.id === "BED-IPD-1").patientId, patient.id);
  const rows = buildNursePatientRows({ currentUser: nurseScope, patients: [patient], admissions: [admitted] });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].admissionId, request.id);

  const secondPatient = await api.registerPatient(reception, { name: "Second IPD Test", mobile: "9888800012", dob: "1991-01-01", branchId: reception.branchId });
  const secondRequest = await api.createAdmissionRequest(reception, { patientId: secondPatient.id, reason: "Observation" });
  await assert.rejects(() => api.assignBed(reception, secondRequest.id, { bedId: "BED-IPD-1", bedNumber: "G-101", ward: "General Ward" }), /Bed already occupied/);
});
