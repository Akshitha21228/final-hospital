let __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache;

export function configurePageRenderers(context) {
  ({ __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache } = context);
}

export function globalSearchPage() {
  const results = globalSearchQuery.trim() ? safeOptionalData(() => api.globalSearch(currentUser, globalSearchQuery), []) : [];
  const groups = groupSearchResults(results);
  return `
    <section class="panel">
      <div class="panel-head"><h3>Global search</h3><p>Permission-based search across patients, appointments, admissions, bills, claims, doctors, beds, and documents.</p></div>
      <form class="filter-row" data-action="global-search">
        <input name="query" value="${escapeHtml(globalSearchQuery)}" placeholder="Search by name, MRN, mobile, admission, bill, claim, doctor, bed" data-testid="global-search-input" />
        <button class="button primary" type="submit" data-testid="global-search-button">Search</button>
      </form>
      ${results.length ? Object.entries(groups).map(([group, items]) => `
        <div class="subsection">
          <div class="panel-head tight"><h3>${escapeHtml(group)}</h3><span class="badge status-active">${items.length}</span></div>
          ${table(["Title", "Detail", "Record ID", "Action"], items.map((item) => {
            const route = searchResultRoute(item);
            return [
              item.title,
              item.detail || item.subtitle || "-",
              item.id,
              `<button class="button tiny soft" type="button" data-route="${escapeHtml(route.page)}" ${route.query.patientId ? `data-patient-id="${escapeHtml(route.query.patientId)}"` : ""} ${route.query.admissionId ? `data-admission-id="${escapeHtml(route.query.admissionId)}"` : ""}>Open</button>`
            ];
          }))}
        </div>
      `).join("") : emptyState(globalSearchQuery.trim() ? "No matching records found." : "Search patient name, MRN, mobile, appointment, admission, bill, document, doctor, user, or branch.")}
    </section>
  `;
}

export function recordsPage() {
  const records = api.records(currentUser);
  const operationalRecords = records.length ? records : [
    ...(hasPermission(currentUser, "patients", "view") ? safeData(() => api.patients(currentUser)).map((patient) => ({
      patientId: patient.mrn || patient.id,
      appointmentId: patient.id,
      type: "Patient",
      department: "-",
      doctor: "-",
      waitTime: "",
      status: patient.status || "Active",
      sourceFile: "Live patient registry"
    })) : []),
    ...(hasPermission(currentUser, "appointments", "view") ? safeData(() => api.appointments(currentUser)).map((appointment) => ({
      patientId: appointment.patientName || appointment.patientId,
      appointmentId: appointment.appointmentNumber || appointment.id,
      type: "Appointment",
      department: appointment.department,
      doctor: appointment.doctor,
      waitTime: appointment.waitTime || appointment.waitingMinutes || "",
      status: appointment.status || "Active",
      sourceFile: "Live appointment book"
    })) : []),
    ...(hasPermission(currentUser, "billing", "view") ? safeData(() => api.bills(currentUser)).map((bill) => ({
      patientId: bill.patientName || bill.patientId,
      appointmentId: bill.billNumber || bill.id,
      type: "Bill",
      department: bill.department || "-",
      doctor: bill.doctor || "-",
      waitTime: "",
      status: bill.status || "Draft",
      sourceFile: "Live billing"
    })) : []),
    ...(hasPermission(currentUser, "lab", "view") ? safeData(() => api.labOrders(currentUser)).map((order) => ({
      patientId: order.patientName || order.patientId,
      appointmentId: order.id,
      type: order.orderType || "Lab",
      department: order.orderType || "Lab",
      doctor: order.doctor || "-",
      waitTime: "",
      status: order.status || "Ordered",
      sourceFile: "Live lab/radiology"
    })) : [])
  ];
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Drilldown records</h3><p>Clicking dashboard metrics or alerts leads to these raw records.</p></div>
        <div class="filter-row compact"><input placeholder="Search records" data-table-search /></div>
      </div>
      ${operationalRecords.length ? table(["Patient ID", "Record ID", "Type", "Department", "Doctor", "Wait", "Status", "Source"], operationalRecords.map((record) => [
        record.patientId,
        record.appointmentId,
        record.type,
        record.department,
        record.doctor || "Missing",
        record.waitTime ? `${record.waitTime} min` : "-",
        badge(record.status || "Active", String(record.status || "").includes("Missing") || String(record.status || "").includes("Needs") ? "risk-medium" : "status-active"),
        record.sourceFile
      ])) : emptyState("No records are visible for your current role and module permissions.")}
    </section>
  `;
}

export function alertsPage() {
  const alerts = api.alerts(currentUser);
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Operational alerts</h3><p>Risk signals created from uploaded records and configured thresholds.</p></div>
        <span class="badge risk-high">${alerts.filter((alert) => ["Critical", "High"].includes(alert.risk)).length} high risk</span>
      </div>
      ${table(["Alert", "Risk", "Category", "Department", "Due", "Status", "Actions"], alerts.map((alert) => [
        `<strong>${escapeHtml(alert.title)}</strong><br><small>${escapeHtml(alert.description)}</small>`,
        badge(alert.risk, riskClass(alert.risk)),
        alert.category,
        alert.department,
        alert.due,
        badge(alert.status, statusClass(alert.status)),
        `<div class="grid-actions">
          <button class="icon-button" type="button" data-route="records">Records</button>
          ${hasPermission(currentUser, "alerts", "assignTask") ? `<button class="icon-button" type="button" data-action="task-from-alert" data-alert="${alert.id}">Task</button>` : ""}
          ${hasPermission(currentUser, "alerts", "edit") ? `<button class="icon-button" type="button" data-action="ack-alert" data-alert="${alert.id}">Acknowledge</button>` : ""}
          ${hasPermission(currentUser, "alerts", "export") ? `<button class="icon-button" type="button" data-action="export-csv" data-kind="alerts">Export</button>` : ""}
          ${gridActions("alerts", alert.id)}
        </div>`
      ]))}
    </section>
  `;
}

