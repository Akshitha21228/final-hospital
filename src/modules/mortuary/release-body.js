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

function isMlc(record = {}) {
  return (
    record.mlcCase === true ||
    record.mlcCase === "true" ||
    record.isMlc === true
  );
}

function isReleased(record = {}) {
  return (
    Boolean(record.releasedAt) ||
    /released|handover completed/i.test(
      String(record.status || "")
    )
  );
}

function certificateIssued(record = {}) {
  return (
    Boolean(record.certificateNumber) ||
    Boolean(record.deathCertificateNumber) ||
    Boolean(record.certificate?.certificateNumber) ||
    Boolean(record.certificateIssuedAt) ||
    /certificate issued/i.test(
      String(record.status || "")
    )
  );
}

function localDateValue() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function localTimeValue() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

export function mortuaryReleasePage({
  api,
  currentUser
}) {
  const records = asArray(api.mortuaryRecords(currentUser));

  const ready = records.filter(
    (record) =>
      certificateIssued(record) &&
      !isReleased(record)
  );

  const released = records.filter(isReleased);

  const options = ready
    .map(
      (record) => `
        <option value="${escapeHtml(recordId(record))}">
          ${escapeHtml(caseNumber(record))}
          -
          ${escapeHtml(deceasedName(record))}
          ${isMlc(record) ? " - MLC" : ""}
        </option>
      `
    )
    .join("");

  return `
    <section class="panel role-page-heading">

      <div class="panel-head">
        <div>
          <p class="eyebrow">Mortuary</p>
          <h3>Release Body</h3>
          <p>
            Record body release to an authorized relative or authority.
          </p>
        </div>
      </div>

    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Body Release</h3>
          <p>
            Certificate issuance must be completed before release.
          </p>
        </div>
      </div>

      ${
        ready.length
          ? `
            <form
              class="form-grid compact-grid"
              data-action="mortuary-release-body"
            >

              <label>
                Mortuary Case *
                <select name="recordId" required>
                  <option value="">Select mortuary case</option>
                  ${options}
                </select>
              </label>

              <label>
                Released To *
                <input
                  name="releasedTo"
                  required
                  placeholder="Receiver name"
                />
              </label>

              <label>
                Relationship *
                <input
                  name="relationship"
                  required
                  placeholder="Example: Son"
                />
              </label>

              <label>
                Mobile Number *
                <input
                  name="mobile"
                  required
                  placeholder="10-digit mobile number"
                />
              </label>

              <label>
                ID Type
                <select name="idType">
                  <option value="">Select ID</option>
                  <option>Aadhaar</option>
                  <option>Driving Licence</option>
                  <option>Passport</option>
                  <option>Voter ID</option>
                  <option>Police ID</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                ID Number
                <input
                  name="idNumber"
                  placeholder="Receiver ID number"
                />
              </label>

              <label>
                Release Date *
                <input
                  name="releaseDate"
                  type="date"
                  value="${localDateValue()}"
                  required
                />
              </label>

              <label>
                Release Time *
                <input
                  name="releaseTime"
                  type="time"
                  value="${localTimeValue()}"
                  required
                />
              </label>

              <label>
                Police Clearance
                <select name="policeClearance">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>

              <label>
                Police Clearance Reference
                <input
                  name="policeClearanceReference"
                  placeholder="Reference number"
                />
              </label>

              <label class="span-2">
                Release Notes
                <textarea
                  name="releaseNotes"
                  placeholder="Body handover notes"
                ></textarea>
              </label>

              <button
                class="button primary"
                type="submit"
              >
                Release Body
              </button>

            </form>
          `
          : `
            <div class="empty-state">
              <strong>No bodies currently ready for release.</strong>
              <p>
                Complete storage and certificate issuance first.
              </p>
            </div>
          `
      }

    </section>

    <section class="panel">

      <div class="panel-head">
        <div>
          <h3>Released Bodies</h3>
          <p>${released.length} released records.</p>
        </div>
      </div>

      ${
        released.length
          ? `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Deceased</th>
                    <th>Released To</th>
                    <th>Relationship</th>
                    <th>Released Date</th>
                  </tr>
                </thead>

                <tbody>
                  ${released
                    .map(
                      (record) => `
                        <tr>
                          <td>${escapeHtml(
                            caseNumber(record)
                          )}</td>

                          <td>${escapeHtml(
                            deceasedName(record)
                          )}</td>

                          <td>${escapeHtml(
                            record.releasedTo ||
                            record.release?.releasedTo ||
                            "-"
                          )}</td>

                          <td>${escapeHtml(
                            record.relationship ||
                            record.release?.relationship ||
                            "-"
                          )}</td>

                          <td>${escapeHtml(
                            record.releaseDate ||
                            record.releasedAt ||
                            "-"
                          )}</td>
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
              No bodies have been released.
            </div>
          `
      }

    </section>
  `;
}

export async function submitMortuaryRelease({
  api,
  currentUser,
  values
}) {
  if (!values.recordId) {
    throw new Error("Please select a mortuary case.");
  }

  if (!values.releasedTo?.trim()) {
    throw new Error("Receiver Name is required.");
  }

  if (!values.relationship?.trim()) {
    throw new Error("Relationship is required.");
  }

  if (!values.mobile?.trim()) {
    throw new Error("Mobile Number is required.");
  }

  if (!values.releaseDate) {
    throw new Error("Release Date is required.");
  }

  if (!values.releaseTime) {
    throw new Error("Release Time is required.");
  }

  const records = asArray(
    api.mortuaryRecords(currentUser)
  );

  const selected = records.find(
    (record) =>
      recordId(record) === String(values.recordId)
  );

  if (!selected) {
    throw new Error("Mortuary case not found.");
  }

  const policeClearance =
    values.policeClearance === "true";

  if (isMlc(selected) && !policeClearance) {
    throw new Error(
      "Police clearance is required before releasing an MLC case."
    );
  }

  await api.releaseMortuaryBody(
    currentUser,
    values.recordId,
    {
      releasedTo: values.releasedTo.trim(),

      relationship: values.relationship.trim(),

      mobile: values.mobile.trim(),

      idType: values.idType || "",
      idNumber: values.idNumber || "",

      releaseDate: values.releaseDate,
      releaseTime: values.releaseTime,

      releasedBy:
        currentUser?.name ||
        currentUser?.email ||
        "Mortuary Officer",

      policeClearance,

      policeClearanceReference:
        values.policeClearanceReference || "",

      notes: values.releaseNotes || ""
    }
  );

  return "Body released successfully.";
}