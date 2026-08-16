const ACTIVE_IPD_STATUSES = new Set(["Admitted", "Under Treatment"]);

export function activeDoctorIpdAdmissions(admissions = [], user = {}) {
  return admissions.filter((admission) => {
    const status = admission.admissionStatus || admission.status;
    if (!ACTIVE_IPD_STATUSES.has(status) || !(admission.id || admission._id) || !admission.patientId) return false;
    if (!(admission.ward || admission.wardId) || !(admission.bedId || admission.bedNumber || admission.bed)) return false;
    if (user.branchId && admission.branchId && String(user.branchId) !== String(admission.branchId)) return false;
    const assignedId = admission.doctorId || admission.admittingDoctorId || admission.consultantDoctorId || admission.assignedDoctorId;
    if (assignedId) return [user.id, user.doctorId].filter(Boolean).some((id) => String(id) === String(assignedId));
    if (admission.department && user.department) return String(admission.department).toLowerCase() === String(user.department).toLowerCase();
    return true;
  });
}

export function admissionVitals(vitals = [], admission = {}) {
  return vitals.filter((vital) => String(vital.admissionId) === String(admission.id || admission._id) && (!vital.patientId || String(vital.patientId) === String(admission.patientId))).sort((a, b) => new Date(b.recordedAt || b.dateTime || b.createdAt || 0) - new Date(a.recordedAt || a.dateTime || a.createdAt || 0));
}

export function resolveAdmissionPatient(patients = [], admission = {}) {
  return patients.find((patient) => String(patient.id || patient._id) === String(admission.patientId)) || null;
}
