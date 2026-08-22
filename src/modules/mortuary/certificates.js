import { escapeHtml } from "../../utils/formatters.js";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function recordId(record = {}) {
  return String(
    record.id ||
    record._id ||
    record.recordId ||
    record.mortuaryId ||
    ""
  );
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

function isReleased(record = {}) {
  return (
    Boolean(record.releasedAt) ||
    /released|handover completed/i.test(String(record.status || ""))
  );
}

function certificateNumber(record = {}) {
  return (
    record.certificateNumber ||
    record.deathCertificateNumber ||
    record.certificate?.certificateNumber ||
    record.certificate?.number ||
    ""
  );
}

function certificateIssued(record = {}) {
  return (
    Boolean(certificateNumber(record)) ||
    Boolean(record.certificateIssuedAt) ||
    Boolean(record.certificate?.issuedAt) ||
    /certificate issued/i.test(String(record.status || ""))
  );
}

function isStored(record = {}) {
  return Boolean(
    record.bayNumber ||
    record.storageUnit ||
    record.storage?.unitNumber ||
    /stored/i.test(String(record.status || ""))
  );
}

function localDateValue() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function mortuaryCertificatesPage({
  api,
  currentUser
}) {
  const records = asArray(api.mortuaryRecords(currentUser));

  const eligible = records.filter(
    (record) =>
      isStored(record) &&
      !certificateIssued(record) &&
      !isReleased(record)
  );

  const issued = records.filter(
    (record) => certificateIssued(record)
  );

  const options = eligible
    .map(
      (record) => `
        <option value="${escapeHtml(recordId(record))}">
          ${escapeHtml(caseNumber(record))}
          -
          ${escapeHtml(deceasedName(record))}
        </option>
      `
    )
    .join("");

  const rows = issued
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(caseNumber(record))}</td>
          <td>${escapeHtml(deceasedName(record))}</td>
          <td>${escapeHtml(record.mrn || "-")}</td>
          <td>${escapeHtml(storageUnit(record))}</td>
          <td>${escapeHtml(certificateNumber(record) || "-")}</td>
          <td>${escapeHtml(
            record.certificateType ||
            record.certificate?.type ||
            "-"
          )}</td>
          <td>${escapeHtml(
            record.certificateIssueDate ||
            record.certificate?.issueDate ||
            "-"
          )}</td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="panel role-page-heading">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Mortuary</p>
          <h3>Certificates</h3>
          <p>Issue mortuary certificates and related documents.</p>
        </div>
      </div>
    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Issue Certificate</h3>
          <p>
            Only stored bodies without an issued certificate are shown.
          </p>
        </div>
      </div>

      ${
        eligible.length
          ? `
            <form
              class="form-grid compact-grid"
              data-action="mortuary-issue-certificate"
            >

              <label>
                Mortuary Case *
                <select name="recordId" required>
                  <option value="">Select mortuary case</option>
                  ${options}
                </select>
              </label>

              <label>
                Certificate Type *
                <select name="certificateType" required>
                  <option value="">Select certificate</option>
                  <option value="MCCD">
                    Medical Certificate / MCCD
                  </option>
                  <option value="Mortuary Certificate">
                    Mortuary Certificate
                  </option>
                  <option value="Body Release Document">
                    Body Release Document
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label>
                Certificate Number *
                <input
                  name="certificateNumber"
                  required
                  placeholder="Certificate number"
                />
              </label>

              <label>
                Issue Date *
                <input
                  name="issueDate"
                  type="date"
                  value="${localDateValue()}"
                  required
                />
              </label>

              <label>
                Issued By *
                <input
                  name="issuedBy"
                  value="${escapeHtml(
                    currentUser?.name ||
                    currentUser?.email ||
                    ""
                  )}"
                  required
                />
              </label>

              <label>
                Cause of Death *
                <input
                  name="causeOfDeath"
                  required
                  placeholder="Cause of death"
                />
              </label>

              <label class="span-2">
                Remarks
                <textarea
                  name="remarks"
                  placeholder="Certificate remarks"
                ></textarea>
              </label>

              <button
                class="button primary"
                type="submit"
              >
                Issue Certificate
              </button>

            </form>
          `
          : `
            <div class="empty-state">
              <strong>No certificates currently pending.</strong>
              <p>
                The body must first be assigned to Body Storage.
              </p>
            </div>
          `
      }
    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Issued Certificates</h3>
        </div>
      </div>

      ${
        issued.length
          ? `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Deceased</th>
                    <th>MRN</th>
                    <th>Storage</th>
                    <th>Certificate No.</th>
                    <th>Type</th>
                    <th>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          `
          : `
            <div class="empty-state">
              No certificates have been issued.
            </div>
          `
      }

    </section>
  `;
}

export async function submitMortuaryCertificate({
  api,
  currentUser,
  values
}) {
  if (!values.recordId) {
    throw new Error("Please select a mortuary case.");
  }

  if (!values.certificateType) {
    throw new Error("Certificate Type is required.");
  }

  if (!values.certificateNumber?.trim()) {
    throw new Error("Certificate Number is required.");
  }

  if (!values.issueDate) {
    throw new Error("Issue Date is required.");
  }

  if (!values.issuedBy?.trim()) {
    throw new Error("Issued By is required.");
  }

  if (!values.causeOfDeath?.trim()) {
    throw new Error("Cause of Death is required.");
  }

  await api.issueDeathCertificate(
    currentUser,
    values.recordId,
    {
      causeOfDeath: values.causeOfDeath.trim(),

      certificateType: values.certificateType,

      certificateNumber:
        values.certificateNumber.trim(),

      issueDate: values.issueDate,

      issuedBy: values.issuedBy.trim(),

      remarks: values.remarks || ""
    }
  );

  return "Certificate issued successfully.";
}