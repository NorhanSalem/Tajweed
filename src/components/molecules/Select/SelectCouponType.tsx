import { t } from "i18next";
import { Select } from "..";
import { Form, Formik } from "formik";

type SelectCouponType_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  couponType?: string | undefined;
  fieldKey?: "id" | "value" | undefined;
  setCouponType: any;
};

export default function SelectCouponType({
  placeholder,
  couponType,
  fieldKey,
  label,
  setCouponType,
}: SelectCouponType_tp) {
  const dataOptions = [
    {
      value: "",
      label: t("All"),
    },
    {
      value: "social",
      label: t("Social"),
    },
    {
      value: "users",
      label: t("Application users"),
    },
  ];
  return (
    <div>
      <Formik initialValues={{ compensations: "" }} onSubmit={(values) => {}}>
        <Form className="w-full">
          <Select
            id="optionStatus"
            // label={`${t("Coupon Type")}`}
            placeholder={`${t("Coupon Type")}`}
            name={"couponType"}
            loadingPlaceholder={`${t("loading")}`}
            fieldKey={fieldKey}
            options={dataOptions}
            onChange={(option) => {
              //@ts-ignore
              setCouponType(option?.value);
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}
