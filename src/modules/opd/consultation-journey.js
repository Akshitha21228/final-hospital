function sameId(left, right) {
  return left !== undefined && left !== null && left !== "" && right !== undefined && right !== null && right !== "" && String(left) === String(right);
}

export function findConsultationForQueue(consultations = [], queue = {}) {
  return consultations.find((item) => {
    if (!sameId(item.patientId, queue.patientId)) return false;
    if (sameId(item.queueTokenId, queue.id || queue._id)) return true;
    if (item.queueTokenId && (queue.id || queue._id)) return false;
    if (sameId(item.appointmentId, queue.appointmentId)) return true;
    return !item.queueTokenId && !item.appointmentId && !queue.id && !queue.appointmentId;
  }) || null;
}

export function isRealOrder(order = {}) {
  return Boolean(String(order.test || order.study || order.tests || "").trim()) && !["placeholder", "example"].includes(String(order.status || "").toLowerCase());
}

export function isRealPrescription(prescription = {}) {
  const items = Array.isArray(prescription.items) ? prescription.items : [];
  return items.some((item) => Boolean(String(item.medicine || item.name || "").trim()));
}

export function opdConsultationJourney(queue = {}, { consultations = [], labOrders = [], radiologyOrders = [], prescriptions = [] } = {}) {
  const consultation = findConsultationForQueue(consultations, queue);
  const completed = consultation?.status === "Completed";
  const downstreamStatuses = ["Investigations Pending", "Pharmacy Pending", "Billing Pending", "Checkout Pending", "Admission Recommended", "Completed"];
  const consultationStage = completed || !consultation && downstreamStatuses.includes(queue.status)
    ? "Completed"
    : consultation && ["In Progress", "Draft"].includes(consultation.status) || queue.status === "With Doctor"
      ? "In Progress"
      : "Pending";
  const linked = (item) => sameId(item.consultationId, consultation?.id) || sameId(item.appointmentId, queue.appointmentId) && sameId(item.patientId, queue.patientId);
  const investigations = [...labOrders, ...radiologyOrders].filter(linked).filter(isRealOrder);
  const prescription = prescriptions.filter(linked).find(isRealPrescription);
  const allInvestigationsComplete = investigations.length > 0 && investigations.every((item) => ["Completed", "Report Ready", "Doctor Reviewed"].includes(item.status));
  return {
    consultation,
    consultationStage,
    investigationStage: consultationStage !== "Completed" ? "Pending" : investigations.length === 0 ? "Not Required" : allInvestigationsComplete ? "Completed" : "Pending",
    pharmacyStage: consultationStage !== "Completed" ? "Pending" : prescription || queue.status === "Pharmacy Pending" ? "Pending" : "Not Required"
  };
}
