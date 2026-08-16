let __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache;

export function configurePageRenderers(context) {
  ({ __dataRenderScheduled, accessDeniedPanel, accessReviewTarget, actionIcon, addButtonTestId, admissionBedLabel, admissionDisplayId, admissionPatientId, admissionWardLabel, allAssignablePages, allowedCreatorRoleOptions, animateCountUps, api, app, applyUserRolePreset, appointmentDepartmentOptions, appointmentDoctorOptions, asArray, attentionPanel, auditSearchQuery, authFrame, automationAlerts, automationAlertsPanel, automationList, automationSettingsCache, automationSettingsCacheUserId, automationSettingsForScope, badge, billBalanceAmount, billPaidAmount, billPaymentTimestamp, billTotalAmount, branchDepartmentOptions, branchUserPermissionBuilder, canAccessPage, canonicalRecordId, careCommandStrip, checklistPanel, clickLoadingActions, cloneUserOptions, COLLECTION_MODULES, collectionRows, collectSetupStepValues, comparisonTable, createForm, createModal, createTarget, currencyDisplay, currencyValue, currentPageTitle, currentUser, dashboardPage, dateSeriesFromRows, deathSummaryButton, deathSummaryChecklistPanel, deathSummaryForAdmission, deathSummaryForm, deathSummaryPage, deathSummaryPreview, deathSummarySection, delayLabel, deleteModal, deleteTarget, deriveBillingSuggestions, deriveNotifications, deriveOperationalData, deriveTasks, dischargeChecklistPanel, documentActions, documentAlertsPanel, documentTable, documentTypeOptions, documentUploadPanel, downloadBase64File, draftKeyFor, draftTimers, editableEntries, editFieldControl, editFieldLabel, editModal, editTarget, emergencyOneScreenPanel, emptyState, enhanceDraftAreas, enhancePasswordHints, environmentLabel, escapeAttribute, escapeHtml, exportCsv, exportExcel, fileStorageStatus, fillAppointmentFromPatient, filterAppointmentDoctors, filterByAdmission, financeSummaryFromBills, findAdmissionForPlan, findPatient, findPatientForDischarge, firstDefined, formatAuditValue, formatDateTime, formatGb, formValues, getApiMode, globalSearchActiveIndex, globalSearchError, globalSearchQuery, globalSearchStatus, globalSearchSuggestions, globalSearchTimer, goLiveChecklistCache, goLiveChecklistCacheUserId, goLiveChecklistForScope, gridActions, gridAddButton, groupSearchResults, hasPermission, iconLabel, inferredSetupProgress, initFrontendSentry, ipd360Button, ipd360Tabs, ipdAdmissionChecklistPanel, ipdAdmissionStatus, ipdHeader, ipdJourneyTracker, ipdNextActions, ipdTimelineEvents, ipdTimelinePanel, isAuthError, isBillPaidToday, isDeathOutcome, isPendingStatus, isToday, isUnauthorizedError, jobRoleOptions, journeyTracker, latestForPatient, latestPatientJourneyStage, latestRecord, livePatientFlowBoard, loadingLabel, loadingLabels, localDateInputValue, localDateKey, localFrontendMode, MASTER_MODULES, medicineField, mergeNotifications, metricCard, metricTrend, minutesSince, missingDocumentAlerts, modalSubmitTestId, money, NAV_BY_ROLE, navGroupLabel, navIcon, normalizeBranchAdminCreateUserForm, normalizeDashboardData, normalizeEditValues, normalizePageKey, normalizeSetupStep, notificationGroup, notificationsDrawerOpen, OPD_JOURNEY_STEPS, opdCheckoutChecklistPanel, opdJourneyTrackerForPatient, PAGE_TITLE_FALLBACK, pageErrorPanel, pageFromHash, pageSkeleton, parseCsv, parseHashRoute, passwordField, passwordPolicyHint, passwordPolicyState, patientActions, patientAppointmentsPage, patientBillsPage, patientCardGrid, patientDashboardPage, patientDocumentsPage, patientJourneyTimelinePanel, patientLabel, patientName, patientOption, patientPortalShell, patientRiskIndicator, patientStickyHeader, patientTimeline, pendingCount, pendingUpload, permissionMatrix, permissionMatrixRows, permissionRiskAlerts, permissionRiskPanel, permissionTemplateOptions, permitted, printableButton, priorityCards, providerStatusGrid, publicBookingConfirmation, publicBookingLinkBlock, publicBookingPage, queueDelayAlerts, queueDelayPanel, quickActionsPanel, readFileAsDataUrl, readFileAsText, recordTime, render, renderAuth, renderedPageKey, renderMustChangePasswordGate, renderNotificationsDrawer, renderPage, renderPatientPortal, renderPublicBooking, renderShell, resolveDischargePatient, resolveMedicationName, riskClass, riskSummary, roleDashboardPanel, roleLabels, ROLES, roleSmartCards, roleWorkQueue, routeKey, rowRouteButton, runGlobalSearch, safeAiAssistantPanel, safeData, safeMrn, safeOptionalData, safeRenderPage, sameId, sampleCsv, scheduleDataRender, scheduleDraftSave, scopeDescription, searchFilterBar, searchResultRoute, selectedPatientId, selectedPermissionPages, selectPatientPanel, SENSITIVE_USER_PERMISSIONS, sensitivePermissionList, setPage, setPermissionPages, SETUP_STEP_ALIASES, SETUP_WIZARD_STEPS, setupPercent, setupProgressSummary, severityForDelay, shouldStagePage, simpleOpsPage, skeletonLine, skeletonMetricCards, skeletonTable, smartBillingDraftPanel, stagedPageKey, stagedPageTimer, startButtonLoading, startFormLoading, statusClass, stopButtonLoading, stopFormLoading, strongPassword, table, taskStatus, TEXT_TEMPLATES, titleCase, toast, toNumber, topSearchAutocomplete, trendChart, unauthorizedPage, uniquePages, updatePermissionBuilder, uploadValidation, USER_PERMISSION_ACTIONS, USER_PERMISSION_GROUPS, USER_ROLE_MODULES, USER_ROLE_PRESETS, userAccessDetail, userAccessPreview, userInitials, userPageCheckboxGroups, validateRows, warmDataCache } = context);
}

