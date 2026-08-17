import { ROLES } from "../lib/rbac.js";

export const roleLabels = {
  [ROLES.SUPER_ADMIN]: "Super Admin",
  [ROLES.HOSPITAL_ADMIN]: "Hospital Admin",
  [ROLES.BRANCH_ADMIN]: "Branch Admin",
  [ROLES.BRANCH_USER]: "Branch User"
};

export const COLLECTION_MODULES = {
  hospitals: "hospitals",
  branches: "branches",
  users: "users",
  subscriptions: "subscriptions",
  offers: "offers",
  otBookings: "ot",
  radiologyOrders: "radiology",
  mortuaryRecords: "mortuary",
  appointments: "appointments",
  patients: "patients",
  alerts: "alerts",
  tasks: "tasks",
  masterDataItems: "masterData",
  inventory: "inventory",
  staff: "staff",
  beds: "beds",
  incidents: "incidents"
};

export const USER_PERMISSION_GROUPS = [
  {
    key: "common",
    label: "Common",
    testId: "permissions-group-common",
    pages: [
      ["dashboard", "My Dashboard"],
      ["notifications", "Notifications"],
      ["globalSearch", "Global Search"],
      ["records", "My Records"],
      ["tasks", "My Tasks"],
      ["alerts", "Alerts"],
      ["reports", "Reports"]
    ]
  },
  {
    key: "patientFlow",
    label: "Patient Flow",
    testId: "permissions-group-patient-flow",
    pages: [
      ["appointments", "Appointments"],
      ["patients", "Patients"],
      ["queue", "Queue"],
      ["vitals", "Vitals"],
      ["consultation", "Doctor Consultation"],
      ["checkout", "Checkout"],
      ["followups", "Follow-up"]
    ]
  },
  {
    key: "clinical",
    label: "Clinical",
    testId: "permissions-group-clinical",
    pages: [
      ["lab", "Lab / Radiology"],
      ["radiology", "Radiology"],
      ["pharmacy", "Prescriptions"],
      ["admissions", "Admissions"],
      ["ipd", "IPD Patients"],
      ["wards", "Wards / Beds"],
      ["dailySheets", "Daily Patient Sheet"],
      ["nursing", "Nursing Notes"],
      ["dutyDoctor", "Duty Doctor Notes"],
      ["ipdVitals", "IPD Vitals"],
      ["mar", "Medication Administration Record"],
      ["intakeOutput", "Intake / Output Chart"],
      ["handover", "Handover"],
      ["discharge", "Discharge Planning"],
      ["deathSummary", "Death Summary"],
      ["ipdReports", "Discharge Summary"],
      ["emergency", "Emergency"]
    ]
  },
  {
    key: "billing",
    label: "Billing & Claims",
    testId: "permissions-group-billing",
    pages: [
      ["billing", "Billing"],
      ["billing", "Generate Bill"],
      ["billing", "Collect Payment"],
      ["billing", "Refunds"],
      ["claims", "Insurance Claims"],
      ["documents", "Claims Documents"],
      ["finance", "Finance Reports"]
    ]
  },
  {
    key: "pharmacy",
    label: "Pharmacy & Inventory",
    testId: "permissions-group-pharmacy",
    pages: [
      ["pharmacy", "Pharmacy"],
      ["pharmacy", "Medicine Issue"],
      ["stock", "Stock View"],
      ["stock", "Add Stock"],
      ["inventory", "Inventory"],
      ["purchase", "Purchase Requests"],
      ["purchase", "Goods Receipt"],
      ["alerts", "Low Stock Alerts"]
    ]
  },
  {
    key: "admin",
    label: "Administration",
    testId: "permissions-group-admin",
    pages: [
      ["users", "Users & Roles", true],
      ["settings", "Branch Settings", true],
      ["masterData", "Master Data"],
      ["masterData", "Service Price Master"],
      ["staff", "Staff Directory"],
      ["doctorSchedule", "Doctor Schedule"],
      ["staffRoster", "Staff Roster"],
      ["incidents", "Incidents"],
      ["feedback", "Feedback"],
      ["accessReview", "User Access Review"],
      ["audit", "Audit Logs", true]
    ]
  }
];

