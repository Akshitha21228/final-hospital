import { api } from "../../services/api.js";
import { escapeAttribute, escapeHtml, formatDateTime, money } from "../../utils/formatters.js";
import { emptyState } from "../../ui/primitives.js";

let query = "";
const read = (loader) => { try { return loader() || []; } catch { return []; } };
const idOf = (item) => String(item?.id || item?._id || "");
const qty = (item) => Math.max(1, Number(item?.prescribedQuantity || item?.quantity || 1));
const sameMedicine = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
const activeBranch = (item, user) => !item?.branchId || !user?.branchId || String(item.branchId) === String(user.branchId);
const today = () => new Date(new Date().toDateString());
const medicineKey = (value) => String(value || "").toLowerCase().replace(/\b(mg|mcg|g|ml|tablet|tablets|capsule|capsules)\b/g, "").replace(/[^a-z0-9]+/g, "").trim();
const itemMedicineIds = (item) => [item?.medicineId, item?.productId, item?.inventoryItemId, item?.drugId].filter(Boolean).map(String);
const stockMedicineIds = (stock) => [stock?.medicineId, stock?.productId, stock?.inventoryItemId, stock?.drugId].filter(Boolean).map(String);

function matchesStockMedicine(item, stock) {
  const itemIds = itemMedicineIds(item), stockIds = stockMedicineIds(stock);
  if (itemIds.length && stockIds.length) return itemIds.some((id) => stockIds.includes(id));
  const prescribedKeys = [item?.medicine, `${item?.medicine || ""} ${item?.strength || ""}`].map(medicineKey).filter(Boolean);
  const stockKeys = [stock?.medicine, stock?.medicineName, stock?.productName, `${stock?.medicine || stock?.medicineName || ""} ${stock?.strength || ""}`].map(medicineKey).filter(Boolean);
  return prescribedKeys.some((key) => stockKeys.includes(key));
}

function validPriceBatch(item, stocks) {
  return stocks
    .filter((stock) => matchesStockMedicine(item, stock))
    .filter((stock) => Number(stock.quantityAvailable || 0) > 0 && Number(stock.sellingPrice || 0) > 0 && new Date(stock.expiryDate || stock.expiry || 0) >= today())
    .sort((a, b) => new Date(a.expiryDate || a.expiry) - new Date(b.expiryDate || b.expiry))[0] || null;
}

function data(user) {
  const patients = read(() => api.patients(user)).filter((item) => activeBranch(item, user));
  const prescriptions = read(() => api.prescriptions(user)).filter((item) => activeBranch(item, user));
  const items = read(() => api.prescriptionItems(user)).filter((item) => activeBranch(item, user));
  const stocks = read(() => api.medicineStocks(user)).filter((item) => activeBranch(item, user));
  const bills = read(() => api.bills(user)).filter((item) => activeBranch(item, user));
  const payments = read(() => api.payments(user)).filter((item) => activeBranch(item, user));
  const returns = read(() => api.pharmacyReturns(user)).filter((item) => activeBranch(item, user));
  return { patients, prescriptions, items, stocks, bills, payments, returns };
}

