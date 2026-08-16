import test from "node:test";
import assert from "node:assert/strict";
import {
  filterPatientsForReception,
  linkedPatientRecords,
  setPatientSearchQuery,
  setPatientStatusFilter
} from "../src/modules/reception/patient-filters.js";

const patients = [
  { id: "A", mrn: "MRN-000001", name: "Patient A", mobile: "9000000001", branchId: "branch-1", status: "Registered" },
  { id: "B", mrn: "MRN-000002", name: "Patient B", mobile: "9000000002", branchId: "branch-1", status: "Registered" },
  { id: "C", mrn: "MRN-000003", name: "Patient C", mobile: "9000000003", branchId: "branch-1", status: "Registered" },
  { id: "D", mrn: "MRN-000004", name: "Patient D", mobile: "9000000004", branchId: "branch-1", status: "Registered" },
  { id: "OTHER", name: "Other Branch", branchId: "branch-2" }
];

const workflow = {
  appointments: [],
  queue: [{ id: "Q1", patientId: "B", status: "Vitals Pending" }],
  bills: [{ id: "B1", patientId: "C", status: "Pending" }],
  checkouts: [{ id: "C1", patientId: "D", status: "Completed" }]
};

test("Reception patient workflow filters use shared related records", () => {
  setPatientSearchQuery("");
  for (const [filter, ids] of [["All", ["A", "B", "C", "D"]], ["Waiting", ["B"]], ["Billing Pending", ["C"]], ["Completed", ["D"]]]) {
    setPatientStatusFilter(filter);
    assert.deepEqual(filterPatientsForReception(patients, workflow, "branch-1").map((patient) => patient.id), ids);
  }
});

test("Reception patient search combines with workflow filter and matches name, MRN, mobile", () => {
  setPatientStatusFilter("All");
  for (const query of ["patient b", "mrn-000002", "9000000002"]) {
    setPatientSearchQuery(query);
    assert.deepEqual(filterPatientsForReception(patients, workflow, "branch-1").map((patient) => patient.id), ["B"]);
  }
  setPatientStatusFilter("Waiting");
  setPatientSearchQuery("patient c");
  assert.deepEqual(filterPatientsForReception(patients, workflow, "branch-1"), []);
  setPatientSearchQuery("");
  setPatientStatusFilter("All");
});

test("patient dependency protection detects linked workflow records", () => {
  assert.deepEqual(linkedPatientRecords("A", { appointments: [], queueTokens: [] }), []);
  assert.deepEqual(linkedPatientRecords("B", { appointments: [{ patientId: "B" }], bills: [{ patientId: "B" }] }), ["appointments", "bills"]);
});
