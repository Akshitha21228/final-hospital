import { escapeHtml } from "../utils/formatters.js";

export function badge(label, className) {
  return `<span class="badge ${className}">${escapeHtml(label)}</span>`;
}

export function emptyState(message) {
  const lower = String(message || "").toLowerCase();
  const suggestion =
    lower.includes("handover") ? "Create handover to capture the next shift plan clearly." :
    lower.includes("purchase") ? "Create purchase request when stock needs replenishment." :
    lower.includes("compliance") ? "Configure R2 storage, privacy checks, or policy records before go-live." :
    lower.includes("patient") ? "Create or search for a patient to continue the hospital flow." :
    lower.includes("bill") ? "All payments are clear for now, or generate a bill when the visit is ready." :
    lower.includes("stock") || lower.includes("medicine") ? "Inventory is healthy, or use Add Stock when a medicine needs replenishment." :
    lower.includes("review") ? "All user permissions are up to date for the selected scope." :
    "Use the primary action on this page when you are ready to add the first record.";
  return `
    <div class="empty">
      <span class="empty-icon" aria-hidden="true">+</span>
      <strong>${escapeHtml(message)}</strong>
      <small>${escapeHtml(suggestion)}</small>
    </div>
  `;
}

export function titleCase(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export function formValues(form) {
  const values = {};
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    if (values[key] === undefined) {
      values[key] = value;
    } else if (Array.isArray(values[key])) {
      values[key].push(value);
    } else {
      values[key] = [values[key], value];
    }
  }
  return values;
}

export function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

export function strongPassword(password = "") {
  return String(password).length >= 12 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
}
