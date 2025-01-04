/////////// IMPORTS
import { t } from "i18next";

import { useFormikContext } from "formik";
import { InnerFormLayout, TextAreaField } from "../../../molecules";
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const HeaderMainData = () => {

  return (
    <>
      <InnerFormLayout
        title={`${t("Contact info")}`}
        showpopuptitle={false}
        scroll={true}
      >
        <TextAreaField
          label={`${t("Title Arabic")}`}
          name="header_ar"
          placeholder={`${t("Footer Text Ar")}`}
          id="footer_text_ar"
          rows={6}
        />

        <TextAreaField
          label={`${t("Title English")}`}
          name="header_en"
          placeholder={`${t("Header Text En")}`}
          id="footer_text_en"
          rows={6}
        />

        <TextAreaField
          label={`${t("Title Text Ar")}`}
          name="title_ar"
          placeholder={`${t("Title Text En")}`}
          id="footer_text_en"
          rows={6}
        />

        <TextAreaField
          label={`${t("Title Text En")}`}
          name="title_en"
          placeholder={`${t("Title Text En")}`}
          id="footer_text_en"
          rows={6}
        />

        <TextAreaField
          label={`${t("Title Text Ar")}`}
          name="title2_ar"
          placeholder={`${t("Title Text En")}`}
          id="footer_text_en"
          rows={6}
        />

        <TextAreaField
          label={`${t("Title Text En")}`}
          name="title2_en"
          placeholder={`${t("Title Text En")}`}
          id="footer_text_en"
          rows={6}
        />
      </InnerFormLayout>
    </>
  );
};
