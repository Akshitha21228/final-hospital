import test from "node:test";
import assert from "node:assert/strict";

class MemoryStorage { constructor() { this.data = new Map(); } getItem(key) { return this.data.has(key) ? this.data.get(key) : null; } setItem(key, value) { this.data.set(key, String(value)); } removeItem(key) { this.data.delete(key); } }
globalThis.localStorage = new MemoryStorage();
globalThis.__HOCC_ENV__ = { VITE_API_MODE: "local" };
const { api } = await import("../src/services/api.js");
const { getStore, saveStore } = await import("../src/services/local-store.js");

test("one prescription ID moves through payment, dispensing, stock, and return", async () => {
  const user = (await api.login("pharmacy@hocctest.local", "HoccTest@2026!")).user;
  const store = getStore();
  Object.assign(store, {
    patients: [{ id: "PAT-1", name: "Asha", mrn: "MRN-1", branchId: "local-branch" }],
    prescriptions: [{ id: "RX-1", patientId: "PAT-1", doctor: "Dr. Murli", status: "Pending", branchId: "local-branch", createdAt: new Date().toISOString() }],
    prescriptionItems: [{ id: "RX-1-1", prescriptionId: "RX-1", patientId: "PAT-1", medicineId: "MED-DOLO-650", medicine: "Dolo 650", strength: "650 mg", prescribedQuantity: 1, branchId: "local-branch" }],
    medicineStocks: [
      { id: "EXPIRED", medicineId: "MED-DOLO-650", medicine: "Dolo 650", batchNumber: "OLD", quantityAvailable: 100, expiryDate: "2020-12-31", sellingPrice: 999, branchId: "local-branch" },
      { id: "ZERO", medicineId: "MED-DOLO-650", medicine: "Dolo 650", batchNumber: "ZERO", quantityAvailable: 100, expiryDate: "2099-12-31", sellingPrice: 0, branchId: "local-branch" },
      { id: "STOCK-1", medicineId: "MED-DOLO-650", medicine: "Dolo 650", batchNumber: "DL650-01", quantityAvailable: 100, expiryDate: "2099-12-31", purchasePrice: 20, sellingPrice: 30, reorderLevel: 5, branchId: "local-branch" }
    ],
    bills: [], payments: [], stockTransactions: [], pharmacyReturns: []
  });
  saveStore(store);
  await api.verifyPharmacyPrescription(user, "RX-1");
  assert.equal(api.prescriptions(user)[0].status, "PENDING_PAYMENT");
  const bill = api.bills(user)[0];
  assert.equal(bill.items[0].unitPrice, 30);
  assert.equal(bill.subtotal, 30);
  assert.equal(bill.totalAmount, 30);
  const payment = await api.payPharmacyPrescription(user, "RX-1", { method: "UPI" });
  assert.equal(payment.prescriptionId, "RX-1");
  assert.match(payment.receiptNumber, /^RCT-/);
  assert.equal(api.prescriptions(user)[0].status, "PAID");
  await assert.rejects(() => api.dispensePharmacyPrescription(user, "RX-1", { items: [{ itemId: "RX-1-1", batchId: "STOCK-1", quantity: 2 }] }), /cannot exceed/);
  await api.dispensePharmacyPrescription(user, "RX-1", { items: [{ itemId: "RX-1-1", batchId: "STOCK-1", quantity: 1 }] });
  assert.equal(api.prescriptions(user)[0].status, "DISPENSED");
  assert.equal(api.medicineStocks(user).find((item) => item.id === "STOCK-1").quantityAvailable, 99);
  assert.equal(api.pharmacyStockTransactions(user)[0].quantity, -1);
  await api.returnPharmacyItem(user, "RX-1", { itemId: "RX-1-1", quantity: 1, reason: "Unused", condition: "Saleable unopened valid" });
  assert.equal(api.prescriptions(user)[0].status, "RETURNED");
  assert.equal(api.medicineStocks(user).find((item) => item.id === "STOCK-1").quantityAvailable, 100);
});

test("payment is rejected when no valid positive selling price exists", async () => {
  const user = api.currentUser();
  const store = getStore();
  store.prescriptions.push({ id: "RX-ZERO", patientId: "PAT-1", status: "Pending", branchId: "local-branch" });
  store.prescriptionItems.push({ id: "RX-ZERO-1", prescriptionId: "RX-ZERO", medicineId: "MED-NO-PRICE", medicine: "Unpriced", prescribedQuantity: 1, branchId: "local-branch" });
  store.medicineStocks.push({ id: "STOCK-ZERO", medicineId: "MED-NO-PRICE", medicine: "Unpriced", quantityAvailable: 10, expiryDate: "2099-12-31", sellingPrice: 0, branchId: "local-branch" });
  saveStore(store);
  await api.verifyPharmacyPrescription(user, "RX-ZERO");
  await assert.rejects(() => api.payPharmacyPrescription(user, "RX-ZERO", { method: "Cash" }), /Medicine price is not configured/);
  assert.equal(api.prescriptions(user).find((item) => item.id === "RX-ZERO").status, "PENDING_PAYMENT");
});
