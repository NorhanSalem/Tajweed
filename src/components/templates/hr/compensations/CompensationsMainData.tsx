import { FormikSharedConfig, useFormikContext } from "formik";
import { t } from "i18next";
import { OptionType } from "../../../../utils/helpers";
import { BaseInputField, InnerFormLayout } from "../../../molecules";
import SelectEmployee from "../../../molecules/Select/selectEmployee";
import Selectcompensations from "../../../molecules/Select/selectcompensations";
import DateInput2 from "../../../molecules/formik-fields/DateInput2";

export const CompensationsMainData = ({

  hideHeader,
}: any) => {
  const { setFieldValue } = useFormikContext<FormikSharedConfig>();

  return (
    <>
      <div>
        <InnerFormLayout
          showpopuptitle={hideHeader ? false : true}
          title={t("Add compensations and discount")}
        >
          <DateInput2 label={`${t("date")}`} name="date" hiddenBirthDay />

          <SelectEmployee
            label={`${t("Employees")}`}
            multi
            placeholder={`${t("Select Employee")}`}
            name="employee_id"
            onChange={(option: OptionType) => {
              setFieldValue("employee_id", option.value);
            }}
          />

          <Selectcompensations
            label={`${t("type of operation")}`}
            placeholder={`${t("Choose type of operation")}`}
            name="type"
            multi={false}
            onChange={(option: OptionType) => {
              setFieldValue("type", option.value);
            }}
          />

          <BaseInputField
            id="value"
            label={`${t("value")}`}
            name="value"
            type="text"
            placeholder={`${t("value")}`}
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="note"
            label={`${t("note")}`}
            name="note"
            type="text"
            placeholder={`${t("note")}`}
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />
        </InnerFormLayout>
      </div>
    </>
  );
};
