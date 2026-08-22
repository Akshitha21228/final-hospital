import {
  mortuaryStoragePage,
  submitMortuaryStorage
} from "./body-storage.js";

import {
  mortuaryCertificatesPage,
  submitMortuaryCertificate
} from "./certificates.js";

import {
  mortuaryReleasePage,
  submitMortuaryRelease
} from "./release-body.js";

import {
  mortuaryRegisterPage
} from "./mortuary-register.js";

import {
  mortuarySearchPage
} from "./search.js";

import {
  mortuaryReportsPage
} from "./reports.js";

export {
  mortuaryStoragePage,
  mortuaryCertificatesPage,
  mortuaryReleasePage,
  mortuaryRegisterPage,
  mortuarySearchPage,
  mortuaryReportsPage
};

export async function handleMortuarySubmit({
  action,
  values,
  api,
  currentUser
}) {
  if (action === "mortuary-store-body") {
    const message =
      await submitMortuaryStorage({
        api,
        currentUser,
        values
      });

    return {
      handled: true,
      message
    };
  }

  if (action === "mortuary-issue-certificate") {
    const message =
      await submitMortuaryCertificate({
        api,
        currentUser,
        values
      });

    return {
      handled: true,
      message
    };
  }

  if (action === "mortuary-release-body") {
    const message =
      await submitMortuaryRelease({
        api,
        currentUser,
        values
      });

    return {
      handled: true,
      message
    };
  }

  return {
    handled: false,
    message: ""
  };
}