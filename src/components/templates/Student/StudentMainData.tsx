/////////// IMPORTS
///
import { FormikSharedConfig, useFormikContext } from "formik";
import { t } from "i18next";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import SelectCanTeaching from "../../molecules/Select/SelectCanTeaching";
import SelectCountry from "../../molecules/Select/SelectCountry";
import SelectDataPreferredDays from "../../molecules/Select/SelectDataPreferredDays";
import SelectGender from "../../molecules/Select/SelectGender";
import TimePickerComp from "../../molecules/TimePickerComp";
import DateInput2 from "../../molecules/formik-fields/DateInput2";
import PhoneInput2 from "../../molecules/phone-input/PhoneInput2";
import TimePicker from "../../molecules/TimePicker";
import { Label } from "../../atoms";
export const StudentMainData = ({ hideHeader }: any) => {
  const { setFieldValue } = useFormikContext<FormikSharedConfig>();

  return (
    <>
      <div>
        <InnerFormLayout
          showpopuptitle={hideHeader ? false : true}
          title={`${t("add student")}`}
          scroll={true}
        >
          <div className="col-span-12  styleing-modal-info">
            <BaseInputField
              id="name"
              label={`${t("name")}`}
              name="name"
              type="text"
              placeholder={`${t("name")}`}
              labelProps={{ className: "mb-1 " }}
              className=" mb-3 lg:inline-block lg:w-full lg:ml-[-1.5rem]  w-[18rem]"
              required
            />
            <DateInput2 label={`${t("BirthDay")}`} name="birthday" />
            <SelectGender
              label={`${t("Type")}`}
              name="gender"
              onChange={(option) => {
                setFieldValue("gender", option.value);
              }}
              style="lg:ml-8 lg:w-[40rem]  w-[18rem] xl:w-[55rem] md:block"
            />
            <SelectCanTeaching
              placeholder={t("I want to learn")}
              label={t("I want to learn")}
              name="preferred_learning"
              onChange={(options) => {
                const selectedIds = options?.map(
                  (option: { value: any }) => option?.value
                );
                setFieldValue("preferred_learning", selectedIds);
              }}
              style="lg:ml-2 lg:w-[27rem]  w-[18rem] xl:w-[55rem] md:block"
            />
            <SelectDataPreferredDays
              label={t("preferred days")}
              name="preferred_days"
              onChange={(options) => {
                const selectedIds = options?.map(
                  (option: { value: any }) => option?.value
                );
                setFieldValue("preferred_days", selectedIds);
              }}
              style="lg:ml-8 lg:w-[27rem]  w-[18rem] xl:w-[55rem] md:block"
            />
            <SelectCountry
              name="country_id"
              label={`${t("Country")}`}
              onChange={(option) => {
                setFieldValue("country_id", option.value);
              }}
              style="lg:ml-8 lg:w-[27rem]  w-[18rem] xl:w-[55rem] md:block"
            />

            <PhoneInput2 label={`${t("mobile")}`} name="phone" />
            <BaseInputField
              id="email"
              label={`${t("email")}`}
              name="email"
              type="email"
              placeholder={`${t("email")}`}
              labelProps={{ className: "mb-1" }}
              className="inline-block lg:w-full  w-[18rem]"
            />
            <BaseInputField
              id="password"
              label={`${t("password")}`}
              name="password"
              type="password"
              placeholder={`${t("password")}`}
              labelProps={{ className: "mb-1" }}
              labelStyle="lg:w-[5rem]"
              className="inline-block lg:w-full  w-[18rem]"
              required
            />
            <BaseInputField
              id="password_confirmation"
              label={`${t("Confirm Password")}`}
              name="password_confirmation"
              type="password"
              placeholder={`${t("password")}`}
              labelProps={{ className: "mb-1" }}
              className="inline-block lg:w-full  w-[18rem]"
              required
            />
            <BaseInputField
              id="student_number"
              label={`${t("Number Student")}`}
              name="student_number"
              type="text"
              placeholder={`${t("Number Student")}`}
              labelProps={{ className: "mb-1" }}
              labelStyle="w-[5rem]"
              className="inline-block lg:w-full  w-[18rem]"
              required
            />
            <div>
              <Label htmlFor="">{t("preferred time")}</Label>
              <div className="flex items-center gap-2 w-full">
                <div className="w-1/2">
                  <TimePicker name="preferred_time_from" label={t("from")} />
                </div>
                <div className="w-1/2">
                  <TimePicker name="preferred_time_to" label={t("to")} />
                </div>
              </div>
            </div>
          </div>
        </InnerFormLayout>
      </div>
    </>
  );
};
