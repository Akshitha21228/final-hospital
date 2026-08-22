export function mortuaryReportsPage({ api, currentUser }) {
  const records = Array.isArray(api.mortuaryRecords(currentUser))
    ? api.mortuaryRecords(currentUser)
    : [];

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Mortuary</p>
          <h3>Reports</h3>
          <p>Mortuary reporting and statistics.</p>
        </div>
      </div>

      <div class="metric-grid small">
        <article class="metric-card">
          <span>Total Mortuary Records</span>
          <strong>${records.length}</strong>
        </article>
      </div>
    </section>
  `;
}