export function tasksPage() {
  return `
    <section class="panel automation-panel">
      <div class="panel-head">
        <div><h3>My Tasks</h3><p>Assigned operational work for your current role.</p></div>
        <span class="badge status-active">0 visible</span>
      </div>
      ${emptyState("No pending work is visible for your role.")}
    </section>
  `;
}

export function reportsPage() {
  const data = normalizeDashboardData(api.dashboard(currentUser));
  const admissions = safeOptionalData(() => hasPermission(currentUser, "admissions", "view") ? api.admissions(currentUser) : [], []);
  const appointments = safeOptionalData(() => hasPermission(currentUser, "appointments", "view") ? api.appointments(currentUser) : [], []);
  const beds = safeOptionalData(() => hasPermission(currentUser, "beds", "view") || hasPermission(currentUser, "wards", "view") ? api.beds(currentUser) : [], []);
  const reportRows = currentUser.role === ROLES.SUPER_ADMIN
    ? data.hospitals.map((hospital) => [hospital.name, hospital.status, hospital.plan, `${hospital.storageUsedGb} GB`])
    : (data.branches.length ? data.branches : [{ id: currentUser.branchId, name: "Visible branch" }]).map((branch) => {
      const branchAppointments = appointments.filter((item) => !branch.id || String(item.branchId || currentUser.branchId || "") === String(branch.id));
      const branchAdmissions = admissions.filter((item) => !branch.id || String(item.branchId || currentUser.branchId || "") === String(branch.id));
      const branchBeds = beds.filter((item) => !branch.id || String(item.branchId || currentUser.branchId || "") === String(branch.id));
      const occupiedBeds = branchBeds.filter((item) => String(item.status || "").toLowerCase() === "occupied").length;
      const averageWait = branchAppointments.length ? Math.round(branchAppointments.reduce((sum, item) => sum + Number(item.waitTime || item.waitMinutes || 0), 0) / branchAppointments.length) : 0;
      return [branch.name, branchAppointments.length + branchAdmissions.length, `${averageWait} min`, `${branchBeds.length ? Math.round((occupiedBeds / branchBeds.length) * 100) : 0}%`];
    });
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Reports</h3><p>Prepared by ${escapeHtml(currentUser.name)}. Generated ${new Date().toLocaleString("en-GB", { hour12: false })}.</p></div>
        ${hasPermission(currentUser, "reports", "export") ? `<div class="button-row">
          <button class="button soft" type="button" data-action="export-csv" data-kind="reports">CSV</button>
          <button class="button soft" type="button" data-action="export-excel">Excel</button>
          <button class="button primary" type="button" data-action="print-report">PDF</button>
        </div>` : ""}
      </div>
      <div class="filter-row">
        <select><option>Last 30 days</option><option>This month</option><option>Last quarter</option></select>
        <select><option>All branches</option>${data.branches.map((branch) => `<option>${escapeHtml(branch.name)}</option>`).join("")}</select>
        <select><option>All risk levels</option><option>Critical</option><option>High</option><option>Medium</option></select>
      </div>
      ${table(currentUser.role === ROLES.SUPER_ADMIN ? ["Hospital", "Status", "Plan", "Storage"] : ["Branch", "Patient Volume", "Wait Time", "Bed Occupancy"], reportRows)}
    </section>
  `;
}

export function uploadPage() {
  const branches = api.branches(currentUser);
  const validation = pendingUpload.validation;
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Upload records</h3><p>Select record type, preview data, map fields, validate, and submit.</p></div>
        <span class="badge status-active">CSV MVP</span>
      </div>
      <div class="wizard">
        ${["Record type", "Branch", "Upload", "Preview", "Validate", "Submit"].map((step, index) => `<span>${index + 1}. ${step}</span>`).join("")}
      </div>
      <form class="upload-box" data-action="upload-records">
        <label>Record type<select name="recordType">
          ${["Patient Flow", "Appointments", "Staffing", "Bed Usage", "Claims", "Supply Usage", "Incident Reports", "Compliance Records"].map((type) => `<option ${pendingUpload.recordType === type ? "selected" : ""}>${type}</option>`).join("")}
        </select></label>
        <label>Branch<select name="branchId">${branches.map((branch) => `<option value="${branch.id}">${escapeHtml(branch.name)}</option>`).join("")}</select></label>
        <label>CSV file<input name="file" type="file" accept=".csv" /></label>
        <button class="button soft" type="button" data-action="sample-upload">Use sample CSV</button>
        <button class="button primary" type="submit" ${pendingUpload.rows.length ? "" : "disabled"}>Submit valid rows</button>
      </form>
    </section>
    ${validation ? uploadValidation(validation) : emptyState("Upload a CSV or use the sample to preview validation results.")}
  `;
}

