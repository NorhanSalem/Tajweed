import { Form, Formik, useFormikContext } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import { OptionType } from "../../../utils/helpers";

type SelectTypeCoupon_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  multi?: boolean;
  name: string ;
  fieldKey?: "id" | "value" | undefined;
};

type options_TP = {
  [x: string]: any;
  data: any;
  id: number;
  value: string;
  updateData?: any;
  resetForm?: any;
  label: string;
};
export default function SelectTypeCoupon({
  placeholder,
  multi,
  name,
  fieldKey,
  onChange,
  label,
}: SelectTypeCoupon_tp) {
  const { setFieldValue, values } = useFormikContext();
  const dataOptions = [

    {
      value: "social",
      label: t("Social"),
    },
    {
      value: "users",
      label: t("Application users"),
    },
  ];
  const selectedOptions = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={name}
        value={selectedOptions}
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
      />
    </div>
  );
}
