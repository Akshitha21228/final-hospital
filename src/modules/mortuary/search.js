import { escapeHtml } from "../../utils/formatters.js";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function caseNumber(record = {}) {
  return (
    record.mortuaryCaseId ||
    record.registrationNumber ||
    record.regNumber ||
    record.caseId ||
    record.id ||
    "-"
  );
}

function deceasedName(record = {}) {
  return record.deceasedName || record.patientName || record.name || "-";
}

function storageUnit(record = {}) {
  return (
    record.bayNumber ||
    record.storageUnit ||
    record.storage?.unitNumber ||
    "-"
  );
}

function certificateNumber(record = {}) {
  return (
    record.certificateNumber ||
    record.deathCertificateNumber ||
    record.certificate?.certificateNumber ||
    "-"
  );
}

export function mortuarySearchPage({
  api,
  currentUser
}) {
  const records = asArray(
    api.mortuaryRecords(currentUser)
  );

  const rows = records
    .map((record) => {
      const searchText = [
        caseNumber(record),
        deceasedName(record),
        record.mrn,
        record.relativeName,
        record.relativeMobile,
        record.mobile,
        record.dateOfDeath,
        storageUnit(record),
        certificateNumber(record),
        record.policeReference,
        record.policeStation,
        record.status
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return `
        <tr
          data-mortuary-search-row
          data-search-text="${escapeHtml(searchText)}"
        >

          <td>
            ${escapeHtml(caseNumber(record))}
          </td>

          <td>
            ${escapeHtml(deceasedName(record))}
          </td>

          <td>
            ${escapeHtml(record.mrn || "-")}
          </td>

          <td>
            ${escapeHtml(record.dateOfDeath || "-")}
          </td>

          <td>
            ${escapeHtml(storageUnit(record))}
          </td>

          <td>
            ${escapeHtml(certificateNumber(record))}
          </td>

          <td>
            ${escapeHtml(record.status || "Registered")}
          </td>

        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel role-page-heading">

      <div class="panel-head">
        <div>
          <p class="eyebrow">Records</p>
          <h3>Patient / Case Search</h3>
          <p>
            Search deceased name, MRN, case ID,
            certificate or storage unit.
          </p>
        </div>
      </div>

    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Search Mortuary Records</h3>
        </div>
      </div>

      <div class="pharmacy-search-box">
        <input
          type="search"
          placeholder="Search case ID, deceased name, MRN, certificate..."
          data-mortuary-search
          autocomplete="off"
        />
      </div>

      ${
        records.length
          ? `
            <div class="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Deceased</th>
                    <th>MRN</th>
                    <th>Date of Death</th>
                    <th>Storage</th>
                    <th>Certificate</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody data-mortuary-search-results>
                  ${rows}
                </tbody>

              </table>

            </div>

            <div
              class="empty-state hidden"
              data-mortuary-no-results
            >
              No matching mortuary records found.
            </div>
          `
          : `
            <div class="empty-state">
              No mortuary records found.
            </div>
          `
      }

    </section>
  `;
}

/*
  This listener is added only once when this module
  is imported by application.js.
*/

document.addEventListener("input", (event) => {
  const input =
    event.target.closest?.("[data-mortuary-search]");

  if (!input) {
    return;
  }

  const query = String(input.value || "")
    .trim()
    .toLowerCase();

  const rows = [
    ...document.querySelectorAll(
      "[data-mortuary-search-row]"
    )
  ];

  let visibleCount = 0;

  rows.forEach((row) => {
    const text = String(
      row.dataset.searchText || ""
    ).toLowerCase();

    const visible =
      !query || text.includes(query);

    row.style.display = visible ? "" : "none";

    if (visible) {
      visibleCount += 1;
    }
  });

  const noResults =
    document.querySelector(
      "[data-mortuary-no-results]"
    );

  if (noResults) {
    noResults.classList.toggle(
      "hidden",
      visibleCount > 0
    );
  }
});