export function mappingPage() {
  const mappings = api.mappings(currentUser);
  return `
    ${hasPermission(currentUser, "mapping", "edit") ? `
      <section class="panel">
        <div class="panel-head"><h3>Manual field mapping</h3><p>Mappings are remembered per hospital and branch.</p></div>
        <form class="form-grid" data-action="save-mapping">
          <label>Record type<select name="recordType"><option>Appointments</option><option>Bed Usage</option><option>Claims</option><option>Supply Usage</option></select></label>
          <label>Uploaded column<input name="uploadedColumn" required placeholder="Pt Name" /></label>
          <label>Standard field<input name="standardField" required placeholder="Patient Name" /></label>
          <button class="button primary" type="submit">Save mapping</button>
        </form>
      </section>
    ` : ""}
    <section class="panel">
      <div class="panel-head"><h3>Saved mappings</h3><span class="badge status-active">${mappings.length}</span></div>
      ${table(["Uploaded Column", "Standard Field", "Record Type"], mappings.map((mapping) => [mapping.uploadedColumn, mapping.standardField, mapping.recordType]))}
    </section>
  `;
}

export function claimsPage() {
  const claims = api.claims(currentUser);
  return `
    <section class="panel">
      <div class="panel-head"><h3>Insurance / Claims</h3><p>Track missing documents, pre-approval, submission, approval, rejection, and resubmission.</p></div>
      ${table(["Company", "Policy", "Claim", "Missing", "Claim Amount", "Approved", "Status"], claims.map((claim) => [
        claim.insuranceCompany,
        claim.policyNumber,
        claim.claimNumber,
        claim.missingDocuments,
        `Rs. ${money(claim.claimAmount)}`,
        `Rs. ${money(claim.approvedAmount)}`,
        badge(claim.claimStatus, statusClass(claim.claimStatus))
      ]))}
    </section>
  `;
}

