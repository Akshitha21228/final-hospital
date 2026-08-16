import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildNursePatientRows, isActiveAdmittedPatient } from "../src/modules/nursing/nurse-patient-data.js";
import { nursePatientMatches } from "../src/modules/nursing/nurse-patient-filters.js";

const fixtures = {
  currentUser: { branchId: "branch-a", jobRole: "Nurse" },
  patients: [{ id: "p1", name: "Rahul Kumar", mrn: "HOC-10234" }, { id: "p2", name: "Other Patient", mrn: "HOC-2" }],
  admissions: [
    { id: "a1", patientId: "p1", branchId: "branch-a", ward: "Ward 2A", bedNumber: "204", status: "Admitted" },
    { id: "a2", patientId: "p2", branchId: "branch-a", status: "Discharged" },
    { id: "a3", patientId: "p2", branchId: "branch-b", status: "Admitted" }
  ],
  vitals: [],
  mar: [{ id: "m1", admissionId: "a1", status: "Scheduled", dueTime: "2099-01-01T10:00:00Z" }],
  tasks: [{ id: "t1", admissionId: "a1", status: "Open" }],
  alerts: [{ id: "al1", admissionId: "a1", status: "Open", severity: "High" }],
  nursingNotes: [],
  intakeOutput: []
};

test("builds only active, branch-scoped nurse admissions without unsafe values", () => {
  const rows = buildNursePatientRows(fixtures);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].name, "Rahul Kumar");
  assert.equal(rows[0].vitalsDue, true);
  assert.equal(rows[0].medicationsDueCount, 1);
  assert.equal(rows[0].pendingTasksCount, 1);
  assert.equal(rows[0].status, "Needs Attention");
  assert.equal(JSON.stringify(rows).includes("undefined"), false);
  assert.equal(JSON.stringify(rows).includes("NaN"), false);
});

test("registered-only patient does not appear without an admission", () => {
  assert.equal(buildNursePatientRows({ ...fixtures, admissions: [] }).length, 0);
});

test("admission request does not appear even when a ward was requested", () => {
  const admissions = [{ id: "req-1", patientId: "p1", branchId: "branch-a", ward: "Ward 2A", status: "Admission Requested" }];
  assert.equal(buildNursePatientRows({ ...fixtures, admissions }).length, 0);
});

test("bed assignment plus Admitted status activates visibility", () => {
  assert.equal(isActiveAdmittedPatient({ status: "Admitted", ward: "Ward 2A", bedNumber: "204" }), true);
  assert.equal(buildNursePatientRows(fixtures).length, 1);
});

test("Under Treatment remains active only with ward and bed", () => {
  assert.equal(isActiveAdmittedPatient({ status: "Under Treatment", ward: "ICU", bedId: "bed-9" }), true);
  assert.equal(isActiveAdmittedPatient({ status: "Under Treatment", ward: "ICU" }), false);
});

test("latest IPD vitals and MAR status join by admissionId", () => {
  const rows = buildNursePatientRows({
    ...fixtures,
    vitals: [
      { admissionId: "a1", dateTime: "2026-01-01T08:00:00Z", bloodPressure: "110/70", spo2: 97 },
      { admissionId: "a1", dateTime: "2026-01-01T09:00:00Z", bloodPressure: "120/80", spo2: 98 }
    ]
  });
  assert.equal(rows[0].bloodPressure, "120/80");
  assert.equal(rows[0].spo2, "98");
  assert.equal(rows[0].medicationsDueCount, 1);
});

test("discharged and cancelled admissions disappear", () => {
  for (const status of ["Discharged", "Cancelled"]) {
    const admissions = [{ ...fixtures.admissions[0], status }];
    assert.equal(buildNursePatientRows({ ...fixtures, admissions }).length, 0);
  }
});

test("active admission without a ward or bed does not appear", () => {
  assert.equal(isActiveAdmittedPatient({ status: "Admitted", ward: "Ward 2A" }), false);
  assert.equal(isActiveAdmittedPatient({ status: "Admitted", bedNumber: "204" }), false);
});

test("another branch patient remains outside nurse scope", () => {
  const admissions = [{ id: "a3", patientId: "p2", branchId: "branch-b", ward: "Ward 3", bedNumber: "301", status: "Admitted" }];
  assert.equal(buildNursePatientRows({ ...fixtures, admissions }).length, 0);
});

test("search and nurse filters match the combined view model", () => {
  const row = buildNursePatientRows(fixtures)[0];
  assert.equal(nursePatientMatches(row, "rahul", "all"), true);
  assert.equal(nursePatientMatches(row, "HOC-10234", "all"), true);
  assert.equal(nursePatientMatches(row, "204", "all"), true);
  assert.equal(nursePatientMatches(row, "", "attention"), true);
  assert.equal(nursePatientMatches(row, "", "vitals"), true);
  assert.equal(nursePatientMatches(row, "", "medication"), true);
});

test("nurse page has no patient registration control and keeps admission routes", () => {
  const page = readFileSync(new URL("../src/modules/nursing/my-patients.js", import.meta.url), "utf8");
  const card = readFileSync(new URL("../src/modules/nursing/nurse-patient-card.js", import.meta.url), "utf8");
  const application = readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
  assert.equal(/Add Patient|Register Patient|register-patient/.test(page), false);
  assert.match(card, /data-route="ipdPatient360" data-admission-id=/);
  assert.match(card, /data-route="ipdVitals" data-admission-id=/);
  assert.match(card, /data-route="mar" data-admission-id=/);
  assert.match(application, /\? \(\) => nurseMyPatientsPage/);
  assert.match(application, /: patientsPage/);
});