export const USER_ROLE_PRESETS = {
  "Reception User": ["dashboard", "patients", "admissions", "billing"],
  Doctor: ["dashboard", "patients", "queue", "consultation", "vitals", "lab", "radiology", "pharmacy", "admissions", "deathSummary", "reports", "alerts", "tasks"],
  "Duty Doctor": ["dashboard", "ipd", "ipdPatient360", "dailySheets", "dutyDoctor", "ipdVitals", "handover", "discharge", "alerts", "tasks"],
  Nurse: ["dashboard", "patients", "queue", "vitals", "ipd", "ipdPatient360", "wards", "dailySheets", "nursing", "mar", "ipdVitals", "intakeOutput", "tasks", "alerts"],
  "Lab User": ["dashboard", "patients", "queue", "lab", "documents", "reports", "alerts", "tasks"],
  "Radiology User": ["dashboard", "patients", "radiology", "lab", "documents", "reports", "alerts", "tasks"],
  "Pharmacy User": ["dashboard", "patients", "pharmacy", "stock", "alerts", "reports", "tasks"],
  "Billing User": ["dashboard", "patients", "billing", "checkout", "claims", "reports", "tasks"],
  "Claims Officer": ["dashboard", "patients", "claims", "documents", "billing", "reports", "tasks"],
  "HR / Staff Admin": ["dashboard", "staff", "staffRoster", "doctorSchedule", "reports", "tasks", "alerts"],
  "Inventory Officer": ["dashboard", "inventory", "purchase", "stock", "alerts", "reports", "tasks"],
  "Quality Officer": ["dashboard", "incidents", "feedback", "reports", "tasks", "alerts"],
  "Incident Officer": ["dashboard", "incidents", "feedback", "reports", "tasks", "alerts"],
  "Branch Manager": ["dashboard", "appointments", "patients", "queue", "billing", "pharmacy", "stock", "inventory", "purchase", "reports", "alerts", "tasks", "globalSearch", "accessReview"]
};

export const USER_ROLE_MODULES = {
  "Reception User": ["Patient Flow", "Admissions", "Billing"],
  Doctor: ["Patient Flow", "Consultation", "Vitals", "Lab", "Radiology", "Pharmacy", "Admissions", "Death Summary", "Reports", "Alerts", "Tasks"],
  "Duty Doctor": ["IPD", "IPD Patient 360", "Daily Sheets", "Duty Doctor", "IPD Vitals", "Handover", "Discharge", "Alerts", "Tasks"],
  Nurse: ["Patient Flow", "Queue", "OPD Vitals", "IPD", "IPD Patient 360", "Wards / Beds", "Daily Sheets", "IPD Nursing", "MAR", "IPD Vitals", "Intake / Output", "Alerts", "Tasks"],
  "Lab User": ["Patient Flow", "Queue", "Lab", "Documents", "Reports", "Alerts", "Tasks"],
  "Radiology User": ["Patient Flow", "Radiology", "Lab", "Documents", "Reports", "Alerts", "Tasks"],
  "Pharmacy User": ["Patient Flow", "Pharmacy", "Stock", "Reports", "Alerts", "Tasks"],
  "Billing User": ["Patient Flow", "Billing", "Checkout", "Claims", "Reports", "Tasks"],
  "Claims Officer": ["Patient Flow", "Claims", "Documents", "Billing", "Reports", "Tasks"],
  "HR / Staff Admin": ["Staff", "Duty Roster", "Doctor Schedule", "Reports", "Tasks", "Alerts"],
  "Inventory Officer": ["Inventory", "Purchase", "Stock", "Reports", "Tasks"],
  "Quality Officer": ["Incidents", "Feedback", "Reports", "Tasks", "Alerts"],
  "Incident Officer": ["Incidents", "Feedback", "Reports", "Tasks", "Alerts"],
  "Branch Manager": ["Appointments", "Patient Flow", "Billing", "Pharmacy", "Stock", "Inventory", "Purchase", "Reports", "Alerts", "Tasks", "Global Search", "User Access Review"]
};

export const USER_PERMISSION_ACTIONS = [
  ["view", "View"],
  ["create", "Create"],
  ["edit", "Edit"],
  ["delete", "Delete"],
  ["approve", "Approve"],
  ["export", "Export"],
  ["assignTask", "Assign Task"],
  ["refund", "Refund"],
  ["manageSettings", "Manage Settings"],
  ["manageUsers", "Manage Users"]
];

export const SENSITIVE_USER_PERMISSIONS = new Set(["delete", "approve", "export", "refund", "manageSettings", "manageUsers"]);

export const MASTER_MODULES = [
  "Patient Flow",
  "Appointments",
  "Staffing",
  "Bed Usage",
  "Claims",
  "Supply Usage",
  "Incidents",
  "Compliance",
  "Reports",
  "Tasks"
];

export const PAGE_TITLE_FALLBACK = {
  notifications: "Notifications",
  profile: "Profile",
  globalSearch: "Global Search",
  backup: "System Backup",
  subscriptions: "Subscriptions",
  modules: "Modules",
  ipdPatient360: "IPD Patient 360",
  productFlow: "End-to-End Product Flow"
};
