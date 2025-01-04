import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "..";

type SelectCompensationsFilter_tp = {
  setPercentage: any;
  placeholder?: string;
};
export default function SelectPercentageCoupon({
  setPercentage,
  placeholder,
}: SelectCompensationsFilter_tp) {
  const dataOptions = [
    {
      value: "",
      label: t("All"),
    },
    {
      value: "0",
      label: t("Number"),
    },
    {
      value: "1",
      label: t("Percentage"),
    },
  ];

  return (
    <div>
      <Formik initialValues={{ compensations: "" }} onSubmit={(values) => {}}>
        <Form className="w-full">
          <Select
            placeholder={`${t("Type")}`}
            // label={`${t("Type")}`}
            id="optionStatus"
            name="compensations"
            loadingPlaceholder={`${t("loading")}`}
            options={dataOptions}
            onChange={(option) => {
              //@ts-ignore
              setPercentage(option?.value);
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}
