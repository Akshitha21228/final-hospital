export function renderNursePatientFilters(escapeHtml) {
  const filters = [["all", "All"], ["attention", "Needs Attention"], ["vitals", "Vitals Due"], ["medication", "Medication Due"], ["orders", "Orders Pending"], ["new", "New Admissions"]];
  return `<section class="nurse-patient-tools"><label class="nurse-patient-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search patient, MRN, or bed..." data-nurse-patient-search /></label><div class="nurse-patient-filter-row" role="group" aria-label="Filter assigned patients">${filters.map(([value, label], index) => `<button type="button" class="nurse-filter ${index === 0 ? "active" : ""}" data-nurse-filter="${escapeHtml(value)}">${escapeHtml(label)}</button>`).join("")}</div></section>`;
}

export function nursePatientMatches(row, search = "", filter = "all") {
  const query = String(search).trim().toLowerCase();
  const searchable = `${row.name || ""} ${row.mrn || ""} ${row.bed || ""} ${row.room || ""} ${row.ward || ""}`.toLowerCase();
  const matchesSearch = !query || searchable.includes(query);
  const matchesFilter = filter === "all" ||
    (filter === "attention" && ["Needs Attention", "Critical"].includes(row.status)) ||
    (filter === "vitals" && row.vitalsDue) ||
    (filter === "medication" && row.medicationsDueCount > 0) ||
    (filter === "orders" && row.doctorOrdersCount > 0) ||
    (filter === "new" && row.isNewAdmission);
  return Boolean(matchesSearch && matchesFilter);
}

function applyFilters(root) {
  const search = String(root.querySelector("[data-nurse-patient-search]")?.value || "").trim().toLowerCase();
  const filter = root.querySelector("[data-nurse-filter].active")?.dataset.nurseFilter || "all";
  let visible = 0;
  root.querySelectorAll("[data-nurse-patient-card]").forEach((card) => {
    const matchesSearch = !search || card.dataset.search.includes(search);
    const matchesFilter = filter === "all" || card.dataset[filter] === "true";
    const show = matchesSearch && matchesFilter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  const noResults = root.querySelector("[data-nurse-no-results]");
  if (noResults) noResults.hidden = visible !== 0;
}

export function handleNursePatientInput(target) {
  if (!target.matches?.("[data-nurse-patient-search]")) return false;
  const root = target.closest("[data-nurse-patients-workspace]");
  if (root) applyFilters(root);
  return true;
}

export function handleNursePatientClick(target) {
  const filter = target.closest?.("[data-nurse-filter]");
  if (!filter) return false;
  const root = filter.closest("[data-nurse-patients-workspace]");
  root?.querySelectorAll("[data-nurse-filter]").forEach((button) => button.classList.toggle("active", button === filter));
  if (root) applyFilters(root);
  return true;
}
