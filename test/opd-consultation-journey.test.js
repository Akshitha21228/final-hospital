import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findConsultationForQueue, isRealOrder, isRealPrescription, opdConsultationJourney } from "../src/modules/opd/consultation-journey.js";

const queue = { id:"QUEUE-1", patientId:"PAT-1", appointmentId:"APT-1", status:"Ready for Doctor" };

test("Consultation page uses progressive add controls, templates and completed lock", () => {
  const page = readFileSync(new URL("../src/pages/patient-flow.js", import.meta.url), "utf8");
  const app = readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
  assert.match(page, /\+ Add Medicine/);
  assert.match(page, /\+ Add Lab Order/);
  assert.match(page, /data-progressive-toggle="followup"/);
  assert.match(page, /data-progressive-toggle="admission"/);
  assert.match(page, /fieldset \$\{locked \? "disabled"/);
  assert.match(app, /data-template-select/);
  assert.match(app, /Saved locally ✓/);
});

test("Ready for Doctor is pending and With Doctor is in progress", () => {
  assert.equal(opdConsultationJourney(queue).consultationStage, "Pending");
  assert.equal(opdConsultationJourney({ ...queue, status:"With Doctor" }).consultationStage, "In Progress");
});

test("downstream queue status cannot regress Consultation to Pending when the role cannot read consultation details", () => {
  for (const status of ["Investigations Pending", "Pharmacy Pending", "Billing Pending", "Checkout Pending", "Admission Recommended", "Completed"]) {
    assert.equal(opdConsultationJourney({ ...queue, status }, { consultations:[] }).consultationStage, "Completed");
  }
  assert.equal(opdConsultationJourney({ ...queue, status:"Pharmacy Pending" }, { consultations:[] }).pharmacyStage, "Pending");
});

test("completed consultation is matched to the exact encounter and becomes Completed", () => {
  const consultations = [
    { id:"CON-OLD", patientId:"PAT-1", appointmentId:"APT-OLD", status:"Completed" },
    { id:"CON-1", patientId:"PAT-1", appointmentId:"APT-1", queueTokenId:"QUEUE-1", status:"Completed" }
  ];
  assert.equal(findConsultationForQueue(consultations, queue).id, "CON-1");
  assert.equal(opdConsultationJourney(queue, { consultations }).consultationStage, "Completed");
});

test("prescription-only completion skips investigations and keeps Pharmacy pending", () => {
  const consultations = [{ id:"CON-1", patientId:"PAT-1", appointmentId:"APT-1", queueTokenId:"QUEUE-1", status:"Completed" }];
  const prescriptions = [{ consultationId:"CON-1", patientId:"PAT-1", appointmentId:"APT-1", items:[{ medicine:"Paracetamol" }] }];
  const result = opdConsultationJourney(queue, { consultations, prescriptions });
  assert.equal(result.investigationStage, "Not Required");
  assert.equal(result.pharmacyStage, "Pending");
});

test("real lab or radiology orders produce Pending and all completed orders produce Completed", () => {
  const consultations = [{ id:"CON-1", patientId:"PAT-1", appointmentId:"APT-1", status:"Completed" }];
  assert.equal(opdConsultationJourney(queue, { consultations, labOrders:[{ consultationId:"CON-1", test:"CBC", status:"Ordered" }] }).investigationStage, "Pending");
  assert.equal(opdConsultationJourney(queue, { consultations, radiologyOrders:[{ consultationId:"CON-1", study:"Chest X-ray", status:"Ordered" }] }).investigationStage, "Pending");
  assert.equal(opdConsultationJourney(queue, { consultations, labOrders:[{ consultationId:"CON-1", test:"CBC", status:"Completed" }] }).investigationStage, "Completed");
});

test("blank placeholders do not count as orders or prescriptions", () => {
  assert.equal(isRealOrder({ test:"" }), false);
  assert.equal(isRealOrder({ test:"CBC", status:"Placeholder" }), false);
  assert.equal(isRealPrescription({ items:[{ medicine:"" }] }), false);
  const consultations = [{ id:"CON-1", patientId:"PAT-1", appointmentId:"APT-1", status:"Completed" }];
  const result = opdConsultationJourney(queue, { consultations, labOrders:[{ consultationId:"CON-1", test:"" }], prescriptions:[{ consultationId:"CON-1", items:[{ medicine:"" }] }] });
  assert.equal(result.investigationStage, "Not Required");
  assert.equal(result.pharmacyStage, "Not Required");
});
