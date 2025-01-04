import React from "react";
import { BaseInputField, InnerFormLayout } from "../../../molecules";
import { t } from "i18next";

function PaymentSettingMainData() {
  return (
    <div>
      <InnerFormLayout
        title={`${t("add teacher")}`}
        // showpopuptitle={hideHeader ? false : true}
        // customStyle={hideHeader ? "max-h-[auto]" : ""}
      >
        <div className="col-span-12 styleing-modal-info">
          <BaseInputField
            id="name"
            label={`${t("full name")}`}
            name="full_name"
            type="text"
            placeholder={`${t("full name")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="name"
            label={`${t("bank name")}`}
            name="bank_name"
            type="text"
            placeholder={`${t("bank name")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="name"
            label={`${t("branch name")}`}
            name="bank_branch"
            type="text"
            placeholder={`${t("branch name")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="name"
            label={`${t("account number")}`}
            name="account_number"
            type="text"
            placeholder={`${t("account number")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="name"
            label={`${t("iban")}`}
            name="IBAN"
            type="text"
            placeholder={`${t("iban")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
        </div>
      </InnerFormLayout>
    </div>
  );
}

export default PaymentSettingMainData;
