let searchQuery = "";
let statusFilter = "All";

const WAITING_STATUSES = new Set(["waiting", "vitals pending", "ready for doctor", "with doctor", "checked in", "queued"]);
const CLOSED_STATUSES = new Set(["completed", "cancelled", "canceled", "paid"]);

function idSet(rows, predicate = () => true) {
  return new Set((rows || []).filter(predicate).map((row) => String(row.patientId || "")).filter(Boolean));
}

export function getPatientFilterState() {
  return { searchQuery, statusFilter };
}

export function setPatientSearchQuery(value) {
  searchQuery = String(value || "");
}

export function setPatientStatusFilter(value) {
  const allowed = new Set(["All", "Active", "Waiting", "Billing Pending", "Completed"]);
  statusFilter = allowed.has(value) ? value : "All";
}

export function filterPatientsForReception(patients, workflow, branchId) {
  const queue = workflow.queue || [];
  const appointments = workflow.appointments || [];
  const bills = workflow.bills || [];
  const checkouts = workflow.checkouts || [];
  const waitingIds = idSet(queue, (row) => WAITING_STATUSES.has(String(row.status || "").toLowerCase()));
  const billingPendingIds = idSet(bills, (row) => !CLOSED_STATUSES.has(String(row.status || row.paymentStatus || "pending").toLowerCase()));
  const completedIds = idSet(checkouts, (row) => String(row.status || "").toLowerCase() === "completed");
  const activeAppointmentIds = idSet(appointments, (row) => !CLOSED_STATUSES.has(String(row.status || "booked").toLowerCase()));
  const query = searchQuery.trim().toLowerCase();

  return (patients || [])
    .filter((patient) => !branchId || !patient.branchId || String(patient.branchId) === String(branchId))
    .filter((patient) => {
      const id = String(patient.id || "");
      if (statusFilter === "Waiting") return waitingIds.has(id);
      if (statusFilter === "Billing Pending") return billingPendingIds.has(id);
      if (statusFilter === "Completed") return completedIds.has(id);
      if (statusFilter === "Active") {
        return !["archived", "inactive"].includes(String(patient.status || "registered").toLowerCase()) ||
          activeAppointmentIds.has(id) || waitingIds.has(id) || billingPendingIds.has(id);
      }
      return true;
    })
    .filter((patient) => !query || `${patient.mrn || ""} ${patient.name || patient.fullName || ""} ${patient.mobile || patient.mobileNumber || ""}`.toLowerCase().includes(query));
}

export function patientWorkflowStatus(patient, workflow) {
  const id = String(patient?.id || "");
  const admission = (workflow.admissions || []).filter((row) => String(row.patientId || "") === id).sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))[0];
  if (admission) return admission.admissionStatus || admission.status || "Admission Requested";
  const queue = (workflow.queue || []).find((row) => String(row.patientId || "") === id && WAITING_STATUSES.has(String(row.status || "").toLowerCase()));
  if (queue) return queue.status || "Waiting";
  const pendingBill = (workflow.bills || []).find((row) => String(row.patientId || "") === id && !CLOSED_STATUSES.has(String(row.status || row.paymentStatus || "pending").toLowerCase()));
  if (pendingBill) return "Billing Pending";
  const checkout = (workflow.checkouts || []).find((row) => String(row.patientId || "") === id && String(row.status || "").toLowerCase() === "completed");
  if (checkout) return "Completed";
  return patient?.status || "Registered";
}

export function patientFilterEmptyMessage() {
  if (searchQuery.trim()) return "No patients match your search.";
  if (statusFilter === "Waiting") return "No patients are currently waiting.";
  if (statusFilter === "Billing Pending") return "No patients have pending billing.";
  if (statusFilter === "Completed") return "No completed patient visits found.";
  if (statusFilter === "Active") return "No active patients found.";
  return "No patients registered yet.";
}

export function linkedPatientRecords(patientId, collections) {
  const id = String(patientId || "");
  const names = ["appointments", "queueTokens", "vitals", "consultations", "admissions", "bills", "payments", "checkouts", "followUps"];
  return names.filter((name) => (collections[name] || []).some((row) => String(row.patientId || "") === id));
}
