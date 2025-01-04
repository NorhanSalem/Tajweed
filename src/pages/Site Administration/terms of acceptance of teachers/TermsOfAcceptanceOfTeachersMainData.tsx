/////////// IMPORTS
import { t } from "i18next";

import { useFormikContext } from "formik";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../../components/molecules";
import { Helmet } from "react-helmet-async";
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const TermsOfAcceptanceOfTeachersMainData = ({
  setGender,
  setState_id,
  setPhoneCode,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  updateData,
  resetForm,
  title,
  setPhone_country,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const { values, setFieldValue } = useFormikContext(); /////////// STATES

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <InnerFormLayout
        title={`${t("Terms of acceptance of teachers")}`}
        showpopuptitle={false}
        customStyle={"block "}
      >
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-4 sm:col-span-4 md:col-span-2 margin-buttom-label">
            <TextAreaField
              label={`${t("Conditions for accepting teachers in Arabic")}`}
              name="text_ar"
              placeholder={`${t(
                "Conditions for accepting teachers in Arabic"
              )}`}
              id="terms_of_acceptance_of_teachers_ar"
              rows={8}
            />
          </div>
          <div className="col-span-4 sm:col-span-4 md:col-span-2 margin-buttom-label">
            <TextAreaField
              label={`${t("Conditions for accepting teachers in English")}`}
              name="text_en"
              placeholder={`${t(
                "Conditions for accepting teachers in English"
              )}`}
              id="terms_of_acceptance_of_teachers_en"
              rows={8}
            />
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
};
