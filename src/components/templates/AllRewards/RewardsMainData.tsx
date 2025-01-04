/////////// IMPORTS
///
import { useFormik, useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import DateInput2 from "../../molecules/formik-fields/DateInput2";
import SelectTeacher from "../../molecules/Select/SelectTeacher";
import Selectcompensations from "../../molecules/Select/selectcompensations";
import { DateInput } from "@mantine/dates";

export const RewardsMainData = ({ updateData, resetForm, data }: any) => {
  const { setFieldValue, values } = useFormikContext();
  const initialDate = data.created_at;

  return (
    <>
      <InnerFormLayout
        title={`${t("Add")}`}
        showpopuptitle={true}
        scroll={true}
      >
        <SelectTeacher name="user_id" teacher_name={"teacher_name"} />
        <Selectcompensations
          name="type"
          label={t("type")}
          onChange={(option) => setFieldValue("type", option?.value)}
        />
        <DateInput
          label={`${t("date")}`}
          name="date"
          placeholder={initialDate ? initialDate : t("Select date")}
          onChange={(date) => setFieldValue("date", date)} // Ensure this sets the date properly
        />
        <BaseInputField
          label="amount"
          id="discount"
          label={`${t("value")}`}
          name="amount"
          type="text"
          placeholder={`${t("amount")}`}
          labelProps={{ className: "mb-1" }}
          required
        />
      </InnerFormLayout>
    </>
  );
};
