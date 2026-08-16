export const LOCAL_STORE_KEY = "hospital_operations_data";
export const LOCAL_STORE_VERSION = 1;
const LEGACY_STORE_KEY = "hocc_frontend_data_v1";

const COLLECTIONS = ["patients", "appointments", "queueTokens", "vitals", "consultations", "prescriptions", "prescriptionItems", "labOrders", "radiologyOrders", "admissionRecommendations", "admissions", "bills", "payments", "checkouts", "followUps", "notifications", "tasks", "alerts", "wards", "rooms", "beds", "masterDataItems", "dailyPatientSheets", "doctorProgressNotes", "dutyDoctorNotes", "nursingNotes", "ipdVitals", "medicationRecords", "intakeOutput", "doctorHandovers"];

const LOCAL_DEPARTMENTS = ["General Medicine", "Cardiology", "Pediatrics", "Orthopaedics"].map((name, index) => ({
  id: `local-department-${index + 1}`,
  type: "Department",
  name,
  branchId: "local-branch",
  status: "Active"
}));

const LOCAL_WARDS = [
  { id: "local-ward-general", name: "General Ward", branchId: "local-branch", status: "Active" },
  { id: "local-ward-private", name: "Private Ward", branchId: "local-branch", status: "Active" }
];

const LOCAL_BEDS = [
  { id: "local-bed-g101", bed: "G-101", bedNumber: "G-101", wardId: "local-ward-general", ward: "General Ward", branchId: "local-branch", status: "Available" },
  { id: "local-bed-g102", bed: "G-102", bedNumber: "G-102", wardId: "local-ward-general", ward: "General Ward", branchId: "local-branch", status: "Available" },
  { id: "local-bed-p101", bed: "P-101", bedNumber: "P-101", wardId: "local-ward-private", ward: "Private Ward", branchId: "local-branch", status: "Available" }
];

function emptyStore() {
  return Object.fromEntries([["version", LOCAL_STORE_VERSION], ...COLLECTIONS.map((name) => [name, []])]);
}

export function getStore() {
  // localStorage is a frontend demo database only. Production hospital data requires an authenticated backend, server-side RBAC, audit logging, encryption, and secure clinical-data handling.
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(LOCAL_STORE_KEY) || localStorage.getItem(LEGACY_STORE_KEY) || "{}"); } catch { saved = {}; }
  const aliases = { queuetokens: "queueTokens", followups: "followUps", dailypatientsheets: "dailyPatientSheets", doctorprogressnotes: "doctorProgressNotes", dutydoctornotes: "dutyDoctorNotes", nursingnotes: "nursingNotes", ipdvitals: "ipdVitals", medicationrecords: "medicationRecords", intakeoutput: "intakeOutput", doctorhandovers: "doctorHandovers" };
  Object.entries(aliases).forEach(([legacy, current]) => { if (!saved[current] && Array.isArray(saved[legacy])) saved[current] = saved[legacy]; });
  const store = { ...emptyStore(), ...saved, version: LOCAL_STORE_VERSION };
  COLLECTIONS.forEach((name) => { if (!Array.isArray(store[name])) store[name] = []; });
  if (!store.masterDataItems.some((item) => String(item.type || "").trim().toLowerCase() === "department" && String(item.branchId || "") === "local-branch")) {
    store.masterDataItems = [...store.masterDataItems, ...LOCAL_DEPARTMENTS];
    localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(store));
  }
  if (!store.wards.length) store.wards = [...LOCAL_WARDS];
  if (!store.beds.length) store.beds = [...LOCAL_BEDS];
  localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(store));
  return store;
}

export function saveStore(store) {
  const normalized = { ...emptyStore(), ...store, version: LOCAL_STORE_VERSION };
  localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function getCollection(name) { return getStore()[name] || []; }

export function addRecord(collection, record) {
  const store = getStore();
  store[collection] = [...(store[collection] || []), record];
  saveStore(store);
  return record;
}

export function updateRecord(collection, id, changes) {
  const store = getStore();
  store[collection] = (store[collection] || []).map((record) => String(record.id || record._id) === String(id) ? { ...record, ...changes, updatedAt: new Date().toISOString() } : record);
  saveStore(store);
  return store[collection].find((record) => String(record.id || record._id) === String(id)) || null;
}

export function findRecord(collection, id) { return getCollection(collection).find((record) => String(record.id || record._id) === String(id)) || null; }

export function nextSequence(collection) { return getCollection(collection).length + 1; }

export function createLocalId(prefix) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}
