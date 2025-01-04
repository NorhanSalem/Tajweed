import { Form, Formik, useFormikContext } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type SelectType_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  multi?: boolean;
  TypeName?: string | undefined;
  fieldKey?: "id" | "value" | undefined;
  updateData: any;

};

type options_TP = {
  [x: string]: any;
  data: any;
  id: number;
  value: string;
  resetForm?: any;
  label: string;
};
export default function SelectType({
  placeholder,
  multi,
  TypeName,
  fieldKey,
  onChange,
  updateData,
  label,
}: SelectType_tp) {

  const dataOptions = [
    {
      value: 1,
      label: t("Percentage")
    },
    {
      value: 0,
      label: t("Value"),
    },
  ];
  const defaultValue = dataOptions.find(
    (el) => updateData?.is_percentage == el.value
  );
  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={TypeName}
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
