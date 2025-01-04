/////////// IMPORTS
///
///
/////////// Types
///

import { t } from 'i18next';
import { BaseInputField, InnerFormLayout } from '../../molecules';
import DateInput2 from '../../molecules/formik-fields/DateInput2';

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddSalariesExpenseMainData = ({
  setGender,
  setState_id,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  editData,
  setPhone_country,
  setCountry,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

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
      <InnerFormLayout
        showpopuptitle={true}
        title={`${t("add salaries expenses")}`}
        scroll={true}
      >
        {/* <DateInputField label={`${t("ُEnter Date")}`} name="date"  maxDate={new Date()}  /> */}
        <DateInput2 label={`${t("Enter Date")}`} name="date"  hiddenBirthDay/>
        <BaseInputField
          id="name"
          label={`${t("Employee Name")}`}
          name="name"
          type="text"
          placeholder={`${t("Employee Name")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="amount"
          label={`${t("Salary value")}`}
          name="amount"
          type="text"
          placeholder={`${t("Salary value")}`}
          labelProps={{ className: "mb-1" }}
          required
        />
      </InnerFormLayout>
    </>
  )
};
