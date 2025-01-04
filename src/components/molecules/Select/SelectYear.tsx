import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "../formik-fields";

function SelectYear({ setYearValue }: any) {
  return (
    <div>
      {" "}
      <Formik
        initialValues={{ interview_status: "" }}
        onSubmit={(values) => {}}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              // label={t("Year")}
              id="optionStatus"
              name="dataOption"
              placeholder={t("Year")}
              options={Array.from(
                { length: new Date().getFullYear() - 2015 + 1 },
                (_, index) => ({
                  label: `${2020 + index}`,
                  value: `${2020 + index}`,
                })
              )}
              onChange={(option) => setYearValue(option?.value)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SelectYear;
