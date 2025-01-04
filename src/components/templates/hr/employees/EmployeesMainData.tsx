import { t } from "i18next";
import { BaseInputField, InnerFormLayout } from "../../../molecules";
import DateInput2 from "../../../molecules/formik-fields/DateInput2";
import PhoneInput2 from "../../../molecules/phone-input/PhoneInput2";

export const EmployeesMainData = ({ hideHeader }: any) => {
  return (
    <>
      <div>
        <InnerFormLayout
          showpopuptitle={hideHeader ? false : true}
          title={`${t("add employee")}`}
          scroll={true}
        >
          <BaseInputField
            id="name"
            label={`${t("name")}`}
            name="name"
            type="text"
            placeholder={`${t("name")}`}
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="jop"
            label={`${t("Job")}`}
            name="job"
            type="text"
            placeholder={`${t("Job")}`}
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />

          <PhoneInput2 label={`${t("mobile number")}`} name="phone" />

          <DateInput2
            label={`${t("employment date")}`}
            name="employment_date"
          />
          <BaseInputField
            id="salary"
            label={`${t("Salary")}`}
            name="salary"
            type="number"
            placeholder={`${t("Salary")}`}
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />
        </InnerFormLayout>
      </div>
    </>
  );
};
