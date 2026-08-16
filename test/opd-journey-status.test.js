import test from "node:test";
import assert from "node:assert/strict";

import { findOpdVitalsForQueue, opdVitalsStage } from "../src/modules/opd/journey-status.js";

const vaishnaviQueue = { id: "QUEUE-V", patientId: "PAT-V", appointmentId: "APT-V", status: "Vitals Pending" };

test("OPD vitals journey moves from In Progress to Completed using the saved encounter", () => {
  assert.equal(opdVitalsStage(vaishnaviQueue, []), "In Progress");
  const savedVitals = [{ id: "VITAL-V", patientId: "PAT-V", appointmentId: "APT-V", queueTokenId: "QUEUE-V", status: "Recorded" }];
  const readyQueue = { ...vaishnaviQueue, status: "Ready for Doctor" };
  assert.equal(findOpdVitalsForQueue(savedVitals, readyQueue)?.id, "VITAL-V");
  assert.equal(opdVitalsStage(readyQueue, savedVitals), "Completed");
  assert.equal(readyQueue.status, "Ready for Doctor");
});

test("OPD vitals never complete another encounter for the same patient", () => {
  const olderEncounterVitals = [{ id: "VITAL-OLD", patientId: "PAT-V", appointmentId: "APT-OLD", queueTokenId: "QUEUE-OLD" }];
  assert.equal(findOpdVitalsForQueue(olderEncounterVitals, vaishnaviQueue), null);
  assert.equal(opdVitalsStage(vaishnaviQueue, olderEncounterVitals), "In Progress");
});

test("legacy patient-only OPD vitals remain visible after refresh", () => {
  const legacyVitals = JSON.parse(JSON.stringify([{ id: "VITAL-T", patientId: "PAT-T", status: "Recorded" }]));
  const refreshedTysonQueue = JSON.parse(JSON.stringify({ id: "QUEUE-T", patientId: "PAT-T", appointmentId: "APT-T", status: "Ready for Doctor" }));
  assert.equal(opdVitalsStage(refreshedTysonQueue, legacyVitals), "Completed");
});
