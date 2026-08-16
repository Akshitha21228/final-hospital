import { activeDoctorIpdAdmissions, admissionVitals, resolveAdmissionPatient } from "../modules/doctor/ipd-patients.js";

let __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache;

export function configurePageRenderers(context) {
  ({ __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache } = context);
}

export function ipdPatient360Page() {
  const { query } = parseHashRoute();
  const admissions = safeData(() => api.admissions(currentUser));
  const admissionId = query.admissionId || "";
  const activeAdmissions = admissions.filter((item) => !["Discharged", "Cancelled"].includes(ipdAdmissionStatus(item)));
  if (!admissionId) {
    return `
      <section class="panel state-panel" data-testid="ipd-360-select-state">
        <div class="panel-head"><h3>Select an admitted patient to view IPD 360.</h3><p>No admitted patient selected. Select a patient from IPD Patients to open 360 view.</p></div>
        ${activeAdmissions.length ? patientCardGrid(activeAdmissions.map((item) => ({
          id: admissionDisplayId(item),
          patientName: item.patientName,
          mrn: item.mrn,
          department: item.department,
          doctor: item.admittingDoctor || item.consultant,
          status: ipdAdmissionStatus(item),
          action: "open-ipd-360",
          actionLabel: "View 360",
          testId: "ipd-view-360-button"
        }))) : emptyState("No admitted patient selected. Select a patient from IPD Patients to open 360 view.")}
      </section>
    `;
  }

  const admission = admissions.find((item) => String(admissionDisplayId(item)) === String(admissionId));
  if (!admission) {
    return pageErrorPanel("IPD Patient 360", "This admitted patient could not be found for your current branch and role.", "Open IPD Patients and choose View 360 again.");
  }

  const patients = hasPermission(currentUser, "patients", "view") ? safeOptionalData(() => api.patients(currentUser)) : [];
  const patient = patients.find((item) => String(item.id) === String(admissionPatientId(admission))) || {};
  const showDeathSummary = hasPermission(currentUser, "deathSummary", "view") && isDeathOutcome(admission);
  const visibleTabs = [
    ["overview", "ipd"],
    ["timeline", "ipd"],
    ["dailySheet", "dailySheets"],
    ["doctorNotes", "dutyDoctor"],
    ["nursingNotes", "nursing"],
    ["vitals", "ipdVitals"],
    ["mar", "mar"],
    ["intakeOutput", "intakeOutput"],
    ["handover", "handover"],
    ["discharge", "discharge"],
    ["deathSummary", "deathSummary"],
    ["billing", "billing"],
    ["documents", "documents"]
  ].filter(([key, module]) => hasPermission(currentUser, module, "view") && (key !== "deathSummary" || showDeathSummary)).map(([key]) => key);
  const activeTab = visibleTabs.includes(query.tab) ? query.tab : visibleTabs[0] || "overview";
  const loadFor = (...tabs) => activeTab === "overview" || tabs.includes(activeTab);
  const sheets = hasPermission(currentUser, "dailySheets", "view") && loadFor("dailySheet") ? filterByAdmission(safeOptionalData(() => api.dailyPatientSheets(currentUser)), admission) : [];
  const doctorNotes = hasPermission(currentUser, "dutyDoctor", "view") && loadFor("doctorNotes") ? filterByAdmission(safeOptionalData(() => api.dutyDoctorNotes(currentUser)), admission) : [];
  const doctorProgressNotes = isDoctorRole() && loadFor("doctorNotes") ? filterByAdmission(safeOptionalData(() => api.doctorProgressNotes(currentUser)), admission) : [];
  const nursingNotes = hasPermission(currentUser, "nursing", "view") && loadFor("nursingNotes") ? filterByAdmission(safeOptionalData(() => api.nursingNotes(currentUser)), admission) : [];
  const vitals = hasPermission(currentUser, "ipdVitals", "view") && loadFor("vitals") ? filterByAdmission(safeOptionalData(() => api.ipdVitals(currentUser)), admission) : [];
  const mar = hasPermission(currentUser, "mar", "view") && loadFor("mar") ? filterByAdmission(safeOptionalData(() => api.medicationAdministrationRecords(currentUser)), admission) : [];
  const intakeOutput = hasPermission(currentUser, "intakeOutput", "view") && loadFor("intakeOutput") ? filterByAdmission(safeOptionalData(() => api.intakeOutputCharts(currentUser)), admission) : [];
  const handovers = hasPermission(currentUser, "handover", "view") && loadFor("handover") ? filterByAdmission(safeOptionalData(() => api.doctorHandovers(currentUser)), admission) : [];
  const dischargePlans = hasPermission(currentUser, "discharge", "view") && loadFor("discharge", "timeline", "documents") ? filterByAdmission(safeOptionalData(() => api.dischargePlans(currentUser)), admission) : [];
  const dischargeSummaries = hasPermission(currentUser, "discharge", "view") && loadFor("discharge", "timeline") ? filterByAdmission(safeOptionalData(() => api.dischargeSummaries(currentUser)), admission) : [];
  const deathSummaries = hasPermission(currentUser, "deathSummary", "view") && loadFor("deathSummary", "timeline", "documents") ? filterByAdmission(safeOptionalData(() => api.deathSummaries(currentUser)), admission) : [];
  const deathSummary = latestRecord(deathSummaries);
  const bills = hasPermission(currentUser, "billing", "view") && loadFor("billing", "timeline", "discharge", "documents") ? filterByAdmission(safeOptionalData(() => api.bills(currentUser)), admission) : [];
  const pharmacyIssues = hasPermission(currentUser, "pharmacy", "view") && loadFor("billing", "documents", "timeline", "discharge") ? filterByAdmission(safeOptionalData(() => api.pharmacyIssues(currentUser)), admission) : [];
  const labOrders = hasPermission(currentUser, "lab", "view") && loadFor("billing", "documents", "timeline", "discharge") ? filterByAdmission(safeOptionalData(() => api.labOrders(currentUser)), admission) : [];
  const documents = hasPermission(currentUser, "documents", "view") && loadFor("documents", "deathSummary", "timeline", "discharge") ? filterByAdmission(safeOptionalData(() => api.patientDocuments(currentUser)), admission) : [];
  const alerts = hasPermission(currentUser, "ipdAlerts", "view") && activeTab === "overview" ? filterByAdmission(safeOptionalData(() => api.ipdAlerts(currentUser)), admission) : [];
  const tasks = hasPermission(currentUser, "tasks", "view") && activeTab === "overview" ? filterByAdmission(safeOptionalData(() => api.tasks(currentUser)), admission) : [];
  const context = { sheets, doctorNotes: [...doctorNotes, ...doctorProgressNotes], nursingNotes, vitals, mar, intakeOutput, handovers, dischargePlans, labOrders, pharmacyIssues, bills, documents, deathSummaries };
  const latestVitals = latestRecord(vitals);
  const latestDoctorNote = latestRecord(context.doctorNotes);
  const latestNursingNote = latestRecord(nursingNotes);
  const latestMar = latestRecord(mar);

  const renderOverview = () => `
    <div class="ipd-360-grid" data-testid="ipd-360-overview">
      ${metricCard("Care Status", admission.currentCareStatus || ipdAdmissionStatus(admission), "Current")}
      ${metricCard("Pending Tasks", tasks.filter((task) => task.status !== "Completed").length, "Open")}
      ${metricCard("Active Alerts", alerts.filter((alert) => alert.status !== "Resolved").length, "Needs attention")}
      ${metricCard("Pending Clearances", dischargePlans.filter((plan) => plan.status !== "Ready for Discharge").length, "Discharge")}
      ${metricCard("Billing", bills.some((bill) => bill.status === "Paid") ? "Paid" : bills.length ? "Pending" : "No bill", "IPD clearance")}
      ${metricCard("Pharmacy", pharmacyIssues.some((issue) => issue.status !== "Issued") ? "Pending" : pharmacyIssues.length ? "Issued" : "No issue", "Medication")}
    </div>
    <div class="compact-grid">
      <section class="panel">
        <div class="panel-head"><h3>Patient and admission</h3></div>
        ${table(["Field", "Value"], [
          ["Patient", admission.patientName || patient.name || "-"],
          ["MRN", patient.mrn || admission.mrn || "MRN pending"],
          ["Admission", admission.admissionNumber || admission.id],
          ["Ward / Bed", `${admission.ward || "-"} / ${admission.bedNumber || admission.bedId || "-"}`],
          ["Consultant", admission.consultant || admission.admittingDoctor || admission.requestedBy || "-"],
          ["Duty Doctor", admission.dutyDoctor || latestDoctorNote?.doctorName || "-"],
          ["Diagnosis", admission.diagnosisAtAdmission || latestDoctorNote?.diagnosisUpdate || "-"],
          ["Allergy", patient.allergies || admission.allergies || "No known drug allergies"]
        ])}
      </section>
      <section class="panel">
        <div class="panel-head"><h3>Latest clinical snapshot</h3></div>
        ${table(["Area", "Latest"], [
          ["Vitals", latestVitals ? `${latestVitals.temperature || "-"}, BP ${latestVitals.bloodPressure || "-"}, SpO2 ${latestVitals.spo2 || "-"}` : "No vitals recorded"],
          ["Doctor note", latestDoctorNote?.treatmentPlan || latestDoctorNote?.patientCondition || "No doctor note"],
          ["Nursing note", latestNursingNote?.observation || latestNursingNote?.patientCondition || "No nursing note"],
          ["MAR", latestMar ? `${latestMar.medicineName || "Medicine"} - ${latestMar.status || "Scheduled"}` : "No MAR entry"]
        ])}
      </section>
    </div>
    ${ipdAdmissionChecklistPanel(admission, context)}
    ${ipdTimelinePanel(ipdTimelineEvents(admission, context).slice(0, 8))}
    ${documentAlertsPanel(missingDocumentAlerts({ documents, admission, patient, deathSummary, labOrders, bills }))}
    ${safeAiAssistantPanel("IPD Patient 360")}
  `;

  const renderTab = () => {
    if (activeTab === "overview") return renderOverview();
    if (activeTab === "timeline") return ipdTimelinePanel(ipdTimelineEvents(admission, context));
    if (activeTab === "dailySheet") return `
      ${hasPermission(currentUser, "dailySheets", "create") ? `<section class="panel"><div class="panel-head"><h3>Add daily sheet entry</h3></div><form class="form-grid" data-action="add-daily-sheet"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Patient<input name="patientName" value="${escapeHtml(admission.patientName || "")}" /></label><label>Ward<input name="ward" value="${escapeHtml(admission.ward || "")}" /></label><label>Bed<input name="bedNumber" value="${escapeHtml(admission.bedNumber || admission.bedId || "")}" /></label><label>Condition<input name="currentCondition" required placeholder="Stable" /></label><label>Vitals summary<input name="vitalsSummary" placeholder="Vitals within acceptable range" /></label><label>Pending actions<input name="pendingActions" placeholder="Continue monitoring" /></label><button class="button primary" type="submit" data-testid="save-ipd-360-daily-sheet">Save entry</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Daily sheet history</h3></div>${sheets.length ? table(["Date", "Doctor", "Nurse", "Condition", "Vitals", "Pending", "Status"], sheets.map((sheet) => [sheet.date, sheet.dutyDoctor, sheet.nurseInCharge, sheet.currentCondition, sheet.vitalsSummary, sheet.pendingActions, badge(sheet.status, statusClass(sheet.status))])) : emptyState("No daily sheet entries yet. Daily clinical updates will appear here.")}</section>
    `;
    if (activeTab === "doctorNotes") return `
      ${hasPermission(currentUser, "dutyDoctor", "create") ? `<section class="panel"><div class="panel-head"><h3>Add doctor note</h3></div><form class="form-grid" data-action="add-duty-note"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Patient condition<input name="patientCondition" required placeholder="Stable" /></label><label>Clinical findings<input name="clinicalFindings" value="" /></label><label>Diagnosis update<input name="diagnosisUpdate" value="${escapeHtml(admission.diagnosisAtAdmission || "")}" /></label><label>Treatment plan<input name="treatmentPlan" value="" /></label><label>Investigation ordered<input name="investigationOrdered" value="" /></label><label>Medication changes<input name="medicationChanges" value="" /></label><label>Escalation required<select name="escalationRequired"><option>No</option><option>Yes</option></select></label><label>Consultant notified<select name="consultantNotified"><option>Yes</option><option>No</option></select></label><button class="button primary" type="submit" data-testid="save-ipd-360-doctor-note">Save doctor note</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Doctor notes</h3></div>${context.doctorNotes.length ? table(["Date", "Doctor", "Subjective / Condition", "Assessment / Diagnosis", "Plan / Treatment", "Notes", "Status"], context.doctorNotes.map((note) => [formatDateTime(note.recordedAt || note.dateTime || note.createdAt), note.doctor || note.doctorName || "-", note.subjective || note.patientCondition || "-", note.assessment || note.diagnosisUpdate || "-", note.plan || note.treatmentPlan || "-", note.clinicalNotes || note.escalationRequired || "-", badge(note.status, statusClass(note.status))])) : emptyState("No doctor notes yet. Duty doctor and consultant updates will appear here.")}</section>
    `;
    if (activeTab === "nursingNotes") return `
      ${hasPermission(currentUser, "nursing", "create") ? `<section class="panel"><div class="panel-head"><h3>Add nursing note</h3></div><form class="form-grid" data-action="add-nursing-note"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Patient condition<input name="patientCondition" required placeholder="Comfortable" /></label><label>Vitals<input name="vitals" value="" /></label><label>Medication given<input name="medicationGiven" value="" /></label><label>Pain score<input name="painScore" type="number" value="0" /></label><label>Escalation<select name="escalationRequired"><option>No</option><option>Yes</option></select></label><label class="span-2">Observation<textarea name="observation"></textarea></label><button class="button primary" type="submit" data-testid="save-ipd-360-nursing-note">Save nursing note</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Nursing notes</h3></div>${nursingNotes.length ? table(["Date", "Nurse", "Condition", "Vitals", "Medication", "Pain", "Escalation", "Status"], nursingNotes.map((note) => [note.dateTime || note.createdAt || "-", note.nurseName, note.patientCondition, note.vitals, note.medicationGiven, note.painScore, note.escalationRequired, badge(note.status, statusClass(note.status))])) : emptyState("No nursing notes yet. Nursing observations and escalations will appear here.")}</section>
    `;
    if (activeTab === "vitals") return `
      ${hasPermission(currentUser, "ipdVitals", "create") ? `<section class="panel"><div class="panel-head"><h3>Add vitals</h3></div><form class="form-grid" data-action="record-ipd-vitals"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Temperature<input name="temperature" placeholder="98.6 F" /></label><label>Blood pressure<input name="bloodPressure" placeholder="120/80" /></label><label>Pulse<input name="pulse" type="number" /></label><label>Respiratory rate<input name="respiratoryRate" type="number" /></label><label>SpO2<input name="spo2" type="number" /></label><label>Blood sugar<input name="bloodSugar" /></label><button class="button primary" type="submit" data-testid="save-ipd-360-vitals">Save vitals</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Vitals trend</h3></div>${vitals.length ? table(["Time", "Temp", "BP", "Pulse", "RR", "SpO2", "Sugar", "By", "Status"], vitals.map((item) => [item.dateTime, item.temperature, item.bloodPressure, item.pulse, item.respiratoryRate, item.spo2, item.bloodSugar, item.recordedBy, badge(item.status, statusClass(item.status))])) : emptyState("No IPD vitals are recorded yet. Vitals will appear after nurses record them.")}</section>
    `;
    if (activeTab === "mar") return `<section class="panel"><div class="panel-head"><h3>Medication Administration Record</h3></div>${mar.length ? table(["Medication", "Dose", "Route", "Frequency", "Due", "Given", "Given By", "Status", "Action"], mar.map((item) => [item.medicineName, item.dose, item.route, item.frequency, item.scheduledTime, item.givenTime, item.givenBy, badge(item.status, statusClass(item.status)), hasPermission(currentUser, "mar", "edit") && item.status === "Scheduled" ? `<button class="button tiny" data-action="mark-med-given" data-mar="${item.id}" data-testid="save-mar-button">Mark given</button>` : "Read-only"])) : emptyState("No MAR entries yet. Medication orders will appear here once prescribed.")}</section>`;
    if (activeTab === "intakeOutput") return `
      ${hasPermission(currentUser, "intakeOutput", "create") ? `<section class="panel"><div class="panel-head"><h3>Add intake/output entry</h3></div><form class="form-grid" data-action="add-intake-output"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Oral intake<input name="oralFluids" type="number" value="0" /></label><label>IV fluids<input name="ivFluids" type="number" value="0" /></label><label>Urine output<input name="urine" type="number" value="0" /></label><label>Drain output<input name="drainOutput" type="number" value="0" /></label><button class="button primary" type="submit" data-testid="save-ipd-360-intake-output">Save entry</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Intake / output history</h3></div>${intakeOutput.length ? table(["Date", "Oral", "IV", "Urine", "Drain", "Total Intake", "Total Output", "Balance", "Status"], intakeOutput.map((item) => [item.date, item.oralFluids, item.ivFluids, item.urine, item.drainOutput, item.totalIntake, item.totalOutput, item.fluidBalance, badge(item.status, statusClass(item.status))])) : emptyState("No intake/output entries yet. Nursing staff can add intake/output records here.")}</section>
    `;
    if (activeTab === "handover") return `
      ${hasPermission(currentUser, "handover", "create") ? `<section class="panel"><div class="panel-head"><h3>Add handover note</h3></div><form class="form-grid" data-action="add-handover-note"><input type="hidden" name="admissionId" value="${escapeHtml(admissionId)}" /><label>Patient<input name="patientName" value="${escapeHtml(admission.patientName || "")}" /></label><label>Ward / Bed<input name="wardBed" value="${escapeHtml(`${admission.ward || "-"} / ${admission.bedNumber || admission.bedId || "-"}`)}" /></label><label>Diagnosis<input name="diagnosis" value="${escapeHtml(admission.diagnosisAtAdmission || "")}" /></label><label>Critical issues<input name="criticalIssues" /></label><label>Pending labs<input name="pendingLabs" /></label><label>Watch points<input name="watchPoints" /></label><button class="button primary" type="submit" data-testid="save-ipd-360-handover">Save handover</button></form></section>` : ""}
      <section class="panel"><div class="panel-head"><h3>Handover history</h3></div>${handovers.length ? table(["Patient", "Ward / Bed", "Critical Issues", "Pending Labs", "Watch Points", "Given By", "Taken By", "Status"], handovers.map((item) => [item.patientName, item.wardBed, item.criticalIssues, item.pendingLabs, item.watchPoints, item.handoverGivenBy, item.handoverTakenBy, badge(item.status, statusClass(item.status))])) : emptyState("No handover notes yet. Previous shift handover, risks, and next shift notes will appear here.")}</section>
    `;
    if (activeTab === "discharge") return `${dischargeChecklistPanel({ admission, dischargePlans, documents, bills, pharmacyIssues, labOrders, deathSummary })}<section class="panel"><div class="panel-head"><h3>Discharge readiness</h3></div>${dischargePlans.length ? table(["Planned", "Doctor", "Nursing", "Pharmacy", "Lab", "Billing", "Insurance", "Status", "Action"], dischargePlans.map((plan) => [plan.plannedDate, plan.doctorAdviceCompleted ? "Done" : "Pending", plan.nursingClearance ? "Done" : "Pending", plan.pharmacyClearance ? "Done" : "Pending", plan.labRadiologyClearance ? "Done" : "Pending", plan.billingClearance ? "Done" : "Pending", plan.insuranceClearance ? "Done" : "Pending", badge(plan.status, statusClass(plan.status)), hasPermission(currentUser, "discharge", "edit") && plan.status !== "Ready for Discharge" ? `<button class="button tiny" data-action="complete-discharge" data-plan="${plan.id}" data-testid="final-discharge-button">Mark final discharge</button>` : "Read-only"])) : emptyState("No discharge clearance has started yet. Start discharge clearance when the patient is clinically ready.")}${dischargeSummaries.length ? table(["Patient", "Admission", "Discharge", "Diagnosis", "Treatment", "Follow-up", "Status"], dischargeSummaries.map((summary) => [summary.patientDetails, summary.admissionDate, summary.dischargeDate, summary.diagnosis, summary.treatmentGiven, summary.followUpAdvice, badge(summary.status, statusClass(summary.status))])) : emptyState("No final discharge summary is generated yet.")}</section>${safeAiAssistantPanel("discharge summary drafting")}`;
    if (activeTab === "deathSummary") return deathSummarySection(admission, patient, deathSummary);
    if (activeTab === "billing") return `<section class="panel"><div class="panel-head"><h3>Billing clearance</h3></div>${table(["Area", "Status"], [["IPD billing", bills.length ? bills.map((bill) => bill.status).join(", ") : "No bill generated"], ["Pending bill", bills.filter((bill) => bill.status !== "Paid").length], ["Paid amount", money(bills.reduce((sum, bill) => sum + billPaidAmount(bill), 0))], ["Pharmacy pending", pharmacyIssues.filter((issue) => issue.status !== "Issued").length], ["Lab pending", labOrders.filter((order) => !["Report Ready", "Doctor Reviewed"].includes(order.status)).length]])}${hasPermission(currentUser, "billing", "create") ? `<div class="button-row"><button class="button primary" data-action="patient-generate-bill" data-patient="${escapeHtml(admissionPatientId(admission))}">Generate Bill</button></div>` : ""}</section>`;
    if (activeTab === "documents") return `
      ${documentAlertsPanel(missingDocumentAlerts({ documents, admission, patient, deathSummary, labOrders, bills }))}
      <section class="panel">
        <div class="panel-head"><h3>Documents</h3><p>Consent forms, admission documents, reports, insurance files, discharge summary, and death summary documents.</p></div>
        ${table(["Document", "Status"], [["Death Summary", deathSummary?.status || (isDeathOutcome(admission) ? "Not Created" : "Not Applicable")], ["Death Certificate Status", deathSummary?.deathCertificateIssued || "Not issued"], ["Body Handover Form", deathSummary?.bodyHandoverStatus || "Not marked"], ["MLC Documents", deathSummary?.mlcCase === "Yes" ? "Required" : "Not required"]])}
      </section>
      ${documentUploadPanel({ patientId: admissionPatientId(admission), admissionId, relatedModule: "documents", types: ["admission-document", "consent", "lab-report", "radiology-report", "insurance", "discharge-summary", "death-summary", "death-certificate", "body-handover", "mlc-document"], title: "Upload Admission Document" })}
      <section class="panel">
        <div class="panel-head"><h3>Uploaded Documents</h3></div>
        ${documentTable(documents)}
      </section>
    `;
    return pageErrorPanel("IPD Patient 360", "This tab is not available for your current permission set.");
  };

  return `
    ${ipdHeader(admission, patient)}
    ${ipdJourneyTracker(admission, context)}
    <div class="ipd-360-layout">
      <div class="ipd-360-main">
        ${ipd360Tabs(activeTab, admissionId)}
        ${renderTab()}
      </div>
      ${ipdNextActions(admissionId, admission)}
    </div>
  `;
}

function isDoctorRole() { return ["doctor", "surgeon"].includes(String(currentUser.jobRole || "").toLowerCase()); }

function doctorIpdPage() {
  const { query } = parseHashRoute();
  const admissions = activeDoctorIpdAdmissions(safeData(() => api.admissions(currentUser)), currentUser);
  const patients = safeData(() => api.patients(currentUser));
  const allVitals = safeOptionalData(() => api.ipdVitals(currentUser), []);
  const progressNotes = safeOptionalData(() => api.doctorProgressNotes(currentUser), []);
  const nursingNotes = safeOptionalData(() => api.nursingNotes(currentUser), []);
  const mar = safeOptionalData(() => api.medicationAdministrationRecords(currentUser), []);
  const intakeOutput = safeOptionalData(() => api.intakeOutputCharts(currentUser), []);
  const handovers = safeOptionalData(() => api.doctorHandovers(currentUser), []);
  const alerts = safeOptionalData(() => api.ipdAlerts(currentUser), []);
  const selected = admissions.find((item) => String(item.id || item._id) === String(query.admissionId || ""));
  const latestFor = (rows, admissionId) => rows.filter((item) => String(item.admissionId) === String(admissionId)).sort((a, b) => new Date(b.recordedAt || b.createdAt || 0) - new Date(a.recordedAt || a.createdAt || 0))[0];
  if (!selected) {
    const lastVital = (admission) => admissionVitals(allVitals, admission)[0];
    return `<section class="panel doctor-ipd-heading"><div class="panel-head"><div><p class="eyebrow">Doctor</p><h3>My IPD Patients</h3><p>Active admitted patients assigned to your inpatient care.</p></div>${badge(currentUser.branchName || "Main Branch", "status-active")}</div></section>
      <div class="metric-grid small">${metricCard("My IPD Patients", admissions.length, "Active admissions")}${metricCard("Vitals Due", admissions.filter((item) => !lastVital(item) || !isToday(lastVital(item).recordedAt || lastVital(item).dateTime)).length, "Today")}${metricCard("Orders Pending", 0, "Phase 2")}${metricCard("Discharge Pending", admissions.filter((item) => (item.admissionStatus || item.status) === "Discharge Pending").length, "Active")}${metricCard("Critical Alerts", alerts.filter((item) => admissions.some((admission) => String(admission.id) === String(item.admissionId)) && ["Critical", "High"].includes(item.risk || item.severity)).length, "Needs review")}</div>
      <section class="panel"><div class="panel-head"><h3>Active Inpatient Census</h3><p>Admission-based list; OPD queue patients and admission requests are excluded.</p></div><input class="panel-search" data-table-search placeholder="Search patient, MRN, admission, ward or bed" />${admissions.length ? table(["Patient", "MRN", "Admission ID", "Department", "Ward", "Bed", "Admit Date", "Last Vitals", "Status", "Action"], admissions.map((item) => { const patient = resolveAdmissionPatient(patients, item); const latest = lastVital(item); return [patient?.name || patient?.fullName || item.patientName || "Patient record unavailable", patient?.mrn || item.mrn || "-", item.id, item.department || "-", item.ward || item.wardId, item.bedNumber || item.bedId || item.bed, formatDateTime(item.admittedAt || item.admissionDateTime || item.createdAt), latest ? formatDateTime(latest.recordedAt || latest.dateTime || latest.createdAt) : "Not recorded", badge(item.admissionStatus || item.status, statusClass(item.admissionStatus || item.status)), `<button class="button tiny primary" data-route="ipd" data-admission-id="${escapeHtml(item.id)}">Open Patient</button>`]; })) : emptyState("No active admitted patients are assigned to this doctor.")}</section>`;
  }
  const patient = resolveAdmissionPatient(patients, selected) || {};
  const vitals = admissionVitals(allVitals, selected);
  const latest = vitals[0];
  const notes = progressNotes.filter((item) => String(item.admissionId) === String(selected.id)).sort((a, b) => new Date(b.recordedAt || b.createdAt || 0) - new Date(a.recordedAt || a.createdAt || 0));
  const labels = [...vitals].reverse().slice(-12).map((item) => formatDateTime(item.recordedAt || item.dateTime || item.createdAt));
  const nursing = latestFor(nursingNotes, selected.id), latestMar = latestFor(mar, selected.id), io = latestFor(intakeOutput, selected.id), handover = latestFor(handovers, selected.id);
  const vitalValue = (value) => escapeHtml(value || "—");
  return `<header class="ipd-doctor-context"><div><p class="eyebrow">Inpatient Review</p><h2>${escapeHtml(patient.name || patient.fullName || selected.patientName || "Patient")}</h2><p>${escapeHtml(patient.mrn || selected.mrn || "-")} · ${escapeHtml([patient.age, patient.gender].filter(Boolean).join(" / ") || "-")} · Allergies: ${escapeHtml(patient.allergies || selected.allergies || "None")}</p></div><div><strong>${escapeHtml(selected.id)}</strong><span>${escapeHtml(selected.department || "-")}</span><span>${escapeHtml(selected.ward || selected.wardId)} • ${escapeHtml(selected.bedNumber || selected.bedId || selected.bed)}</span>${badge(selected.admissionStatus || selected.status, "status-active")}</div></header>
    <div class="button-row"><button class="button soft" data-route="ipd">← My IPD Patients</button><button class="button soft" data-route="ipdPatient360" data-admission-id="${escapeHtml(selected.id)}">Patient 360</button></div>
    <section class="panel"><div class="panel-head"><h3>Admission Review</h3><p>Admitted ${escapeHtml(formatDateTime(selected.admittedAt || selected.admissionDateTime || selected.createdAt))} · Consultant ${escapeHtml(selected.consultant || selected.admittingDoctor || currentUser.name || "-")}</p></div><div class="mini-grid"><span><strong>${escapeHtml(selected.id)}</strong><small>Admission</small></span><span><strong>${escapeHtml(selected.department || "-")}</strong><small>Department</small></span><span><strong>${escapeHtml(selected.ward || selected.wardId)}</strong><small>Ward</small></span><span><strong>${escapeHtml(selected.bedNumber || selected.bedId || selected.bed)}</strong><small>Bed</small></span><span><strong>${escapeHtml(selected.admissionStatus || selected.status)}</strong><small>Status</small></span></div></section>
    <section class="panel"><div class="panel-head"><h3>Latest Nurse IPD Vitals</h3><p>Read-only values for this admission.</p></div>${latest ? `<div class="mini-grid"><span><strong>${vitalValue(latest.temperature)}</strong><small>Temperature</small></span><span><strong>${vitalValue(latest.bloodPressure)}</strong><small>Blood Pressure</small></span><span><strong>${vitalValue(latest.pulse)}</strong><small>Pulse</small></span><span><strong>${vitalValue(latest.respiratoryRate)}</strong><small>Respiratory Rate</small></span><span><strong>${vitalValue(latest.spo2)}</strong><small>SpO2</small></span><span><strong>${vitalValue(latest.bloodSugar)}</strong><small>Blood Sugar</small></span><span><strong>${vitalValue(latest.painScore)}</strong><small>Pain Score</small></span></div><p class="muted">Recorded by ${escapeHtml(latest.recordedBy || "-")} · ${escapeHtml(formatDateTime(latest.recordedAt || latest.dateTime || latest.createdAt))}</p>` : emptyState("No IPD vitals recorded for this admission.")}</section>
    ${vitals.length ? `<section class="panel"><div class="panel-head"><h3>IPD Vitals Trend</h3><p>Actual readings for this admission only.</p></div><div class="metric-grid small">${trendChart([...vitals].reverse().map((item) => Number.parseFloat(item.pulse) || 0).slice(-12), labels)}${trendChart([...vitals].reverse().map((item) => Number.parseFloat(item.spo2) || 0).slice(-12), labels)}${trendChart([...vitals].reverse().map((item) => Number.parseFloat(item.temperature) || 0).slice(-12), labels)}${trendChart([...vitals].reverse().map((item) => Number.parseFloat(String(item.bloodPressure || "").split("/")[0]) || 0).slice(-12), labels)}</div></section>` : ""}
    <section class="panel"><div class="panel-head"><h3>IPD Vitals History</h3></div>${vitals.length ? table(["Time", "BP", "Pulse", "SpO2", "Temp", "Blood Sugar", "Pain", "Recorded By"], vitals.map((item) => [formatDateTime(item.recordedAt || item.dateTime || item.createdAt), item.bloodPressure || "—", item.pulse || "—", item.spo2 || "—", item.temperature || "—", item.bloodSugar || "—", item.painScore || "—", item.recordedBy || "-"])) : emptyState("No IPD vitals recorded for this admission.")}</section>
    <section class="panel"><div class="panel-head"><h3>Nursing Information</h3><p>Read-only nursing-authored information.</p></div>${[nursing, latestMar, io, handover].some(Boolean) ? table(["Area", "Latest"], [["Nursing Note", nursing?.observation || nursing?.patientCondition || "No nursing entries available"], ["MAR", latestMar ? `${latestMar.medicineName || "Medicine"} · ${latestMar.status || "Scheduled"}` : "No nursing entries available"], ["Intake / Output", io ? `${io.intake || io.totalIntake || "-"} / ${io.output || io.totalOutput || "-"}` : "No nursing entries available"], ["Handover", handover?.summary || handover?.notes || handover?.currentCondition || "No nursing entries available"]]) : emptyState("No nursing entries available.")}</section>
    <section class="panel"><div class="panel-head"><h3>Doctor Daily Progress</h3><p>Add an admission-linked SOAP progress note. Saving does not change admission status.</p></div><form class="form-grid doctor-progress-form" data-action="save-doctor-progress"><input type="hidden" name="admissionId" value="${escapeHtml(selected.id)}"/><label>Date / Time<input type="datetime-local" name="recordedAt" value="${escapeHtml(localDateInputValue(new Date()))}" /></label><label>Subjective<textarea name="subjective" required></textarea></label><label>Objective<textarea name="objective" required></textarea></label><label>Assessment<textarea name="assessment" required></textarea></label><label>Plan<textarea name="plan" required></textarea></label><label class="span-2">Clinical Notes<textarea name="clinicalNotes"></textarea></label><button class="button primary" type="submit">Save Draft</button></form></section>
    <section class="panel"><div class="panel-head"><h3>Daily Progress History</h3><span class="badge status-active">${notes.length}</span></div>${notes.length ? table(["Date / Time", "Doctor", "Subjective", "Assessment", "Plan", "Status"], notes.map((item) => [formatDateTime(item.recordedAt || item.createdAt), item.doctor, item.subjective, item.assessment, item.plan, badge(item.status, statusClass(item.status))])) : emptyState("No Doctor progress notes exist for this admission yet.")}</section>`;
}

export function ipdPage() {
  if (isDoctorRole()) return doctorIpdPage();
  const admissions = safeData(() => api.admissions(currentUser));
  const sheets = hasPermission(currentUser, "dailySheets", "view") ? safeOptionalData(() => api.dailyPatientSheets(currentUser)) : [];
  const alerts = hasPermission(currentUser, "ipdAlerts", "view") ? safeOptionalData(() => api.ipdAlerts(currentUser)) : [];
  const dischargePlans = hasPermission(currentUser, "discharge", "view") ? safeOptionalData(() => api.dischargePlans(currentUser)) : [];
  const deathSummaries = hasPermission(currentUser, "deathSummary", "view") ? safeOptionalData(() => api.deathSummaries(currentUser)) : [];
  const active = admissions.filter((item) => !["Discharged", "Cancelled"].includes(item.admissionStatus || item.status));
  return `
    ${journeyTracker(["Admission", "Bed Assigned", "Daily Sheet", "Doctor Note", "Nursing Note", "Medication", "Clearance", "Discharge"], 3, "Admitted patient flow")}
    <div class="metric-grid">
      ${metricCard("Admitted Patients", active.length, "Current IPD census")}
      ${metricCard("Critical Alerts", alerts.filter((alert) => ["Critical", "High"].includes(alert.risk)).length, "Needs review")}
      ${metricCard("Daily Sheets", sheets.length, "Today")}
      ${metricCard("Doctor Notes Pending", sheets.filter((sheet) => !["Doctor Updated", "Completed", "Verified"].includes(sheet.status)).length, "Rounds")}
      ${metricCard("Nursing Pending", sheets.filter((sheet) => !["Nurse Updated", "Completed", "Verified"].includes(sheet.status)).length, "Care updates")}
      ${metricCard("Discharge Planned", dischargePlans.length, "Planned cases")}
    </div>
    <section class="panel">
      <div class="panel-head"><h3>IPD patient list</h3><p>Admitted patients by ward, bed, condition, and discharge status.</p></div>
      ${active.length ? table(["Patient", "Admission", "Ward", "Room", "Bed", "Doctor", "Diagnosis", "Status", "Action"], active.map((item) => [
        item.patientName,
        item.id,
        item.ward || "-",
        item.room || "-",
        item.bedNumber || item.bedId || "-",
        item.admittingDoctor || item.requestedBy,
        item.diagnosisAtAdmission || item.department,
        badge(item.admissionStatus || item.status, statusClass(item.admissionStatus || item.status)),
        `<div class="grid-actions">${ipd360Button(item.id)}${deathSummaryButton(item, deathSummaries)}</div>` || "Open"
      ])) : emptyState("No admitted patients assigned to your branch. Admitted patients will appear here after bed assignment.")}
    </section>
  `;
}

export function wardsPage() {
  const wards = safeData(() => api.wards(currentUser));
  const beds = safeOptionalData(() => api.beds(currentUser));
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)) : [];
  const totalBeds = wards.reduce((sum, ward) => sum + Number(ward.totalBeds || ward.bedsCount || ward.bedCount || 0), 0) || beds.length;
  const occupied = beds.filter((bed) => bed.status === "Occupied").length ||
    admissions.filter((item) => !["Discharged", "Cancelled", "Admission Requested"].includes(ipdAdmissionStatus(item)) && (item.bedId || item.bedNumber || item.bed)).length;
  const reserved = beds.filter((bed) => bed.status === "Reserved").length;
  const cleaning = beds.filter((bed) => bed.status === "Cleaning").length;
  const maintenance = beds.filter((bed) => bed.status === "Maintenance").length;
  const available = Math.max(totalBeds - occupied - reserved - cleaning - maintenance, 0);
  const occupancy = totalBeds ? Math.round((occupied / totalBeds) * 100) : 0;
  const bedStatuses = ["Available", "Occupied", "Reserved", "Cleaning", "Maintenance"];
  const statusAction = (bed) => {
    if (!hasPermission(currentUser, "wards", "edit") && !hasPermission(currentUser, "beds", "edit")) return "";
    const next = bed.status === "Cleaning" || bed.status === "Maintenance" ? "Available" : bed.status === "Available" ? "Reserved" : "Cleaning";
    return `<button class="button tiny soft" type="button" data-action="update-bed-status" data-bed="${escapeHtml(bed.id)}" data-status="${escapeHtml(next)}">${escapeHtml(next)}</button>`;
  };
  return `
    <div class="metric-grid">
      ${metricCard("Total Beds", totalBeds, "Visible branch")}
      ${metricCard("Available", available, "Ready")}
      ${metricCard("Occupied", occupied, "In use")}
      ${metricCard("Reserved", reserved, "Held")}
      ${metricCard("Cleaning", cleaning, "Turnaround")}
      ${metricCard("Occupancy", `${occupancy}%`, "Current")}
    </div>
    <section class="panel">
      <div class="panel-head">
        <div><h3>Ward dashboard</h3><p>Patients waiting for admission: ${admissions.filter((item) => (item.admissionStatus || item.status) === "Admission Requested").length}</p></div>
        ${gridAddButton("Ward", "create-ward")}
      </div>
      ${wards.length ? table(["Ward", "Floor", "Department", "Total Beds", "Status"], wards.map((ward) => [
        ward.name,
        ward.floor,
        ward.department,
        beds.filter((bed) => String(bed.ward || bed.departmentWard || "") === String(ward.name || "")).length || Number(ward.totalBeds || ward.bedsCount || ward.bedCount || 0),
        badge(ward.status, statusClass(ward.status))
      ])) : emptyState("No wards are configured for your branch yet. Create wards and beds first so admissions and occupancy can be tracked safely.")}
    </section>
    <section class="panel">
      <div class="panel-head"><h3>Bed Board Automation</h3><p>Bed status mirrors admission flow where backend data supports it. Manual updates remain audited through existing record updates.</p></div>
      <div class="bed-board">
        ${bedStatuses.map((status) => `
          <div class="bed-lane">
            <div class="bed-lane-head">${badge(status, statusClass(status))}<strong>${beds.filter((bed) => bed.status === status).length}</strong></div>
            ${beds.filter((bed) => bed.status === status).slice(0, 8).map((bed) => `
              <article class="bed-card">
                <strong>${escapeHtml(bed.bed || bed.bedNumber || bed.id)}</strong>
                <small>${escapeHtml(bed.room || "Room pending")}${bed.patientId ? ` / Patient ${escapeHtml(bed.patientId)}` : ""}</small>
                ${statusAction(bed)}
              </article>
            `).join("") || `<small class="muted">No beds</small>`}
          </div>
        `).join("")}
      </div>
    </section>
    <section class="panel">
      <div class="panel-head">
        <h3>Beds</h3>
        ${gridAddButton("Bed", "create-bed")}
      </div>
      ${beds.length ? table(["Bed", "Room", "Patient", "Status", "Action"], beds.map((bed) => [
        bed.bed || bed.bedNumber || bed.name || "-",
        bed.room,
        bed.patientId,
        badge(bed.status, statusClass(bed.status)),
        statusAction(bed) || "View"
      ])) : emptyState("No beds are configured for your branch yet. Add bed records during branch setup to enable safe bed assignment.")}
    </section>
  `;
}

export function dailySheetsPage() {
  if (isDoctorRole()) {
    const admissions = activeDoctorIpdAdmissions(safeOptionalData(() => api.admissions(currentUser), []), currentUser);
    const patients = safeOptionalData(() => api.patients(currentUser), []);
    const admissionIds = new Set(admissions.map((item) => String(item.id || item._id)));
    const notes = safeOptionalData(() => api.doctorProgressNotes(currentUser), [])
      .filter((item) => admissionIds.has(String(item.admissionId)))
      .sort((a, b) => new Date(b.recordedAt || b.createdAt || 0) - new Date(a.recordedAt || a.createdAt || 0));
    return `<section class="panel doctor-ipd-heading"><div class="panel-head"><div><p class="eyebrow">Doctor</p><h3>Daily Progress</h3><p>Admission-linked SOAP notes across your active IPD patients.</p></div>${badge(`${admissions.length} active patients`, "status-active")}</div></section>
      <section class="panel"><div class="panel-head"><h3>Progress Note History</h3><p>Open a patient to review the admission or add a new draft.</p></div><input class="panel-search" data-table-search placeholder="Search patient, MRN, admission, ward or note" />${notes.length ? table(["Patient", "MRN", "Admission", "Ward / Bed", "Date", "Doctor", "Subjective", "Assessment", "Plan", "Status", "Action"], notes.map((note) => { const admission = admissions.find((item) => String(item.id || item._id) === String(note.admissionId)) || {}; const patient = resolveAdmissionPatient(patients, admission) || {}; return [patient.name || patient.fullName || admission.patientName || "Patient", patient.mrn || admission.mrn || "-", note.admissionId, `${admission.ward || admission.wardId || "-"} / ${admission.bedNumber || admission.bedId || admission.bed || "-"}`, formatDateTime(note.recordedAt || note.createdAt), note.doctor || "-", note.subjective || "-", note.assessment || "-", note.plan || "-", badge(note.status || "Draft", statusClass(note.status || "Draft")), `<button class="button tiny primary" data-route="ipd" data-admission-id="${escapeHtml(note.admissionId)}">Open Patient</button>`]; })) : emptyState("No Doctor daily progress notes exist for your active IPD patients yet.")}</section>`;
  }
  const sheets = safeData(() => api.dailyPatientSheets(currentUser));
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)) : [];
  const patients = hasPermission(currentUser, "patients", "view") ? safeOptionalData(() => api.patients(currentUser)) : [];
  const beds = hasPermission(currentUser, "wards", "view") || hasPermission(currentUser, "beds", "view") ? safeOptionalData(() => api.beds(currentUser)) : [];
  return `
    <section class="panel">
      <div class="panel-head"><h3>Daily patient sheets</h3><p>Automatically created daily record for every admitted patient.</p></div>
      ${sheets.length ? table(["Patient", "MRN", "Ward / Bed", "Date", "Doctor", "Nurse", "Condition", "Vitals", "Pending", "Status", "Action"], sheets.map((sheet) => {
        const admission = admissions.find((item) => String(admissionDisplayId(item)) === String(sheet.admissionId)) || {};
        const patient = patients.find((item) => String(item.id) === String(sheet.patientId || admissionPatientId(admission))) || {};
        const patientNameValue = sheet.patientName || admission.patientName || patient.name || patient.fullName || "Admitted patient";
        const mrnValue = safeMrn(sheet.mrn || patient.mrn || admission.mrn, "MRN not available");
        const ward = firstDefined(sheet.ward, admissionWardLabel(admission, beds), "Bed not assigned");
        const bed = firstDefined(sheet.bedNumber, admissionBedLabel(admission, beds), "Bed not assigned");
        return {
          cells: [
            rowRouteButton(patientNameValue, "ipdPatient360", { admissionId: sheet.admissionId }),
            mrnValue,
            `${ward} / ${bed}`,
            formatDateTime(sheet.date || sheet.createdAt),
            sheet.dutyDoctor || admission.dutyDoctor || admission.consultant || admission.admittingDoctor || "-",
            sheet.nurseInCharge || sheet.updatedBy || "-",
            sheet.currentCondition || "Pending update",
            sheet.vitalsSummary || "No vitals recorded yet",
            sheet.pendingActions || "No pending actions",
            badge(sheet.status, statusClass(sheet.status)),
            ipd360Button(sheet.admissionId)
          ],
          attrs: {
            "data-route": "ipdPatient360",
            "data-admission-id": sheet.admissionId || "",
            role: "button",
            tabindex: "0"
          }
        };
      })) : emptyState("No daily sheets are assigned to your branch. Admitted patients will create daily sheets automatically.")}
    </section>
  `;
}

export function dutyDoctorPage() {
  const admissions = safeData(() => api.admissions(currentUser)).filter((item) => !["Discharged", "Cancelled"].includes(item.admissionStatus || item.status));
  const notes = safeData(() => api.dutyDoctorNotes(currentUser));
  const alerts = hasPermission(currentUser, "ipdAlerts", "view") ? safeOptionalData(() => api.ipdAlerts(currentUser)) : [];
  const sheets = hasPermission(currentUser, "dailySheets", "view") ? safeOptionalData(() => api.dailyPatientSheets(currentUser)) : [];
  const labOrders = hasPermission(currentUser, "lab", "view") ? safeOptionalData(() => api.labOrders(currentUser)) : [];
  const dischargePlans = hasPermission(currentUser, "discharge", "view") ? safeOptionalData(() => api.dischargePlans(currentUser)) : [];
  return `
    <div class="metric-grid">
      ${metricCard("Assigned Wards", new Set(admissions.map((item) => item.ward)).size, "Visible")}
      ${metricCard("Admitted Patients", admissions.length, "Under care")}
      ${metricCard("Critical Patients", alerts.filter((alert) => alert.risk === "Critical").length, "Escalated")}
      ${metricCard("Pending Notes", sheets.filter((sheet) => !["Doctor Updated", "Completed"].includes(sheet.status)).length, "Today")}
      ${metricCard("Reports Pending", labOrders.filter((order) => !["Report Ready", "Doctor Reviewed"].includes(order.status)).length, "Lab/radiology")}
      ${metricCard("Discharge Planned", dischargePlans.length, "Review")}
    </div>
    ${hasPermission(currentUser, "dutyDoctor", "create") ? `
      <section class="panel">
        <div class="panel-head"><h3>Add duty doctor note</h3></div>
        <form class="form-grid" data-action="add-duty-note">
          <label>Admission<select name="admissionId">${admissions.map((item) => `<option value="${item.id}">${escapeHtml(item.patientName)} - ${escapeHtml(item.ward || "-")}</option>`).join("")}</select></label>
          <label>Patient condition<input name="patientCondition" value="Stable" /></label>
          <label>Clinical findings<input name="clinicalFindings" value="No active chest pain." /></label>
          <label>Diagnosis update<input name="diagnosisUpdate" value="Rule out ACS" /></label>
          <label>Treatment plan<input name="treatmentPlan" value="Continue monitoring and review Troponin." /></label>
          <label>Investigation ordered<input name="investigationOrdered" value="Repeat ECG if pain returns" /></label>
          <label>Medication changes<input name="medicationChanges" value="Continue Aspirin" /></label>
          <label>Escalation required<select name="escalationRequired"><option>No</option><option>Yes</option></select></label>
          <label>Consultant notified<select name="consultantNotified"><option>No</option><option>Yes</option></select></label>
          <label>Discharge plan<input name="dischargePlan" value="Not today" /></label>
          <button class="button primary" type="submit" data-testid="save-duty-doctor-note-button">Save doctor note</button>
        </form>
      </section>
    ` : ""}
    <section class="panel">
      <div class="panel-head"><h3>Duty doctor notes</h3></div>
      ${notes.length ? table(["Patient", "Doctor", "Condition", "Treatment Plan", "Escalation", "Status", "Action"], notes.map((note) => [
        admissions.find((item) => item.id === note.admissionId)?.patientName || note.patientId,
        note.doctorName,
        note.patientCondition,
        note.treatmentPlan,
        note.escalationRequired,
        badge(note.status, statusClass(note.status)),
        ipd360Button(note.admissionId)
      ])) : emptyState("No duty doctor notes are assigned. Notes will appear after admitted patient rounds.")}
    </section>
  `;
}

export function nursingPage() {
  const admissions = safeData(() => api.admissions(currentUser)).filter((item) => !["Discharged", "Cancelled"].includes(item.admissionStatus || item.status));
  const notes = safeData(() => api.nursingNotes(currentUser));
  return `
    ${hasPermission(currentUser, "nursing", "create") ? `
      <section class="panel">
        <div class="panel-head"><h3>Add nursing note</h3></div>
        <form class="form-grid" data-action="add-nursing-note">
          <label>Admission<select name="admissionId">${admissions.map((item) => `<option value="${item.id}">${escapeHtml(item.patientName)} - ${escapeHtml(item.bedNumber || "-")}</option>`).join("")}</select></label>
          <label>Patient condition<input name="patientCondition" value="Comfortable" /></label>
          <label>Vitals<input name="vitals" value="BP 138/88, Pulse 88, SpO2 98%" /></label>
          <label>Medication given<input name="medicationGiven" value="Pantoprazole given" /></label>
          <label>Pain score<input name="painScore" type="number" value="2" /></label>
          <label>Intake<input name="intake" value="300 ml oral" /></label>
          <label>Output<input name="output" value="200 ml urine" /></label>
          <label>Mobility<input name="mobilityStatus" value="Assisted walking" /></label>
          <label>Food intake<input name="foodIntake" value="Light meal" /></label>
          <label>Escalation<select name="escalationRequired"><option>No</option><option>Yes</option></select></label>
          <label class="span-2">Observation<textarea name="observation">No dizziness reported.</textarea></label>
          <label>Remarks<input name="remarks" value="Continue observation" /></label>
          <button class="button primary" type="submit" data-testid="save-nursing-note-button">Save nursing note</button>
        </form>
      </section>
    ` : ""}
    <section class="panel">
      <div class="panel-head"><h3>IPD nursing notes</h3></div>
      ${notes.length ? table(["Patient", "Nurse", "Condition", "Vitals", "Medication", "Pain", "Escalation", "Status", "Action"], notes.map((note) => [
        admissions.find((item) => item.id === note.admissionId)?.patientName || note.patientId,
        note.nurseName,
        note.patientCondition,
        note.vitals,
        note.medicationGiven,
        note.painScore,
        note.escalationRequired,
        badge(note.status, statusClass(note.status)),
        ipd360Button(note.admissionId)
      ])) : emptyState("No nursing notes are assigned. Nursing updates will appear after bed assignment.")}
    </section>
  `;
}

export function ipdVitalsPage() {
  const { query } = parseHashRoute();
  const selectedAdmissionId = query.admissionId || "";
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)).filter((item) =>
    ["Admitted", "Under Treatment"].includes(item.admissionStatus || item.status) &&
    Boolean(item.ward || item.wardId) &&
    Boolean(item.bedId || item.bedNumber)
  ) : [];
  const vitals = safeData(() => api.ipdVitals(currentUser));
  const selectedAdmission = admissions.find((item) => String(item.id) === String(selectedAdmissionId)) || null;
  const selectedVitals = selectedAdmission ? vitals.filter((item) => String(item.admissionId) === String(selectedAdmission.id)) : [];
  const recordedToday = vitals.filter((item) => isToday(item.recordedAt || item.dateTime || item.createdAt)).length;
  const lastVitalFor = (admission) => vitals.filter((item) => String(item.admissionId) === String(admission.id)).sort((a, b) => new Date(b.recordedAt || b.dateTime || b.createdAt || 0) - new Date(a.recordedAt || a.dateTime || a.createdAt || 0))[0];
  const labels = selectedVitals.map((item) => recordTime(item.recordedAt || item.dateTime || item.createdAt)).slice(-12);
  return `
    <div class="metric-grid small">
      ${metricCard("Admitted Patients", admissions.length, "Ward and bed assigned")}
      ${metricCard("Vitals Due", admissions.filter((item) => !lastVitalFor(item) || !isToday(lastVitalFor(item).recordedAt || lastVitalFor(item).dateTime)).length, "Active admissions")}
      ${metricCard("Recorded Today", recordedToday, "IPD readings")}
      ${metricCard("Abnormal Vitals", vitals.filter((item) => item.status === "Abnormal").length, "Needs review")}
    </div>
    <section class="panel">
      <div class="panel-head"><h3>IPD Vitals</h3><p>Active admitted patients with assigned ward and bed.</p></div>
      ${admissions.length ? table(["Patient", "MRN", "Admission", "Ward", "Bed", "Doctor", "Last Vitals", "Status", "Action"], admissions.map((item) => {
        const latest = lastVitalFor(item);
        return [item.patientName, item.mrn || "-", item.id, item.ward || item.wardId, item.bedNumber || item.bedId, item.doctor || item.doctorAssigned || "-", latest ? formatDateTime(latest.recordedAt || latest.dateTime || latest.createdAt) : "Not recorded", badge(item.admissionStatus || item.status, statusClass(item.admissionStatus || item.status)), `<button class="button tiny primary" type="button" data-route="ipdVitals" data-admission-id="${escapeHtml(item.id)}">Record Vitals</button>`];
      })) : emptyState("No active admitted patients with a ward and bed are available for IPD vitals.")}
    </section>
    ${hasPermission(currentUser, "ipdVitals", "create") ? `
      <section class="panel">
        <div class="panel-head"><h3>Record IPD vitals</h3><p>Abnormal vitals automatically create IPD alerts.</p></div>
        ${selectedAdmission ? `<div class="notice subtle"><strong>${escapeHtml(selectedAdmission.patientName || "Patient")}</strong> · ${escapeHtml(selectedAdmission.mrn || "MRN pending")} · ${escapeHtml(selectedAdmission.id)} · ${escapeHtml(selectedAdmission.ward || selectedAdmission.wardId)} / ${escapeHtml(selectedAdmission.bedNumber || selectedAdmission.bedId)} · ${escapeHtml(selectedAdmission.doctor || selectedAdmission.doctorAssigned || "Doctor not assigned")}</div>
        <form class="form-grid" data-action="record-ipd-vitals">
          <input type="hidden" name="admissionId" value="${escapeHtml(selectedAdmission.id)}" />
          <input type="hidden" name="patientId" value="${escapeHtml(selectedAdmission.patientId || "")}" />
          <label>Temperature<input name="temperature" placeholder="98.6 F" /></label>
          <label>Blood pressure<input name="bloodPressure" required placeholder="120/80" /></label>
          <label>Pulse<input name="pulse" type="number" placeholder="78" /></label>
          <label>Respiratory rate<input name="respiratoryRate" type="number" placeholder="18" /></label>
          <label>SpO2<input name="spo2" type="number" placeholder="98" /></label>
          <label>Blood sugar<input name="bloodSugar" placeholder="110 mg/dL" /></label>
          <label>Pain score<input name="painScore" type="number" min="0" max="10" placeholder="0" /></label>
          <label class="span-2">Notes<textarea name="notes" placeholder="Monitoring notes"></textarea></label>
          <button class="button primary" type="submit" data-testid="record-ipd-vitals-button">Save vitals</button>
        </form>` : emptyState("Choose Record Vitals for an admitted patient.")}
      </section>
    ` : ""}
    ${selectedAdmission && selectedVitals.length ? `<section class="panel"><div class="panel-head"><h3>IPD Vitals Trend</h3><p>Repeated saved readings for this admission only.</p></div><div class="metric-grid small">${trendChart(selectedVitals.map((item) => Number.parseFloat(item.pulse) || 0).slice(-12), labels)}${trendChart(selectedVitals.map((item) => Number.parseFloat(item.spo2) || 0).slice(-12), labels)}${trendChart(selectedVitals.map((item) => Number.parseFloat(item.temperature) || 0).slice(-12), labels)}${trendChart(selectedVitals.map((item) => Number.parseFloat(String(item.bloodPressure || "").split("/")[0]) || 0).slice(-12), labels)}</div></section>` : ""}
    <section class="panel">
      <div class="panel-head"><h3>IPD Vitals History</h3></div>
      ${selectedVitals.length ? table(["Time", "Temp", "BP", "Pulse", "RR", "SpO2", "Sugar", "Pain", "By", "Status"], selectedVitals.map((item) => [
        item.dateTime,
        item.temperature,
        item.bloodPressure,
        item.pulse,
        item.respiratoryRate,
        item.spo2,
        item.bloodSugar,
        item.painScore,
        item.recordedBy,
        badge(item.status, item.status === "Abnormal" ? "risk-critical" : "status-active")
      ])) : emptyState(selectedAdmission ? "No IPD vitals are recorded for this admission yet." : "Select an admitted patient to view admission-specific vitals history.")}
    </section>
  `;
}

export function marPage() {
  const { query } = parseHashRoute();
  const selectedAdmissionId = query.admissionId || "";
  const allRecords = safeData(() => api.medicationAdministrationRecords(currentUser));
  const records = selectedAdmissionId ? allRecords.filter((item) => String(item.admissionId || "") === String(selectedAdmissionId)) : allRecords;
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)) : [];
  const prescriptionItems = hasPermission(currentUser, "pharmacy", "view") ? safeOptionalData(() => api.prescriptionItems(currentUser)) : [];
  const pharmacyIssues = hasPermission(currentUser, "pharmacy", "view") ? safeOptionalData(() => api.pharmacyIssues(currentUser)) : [];
  const consultations = hasPermission(currentUser, "consultation", "view") ? safeOptionalData(() => api.consultations(currentUser)) : [];
  return `
    <section class="panel">
      <div class="panel-head"><h3>Medication Administration Record</h3><p>${selectedAdmissionId ? "Showing the selected patient’s medication records." : "Track scheduled, given, skipped, held, refused, unavailable, and cancelled medicines."}</p></div>
      ${records.length ? table(["Medicine", "Dose", "Route", "Frequency", "Scheduled", "Given Time", "Given By", "Status", "Action", "360"], records.map((item) => {
        const admission = admissions.find((entry) => String(admissionDisplayId(entry)) === String(item.admissionId)) || {};
        const pending = !item.givenTime && !item.givenBy;
        return [
          resolveMedicationName(item, { prescriptionItems, pharmacyIssues, consultations }),
          item.dose || "-",
          item.route || "-",
          item.frequency || "-",
          item.scheduledTime || item.dueTime || "Pending scheduling",
          item.givenTime || (pending ? "Pending administration" : "-"),
          item.givenBy || (pending ? "Pending nurse confirmation" : "-"),
          badge(item.status || (pending ? "Pending" : "Scheduled"), statusClass(item.status || (pending ? "Pending" : "Scheduled"))),
          hasPermission(currentUser, "mar", "edit") && item.status === "Scheduled" ? `<button class="button tiny" data-action="mark-med-given" data-mar="${item.id}" data-testid="save-mar-button">Mark given</button>` : "Done",
          ipd360Button(item.admissionId || admissionDisplayId(admission))
        ];
      })) : emptyState("No medication records are scheduled. MAR entries appear after doctor medication orders.")}
    </section>
  `;
}

export function intakeOutputPage() {
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)).filter((item) => !["Discharged", "Cancelled"].includes(item.admissionStatus || item.status)) : [];
  const charts = safeData(() => api.intakeOutputCharts(currentUser));
  return `
    ${hasPermission(currentUser, "intakeOutput", "create") ? `
      <section class="panel">
        <div class="panel-head"><h3>Record intake / output</h3></div>
        <form class="form-grid" data-action="add-intake-output">
          <label>Admission<select name="admissionId">${admissions.map((item) => `<option value="${item.id}">${escapeHtml(item.patientName)}</option>`).join("")}</select></label>
          <label>Oral fluids<input name="oralFluids" type="number" value="900" /></label>
          <label>IV fluids<input name="ivFluids" type="number" value="500" /></label>
          <label>Tube feeding<input name="tubeFeeding" type="number" value="0" /></label>
          <label>Blood products<input name="bloodProducts" type="number" value="0" /></label>
          <label>Other intake<input name="otherIntake" type="number" value="0" /></label>
          <label>Urine<input name="urine" type="number" value="700" /></label>
          <label>Stool<input name="stool" type="number" value="0" /></label>
          <label>Vomit<input name="vomit" type="number" value="0" /></label>
          <label>Drain output<input name="drainOutput" type="number" value="0" /></label>
          <label>Other output<input name="otherOutput" type="number" value="0" /></label>
          <button class="button primary" type="submit" data-testid="save-intake-output-button">Save chart</button>
        </form>
      </section>
    ` : ""}
    <section class="panel">
      <div class="panel-head"><h3>Intake / output summary</h3></div>
      ${charts.length ? table(["Date", "Oral", "IV", "Urine", "Total Intake", "Total Output", "Fluid Balance", "Status"], charts.map((item) => [
        item.date,
        item.oralFluids,
        item.ivFluids,
        item.urine,
        item.totalIntake,
        item.totalOutput,
        item.fluidBalance,
        badge(item.status, statusClass(item.status))
      ])) : emptyState("No intake/output charts are recorded. Charts will appear after nursing updates.")}
    </section>
  `;
}

export function handoverPage() {
  const handovers = api.doctorHandovers(currentUser);
  return `
    <section class="panel">
      <div class="panel-head"><h3>Duty handover</h3><p>Outgoing doctor prepares, incoming doctor accepts.</p></div>
      ${handovers.length ? table(["Patient", "Ward / Bed", "Diagnosis", "Critical Issues", "Pending Labs", "Watch Points", "Given By", "Taken By", "Status", "Action"], handovers.map((item) => [
        item.patientName,
        item.wardBed,
        item.diagnosis,
        item.criticalIssues,
        item.pendingLabs,
        item.watchPoints,
        item.handoverGivenBy,
        item.handoverTakenBy,
        badge(item.status, statusClass(item.status)),
        hasPermission(currentUser, "handover", "edit") && item.status !== "Accepted" ? `<button class="button tiny" data-action="accept-handover" data-handover="${item.id}">Accept</button>` : "Done"
      ])) : emptyState("No handovers are active. Create handover to prepare the next duty doctor safely.")}
    </section>
  `;
}

export function dischargePage() {
  const plans = api.dischargePlans(currentUser);
  const summaries = api.dischargeSummaries(currentUser);
  const admissions = hasPermission(currentUser, "admissions", "view") ? safeOptionalData(() => api.admissions(currentUser)) : [];
  const patients = hasPermission(currentUser, "patients", "view") ? safeOptionalData(() => api.patients(currentUser)) : [];
  const deathSummaries = hasPermission(currentUser, "deathSummary", "view") ? safeOptionalData(() => api.deathSummaries(currentUser)) : [];
  const dischargeAdmission = admissions.find((admission) => String(admission.id) === String(plans[0]?.admissionId)) || admissions[0] || null;
  const dischargeDocuments = hasPermission(currentUser, "documents", "view")
    ? safeOptionalData(() => api.patientDocuments(currentUser)).filter((doc) => ["discharge-summary", "admission-document"].includes(doc.documentType) && (!dischargeAdmission || String(doc.admissionId || "") === String(dischargeAdmission.id)))
    : [];
  return `
    ${journeyTracker(["Doctor Clearance", "Nursing Clearance", "Pharmacy Clearance", "Lab / Radiology", "Billing", "Insurance", "Final Discharge"], 2, "Discharge clearance")}
    <section class="panel">
      <div class="panel-head"><h3>Discharge planning</h3><p>Clear doctor, pharmacy, lab, billing, insurance, education, follow-up, and bed release.</p></div>
      ${plans.length ? table(["Patient", "Planned Date", "Doctor", "Pharmacy", "Lab", "Billing", "Insurance", "Education", "Bed", "Status", "Action"], plans.map((plan) => {
        const { admission, mrn: displayMrn, name: displayName } = resolveDischargePatient(plan, admissions, patients);
        return [
        rowRouteButton(`${displayMrn} - ${displayName}`, admissionDisplayId(admission) ? "ipdPatient360" : "discharge", admissionDisplayId(admission) ? { admissionId: admissionDisplayId(admission) } : {}),
        plan.plannedDate,
        plan.doctorAdviceCompleted ? "Done" : "Pending",
        plan.pharmacyClearance ? "Done" : "Pending",
        plan.labRadiologyClearance ? "Done" : "Pending",
        plan.billingClearance ? "Done" : "Pending",
        plan.insuranceClearance ? "Done" : "Pending",
        plan.patientEducationGiven ? "Done" : "Pending",
        plan.bedReleased ? "Released" : "Pending",
        badge(plan.status, statusClass(plan.status)),
        hasPermission(currentUser, "discharge", "edit") && plan.status !== "Ready for Discharge" ? `<div class="grid-actions">
          ${!plan.doctorAdviceCompleted ? `<button class="button tiny" data-action="complete-clearance" data-plan="${plan.id}" data-clearance="doctor" data-testid="complete-clearance-button">Doctor</button>` : ""}
          ${!plan.pharmacyClearance ? `<button class="button tiny" data-action="complete-clearance" data-plan="${plan.id}" data-clearance="pharmacy" data-testid="complete-clearance-button">Pharmacy</button>` : ""}
          ${!plan.labRadiologyClearance ? `<button class="button tiny" data-action="complete-clearance" data-plan="${plan.id}" data-clearance="lab" data-testid="complete-clearance-button">Lab</button>` : ""}
          ${!plan.billingClearance ? `<button class="button tiny" data-action="complete-clearance" data-plan="${plan.id}" data-clearance="billing" data-testid="complete-clearance-button">Billing</button>` : ""}
          <button class="button tiny primary" data-action="complete-discharge" data-plan="${plan.id}" data-testid="final-discharge-button">Final discharge</button>
          ${ipd360Button(plan.admissionId || admissionDisplayId(admission))}
          ${deathSummaryButton(admissionDisplayId(admission) ? admission : plan, deathSummaries)}
        </div>` : `<div class="grid-actions">${ipd360Button(plan.admissionId || admissionDisplayId(admission))}${deathSummaryButton(admissionDisplayId(admission) ? admission : plan, deathSummaries)}</div>` || "Ready"
      ];
      })) : emptyState("No discharge plans are active. Start discharge planning when the admitted patient is clinically ready.")}
    </section>
    <section class="panel">
      <div class="panel-head"><h3>Discharge summaries</h3></div>
      ${table(["Patient", "Admission", "Discharge", "Diagnosis", "Treatment", "Follow-up", "Approval", "Status"], summaries.map((summary) => [
        summary.patientDetails,
        summary.admissionDate,
        summary.dischargeDate,
        summary.diagnosis,
        summary.treatmentGiven,
        summary.followUpAdvice,
        summary.approvalStatus,
        badge(summary.status, statusClass(summary.status))
      ]))}
    </section>
    ${dischargeAdmission ? documentUploadPanel({
      patientId: admissionPatientId(dischargeAdmission),
      admissionId: dischargeAdmission.id,
      relatedModule: "discharge",
      types: ["discharge-summary", "admission-document"],
      title: "Upload Discharge Summary Document"
    }) : ""}
    <section class="panel">
      <div class="panel-head"><h3>Discharge Documents</h3></div>
      ${documentTable(dischargeDocuments)}
    </section>
  `;
}

export function ipdReportsPage() {
  const admissions = api.admissions(currentUser);
  const active = admissions.filter((item) => !["Discharged", "Cancelled"].includes(item.admissionStatus || item.status));
  const sheets = api.dailyPatientSheets(currentUser);
  const rounds = api.wardRounds(currentUser);
  const alerts = api.ipdAlerts(currentUser);
  const beds = api.beds(currentUser);
  const occupied = beds.filter((bed) => bed.status === "Occupied").length;
  return `
    <div class="metric-grid">
      ${metricCard("Total Admitted", active.length, "Current")}
      ${metricCard("New Admissions", admissions.filter((item) => String(item.createdAt || "").includes("2026-06-11")).length, "Today")}
      ${metricCard("Discharges", admissions.filter((item) => (item.admissionStatus || item.status) === "Discharged").length, "Today")}
      ${metricCard("Critical Patients", alerts.filter((alert) => alert.risk === "Critical").length, "Now")}
      ${metricCard("Bed Occupancy", beds.length ? `${Math.round((occupied / beds.length) * 100)}%` : "0%", "Visible branch")}
      ${metricCard("Rounds Pending", Math.max(active.length - rounds.filter((round) => round.status === "Completed").length, 0), "Today")}
    </div>
    <section class="panel">
      <div class="panel-head">
        <div><h3>Daily IPD report</h3><p>Includes admissions, discharges, rounds, nursing notes, pending labs, summaries, billing, and insurance approvals.</p></div>
        ${hasPermission(currentUser, "reports", "export") ? `<div class="button-row"><button class="button soft" data-action="export-csv" data-kind="reports">CSV</button><button class="button primary" data-action="print-report">PDF</button></div>` : ""}
      </div>
      ${table(["Ward", "Patients", "Doctor Rounds", "Nursing Sheets", "Lab Pending", "Discharge Pending", "Alerts"], api.wards(currentUser).map((ward) => [
        ward.name,
        active.filter((item) => item.ward === ward.name).length,
        rounds.filter((round) => round.ward === ward.name && round.status === "Completed").length,
        sheets.filter((sheet) => sheet.ward === ward.name && ["Nurse Updated", "Completed", "Verified"].includes(sheet.status)).length,
        api.labOrders(currentUser).filter((order) => !["Report Ready", "Doctor Reviewed"].includes(order.status)).length,
        api.dischargeSummaries(currentUser).filter((summary) => summary.status !== "Approved").length,
        alerts.filter((alert) => alert.wardBed?.includes(ward.name)).length
      ]))}
    </section>
  `;
}

export function ipdAlertsPage() {
  const alerts = api.ipdAlerts(currentUser);
  return `
    <section class="panel">
      <div class="panel-head"><h3>IPD alerts</h3><p>Abnormal vitals, medicine missed, delayed reports, pending rounds, discharge blockers, handover, and bed cleaning.</p></div>
      ${table(["Risk", "Title", "Patient", "Ward / Bed", "Owner", "Due", "Status"], alerts.map((alert) => [
        badge(alert.risk, riskClass(alert.risk)),
        alert.title,
        alert.patientId,
        alert.wardBed,
        alert.assignedOwner,
        alert.dueTime,
        badge(alert.status, statusClass(alert.status))
      ]))}
    </section>
  `;
}

export function otPage() {
  const bookings = safeOptionalData(() => api.otBookings(currentUser), []);
  const NEXT = {
    "Scheduled": ["Pre-Op", "Start Pre-Op"],
    "Pre-Op": ["In Progress", "Start Surgery"],
    "In Progress": ["Completed", "Mark Completed"],
    "Completed": ["Recovery", "Move to Recovery"]
  };
  const count = (s) => bookings.filter((b) => (b.status || "Scheduled") === s).length;
  const canEdit = hasPermission(currentUser, "ot", "edit");
  const kpis = [
    ["Scheduled", count("Scheduled")],
    ["Pre-Op", count("Pre-Op")],
    ["In Progress", count("In Progress")],
    ["Completed", count("Completed")],
    ["Recovery", count("Recovery")]
  ];
  const rows = bookings
    .slice()
    .sort((a, b) => `${a.scheduledDate || ""}${a.scheduledTime || ""}`.localeCompare(`${b.scheduledDate || ""}${b.scheduledTime || ""}`))
    .map((b) => {
      const status = b.status || "Scheduled";
      const next = NEXT[status];
      const actions = `<div class="grid-actions">${
        canEdit && next ? `<button class="button tiny primary" type="button" data-action="ot-advance" data-ot="${escapeHtml(b.id)}" data-status="${escapeHtml(next[0])}">${escapeHtml(next[1])}</button>` : ""
      }${
        canEdit && !["Completed", "Recovery", "Cancelled"].includes(status) ? `<button class="button tiny danger" type="button" data-action="ot-cancel" data-ot="${escapeHtml(b.id)}">Cancel</button>` : ""
      }</div>`;
      return [
        `<strong>${escapeHtml(b.otNumber || "")}</strong>`,
        escapeHtml(b.patientName || "") + (b.mrn ? `<br><small>${escapeHtml(b.mrn)}</small>` : ""),
        escapeHtml(b.procedure || ""),
        escapeHtml(b.surgeon || "") + (b.anaesthetist ? `<br><small>Anaes: ${escapeHtml(b.anaesthetist)}</small>` : ""),
        escapeHtml(b.theatre || "—"),
        `${escapeHtml(b.scheduledDate || "—")}${b.scheduledTime ? ` ${escapeHtml(b.scheduledTime)}` : ""}`,
        badge(b.priority || "Elective", (b.priority === "Emergency" ? "status-inactive" : b.priority === "Urgent" ? "status-pending" : "status-active")),
        badge(status, statusClass(status)),
        actions
      ];
    });
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Operation Theatre</h3><p>Schedule surgeries and track each case through the peri-operative workflow.</p></div>
        <div class="button-row">${hasPermission(currentUser, "ot", "create") ? gridAddButton("Surgery", "schedule-surgery") : ""}</div>
      </div>
      <div class="metric-grid small">
        ${kpis.map(([label, n]) => metricCard(label, String(n), "OT cases")).join("")}
      </div>
      ${bookings.length
        ? table(["OT #", "Patient", "Procedure", "Surgical team", "Theatre", "Scheduled", "Priority", "Status", "Actions"], rows)
        : emptyState("No surgeries scheduled. Use Add Surgery to book an operation theatre slot.")}
    </section>
  `;
}

export function mortuaryPage() {
  const records = safeOptionalData(() => api.mortuaryRecords(currentUser), []);
  const canEdit = hasPermission(currentUser, "mortuary", "edit");
  const canCertify = hasPermission(currentUser, "mortuary", "approve");
  const inStorage = records.filter((r) => r.status !== "Released" && r.status !== "Disposed").length;
  const released = records.filter((r) => r.status === "Released").length;
  const certificates = records.filter((r) => r.deathCertificateIssued).length;
  const mlcPending = records.filter((r) => r.mlcCase && r.status !== "Released").length;
  const kpis = [
    ["In storage", inStorage],
    ["Released", released],
    ["Certificates issued", certificates],
    ["MLC in storage", mlcPending]
  ];
  const rows = records
    .slice()
    .sort((a, b) => `${b.dateOfDeath || ""}`.localeCompare(`${a.dateOfDeath || ""}`))
    .map((r) => {
      const status = r.status || "Body Received";
      const released = status === "Released";
      const actions = `<div class="grid-actions">${
        canCertify && !r.deathCertificateIssued ? `<button class="button tiny primary" type="button" data-action="mortuary-certificate" data-mortuary="${escapeHtml(r.id)}" data-cause="${escapeHtml(r.causeOfDeath || "")}">Issue Certificate</button>` : ""
      }${
        canEdit && !released ? `<button class="button tiny" type="button" data-action="mortuary-release" data-mortuary="${escapeHtml(r.id)}" data-mlc="${r.mlcCase ? "true" : "false"}">Release Body</button>` : ""
      }</div>`;
      return [
        `<strong>${escapeHtml(r.mortuaryNumber || "")}</strong>`,
        escapeHtml(r.deceasedName || "") + (r.mrn ? `<br><small>${escapeHtml(r.mrn)}</small>` : ""),
        `${escapeHtml(r.dateOfDeath || "—")}${r.timeOfDeath ? ` ${escapeHtml(r.timeOfDeath)}` : ""}`,
        escapeHtml(r.bayNumber || "—"),
        r.mlcCase ? badge("MLC", "status-inactive") : badge("Non-MLC", "status-active"),
        r.deathCertificateIssued ? `${badge("Issued", "status-active")}<br><small>${escapeHtml(r.deathCertificateNumber || "")}</small>` : badge("Pending", "status-pending"),
        badge(status, statusClass(status)) + (released && r.releasedTo ? `<br><small>to ${escapeHtml(r.releasedTo)}</small>` : ""),
        actions
      ];
    });
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Mortuary &amp; Death Registration</h3><p>Cold-storage register, body release, and death-certificate issuance.</p></div>
        <div class="button-row">${hasPermission(currentUser, "mortuary", "create") ? gridAddButton("Death", "register-death") : ""}</div>
      </div>
      <div class="metric-grid small">
        ${kpis.map(([label, n]) => metricCard(label, String(n), "Mortuary")).join("")}
      </div>
      ${records.length
        ? table(["Reg #", "Deceased", "Date of death", "Bay", "MLC", "Certificate", "Status", "Actions"], rows)
        : emptyState("No mortuary records. Use Add Death to register a death and assign cold-storage.")}
    </section>
  `;
}
