import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const application = fs.readFileSync(new URL("../src/core/application.js", import.meta.url), "utf8");
const apiSource = fs.readFileSync(new URL("../src/services/api.js", import.meta.url), "utf8");
const workflow = fs.readFileSync(new URL("../src/modules/pharmacy/workflow.js", import.meta.url), "utf8");
const activeApplication = application.slice(application.lastIndexOf('\nimport { NAV_BY_ROLE'));

test("Pharmacy sidebar contains only the five workflow stages", () => {
  const nav = activeApplication.match(/const PHARMACY_NAV = \[([\s\S]*?)\n\];/)?.[1] || "";
  for (const route of ["pharmacy", "pharmacy-payments", "pharmacy-dispensing", "stock", "returns"]) assert.match(nav, new RegExp(`"${route}"`));
  for (const removed of ["dashboard", "pharmacy-search", "tasks", "alerts", "reports", "patients"]) assert.doesNotMatch(nav, new RegExp(`"${removed}"`));
  assert.match(activeApplication, /isPharmacy \? "pharmacy-sidebar"/);
});

test("Pharmacy pages expose searches and guarded workflow mutations", () => {
  for (const text of ["Search Prescription ID, MRN, patient name, or doctor", "Only paid prescriptions", "Insufficient stock", "Saleable unopened valid", "quarantine"]) assert.match(`${workflow}\n${apiSource}`, new RegExp(text, "i"));
  for (const method of ["verifyPharmacyPrescription", "payPharmacyPrescription", "dispensePharmacyPrescription", "returnPharmacyItem"]) assert.match(apiSource, new RegExp(method));
  assert.match(apiSource, /status: "PAID"/);
  assert.match(apiSource, /status: "DISPENSED"/);
  assert.match(apiSource, /type: "DISPENSE"/);
});

test("Local Pharmacy permission route list matches the simplified workflow", () => {
  const pharmacy = apiSource.match(/id: "local-pharmacy"[^\n]+/)?.[0] || "";
  for (const route of ["pharmacy", "pharmacy-payments", "pharmacy-dispensing", "stock", "returns"]) assert.match(pharmacy, new RegExp(route));
  assert.doesNotMatch(pharmacy, /pharmacy-search|"patients"/);
  for (const id of ["local-reception", "local-nurse", "local-doctor", "local-billing"]) assert.match(apiSource, new RegExp(`id: "${id}"`));
});

test("Pharmacy stock-logic empty-state plus reuses the existing add-stock create flow", () => {
  const emptyAction = activeApplication.match(/function emptyStateCreateAction\(page\) \{[\s\S]*?\n\}/)?.[0] || "";
  assert.match(emptyAction, /"stock-logic": "add-stock"/);
  assert.match(workflow, /data-action="open-create"/);
  assert.match(workflow, /data-form-action="add-stock"/);
  assert.match(activeApplication, /await api\.addMedicineStock\(currentUser, values\)/);
  assert.match(activeApplication, /toast\("Stock added successfully\."\)/);
});