export function notificationsPage() {
  const notifications = mergeNotifications();
  const derived = notifications.filter((item) => item.source === "Derived");
  const isDoctor = /^(doctor|surgeon)$/.test(String(currentUser?.jobRole || "").toLowerCase());
  const notificationEmptyState = (message) => `<div class="empty"><strong>${escapeHtml(message)}</strong></div>`;
  const workflowSection = isDoctor && !derived.length
    ? `
      <section class="panel automation-panel">
        <div class="panel-head">
          <div><h3>Workflow Notifications</h3><p>Derived from pending records, ready reports, unpaid bills, document uploads, access review, and provider status.</p></div>
          <span class="badge status-active">0 visible</span>
        </div>
        ${notificationEmptyState("No workflow notifications are visible right now.")}
      </section>
    `
    : automationList("Workflow Notifications", "Derived from pending records, ready reports, unpaid bills, document uploads, access review, and provider status.", derived, "No workflow notifications are visible right now.");
  return `
    ${workflowSection}
    <section class="panel">
      <div class="panel-head"><h3>Notifications</h3><p>In-app notifications are active. External delivery uses configured production providers when enabled.</p></div>
      ${hasPermission(currentUser, "notifications", "edit") ? `<div class="button-row"><button class="button small soft" type="button" data-action="mark-all-notifications-read">Mark all as read</button><button class="button small soft" type="button" data-action="clear-read-notifications">Clear all read</button></div>` : ""}
      ${notifications.length ? table(["Category", "Priority", "Title", "Message", "Channel", "Linked", "Created", "Status", "Action"], notifications.map((item) => [
        item.category || item.type || item.module || "Notification",
        badge(String(item.priority || "info").toUpperCase(), riskClass(item.priority || "info")),
        item.title, item.message, item.channel || item.source || "-", item.linkedRecord || item.route || "-", item.createdAt || item.time || "-",
        badge(item.status || (item.read ? "Read" : "Unread"), item.read ? "status-active" : "status-pending"),
        `<div class="grid-actions">${canAccessPage(currentUser, item.route || "notifications") ? `<button class="button tiny soft" title="Open" aria-label="Open" data-route="${escapeHtml(item.route || "notifications")}" data-notification="${escapeHtml(item.id || "")}" ${item.patientId ? `data-patient-id="${escapeHtml(item.patientId)}"` : ""} ${item.admissionId ? `data-admission-id="${escapeHtml(item.admissionId)}"` : ""}>${iconLabel(actionIcon("open"), "Open")}</button>` : ""}${!item.read && hasPermission(currentUser, "notifications", "edit") && item.source !== "Derived" ? `<button class="button tiny" title="Mark read" aria-label="Mark read" data-action="mark-notification-read" data-notification="${item.id}">${iconLabel(actionIcon("mark read"), "Mark read")}</button>` : ""}</div>`
      ])) : (isDoctor ? notificationEmptyState("No saved notifications are visible for this scope.") : emptyState("No saved notifications are visible for this scope."))}
    </section>
  `;
}

export function inventoryPage() {
  const rows = safeData(() => api.inventory(currentUser));
  return `
    <div class="metric-grid small">
      ${metricCard("Inventory Items", rows.length, "Visible branch")}
      ${metricCard("Low Stock", rows.filter((item) => Number(item.stock || item.quantityAvailable || 0) <= Number(item.minimum || item.reorderLevel || 0)).length, "Needs purchase")}
      ${metricCard("Active", rows.filter((item) => (item.status || "Active") === "Active").length, "Usable")}
    </div>
    <section class="panel">
      <div class="panel-head">
        <div><h3>Inventory</h3><p>General consumables, non-pharmacy items, reorder levels, and branch stock health.</p></div>
        ${hasPermission(currentUser, "inventory", "create") ? `<button class="button small soft" type="button" data-route="purchase">Create Purchase Request</button>` : ""}
      </div>
      ${searchFilterBar("Search inventory by item / status", ["All", "Low Stock", "Active", "Inactive"])}
      ${rows.length ? table(["Item", "Stock", "Minimum", "Status", "Action"], rows.map((row) => [
        row.item || row.name || row.medicine || "-",
        row.stock ?? row.quantityAvailable ?? "-",
        row.minimum ?? row.reorderLevel ?? "-",
        badge(row.status || "Active", statusClass(row.status || "Active")),
        gridActions("inventory", row.id)
      ])) : emptyState("No inventory records found. Create a purchase request when stock needs replenishment.")}
    </section>
  `;
}
