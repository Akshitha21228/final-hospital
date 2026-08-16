const sensitivePatterns = [/authorization/i, /cookie/i, /password/i, /token/i, /refresh/i, /idProof/i, /card/i, /payment/i];

export function scrubFrontendEvent(value) {
  if (Array.isArray(value)) return value.map(scrubFrontendEvent);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      if (sensitivePatterns.some((pattern) => pattern.test(key))) return [key, "[redacted]"];
      if (/mobile/i.test(key) && typeof item === "string" && item.length > 5) return [key, `${item.slice(0, 5)}XXXXX`];
      return [key, scrubFrontendEvent(item)];
    })
  );
}

export async function initFrontendSentry(env = globalThis.__HOCC_ENV__ || import.meta.env || {}) {
  if (!env.VITE_SENTRY_DSN) return { enabled: false, reason: "missing_dsn" };
  try {
    const Sentry = await import("@sentry/browser");
    Sentry.init({
      dsn: env.VITE_SENTRY_DSN,
      environment: env.VITE_SENTRY_ENVIRONMENT || "development",
      beforeSend: scrubFrontendEvent
    });
    return { enabled: true, client: Sentry };
  } catch {
    return { enabled: false, reason: "package_not_installed" };
  }
}
