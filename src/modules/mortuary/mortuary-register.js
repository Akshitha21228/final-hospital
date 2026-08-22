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

function releasedTo(record = {}) {
  return (
    record.releasedTo ||
    record.release?.releasedTo ||
    "-"
  );
}

export function mortuaryRegisterPage({
  api,
  currentUser
}) {
  const records = asArray(
    api.mortuaryRecords(currentUser)
  );

  return `
    <section class="panel role-page-heading">

      <div class="panel-head">
        <div>
          <p class="eyebrow">Records</p>
          <h3>Mortuary Register</h3>
          <p>
            Complete register of death, storage,
            certificate and release records.
          </p>
        </div>
      </div>

    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Mortuary Records</h3>
          <p>
            ${records.length}
            ${records.length === 1 ? "record" : "records"}
          </p>
        </div>
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
                    <th>Age / Gender</th>
                    <th>Date of Death</th>
                    <th>Storage</th>
                    <th>Certificate</th>
                    <th>Released To</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  ${records
                    .map(
                      (record) => `
                        <tr>

                          <td>
                            <strong>
                              ${escapeHtml(
                                caseNumber(record)
                              )}
                            </strong>
                          </td>

                          <td>
                            ${escapeHtml(
                              deceasedName(record)
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              record.mrn || "-"
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              [
                                record.age,
                                record.gender
                              ]
                                .filter(Boolean)
                                .join(" / ") || "-"
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              record.dateOfDeath || "-"
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              storageUnit(record)
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              certificateNumber(record)
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              releasedTo(record)
                            )}
                          </td>

                          <td>
                            ${escapeHtml(
                              record.status || "Registered"
                            )}
                          </td>

                        </tr>
                      `
                    )
                    .join("")}

                </tbody>

              </table>
            </div>
          `
          : `
            <div class="empty-state">
              <strong>No mortuary cases found.</strong>
              <p>
                Registered deaths will appear here.
              </p>
            </div>
          `
      }

    </section>
  `;
}