function patientFor(rx, rows) { return rows.patients.find((item) => idOf(item) === String(rx.patientId)) || {}; }
function itemsFor(rx, rows) {
  const linked = rows.items.filter((item) => String(item.prescriptionId) === idOf(rx));
  return linked.length ? linked : (Array.isArray(rx.items) ? rx.items.map((item, index) => ({ ...item, id: `${idOf(rx)}-${index + 1}`, prescriptionId: idOf(rx) })) : []);
}
function available(item, rows) {
  return rows.stocks.filter((stock) => sameMedicine(stock.medicine, item.medicine) && new Date(stock.expiryDate || 0) >= today()).reduce((sum, stock) => sum + Number(stock.quantityAvailable || 0), 0);
}
function matches(rx, rows, extra = "") {
  if (!query) return true;
  const patient = patientFor(rx, rows);
  return [idOf(rx), rx.doctor, patient.name, patient.mrn, rx.patientName, rx.mrn, extra].some((value) => String(value || "").toLowerCase().includes(query.toLowerCase()));
}
function status(value) { return `<span class="badge status-${/paid|verified|dispensed|returned|stock/i.test(String(value)) ? "active" : "pending"}">${escapeHtml(String(value || "PRESCRIBED").replaceAll("_", " "))}</span>`; }
function search(placeholder) { return `<form class="pharmacy-search-box" data-action="pharmacy-search"><input name="query" type="search" value="${escapeAttribute(query)}" placeholder="${escapeAttribute(placeholder)}" aria-label="${escapeAttribute(placeholder)}"><button class="button" type="submit">Search</button>${query ? '<button class="button ghost" type="button" data-action="pharmacy-clear-search">Clear</button>' : ""}</form>`; }
function heading(title, text) { return `<section class="panel pharmacy-page-heading"><div class="panel-head"><div><p class="eyebrow">Pharmacy</p><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></div></section>`; }
function table(headers, rows) { return `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`; }
function inventoryEmptyState() { return `<div class="empty"><button class="empty-icon" type="button" aria-label="Add stock" title="Add stock" data-action="open-create" data-form-action="add-stock">+</button><strong>No batch stock is available.</strong><small>Use Add Stock to create the first medicine batch.</small></div>`; }

export function prescriptionsPage(user) {
  const rows = data(user), prescriptions = rows.prescriptions.filter((rx) => matches(rx, rows));
  const body = prescriptions.flatMap((rx) => {
    const patient = patientFor(rx, rows), medicines = itemsFor(rx, rows);
    return medicines.map((item, index) => `<tr><td>${index ? "" : `<strong>${escapeHtml(idOf(rx))}</strong>`}</td><td>${escapeHtml(patient.name || rx.patientName || "-")}</td><td>${escapeHtml(patient.mrn || rx.mrn || "-")}</td><td>${escapeHtml(rx.doctor || "-")}</td><td>${escapeHtml(formatDateTime(rx.prescriptionDate || rx.createdAt))}</td><td>${escapeHtml(item.medicine || "-")}</td><td>${escapeHtml(item.strength || "-")}</td><td>${qty(item)}</td><td>${available(item, rows)}</td><td>${status(rx.status)}</td><td>${index ? "" : (["Pending", "PRESCRIBED", "Prescribed"].includes(rx.status) ? `<button class="button primary" data-action="pharmacy-verify" data-prescription="${escapeAttribute(idOf(rx))}">Verify</button>` : ["VERIFIED", "PENDING_PAYMENT"].includes(rx.status) ? `<button class="button primary" data-action="pharmacy-proceed-payment" data-prescription="${escapeAttribute(idOf(rx))}">Proceed to Payment</button>` : "-")}</td></tr>`);
  });
  return `${heading("Prescriptions", "Verify patient prescriptions before payment. The same prescription ID is retained throughout the workflow.")}${search("Search Prescription ID, MRN, patient name, or doctor")}${body.length ? table(["Prescription ID", "Patient", "MRN", "Doctor", "Date", "Medicine", "Strength", "Prescribed", "Available", "Status", "Action"], body) : emptyState(query ? "No prescriptions match this search." : "No prescriptions are available.")}`;
}

