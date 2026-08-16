export function renderNurseSummary(rows, escapeHtml) {
  const cards = [
    ["Assigned Patients", rows.length, "patients"],
    ["Vitals Due", rows.filter((row) => row.vitalsDue).length, "vitals"],
    ["Medications Due", rows.filter((row) => row.medicationsDueCount > 0).length, "medications"],
    ["Doctor Orders", "—", "orders"],
    ["Critical Alerts", rows.reduce((sum, row) => sum + row.criticalAlertsCount, 0), "alerts"]
  ];
  return `<section class="nurse-patient-summary" aria-label="Nurse patient summary">${cards.map(([label, value, tone]) => `<article class="nurse-summary-card ${tone}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`).join("")}</section>`;
}
