import { buildNursePatientRows } from "./nurse-patient-data.js";
import { renderNursePatientCard } from "./nurse-patient-card.js";
import { renderNursePatientFilters } from "./nurse-patient-filters.js";
import { renderNurseSummary } from "./nurse-summary.js";

export function nurseMyPatientsPage({ api, currentUser, safeData, safeOptionalData, escapeHtml }) {
  const rows = buildNursePatientRows({
    currentUser,
    patients: safeData(() => api.patients(currentUser)),
    admissions: safeData(() => api.admissions(currentUser)),
    vitals: safeOptionalData(() => api.ipdVitals(currentUser)),
    mar: safeOptionalData(() => api.medicationAdministrationRecords(currentUser)),
    tasks: safeOptionalData(() => api.tasks(currentUser)),
    alerts: safeOptionalData(() => api.alerts(currentUser)),
    nursingNotes: safeOptionalData(() => api.nursingNotes(currentUser)),
    intakeOutput: safeOptionalData(() => api.intakeOutputCharts(currentUser))
  });
  const context = [currentUser.wardName || currentUser.ward, currentUser.shift, currentUser.branchName].filter(Boolean).join(" • ");
  return `<div class="nurse-patients-workspace" data-nurse-patients-workspace>
    <header class="nurse-patients-header"><p>NURSE</p><h2>My Patients</h2><span>Assigned patients for your current ward / unit and shift.</span>${context ? `<strong>${escapeHtml(context)}</strong>` : ""}</header>
    ${renderNurseSummary(rows, escapeHtml)}
    ${renderNursePatientFilters(escapeHtml)}
    ${rows.length ? `<section class="nurse-patient-grid">${rows.map((row) => renderNursePatientCard(row, escapeHtml)).join("")}</section><section class="nurse-no-results" data-nurse-no-results hidden><h3>No matching patients</h3><p>Try another search or filter.</p></section>` : `<section class="nurse-patients-empty"><h3>No admitted patients assigned</h3><p>There are currently no active admitted patients in your assigned ward or scope.</p><span>Patients will appear here automatically after admission activation and bed assignment.</span></section>`}
  </div>`;
}
