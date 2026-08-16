function formatTime(value) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "Not scheduled";
}

function medicationText(row) {
  if (row.medicationOverdue) {
    const minutes = Math.max(1, Math.floor((Date.now() - row.medicationOverdue.dueTimestamp) / 60000));
    return `Overdue ${minutes} min`;
  }
  if (row.nextMedication) return `Due ${formatTime(row.nextMedication.scheduledTime || row.nextMedication.dueTime)}`;
  return "—";
}

export function renderNursePatientCard(row, escapeHtml) {
  const attention = ["Needs Attention", "Critical"].includes(row.status);
  const location = [row.ward !== "—" ? row.ward : "", row.room !== "—" ? `Room ${row.room}` : "", row.bed !== "—" ? `Bed ${row.bed}` : ""].filter(Boolean).join(" • ") || "Location not assigned";
  const demographic = [row.age !== "—" ? `${row.age} Y` : "", row.gender !== "—" ? row.gender : ""].filter(Boolean).join(" / ") || "Demographics unavailable";
  const search = `${row.name} ${row.mrn} ${row.bed} ${row.room} ${row.ward}`.toLowerCase();
  return `<article class="nurse-patient-card" data-nurse-patient-card data-search="${escapeHtml(search)}" data-attention="${attention}" data-vitals="${row.vitalsDue}" data-medication="${row.medicationsDueCount > 0}" data-orders="${row.doctorOrdersCount > 0}" data-new="${row.isNewAdmission}">
    <header><div><h3>${escapeHtml(row.name)}</h3><p>${escapeHtml(row.mrn)} · ${escapeHtml(demographic)}</p></div><span class="nurse-status ${escapeHtml(row.status.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(row.status)}</span></header>
    <div class="nurse-patient-location"><strong>${escapeHtml(location)}</strong><span>${escapeHtml(row.doctor === "—" ? "Treating doctor not assigned" : row.doctor)}</span></div>
    <div class="nurse-vitals-snapshot"><div><span>Latest BP</span><strong>${escapeHtml(row.bloodPressure)}</strong></div><div><span>Latest SpO₂</span><strong>${escapeHtml(row.spo2 === "—" ? "—" : `${row.spo2}%`)}</strong></div></div>
    <dl class="nurse-care-list"><div><dt>Vitals</dt><dd class="${row.vitalsDue ? "due" : ""}">${escapeHtml(row.vitalsDue ? (row.vitalsDueAt ? `Due ${formatTime(row.vitalsDueAt)}` : "Not scheduled") : `Next ${formatTime(row.vitalsDueAt)}`)}</dd></div><div><dt>Medication</dt><dd class="${row.medicationOverdue ? "overdue" : row.medicationsDueCount ? "due" : ""}">${escapeHtml(medicationText(row))}</dd></div><div><dt>Doctor Orders</dt><dd>${row.doctorOrdersCount === null ? "—" : `${escapeHtml(row.doctorOrdersCount)} Pending`}</dd></div><div><dt>Tasks</dt><dd>${escapeHtml(row.pendingTasksCount)} Pending</dd></div></dl>
    <footer><button class="button tiny soft" data-route="ipdPatient360" data-admission-id="${escapeHtml(row.admissionId)}">Patient 360</button><button class="button tiny primary" data-route="ipdVitals" data-admission-id="${escapeHtml(row.admissionId)}">Record Vitals</button><button class="button tiny soft" data-route="mar" data-admission-id="${escapeHtml(row.admissionId)}">MAR</button><details><summary aria-label="More actions">•••</summary><div><button data-route="dutyDoctor" data-admission-id="${escapeHtml(row.admissionId)}">Doctor Orders</button><button data-route="nursing" data-admission-id="${escapeHtml(row.admissionId)}">Nursing Notes</button><button data-route="intakeOutput" data-admission-id="${escapeHtml(row.admissionId)}">Intake / Output</button><button data-route="handover" data-admission-id="${escapeHtml(row.admissionId)}">Handover</button></div></details></footer>
  </article>`;
}
