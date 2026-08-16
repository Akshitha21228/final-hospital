export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

export function toNumber(value, fallback = 0) {
  const number = Number(typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value);
  return Number.isFinite(number) ? number : fallback;
}

export function firstDefined(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

export function localDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function localDateInputValue(value = new Date()) {
  return localDateKey(value);
}

export function money(value) {
  return toNumber(value, 0).toLocaleString("en-US");
}

export function currencyValue(value, fallback = 0) {
  const number = toNumber(value, fallback);
  return Number.isFinite(number) ? number : fallback;
}

export function currencyDisplay(value, options = {}) {
  const amount = currencyValue(value, 0);
  const fallbackReason = options.fallbackReason || "Amount details are not available yet.";
  if (!Number.isFinite(Number(value)) && Number(value) !== 0 && amount === 0) {
    return `<span class="cell-stack"><strong>Rs. 0</strong><small>${escapeHtml(fallbackReason)}</small></span>`;
  }
  return `Rs. ${money(amount)}`;
}

export function formatGb(value) {
  const number = Number(value || 0);
  return `${number.toFixed(number % 1 === 0 ? 0 : 2)} GB`;
}

export function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-GB", { hour12: false });
}

export function recordTime(record = {}) {
  return record.updatedAt || record.createdAt || record.dateTime || record.date || record.time || "";
}

export function minutesSince(value) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
}

export function isToday(value) {
  return localDateKey(value) === localDateKey();
}

export function billTotalAmount(bill = {}) {
  const total = firstDefined(
    bill.totalAmount,
    bill.total,
    bill.amount,
    bill.billAmount,
    bill.netAmount,
    bill.grossAmount,
    bill.grandTotal,
    bill.totalDue
  );
  return toNumber(total, 0);
}

export function billPaidAmount(bill = {}) {
  const paid = firstDefined(
    bill.paidAmount,
    bill.paid,
    bill.amountPaid,
    bill.collectedAmount,
    bill.receivedAmount,
    bill.amountReceived,
    bill.paymentReceived,
    bill.collectionAmount
  );
  if (paid !== undefined) return toNumber(paid, 0);
  if (String(bill.status || "").toLowerCase() === "paid") return billTotalAmount(bill);
  return 0;
}

export function billBalanceAmount(bill = {}) {
  const balance = firstDefined(bill.balance, bill.outstandingAmount, bill.remainingAmount, bill.dueAmount);
  if (balance !== undefined) return Math.max(toNumber(balance, 0), 0);
  return Math.max(billTotalAmount(bill) - billPaidAmount(bill), 0);
}

export function billPaymentTimestamp(bill = {}) {
  return firstDefined(bill.paidAt, bill.paymentDate, bill.receivedAt, bill.updatedAt, bill.createdAt, null);
}

export function isBillPaidToday(bill = {}) {
  return billPaidAmount(bill) > 0 && isToday(billPaymentTimestamp(bill));
}

export function isPendingStatus(status, done = ["Paid", "Issued", "Report Ready", "Doctor Reviewed", "Completed", "Approved", "Ready for Discharge", "Discharged"]) {
  return !done.includes(String(status || "").trim());
}
