/////////// IMPORTS
///
import { t } from "i18next";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../../molecules";
import SelectType from "../../../molecules/Select/SelectType";
import { useFormikContext } from "formik";
import { useEffect } from "react";

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const FaqsMainData = ({ updateData, resetForm, setFormsValue }: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { setFieldValue, values } = useFormikContext();

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///
  useEffect(() => {
    setFormsValue(values);
  }, [values]);

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <InnerFormLayout
        title={`${t("Add Faqs")}`}
        showpopuptitle={true}
        customStyle={"block py-6 sm: p-8 dark:!bg-dark-tertiary"}
      >
        <div className="styleing-modal-info mb-10">
          <SelectType
            TypeName="country_id"
            label={`${t("Tybe")}`}
            placeholder={`${t("Select Type")}`}
            updateData={updateData}
            resetForm={resetForm}
            onChange={(option) => {
              setFieldValue("type", option.value);
            }}
          />
          <BaseInputField
            id="name"
            label={`${t("Add Faqs ar")}`}
            name="question_ar"
            type="text"
            placeholder={`${t("Add Faqs ar")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining "
            labelStyle="mb-4"
            required
          />
          <BaseInputField
            id="name"
            label={`${t("Add Faqs en")}`}
            name="question_en"
            type="text"
            placeholder={`${t("Add Faqs en")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 input-style-maining"
            labelStyle="mb-4"
            required
          />
        </div>
        <div className="w-full col-span-3 grid sm:grid-cols-2 md:grid-cols-2 gap-5 text-start gap-y-4">
          <TextAreaField
            placeholder={`${t("The answer is in Arabic")}`}
            label={`${t("The answer is in Arabic")}`}
            id="answer_ar"
            name="answer_ar"
            rows={3}
          />
          <TextAreaField
            placeholder={`${t("The answer is in English")}`}
            label={`${t("The answer is in English")}`}
            id="answer_en"
            name="answer_en"
            rows={3}
          />
        </div>
      </InnerFormLayout>
    </>
  );
};