export function paymentsPage(user) {
  const rows = data(user), eligible = rows.prescriptions.filter((rx) => ["VERIFIED", "PENDING_PAYMENT"].includes(rx.status) && matches(rx, rows));
  const cards = eligible.map((rx) => {
    const patient = patientFor(rx, rows), bill = rows.bills.find((item) => String(item.id) === String(rx.billId) || String(item.prescriptionId) === idOf(rx));
    const items = itemsFor(rx, rows).map((item) => { const stock = validPriceBatch(item, rows.stocks); const unit = Number(stock?.sellingPrice || 0); return { ...item, priceBatch: stock, unit, amount: qty(item) * unit }; });
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0), discount = Number(bill?.discount || 0), tax = Number(bill?.tax || 0), total = Math.max(0, subtotal - discount + tax);
    const missingPrice = items.some((item) => !item.priceBatch || item.unit <= 0);
    return `<section class="panel"><div class="panel-head"><div><h3>${escapeHtml(idOf(rx))}</h3><p>${escapeHtml(patient.name || rx.patientName || "Patient")} · ${escapeHtml(patient.mrn || rx.mrn || "-")}</p></div>${status(rx.status)}</div>${table(["Medicine", "Quantity", "Unit price", "Subtotal"], items.map((item) => `<tr><td>${escapeHtml(item.medicine)} ${escapeHtml(item.strength || "")}</td><td>${qty(item)}</td><td>Rs. ${money(item.unit)}</td><td>Rs. ${money(item.amount)}</td></tr>`))}<div class="summary-grid"><span>Subtotal <strong>Rs. ${money(subtotal)}</strong></span><span>Discount <strong>Rs. ${money(discount)}</strong></span><span>Tax <strong>Rs. ${money(tax)}</strong></span><span>Total <strong>Rs. ${money(total)}</strong></span></div>${missingPrice ? '<p class="form-error" role="alert">Medicine price is not configured. Update Inventory / Stock pricing first.</p>' : ""}<form data-action="pharmacy-payment"><input type="hidden" name="prescriptionId" value="${escapeAttribute(idOf(rx))}"><input type="hidden" name="billId" value="${escapeAttribute(bill?.id || rx.billId || "")}"><label>Payment method<select name="method" required ${missingPrice ? "disabled" : ""}><option>Cash</option><option>Card</option><option>UPI</option><option>Insurance / Credit</option></select></label><button class="button primary" type="submit" ${missingPrice ? "disabled aria-disabled=\"true\"" : ""}>Collect Rs. ${money(total)}</button></form></section>`;
  }).join("");
  return `${heading("Payments", "Only verified prescriptions awaiting payment are shown. Payment creates a receipt and enables dispensing.")}${search("Search Prescription ID, MRN, patient name, or doctor")}${cards || emptyState("No verified prescriptions are awaiting payment.")}`;
}

export function dispensingPage(user) {
  const rows = data(user), eligible = rows.prescriptions.filter((rx) => rx.status === "PAID" && matches(rx, rows));
  const cards = eligible.map((rx) => `<section class="panel"><div class="panel-head"><div><h3>${escapeHtml(idOf(rx))}</h3><p>Receipt ${escapeHtml(rx.receiptNumber || "-")}</p></div>${status(rx.status)}</div><form data-action="pharmacy-dispense"><input type="hidden" name="prescriptionId" value="${escapeAttribute(idOf(rx))}">${table(["Medicine", "Required", "Dispense", "Batch", "Expiry"], itemsFor(rx, rows).map((item) => { const batches = rows.stocks.filter((stock) => sameMedicine(stock.medicine, item.medicine) && Number(stock.quantityAvailable || 0) > 0 && new Date(stock.expiryDate || 0) >= today()).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)); return `<tr><td>${escapeHtml(item.medicine)} ${escapeHtml(item.strength || "")}</td><td>${qty(item)}</td><td><input name="quantity:${escapeAttribute(idOf(item))}" type="number" min="1" max="${qty(item)}" value="${qty(item)}" required></td><td><select name="batch:${escapeAttribute(idOf(item))}" required><option value="">Select batch</option>${batches.map((batch) => `<option value="${escapeAttribute(idOf(batch))}">${escapeHtml(batch.batchNumber || idOf(batch))} (${Number(batch.quantityAvailable || 0)} available)</option>`).join("")}</select></td><td>${batches.map((batch) => escapeHtml(batch.expiryDate || "-")).join("<br>") || "No valid stock"}</td></tr>`; }))}<button class="button primary" type="submit">Dispense and deduct stock</button></form></section>`).join("");
  return `${heading("Dispensing", "Only paid prescriptions are eligible. Valid batch stock is deducted automatically.")}${search("Search Prescription ID, MRN, patient name, or doctor")}${cards || emptyState("No paid prescriptions are ready to dispense.")}`;
}

