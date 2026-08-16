import { normalizePageKey } from "../lib/rbac.js";

const ROUTE_ALIASES = {
  "ipd-patient-360": "ipdPatient360",
  "product-flow": "productFlow"
};

const ROUTE_PATHS = {
  ipdPatient360: "ipd-patient-360",
  productFlow: "product-flow",
  ipdReports: "daily-ipd-report",
  nursing: "ipd-nursing",
  ipdVitals: "ipd-vitals",
  dutyDoctor: "duty-doctor",
  intakeOutput: "intake-output",
  tasks: "my-tasks",
  ipd: "ipd-overview",
  stock: "stock-logic"
};

function queryParams(query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") params.set(key, value);
  });
  return params;
}

export function parseHashRoute(hash = location.hash) {
  const raw = String(hash || "").replace(/^#\/?/, "");
  const [routePart = "", queryString = ""] = raw.split("?");
  const routeKey = routePart.replace(/^\/+/, "") || "dashboard";
  return {
    route: normalizePageKey(ROUTE_ALIASES[routeKey] || routeKey),
    query: Object.fromEntries(new URLSearchParams(queryString))
  };
}

export function pageFromHash() {
  return parseHashRoute().route;
}

export function routeKey(page, query = {}) {
  return `${page}?${queryParams(query).toString()}`;
}

export function setPage(page, query = {}) {
  const params = queryParams(query);
  const normalizedPage = normalizePageKey(page);
  location.hash = `#/${ROUTE_PATHS[normalizedPage] || normalizedPage}${params.toString() ? `?${params}` : ""}`;
}