export function subscriptionsPage() {
  const plans = api.subscriptions();
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>SaaS plans</h3><p>Super Admin controls plan limits and enabled modules.</p></div>
        ${gridAddButton("Plan", "create-subscription")}
      </div>
      ${plans.length ? table(["Plan", "Monthly", "Yearly", "Branches", "Users", "Storage", "Support", "Status", "Modules", "Actions"], plans.map((plan) => [
        plan.name,
        money(Number(plan.monthlyPrice || 0)),
        money(Number(plan.yearlyPrice || 0)),
        plan.branches,
        plan.users,
        formatGb(plan.storageGb),
        plan.supportLevel || "Standard",
        badge(plan.status || "Active", statusClass(plan.status || "Active")),
        plan.modules || asArray(plan.enabledModules).join(", "),
        `<div class="grid-actions">${gridActions("subscriptions", plan.id)}${hasPermission(currentUser, "subscriptions", "delete") && plan.status !== "Disabled" ? `<button class="icon-button danger" type="button" data-action="disable-subscription" data-plan="${escapeHtml(plan.id)}">Disable</button>` : ""}</div>`
      ])) : emptyState("No subscription plans found. Use Add Plan to start plan setup.")}
    </section>
  `;
}

export function offersPage() {
  const offers = api.offers(currentUser);
  const active = offers.filter((offer) => offer.status !== "Disabled").length;
  return `
    <section class="panel">
      <div class="panel-head">
        <div><h3>Offers &amp; coupons</h3><p>Super Admin creates discount offers and coupon codes for subscription plans.</p></div>
        <div class="button-row"><span class="badge status-active">${active} active</span>${gridAddButton("Offer", "create-offer")}</div>
      </div>
      ${offers.length ? table(["Offer", "Code", "Discount", "Applies to", "Valid", "Redemptions", "Status", "Actions"], offers.map((offer) => {
        const discount = (offer.discountType === "Flat") ? money(Number(offer.discountValue || 0)) : `${Number(offer.discountValue || 0)}%`;
        const validity = (offer.validFrom || offer.validTo) ? `${offer.validFrom || "—"} → ${offer.validTo || "—"}` : "Always";
        const redemptions = `${Number(offer.redeemedCount || 0)}${Number(offer.maxRedemptions || 0) ? ` / ${offer.maxRedemptions}` : ""}`;
        return [
          offer.name,
          `<strong>${escapeHtml(offer.code || "")}</strong>`,
          discount,
          offer.appliesTo || asArray(offer.appliesToPlans).join(", ") || "All plans",
          validity,
          redemptions,
          badge(offer.status || "Active", statusClass(offer.status || "Active")),
          `<div class="grid-actions">${gridActions("offers", offer.id)}${hasPermission(currentUser, "offers", "delete") && offer.status !== "Disabled" ? `<button class="icon-button danger" type="button" data-action="disable-offer" data-offer="${escapeHtml(offer.id)}">Disable</button>` : ""}</div>`
        ];
      })) : emptyState("No offers yet. Use Add Offer to create your first discount coupon.")}
    </section>
  `;
}

export function modulesPage() {
  return `
    <section class="panel">
      <div class="panel-head"><h3>Master modules</h3><p>Modules can be enabled per hospital subscription.</p></div>
      <div class="module-grid">
        ${MASTER_MODULES.map((module, index) => `
          <div class="module-tile">
            <div><strong>${module}</strong><small>${index < 8 ? "Available for active plans" : "Requires rollout approval"}</small></div>
            <span class="badge ${index < 8 ? "status-active" : "status-inactive"}">${index < 8 ? "Enabled" : "Phase 2"}</span>
            <button class="button tiny" type="button" data-action="module-toggle" data-module="${escapeHtml(module)}">${index < 8 ? "Manage" : "Request"}</button>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

export function productFlowPage() {
  const sections = [
    ["Platform Setup", ["Super Admin logs in", "Creates hospital", "Assigns subscription plan", "Creates Hospital Admin", "Checks provider status", "Monitors audit and governance"]],
    ["Hospital Setup", ["Hospital Admin creates main/sub branches", "Creates Branch Admins", "Reviews hospital operations", "Manages access reviews and permission templates"]],
    ["Branch Setup", ["Branch Admin creates operational users", "Assigns job role, branch, pages, and action permissions", "Reception, Doctor, Duty Doctor, Nurse, Lab, Radiology, Pharmacy, Billing, HR, Inventory, Claims, Quality, and Branch Manager use scoped access"]],
    ["OPD Flow", ["Registration with MRN", "Appointment booking with patient auto-fill", "Check-in to queue", "Vitals", "Doctor consultation", "Lab/Radiology and Pharmacy", "Billing", "Checkout"]],
    ["IPD Flow", ["Admission request", "Bed assignment", "IPD Patient 360", "Daily sheets, duty doctor notes, nursing notes, MAR, intake/output", "Discharge summary", "Death Summary for death/expired outcomes"]],
    ["Documents", ["Authorized upload to Cloudflare R2", "MongoDB metadata only", "Hospital/branch/patient/admission scoping", "Permission-controlled download and delete", "Audit logs for every sensitive document action"]],
    ["Account Security", ["Profile view/update for safe fields", "Change password", "Forgot/reset password through Resend", "Hashed expiring single-use reset tokens", "No passwords or reset tokens in logs"]],
    ["Governance", ["Access reviews", "Permission templates", "Audit logs", "Provider status", "RBAC, tenant isolation, branch isolation, and action-level permissions across the product"]],
    ["Go-Live Readiness", ["Production safety check", "Smoke test", "Provider verification", "Manual QA checklist", "GitHub Actions CI", "Staging verification before production release"]]
  ];
  return `
    <div class="dashboard-grid" data-testid="product-flow-page">
      <section class="panel wide">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Product Reference</p>
            <h3>Hospital Operations Command Center — End-to-End Product Flow</h3>
            <p>Production-ready journey from platform setup to patient care, IPD, documents, account security, governance, provider verification, and go-live readiness.</p>
          </div>
          <a class="button soft" href="docs/END_TO_END_PRODUCT_FLOW.md" target="_blank" rel="noreferrer">Open Markdown</a>
        </div>
        <div class="flow-map">
          <span>Super Admin</span><span>Hospital Admin</span><span>Branch Admin</span><span>Branch Users</span>
        </div>
        <div class="notice subtle">
          Every role sees only allowed pages. Every action is permission-controlled. Users cannot access other hospitals, and branch users cannot access other branches unless explicitly assigned.
        </div>
      </section>
      ${sections.map(([title, items]) => `
        <section class="panel">
          <div class="panel-head compact"><h3>${escapeHtml(title)}</h3></div>
          <ul class="check-list">
            ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `).join("")}
      <section class="panel wide">
        <div class="panel-head"><h3>Command References</h3><p>Use these before live release.</p></div>
        <div class="code-grid">
          <code>npm run check:production</code>
          <code>npm run test:smoke</code>
          <code>npm run verify:providers</code>
          <code>npm run build</code>
        </div>
      </section>
    </div>
  `;
}

export function profilePage() {
  const hospitals = hasPermission(currentUser, "hospitals", "view") ? safeOptionalData(() => api.hospitals(currentUser), []) : [];
  const branches = hasPermission(currentUser, "branches", "view") ? safeOptionalData(() => api.branches(currentUser), []) : [];
  const hospital = hospitals.find((item) => String(item.id) === String(currentUser.hospitalId));
  const branch = branches.find((item) => String(item.id) === String(currentUser.branchId));
  const hospitalLabel = hospital?.name || currentUser.hospitalName || currentUser.hospital || currentUser.hospitalId || "Platform";
  const branchLabel = branch ? `${branch.branchType || "Main Branch"}: ${branch.name}` : currentUser.branchName || currentUser.branch || currentUser.branchId || "All branches";
  const jobRole = currentUser.jobRole || currentUser.roleName || roleLabels[currentUser.role] || currentUser.role;
  return `
    <div class="dashboard-grid">
      <section class="panel profile-panel" data-testid="profile-details-card">
        <div class="avatar">${escapeHtml(currentUser.name.slice(0, 1))}</div>
        <div>
          <p class="eyebrow">${escapeHtml(roleLabels[currentUser.role])}</p>
          <h2>${escapeHtml(currentUser.name)}</h2>
          <p>${escapeHtml(currentUser.email)}</p>
          <span class="badge status-active">${escapeHtml(scopeDescription(currentUser))}</span>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><h3>Profile details</h3><p>Update only personal contact details. Role, branch, hospital, and permissions are controlled by administrators.</p></div>
        <form class="form-grid compact-grid" data-action="update-profile">
          <label>Full name<input name="name" required value="${escapeHtml(currentUser.name || "")}" /></label>
          <label>Mobile number<input name="mobile" inputmode="tel" value="${escapeHtml(currentUser.mobile || "")}" /></label>
          <label>Email / Username<input value="${escapeHtml(currentUser.email || "")}" disabled /></label>
          <label>Role<input value="${escapeHtml(roleLabels[currentUser.role] || currentUser.role)}" disabled /></label>
          <label>Job role<input value="${escapeHtml(jobRole || "-")}" disabled /></label>
          <label>Hospital<input value="${escapeHtml(hospitalLabel)}" disabled /></label>
          <label>Branch<input value="${escapeHtml(branchLabel)}" disabled /></label>
          <label>Account status<input value="${escapeHtml(currentUser.status || (currentUser.isActive === false ? "Inactive" : "Active"))}" disabled /></label>
          <button class="button primary" type="submit">Save Profile</button>
        </form>
      </section>
      <section class="panel wide">
        <div class="panel-head"><h3>Change password</h3><p>Use a strong password. Passwords are never logged or shown after saving.</p></div>
        <form class="form-grid compact-grid" data-action="change-password">
          ${passwordField({ label: "Current password", name: "currentPassword", autocomplete: "current-password", testid: "change-password-current", revealable: false })}
          ${passwordField({ label: "New password", name: "newPassword", minlength: 12, autocomplete: "new-password", testid: "change-password-new" })}
          ${passwordField({ label: "Confirm password", name: "confirmPassword", minlength: 12, autocomplete: "new-password", testid: "change-password-confirm" })}
          <div class="span-2">${passwordPolicyHint("current account")}</div>
          <div class="notice subtle span-2">Minimum 12 characters with uppercase, lowercase, number, and special character. Do not use your name or email.</div>
          <button class="button primary" type="submit">Change password</button>
        </form>
      </section>
      <section class="panel wide">
        <div class="panel-head"><h3>Account security</h3><p>Recent account activity for your login.</p></div>
        <div class="detail-grid">
          <span><strong>Last login</strong>${escapeHtml(formatDateTime(currentUser.lastLoginAt || currentUser.lastLogin))}</span>
          <span><strong>Password last changed</strong>${escapeHtml(formatDateTime(currentUser.passwordChangedAt))}</span>
          <span><strong>MFA</strong>${currentUser.mfaEnabled ? "Enabled" : "Not enabled"}</span>
          <span><strong>Permissions</strong>Managed by administrator</span>
        </div>
      </section>
    </div>
  `;
}
