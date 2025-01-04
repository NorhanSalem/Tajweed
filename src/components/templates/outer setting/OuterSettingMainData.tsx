/////////// IMPORTS
import { t } from "i18next"

import { useFormikContext } from "formik"
import { BaseInputField, InnerFormLayout } from "../../molecules"

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OuterSettingMainData = ({
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
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const { values, setFieldValue } = useFormikContext() /////////// STATES

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
      <InnerFormLayout title={"البياينات الاساسية"}>
        <BaseInputField
          id="name"
          label={`${t("name")}`}
          name="name"
          type="text"
          placeholder={`${t("name")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="email"
          label={`${t("email")}`}
          name="email"
          type="email"
          placeholder={`${t("email")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />

        <BaseInputField
          id="phone"
          label={`${t("phone")}`}
          name="phone"
          type="text"
          placeholder={`${t("phone")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="Password"
          label={`${t("password")}`}
          name="twitter_link_ar"
          type="password"
          placeholder={`${t("password")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />

        <BaseInputField
          id="name"
          label={`${t("Confirm Password")}`}
          name="password"
          type="password"
          placeholder={`${t("password")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
      </InnerFormLayout>
    </>
  )
}
