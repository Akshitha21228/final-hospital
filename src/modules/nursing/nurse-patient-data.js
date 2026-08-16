function sameId(left, right) {
  return left !== undefined && left !== null && right !== undefined && right !== null && String(left) === String(right);
}

function timestamp(record = {}) {
  const value = record.dateTime || record.recordedAt || record.createdAt || record.updatedAt || record.date || "";
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function display(value, fallback = "—") {
  if (value === undefined || value === null || value === "" || (typeof value === "number" && !Number.isFinite(value))) return fallback;
  return String(value);
}

function matchesScope(admission, currentUser) {
  // Production patient/ward assignment must be enforced by the backend/API, not only by frontend filtering.
  if (currentUser.branchId && admission.branchId && !sameId(currentUser.branchId, admission.branchId)) return false;
  if (currentUser.wardId && admission.wardId && !sameId(currentUser.wardId, admission.wardId)) return false;
  if (currentUser.unitId && admission.unitId && !sameId(currentUser.unitId, admission.unitId)) return false;
  if (currentUser.shift && admission.shift && String(currentUser.shift).toLowerCase() !== String(admission.shift).toLowerCase()) return false;
  return true;
}

const ACTIVE_IPD_STATUSES = new Set(["admitted", "under treatment"]);

export function isActiveAdmittedPatient(admission = {}) {
  const status = String(admission.admissionStatus || admission.status || "").trim().toLowerCase();
  const hasWard = Boolean(admission.ward || admission.wardName || admission.wardId);
  const hasBed = Boolean(admission.bedId || admission.bedNumber || admission.bed);
  return ACTIVE_IPD_STATUSES.has(status) && hasWard && hasBed;
}

function recordsForAdmission(records, admission, patient) {
  return records.filter((item) => sameId(item.admissionId, admission.id) || sameId(item.admissionId, admission.admissionId) || sameId(item.patientId, patient.id));
}

function openAlertsForAdmission(alerts, admission, patient) {
  return recordsForAdmission(alerts, admission, patient).filter((item) => !["resolved", "closed", "completed"].includes(String(item.status || "").toLowerCase()));
}

export function deriveNursePatientStatus(alerts = [], admission = {}) {
  if (alerts.some((item) => String(item.severity || item.risk || item.priority || "").toLowerCase() === "critical")) return "Critical";
  if (alerts.some((item) => String(item.severity || item.risk || item.priority || "").toLowerCase() === "high")) return "Needs Attention";
  const operational = String(admission.currentCareStatus || admission.careStatus || "").toLowerCase();
  if (operational.includes("stable")) return "Stable";
  if (operational.includes("critical")) return "Critical";
  if (operational.includes("attention") || operational.includes("review")) return "Needs Attention";
  return "Monitoring";
}

function medicationSummary(records, now) {
  const pending = records.filter((item) => !item.givenTime && !["given", "cancelled"].includes(String(item.status || "").toLowerCase()));
  const scheduled = pending
    .map((item) => ({ ...item, dueTimestamp: new Date(item.scheduledTime || item.dueTime || "").getTime() }))
    .filter((item) => Number.isFinite(item.dueTimestamp))
    .sort((a, b) => a.dueTimestamp - b.dueTimestamp);
  const next = scheduled[0] || pending[0] || null;
  const overdue = scheduled.find((item) => item.dueTimestamp < now) || null;
  return { count: pending.length, next, overdue };
}

export function buildNursePatientRows({ currentUser, patients = [], admissions = [], vitals = [], mar = [], tasks = [], alerts = [], nursingNotes = [], intakeOutput = [] }) {
  const now = Date.now();
  return admissions
    .filter(isActiveAdmittedPatient)
    .filter((item) => matchesScope(item, currentUser))
    .map((admission) => {
      const patient = patients.find((item) => sameId(item.id, admission.patientId));
      if (!patient) return null;
      const patientVitals = recordsForAdmission(vitals, admission, patient).sort((a, b) => timestamp(b) - timestamp(a));
      const latestVitals = patientVitals[0] || null;
      const dueValue = latestVitals?.nextVitalsDue || latestVitals?.dueAt || latestVitals?.scheduledTime || admission.nextVitalsDue || null;
      const dueTimestamp = dueValue ? new Date(dueValue).getTime() : NaN;
      const vitalsDue = !latestVitals || (Number.isFinite(dueTimestamp) && dueTimestamp <= now);
      const patientMar = recordsForAdmission(mar, admission, patient);
      const medication = medicationSummary(patientMar, now);
      const patientTasks = recordsForAdmission(tasks, admission, patient).filter((item) => String(item.status || "").toLowerCase() !== "completed");
      const patientAlerts = openAlertsForAdmission(alerts, admission, patient);
      const criticalAlerts = patientAlerts.filter((item) => ["critical", "high"].includes(String(item.severity || item.risk || item.priority || "").toLowerCase()));
      const notes = recordsForAdmission(nursingNotes, admission, patient).sort((a, b) => timestamp(b) - timestamp(a));
      const io = recordsForAdmission(intakeOutput, admission, patient).sort((a, b) => timestamp(b) - timestamp(a));
      return {
        patientId: display(patient.id || admission.patientId, ""),
        admissionId: display(admission.id || admission.admissionId, ""),
        name: display(patient.name || patient.patientName || admission.patientName, "Patient"),
        mrn: display(patient.mrn || admission.mrn),
        age: display(patient.age || admission.age),
        gender: display(patient.gender || admission.gender),
        ward: display(admission.ward || admission.wardName),
        room: display(admission.room || admission.roomNumber),
        bed: display(admission.bedNumber || admission.bed || admission.bedId),
        doctor: display(admission.consultant || admission.admittingDoctor || admission.doctor || admission.requestedBy),
        admissionStatus: display(admission.admissionStatus || admission.status, "Active"),
        admissionDate: display(admission.admissionDate || admission.admittedAt || admission.createdAt),
        latestVitals,
        bloodPressure: display(latestVitals?.bloodPressure),
        spo2: display(latestVitals?.spo2),
        pulse: display(latestVitals?.pulse),
        temperature: display(latestVitals?.temperature),
        painScore: display(latestVitals?.painScore),
        vitalsDue,
        vitalsDueAt: dueValue,
        medicationsDueCount: medication.count,
        nextMedication: medication.next,
        medicationOverdue: medication.overdue,
        pendingTasksCount: patientTasks.length,
        criticalAlertsCount: criticalAlerts.length,
        doctorOrdersCount: null, // TODO: connect dedicated Doctor Orders API/data source.
        status: deriveNursePatientStatus(patientAlerts, admission),
        latestNursingNote: notes[0] || null,
        latestIntakeOutput: io[0] || null,
        isNewAdmission: String(admission.admissionStatus || admission.status || "").toLowerCase() === "admitted"
      };
    })
    .filter(Boolean);
}