function stockStatus(stock) { const available = Number(stock.quantityAvailable || 0); if (new Date(stock.expiryDate || 0) < today()) return "EXPIRED"; if (available <= 0) return "OUT_OF_STOCK"; if (available <= Number(stock.reorderLevel || 0)) return "LOW_STOCK"; return "IN_STOCK"; }
export function inventoryPage(user) {
  const rows = data(user), stocks = rows.stocks.filter((item) => !query || [item.medicine, item.batchNumber, stockStatus(item)].some((value) => String(value || "").toLowerCase().includes(query.toLowerCase())));
  return `${heading("Inventory / Stock", "Batch-level saleable stock. Dispensing and eligible returns update quantities automatically.")}${search("Search medicine, batch number, or stock status")}${stocks.length ? table(["Medicine", "Batch", "Available", "Quarantine", "Expiry", "Purchase price", "Selling price", "Reorder level", "Status"], stocks.map((item) => `<tr><td>${escapeHtml(item.medicine)}</td><td>${escapeHtml(item.batchNumber || "-")}</td><td>${Number(item.quantityAvailable || 0)}</td><td>${Number(item.quarantineQuantity || 0)}</td><td>${escapeHtml(item.expiryDate || "-")}</td><td>Rs. ${money(item.purchasePrice || 0)}</td><td>Rs. ${money(item.sellingPrice || 0)}</td><td>${Number(item.reorderLevel || 0)}</td><td>${status(stockStatus(item))}</td></tr>`)) : inventoryEmptyState()}`;
}

export function returnsPage(user) {
  const rows = data(user), eligible = rows.prescriptions.filter((rx) => ["DISPENSED", "COMPLETED", "PARTIAL_RETURN"].includes(rx.status) && matches(rx, rows, rx.receiptNumber));
  const cards = eligible.map((rx) => `<section class="panel"><div class="panel-head"><div><h3>${escapeHtml(idOf(rx))}</h3><p>Receipt ${escapeHtml(rx.receiptNumber || "-")}</p></div>${status(rx.status)}</div>${itemsFor(rx, rows).map((item) => { const dispensed = Number(item.dispensedQuantity || 0), returned = Number(item.returnedQuantity || 0), maximum = Math.max(0, dispensed - returned); return `<form data-action="pharmacy-return"><input type="hidden" name="prescriptionId" value="${escapeAttribute(idOf(rx))}"><input type="hidden" name="itemId" value="${escapeAttribute(idOf(item))}"><div class="summary-grid"><span>Medicine <strong>${escapeHtml(item.medicine)}</strong></span><span>Dispensed <strong>${dispensed}</strong></span><span>Already returned <strong>${returned}</strong></span><span>Maximum returnable <strong>${maximum}</strong></span></div>${maximum ? `<label>Return quantity<input name="quantity" type="number" min="1" max="${maximum}" required></label><label>Reason<input name="reason" required></label><label>Item condition<select name="condition" required><option>Saleable unopened valid</option><option>Opened</option><option>Damaged</option><option>Contaminated</option><option>Expired</option></select></label><button class="button primary" type="submit">Process return</button>` : `<p>Fully returned.</p>`}</form>`; }).join("")}</section>`).join("");
  return `${heading("Returns", "Search previously dispensed prescriptions. Saleable returns replenish the original batch; all others move to quarantine.")}${search("Search Prescription ID, receipt number, MRN, or patient name")}${cards || emptyState("No dispensed prescriptions are available for return.")}`;
}

export function setPharmacySearch(value) { query = String(value || "").trim(); }
export function clearPharmacySearch() { query = ""; }
export function dispensePayload(values) {
  const items = [];
  Object.entries(values).forEach(([key, value]) => { if (key.startsWith("batch:")) { const itemId = key.slice(6); items.push({ itemId, batchId: value, quantity: Number(values[`quantity:${itemId}`]) }); } });
  return items;
}
