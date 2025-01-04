import React from "react";
import { BaseInputField } from "../../molecules";
import { InnerFormLayout } from "../../molecules/InnerFormLayout/index";
import { useState } from "react";
import { t } from "i18next";

export default function SeoDetails() {
  const [header, setheader] = useState(false);

  return (
    <div>
      <InnerFormLayout
        title={`${t("meta_tags")}`}
        showpopuptitle={header ? false : true}
        customStyle={header ? "max-h-[auto]" : ""}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 col-span-12">
          {/* Meta Title Fields */}
          <BaseInputField
            id="meta_title_ar"
            label={`${t("Meta title in arabic")}`}
            name="meta_title_ar"
            type="text"
            placeholder={`${t("Meta title in arabic")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="meta_title_en"
            label={`${t("Meta title in english")}`}
            name="meta_title_en"
            type="text"
            placeholder={`${t("Meta title in english")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />

          {/* Meta Description Fields */}
          <BaseInputField
            id="meta_description_ar"
            label={`${t("Meta description in arabic")}`}
            name="meta_description_ar"
            type="text"
            placeholder={`${t("Meta description in arabic")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            required
          />
          <BaseInputField
            id="meta_description_en"
            label={`${t("Meta description in english")}`}
            name="meta_description_en"
            type="text"
            placeholder={`${t("Meta description in english")}`}
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
