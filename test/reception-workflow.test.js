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
const { getStore } = await import("../src/services/local-store.js");

test("Reception patient → appointment → arrival → queue → vitals flow persists relationships", async () => {
  localStorage.clear();
  const user = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const patient = await api.registerPatient(user, { name: "Rahul Kumar", mobile: "9876543210", age: 42, gender: "Male" });
  assert.ok(patient.id);
  assert.match(patient.mrn, /^MRN-\d{6}$/);
  assert.equal(api.patients(user).some((item) => item.id === patient.id), true);

  const appointment = await api.createAppointment(user, { patientId: patient.id, department: "General Medicine", doctor: "Dr. Murli", date: "2026-08-16", time: "10:00", visitType: "OPD", priority: "Normal" });
  assert.equal(appointment.patientId, patient.id);
  assert.match(appointment.appointmentNumber, /^APT-\d{6}$/);

  const arrived = await api.checkInAppointment(user, appointment.id);
  assert.equal(arrived.status, "Arrived");
  const token = await api.checkInAppointment(user, appointment.id);
  assert.equal(token.patientId, patient.id);
  assert.equal(token.appointmentId, appointment.id);
  assert.equal(token.status, "Vitals Pending");
  const repeated = await api.checkInAppointment(user, appointment.id);
  assert.equal(repeated.id, token.id);

  const vital = await api.recordVitals(user, { patientId: patient.id, bloodPressure: "120/80", spo2: "98" });
  assert.equal(vital.appointmentId, appointment.id);
  assert.equal(api.queueTokens(user)[0].status, "Ready for Doctor");

  const beforeLogout = JSON.stringify(getStore());
  await api.logout(user);
  assert.equal(api.currentUser(), null);
  assert.equal(JSON.stringify(getStore()), beforeLogout);
});

test("duplicate patient registration is blocked", async () => {
  localStorage.clear();
  const user = await api.login("reception@hocctest.local", "HoccTest@2026!");
  await api.registerPatient(user, { name: "A Patient", mobile: "9000000000", dob: "1990-01-01" });
  await assert.rejects(() => api.registerPatient(user, { name: "A Patient", mobile: "9000000000", dob: "1990-01-01" }), /Possible existing patient/);
});

test("Reception Patients add button is wired to the registration modal", () => {
  const application = readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
  const patientFlow = readFileSync(new URL("../src/pages/patient-flow.js", import.meta.url), "utf8");

  assert.match(patientFlow, /gridAddButton\("Patient",\s*"register-patient"\)/);
  assert.match(application, /data-action="open-create"\s+data-form-action="\$\{escapeHtml\(formAction\)\}"/);
  assert.match(application, /const target = event\.target\.closest\("button, a"\)/);
  assert.match(application, /if \(target\.dataset\.action === "open-create"\)[\s\S]*?createTarget = formAction;[\s\S]*?render\(\);[\s\S]*?return;/);
  assert.match(application, /function wireCreateButtons\(\)[\s\S]*?event\.currentTarget\.dataset\.formAction[\s\S]*?createTarget = formAction;[\s\S]*?render\(\)/);
  assert.match(application, /wireCreateButtons\(\);\s*const appointmentForm/);
  assert.match(application, /"register-patient":\s*\{[\s\S]*?title:\s*"Patient registration"[\s\S]*?data-action="register-patient"/);
  assert.match(application, /data-testid="create-modal-backdrop"/);
});

test("local appointment options expose active branch Department master records", async () => {
  localStorage.clear();
  const user = await api.login("reception@hocctest.local", "HoccTest@2026!");
  const masterDepartments = api.masterDataItems(user).filter((item) => String(item.type).toLowerCase() === "department");
  const options = api.appointmentOptions(user);

  assert.ok(masterDepartments.length > 0);
  assert.ok(options.departments.length > 0);
  assert.equal(typeof options.departments[0], "object");
  assert.equal(options.departments.every((item) => item.name && item.id), true);
  assert.equal(options.departments.every((item) => String(item.branchId || user.branchId) === String(user.branchId)), true);
});
