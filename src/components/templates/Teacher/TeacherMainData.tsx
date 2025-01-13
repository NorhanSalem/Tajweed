/////////// IMPORTS
import { FieldArray, useFormikContext } from "formik";
import { t } from "i18next";
import { SvgDelete } from "../../atoms/icons/SvgDelete";
import {
  BaseInputField,
  CheckBoxField,
  InnerFormLayout,
  TextAreaField,
} from "../../molecules";
import SelectCanTeaching from "../../molecules/Select/SelectCanTeaching";
import SelectCountry from "../../molecules/Select/SelectCountry";
import SelectGender from "../../molecules/Select/SelectGender";
import SelectInterviewStatus from "../../molecules/Select/SelectInterviewStatus";
import SelectLanguage from "../../molecules/Select/SelectLanguage";
import SelectLevelLanguage from "../../molecules/Select/SelectLevelLanguage";
import SelectSpecialization from "../../molecules/Select/SelectSpecialization";
import SelectSpokenLanguage from "../../molecules/Select/SelectSpokenLanguage";
import SelectWorkingOnline from "../../molecules/Select/SelectWorkingOnline";
import YearsCalender from "../../molecules/YearsCalender";
import { DropFile } from "../../molecules/files/DropFile";
import DateInput2 from "../../molecules/formik-fields/DateInput2";
import PhoneInput2 from "../../molecules/phone-input/PhoneInput2";
import { calculateAgeWithMonths } from "../../../utils/helpers";

