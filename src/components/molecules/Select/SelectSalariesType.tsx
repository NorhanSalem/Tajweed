import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "..";

type SelectCompensationsFilter_tp = {
    SetSalariesType: any;
  placeholder?: string;
};
export default function SelectSalariesType({
    SetSalariesType,
  
}: SelectCompensationsFilter_tp) {
  const dataOptions = [
    {
      value: "",
      label: t("All"),
    },
    {
      value: "PAID",
      label: t("Paid"),
    },
    {
      value: "UNPAID",
      label: t("Unpaid"),
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
              SetSalariesType(option?.value);
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}
