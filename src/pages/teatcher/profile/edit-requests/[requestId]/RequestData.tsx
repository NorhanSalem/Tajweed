import React from "react";
import { BaseInputField } from "../../../../../components/molecules";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";

function RequestData({ data }: any) {
  const { t } = useTranslation();
  return (
    <Formik
      onSubmit={(values) => console.log(values)}
      initialValues={{ date_rang: "" }}
    >
      {({ setFieldValue }) => (
        <Form>
          <BaseInputField
            name="name"
            label="Name"
            value={data?.name}
            type="text"
            readOnly
            id="Name"
          />
          <BaseInputField
            name="email"
            label="Email"
            value={data?.email}
            type="text"
            readOnly
            id="email"
          />
          <BaseInputField
            name="phone"
            label="Phone"
            value={data?.phone}
            type="text"
            readOnly
            id="phone"
          />
          <BaseInputField
            name="bio"
            label="Bio"
            value={data?.bio}
            type="text"
            readOnly
            id="bio"
          />
          <BaseInputField
            name="is_mogaz"
            label={t("Is mogaz")}
            value={data?.is_mogaz}
            type="text"
            readOnly
            id="is_mogaz"
          />
          <BaseInputField
            name="is_azhary"
            label={t("Is Azhary")}
            value={data?.is_azhary}
            type="text"
            readOnly
            id="is_mogaz"
          />
          <BaseInputField
            name="gender"
            label={t("Gender")}
            value={data?.gender}
            type="text"
            readOnly
            id="gender"
          />
          <BaseInputField
            name="juz_number"
            label={t("Juz number")}
            value={data?.juz_number}
            type="text"
            readOnly
            id="juz_number"
          />
          <BaseInputField
            name="language"
            label={t("Language")}
            value={data?.language}
            type="text"
            readOnly
            id="language"
          />
          <BaseInputField
            name="English_level"
            label={t("English Level")}
            value={data?.English_level}
            type="text"
            readOnly
            id="English_level"
          />
          <BaseInputField
            name="marital_status"
            label={t("Marital Status")}
            value={data?.marital_status}
            type="text"
            readOnly
            id="marital_status"
          />
          <BaseInputField
            name="interview_status"
            label={t("Interview Status")}
            value={data?.interview_status}
            type="text"
            readOnly
            id="interview_status"
          />
          <div className="my-3">
            <h2 className="mb-2">{t("Teaching Fields")}</h2>
            {data?.teaching_fields.map((field) => (
              <span className="bg-slate-500 text-white py-1 px-4 rounded-xl">
                {field}
              </span>
            ))}
          </div>
          <div className="my-3">
            <h2 className="mb-2">{t("Eduction")}</h2>
            {data?.education_data.map((field) => (
              <div className="flex gap-4">
                <span>{field?.degree}</span>
                <span>{field?.school}</span>
                <span>{field?.end_date}</span>
                <span>{field?.start_date}</span>
              </div>

              // <span className='bg-slate-500 text-white py-1 px-4 rounded-xl'>{field}</span>
            ))}
          </div>
          <div className="my-3">
            <h2 className="mb-2">{t("Eduction")}</h2>
            {data?.education_data.map((field) => (
              <div className="flex gap-4">
                <span>{field?.degree}</span>
                <span>{field?.school}</span>
                <span>{field?.end_date}</span>
                <span>{field?.start_date}</span>
              </div>

              // <span className='bg-slate-500 text-white py-1 px-4 rounded-xl'>{field}</span>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RequestData;
