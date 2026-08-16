import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const application = await readFile(new URL("../src/core/application.js", import.meta.url), "utf8");
const apiSource = await readFile(new URL("../src/services/api.js", import.meta.url), "utf8");

test("Pharmacy has an isolated premium navigation without Patients", () => {
  const nav = application.match(/const PHARMACY_NAV = \[([\s\S]*?)\n\];/)?.[1] || "";
  for (const route of ["dashboard", "pharmacy", "pharmacy-dispensing", "pharmacy-search", "stock", "returns", "tasks", "alerts", "reports"]) assert.match(nav, new RegExp(`"${route}"`));
  assert.doesNotMatch(nav, /\["patients"/);
  assert.match(application, /isPharmacy \? "pharmacy-sidebar"/);
  assert.match(application, /isPharmacy \? "PHARMACY"/);
});

test("Pharmacy shells expose the requested internal tabs and no dispensing mutation", () => {
  for (const label of ["Ready to Dispense", "Partially Dispensed", "Prescription Search", "Patient Returns", "Daily Dispensing", "Medicine Usage"]) assert.match(application, new RegExp(label));
  assert.match(application, /Search patient, MRN or prescription ID/);
  assert.doesNotMatch(application.match(/function pharmacyDispensingPage\(\)[\s\S]*?\n\}/)?.[0] || "", /issuePharmacy|stock-adjust|data-action=/);
});

test("Local Pharmacy permissions contain new routes and preserve other role definitions", () => {
  const pharmacy = apiSource.match(/id: "local-pharmacy"[^\n]+/)?.[0] || "";
  assert.match(pharmacy, /pharmacy-dispensing/);
  assert.match(pharmacy, /pharmacy-search/);
  assert.match(pharmacy, /returns/);
  assert.doesNotMatch(pharmacy, /"patients"/);
  assert.match(apiSource, /id: "local-reception"/);
  assert.match(apiSource, /id: "local-nurse"/);
  assert.match(apiSource, /id: "local-doctor"/);
});
