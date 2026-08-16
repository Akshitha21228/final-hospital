// Browser entry point. Application orchestration lives in core/application.js.
import("./core/application.js?v=20260816-radiology-mortuary-shell-8").catch((error) => {
  console.error("HOCC startup failed", error);
  const root = document.querySelector("#app");
  if (root) {
    root.innerHTML = `<main class="auth-shell"><section class="auth-card narrow"><h1>Unable to start HOCC</h1><p>${String(error?.message || error)}</p></section></main>`;
  }
});
