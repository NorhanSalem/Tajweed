import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "../formik-fields";

function SelectMonth({ setMonthValue }: any) {
  const months = [
    { label: t("January"), value: "1" },
    { label: t("February"), value: "2" },
    { label: t("March"), value: "3" },
    { label: t("April"), value: "4" },
    { label: t("May"), value: "5" },
    { label: t("June"), value: "6" },
    { label: t("July"), value: "7" },
    { label: t("August"), value: "8" },
    { label: t("September"), value: "9" },
    { label: t("October"), value: "10" },
    { label: t("November"), value: "11" },
    { label: t("December"), value: "12" },
  ];

  return (
    <div>
      <Formik
        initialValues={{ month: "" }}
        onSubmit={(values) => {}}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              // label={t("Month")}
              id="monthSelect"
              name="month"
              placeholder={t("Select Month")}
              options={months}
              onChange={(option) => setMonthValue(option?.value)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SelectMonth;
