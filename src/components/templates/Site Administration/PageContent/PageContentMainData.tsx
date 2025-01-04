/////////// IMPORTS
import { t } from "i18next"

import { useFormikContext } from "formik"
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../../molecules"
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PageContentMainData = ({
  setGender,
  setState_id,
  setPhoneCode,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  updateData,
  resetForm,
  setPhone_country,
}: any) => {
  ///
  /////////// STATES
  ///
  const { values, setFieldValue } = useFormikContext() /////////// STATES

  ///
  return (
    <>
      <InnerFormLayout title={`${t("Contact info")}`} showpopuptitle={false}>
        <TextAreaField
          label={`${t("Question Ar")}`}
          name="question_ar"
          placeholder={`${t("question ar")}`}
          id="question_ar"
          rows={6}
        />

        <TextAreaField
          label={`${t("Question En")}`}
          name="question_en"
          placeholder={`${t("Question En")}`}
          id="question_en"
          rows={6}
        />

        <TextAreaField
          label={`${t("Answer Ar")}`}
          name="answer_ar"
          placeholder={`${t("Answer Ar")}`}
          id="answer_ar"
          rows={6}
        />

        <TextAreaField
          label={`${t("Answer En")}`}
          name="answer_en"
          placeholder={`${t("Answer En")}`}
          id="answer_en"
          rows={6}
        />
      </InnerFormLayout>
    </>
  )
}