export const TeacherMainData = ({
  hideHeader,
  setRemoved,
  updateData,
  resetForm,
}: any) => {
  const { values, setFieldValue, errors } = useFormikContext<any>();
  return (
    <>
      <InnerFormLayout
        title={`${t("add teacher")}`}
        showpopuptitle={hideHeader ? false : true}
        customStyle={hideHeader ? "max-h-[auto]" : ""}
      >
        <div className="col-span-12  styleing-modal-info">
          <BaseInputField
            id="name"
            label={`${t("name")}`}
            name="name"
            type="text"
            placeholder={`${t("name")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 w-[18rem] lg:w-full input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline lg:mr-10"
            required
          />
          <BaseInputField
            id="email"
            label={`${t("Email")}`}
            name="email"
            type="email"
            placeholder={`${t("Email")}`}
            labelProps={{ className: "mb-1" }}
            className="  w-[18rem] lg:w-full input-style-maining"
            labelStyle="lg:inline lg:mr-12"
            required
          />
          <PhoneInput2 label={`${t("mobile")}`} name="phone" />
          <SelectCountry
            label={`${t("Country")}`}
            name="country_id"
            onChange={(option) => {
              setFieldValue("country_id", option.value);
            }}
            style="lg:ml-5 lg:w-[27rem] xl:w-[55rem] w-[18rem]"
            labelCss="lg:mr-2"
          />
          <BaseInputField
            id="meta_title_ar"
            label={`${t("Ar.Title")}`}
            name="meta_title_ar"
            type="text"
            placeholder={`${t("Arabic Title")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 lg:w-full w-[18rem] inline-block input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline lg:mr-6  "
            required
          />
          <BaseInputField
            id="meta_title_en"
            label={`${t("En.Title")}`}
            name="meta_title_en"
            type="text"
            placeholder={`${t("English Title")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 lg:w-full  w-[18rem] inline-block input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline lg:mr-9 "
            required
          />
          <BaseInputField
            id="meta_description_ar"
            label={`${t("Ar.Des")}`}
            name="meta_description_ar"
            type="text"
            placeholder={`${t("Arabic Description")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3  lg:w-full  w-[18rem] input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline lg:mr-7"
            required
          />
          <BaseInputField
            id="meta_description_en"
            label={`${t("English.Des")}`}
            name="meta_description_en"
            type="text"
            placeholder={`${t("English Description")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3 lg:w-full  w-[18rem] lg:ml-1 input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="inline "
            required
          />
          <DateInput2 label={`${t("BirthDay")}`} name="birthday" />
          <SelectGender
            label={`${t("Type")}`}
            name="gender"
            onChange={(option) => {
              setFieldValue("gender", option.value);
            }}
            style="lg:ml-8 lg:w-[27rem]  w-[18rem] xl:w-[55rem] md:block"
          />

          <BaseInputField
            id="password"
            label={`${t("password")}`}
            name="password"
            type="password"
            placeholder={`${t("password")}`}
            labelProps={{ className: "mb-1" }}
            className="inline-block lg:w-full  w-[18rem] input-style-maining"
            labelStyle="lg:inline lg:mr-2 "
            required
          />
          <BaseInputField
            id="password_confirmation"
            label={`${t("Confirm Password ")}`}
            name="password_confirmation"
            type="password"
            placeholder={`${t("Confirm Password")}`}
            labelProps={{ className: "mb-1" }}
            className="inline-block w-[18rem] lg:w-full input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline-block "
            required
          />

          <SelectLanguage
            label={`${t("Language")}`}
            name="language"
            onChange={(option) => {
              setFieldValue("language", option.value);
            }}
            style="lg:ml-4 lg:w-[27rem] xl:w-[55rem] w-[18rem]"
          />
          <SelectLevelLanguage
            label={`${t("English Level")}`}
            name="English_level"
            onChange={(option) => {
              setFieldValue("english_level", option.value);
            }}
            style="lg:ml-7 lg:w-[27rem] xl:w-[55rem] w-[18rem]"
          />

          <SelectSpecialization
            placeholder={`${t("Choose Specialization")}`}
            label={`${t("Specialization")}`}
            name="specialization"
            onChange={(options) => {
              const selectedIds = options?.map(
                (option: { value: any }) => option?.value
              );
              setFieldValue("specialization", selectedIds);
            }}
            style="lg:ml-7 lg:w-[26.5rem] xl:w-[55rem]  w-[18rem]"
          />
          <SelectInterviewStatus
            label={t("interview status")}
            name="interview_status"
            placeholder={t("interview status")}
            style="lg:ml-7 lg:w-[27rem] xl:w-[55rem]  w-[18rem]"
          />
          <BaseInputField
            id="Memorized"
            label={`${t("Memo.Juz")}`}
            name="juz_number"
            type="text"
            placeholder={`${t("Memorized Juz")}`}
            labelProps={{ className: "mb-1" }}
            className="inline-block  lg:w-full w-[18rem] input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="inline lg:mr-4"
            required
          />

          <SelectWorkingOnline
            label={`${t("Working Online ?")}`}
            name="is_working_online"
            onChange={(option) => {
              setFieldValue("is_working_online", option.value);
            }}
            style="lg:ml-7 lg:w-[27rem] xl:w-[55rem] w-[18rem]"
          />

          <SelectCanTeaching
            placeholder={t("Teaching Fields")}
            label={t("Teaching Fields")}
            name="teaching_fields"
            onChange={(options) => {
              const selectedIds = options?.map(
                (option: { value: any }) => option?.value
              );
              setFieldValue("teaching_fields", selectedIds);
            }}
            style="lg:ml-6 lg:w-[27rem]  xl:w-[55rem]  w-[18rem]"
          />

          <SelectSpokenLanguage
            updateData={updateData}
            name={"spoken_languages"}
            label={t("Speaking Fields")}
            resetForm={resetForm}
            onChange={(options) => {
              const selectedIds = options?.map(
                (option: { value: any }) => option?.value
              );
              setFieldValue("spoken_languages", selectedIds);
            }}
            style="lg:ml-7 lg:w-[27rem] xl:w-[55rem]  w-[18rem]"
          />
          <BaseInputField
            id="order"
            label={`${t("order")}`}
            name="order"
            type="text"
            placeholder={`${t("order")}`}
            labelProps={{ className: "mb-1" }}
            className="inline-block   w-[18rem] lg:w-[27rem] input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline lg:mr-14"
          />
          <BaseInputField
            id="hourly_rate"
            label={`${t("Hour Price")}`}
            name="hourly_rate"
            type="text"
            placeholder={`${t("Hour Price")}`}
            labelProps={{ className: "mb-1" }}
            className="inline-block lg:ml-6 lg:w-full  w-[18rem] input-style-maining"
            style={{ marginTop: "0.25rem" }}
            labelStyle="lg:inline "
          />

          <FieldArray name="education_data">
            {({ push, remove }) => (
              <div className="grid grid-cols-4 col-span-full gap-8 bg-['red']">
                {values?.education_data?.map((item, index) => (
                  <div className="col-span-12 flex gap-4">
                    <div className="">
                      <BaseInputField
                        id=""
                        label={`${t("education")}`}
                        name="school"
                        type="text"
                        placeholder={`${t("school")}`}
                        className="input-style-maining"
                        value={item?.school}
                        onChange={(e) =>
                          setFieldValue(
                            `education_data[${index}].school`,
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <BaseInputField
                        id=""
                        label={`${t("degree")}`}
                        name="degree"
                        type="text"
                        value={item?.degree}
                        placeholder={`${t("degree")}`}
                        className="input-style-maining"
                        onChange={(e) =>
                          setFieldValue(
                            `education_data[${index}]degree`,
                            e.target.value
                          )
                        }
                        // value={values.education_data[index].school}
                        required
                      />
                    </div>
                    <div className="">
                      <YearsCalender
                        name={`education_data[${index}]start_date`}
                        Placeholder={t("from")}
                        label={t("from")}
                        value={item?.start_date}
                      />
                    </div>
                    <div className="">
                      <YearsCalender
                        name={`education_data[${index}]end_date`}
                        Placeholder={t("to")}
                        label={t("to")}
                        value={item?.end_date}
                      />
                    </div>
                    {values?.education_data?.length > 1 && (
                      <button
                        type="button"
                        className="mt-[35px]"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <SvgDelete stroke="red" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="w-6 h-6 bg-red-500 text-white rounded-full bg-primary"
                  onClick={() => {
                    push({
                      id: crypto.randomUUID(),
                      title: "",
                      degree: "",
                      start_date: "",
                      end_date: "",
                    });
                  }}
                >
                  +
                </button>
              </div>
            )}
          </FieldArray>

          <FieldArray name="experience_data">
            {({ push, remove }) => (
              <div className="grid grid-cols-4 col-span-full gap-8 bg-['red']">
                {values?.experience_data?.map((item, index) => (
                  <div className="col-span-12 flex gap-4">
                    <div className="">
                      <BaseInputField
                        id=""
                        label={`${t("title")}`}
                        name="title"
                        type="text"
                        placeholder={`${t("title")}`}
                        value={item?.title}
                        className="input-style-maining"
                        onChange={(e) =>
                          setFieldValue(
                            `experience_data[${index}].title`,
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <BaseInputField
                        id=""
                        label={`${t("Company Name")}`}
                        name="company_name"
                        type="text"
                        placeholder={`${t("Company Name")}`}
                        className="input-style-maining"
                        value={item?.company_name}
                        onChange={(e) =>
                          setFieldValue(
                            `experience_data[${index}]company_name`,
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <YearsCalender
                        label={t("from")}
                        name={`experience_data[${index}]start_date`}
                        Placeholder={t("from")}
                        value={item?.start_date}
                      />
                    </div>
                    <div className="">
                      <YearsCalender
                        name={`experience_data[${index}]end_date`}
                        Placeholder={t("to")}
                        label={t("to")}
                        value={item?.end_date}
                      />
                    </div>
                    {values?.experience_data?.length > 1 && (
                      <button
                        type="button"
                        className="mt-[35px]"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <SvgDelete stroke="red" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="w-6 h-6 bg-red-500 text-white rounded-full bg-primary"
                  onClick={() => {
                    push({
                      id: crypto.randomUUID(),
                      school: "",
                      company_name: "",
                      start_date: "",
                      end_date: "",
                    });
                  }}
                >
                  +
                </button>
              </div>
            )}
          </FieldArray>
          <div className="flex flex-col">
            <BaseInputField
              id="video_file"
              label={`${t("Video Link")}`}
              name="video_file"
              type="text"
              placeholder={`${t("Video Link")}`}
              labelProps={{ className: "mb-1" }}
              className="input-style-maining"
              required
            />
            <TextAreaField
              placeholder={`${t("Teacher Bio")}`}
              label={`${t("Teacher Bio")}`}
              id="bio"
              name="bio"
              rows={10}
              style=" xl:w-[135rem] lg:w-[70rem] md:w-[40rem] w-[90%]"
              labelStyle="lg:inline block mt-3"
            />
          </div>
        </div>
        <div className="flex gap-x-2 col-span-12">
          <CheckBoxField label={`${t("Is Mojaz")}`} name="is_mogaz" />
          <CheckBoxField label={`${t("Is Azhari")}`} name="is_azhary" />
        </div>
        <div className="grid grid-cols-12 col-span-4  gap-4">
          <div className="col-span-4">
            <h2 className="text-mainBlack">{t("Upload identity image")}</h2>
            <DropFile name="identity" setRemoved={setRemoved} />
          </div>
          <div className="col-span-4">
            {values?.is_mogaz && (
              <>
                <h2 className="dark:text-white"> {`${t("magazy")}`}</h2>
                <DropFile name="is_mogaz_media" setRemoved={setRemoved} />
              </>
            )}
          </div>
          <div className="col-span-4">
            {values?.is_azhary && (
              <>
                <h2 className="dark:text-white"> {`${t("azhary")}`}</h2>
                <DropFile name="is_azhary_media" setRemoved={setRemoved} />
              </>
            )}
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
};
