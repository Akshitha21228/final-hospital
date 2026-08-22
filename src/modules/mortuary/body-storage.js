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

function isReleased(record = {}) {
  return (
    Boolean(record.releasedAt) ||
    Boolean(record.release?.releasedAt) ||
    /released|handover completed/i.test(String(record.status || ""))
  );
}

function storageUnit(record = {}) {
  return (
    record.bayNumber ||
    record.storageUnit ||
    record.storage?.unitNumber ||
    record.storage?.bayNumber ||
    ""
  );
}

function hasStorage(record = {}) {
  return Boolean(storageUnit(record));
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

export function mortuaryStoragePage({ api, currentUser }) {
  const records = asArray(api.mortuaryRecords(currentUser));

  const waiting = records.filter(
    (record) => !isReleased(record) && !hasStorage(record)
  );

  const stored = records.filter(
    (record) => !isReleased(record) && hasStorage(record)
  );

  const options = waiting
    .map(
      (record) => `
        <option value="${escapeHtml(recordId(record))}">
          ${escapeHtml(caseNumber(record))} - ${escapeHtml(
            deceasedName(record)
          )}
        </option>
      `
    )
    .join("");

  const storedRows = stored
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(caseNumber(record))}</td>
          <td>${escapeHtml(deceasedName(record))}</td>
          <td>${escapeHtml(record.mrn || "-")}</td>
          <td>${escapeHtml(storageUnit(record) || "-")}</td>
          <td>${escapeHtml(record.storageDate || record.storage?.storageDate || "-")}</td>
          <td>${escapeHtml(record.status || "Stored")}</td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="panel role-page-heading">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Mortuary</p>
          <h3>Body Storage</h3>
          <p>Assign registered deceased cases to mortuary storage.</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Assign Body Storage</h3>
          <p>Only cases not yet assigned to storage are shown.</p>
        </div>
      </div>

      ${
        waiting.length
          ? `
            <form
              class="form-grid compact-grid"
              data-action="mortuary-store-body"
            >
              <label>
                Mortuary Case *
                <select name="recordId" required>
                  <option value="">Select mortuary case</option>
                  ${options}
                </select>
              </label>

              <label>
                Freezer / Bay Number *
                <input
                  name="bayNumber"
                  required
                  placeholder="Example: F-01"
                />
              </label>

              <label>
                Storage Date *
                <input
                  name="storageDate"
                  type="date"
                  value="${localDateValue()}"
                  required
                />
              </label>

              <label>
                Storage Time *
                <input
                  name="storageTime"
                  type="time"
                  value="${localTimeValue()}"
                  required
                />
              </label>

              <label>
                Body Tag Number
                <input
                  name="bodyTagNumber"
                  placeholder="Tag / identification number"
                />
              </label>

              <label>
                Body Condition
                <select name="bodyCondition">
                  <option value="">Select condition</option>
                  <option>Normal</option>
                  <option>Preserved</option>
                  <option>Requires Attention</option>
                  <option>MLC Sealed</option>
                </select>
              </label>

              <label class="span-2">
                Storage Notes
                <textarea
                  name="storageNotes"
                  placeholder="Additional storage notes"
                ></textarea>
              </label>

              <button
                class="button primary"
                type="submit"
              >
                Assign Storage
              </button>
            </form>
          `
          : `
            <div class="empty-state">
              <strong>No bodies waiting for storage.</strong>
              <p>Register a death first or review currently stored bodies.</p>
            </div>
          `
      }
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>Currently Stored</h3>
          <p>${stored.length} active stored ${
            stored.length === 1 ? "body" : "bodies"
          }.</p>
        </div>
      </div>

      ${
        stored.length
          ? `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Deceased</th>
                    <th>MRN</th>
                    <th>Storage Unit</th>
                    <th>Storage Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  ${storedRows}
                </tbody>
              </table>
            </div>
          `
          : `
            <div class="empty-state">
              No bodies are currently stored.
            </div>
          `
      }
    </section>
  `;
}

export async function submitMortuaryStorage({
  api,
  currentUser,
  values
}) {
  if (!values.recordId) {
    throw new Error("Please select a mortuary case.");
  }

  if (!values.bayNumber?.trim()) {
    throw new Error("Freezer / Bay Number is required.");
  }

  if (!values.storageDate) {
    throw new Error("Storage Date is required.");
  }

  if (!values.storageTime) {
    throw new Error("Storage Time is required.");
  }

  const records = asArray(api.mortuaryRecords(currentUser));

  const selected = records.find(
    (record) => recordId(record) === String(values.recordId)
  );

  if (!selected) {
    throw new Error("Mortuary case could not be found.");
  }

  if (isReleased(selected)) {
    throw new Error("Released bodies cannot be assigned to storage.");
  }

  const requestedBay = values.bayNumber.trim().toLowerCase();

  const occupied = records.find((record) => {
    if (recordId(record) === String(values.recordId)) {
      return false;
    }

    if (isReleased(record)) {
      return false;
    }

    return storageUnit(record).trim().toLowerCase() === requestedBay;
  });

  if (occupied) {
    throw new Error(
      `Storage unit ${values.bayNumber} is already occupied.`
    );
  }

  await api.updateMortuaryRecord(
    currentUser,
    values.recordId,
    {
      bayNumber: values.bayNumber.trim(),

      storageDate: values.storageDate,
      storageTime: values.storageTime,

      storedAt: `${values.storageDate}T${values.storageTime}`,

      storedBy:
        currentUser?.name ||
        currentUser?.email ||
        "Mortuary Officer",

      bodyTagNumber: values.bodyTagNumber || "",
      bodyCondition: values.bodyCondition || "",
      storageNotes: values.storageNotes || "",

      status: "Stored"
    }
  );

  return "Body assigned to storage successfully.";
}