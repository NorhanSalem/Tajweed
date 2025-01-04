import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { OptionType } from "../../../utils/helpers";

type SelectWorkingOnline_tp = {
  setStatus?: any;
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  fieldKey?: any;
  placeholder?: string;
  style?: string;
};
export default function SelectWorkingOnline({
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectWorkingOnline_tp) {
  const { setFieldValue, values } = useFormikContext<any>();

  const dataOptions = [
    { label: t("Yes"), value: "1" },
    { label: t("No"), value: "0" },
  ];

  const selectedLanguage = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );
  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={name}
        loadingPlaceholder={`${t("loading")}`}
        options={dataOptions}
        onChange={onChange}
        value={selectedLanguage}
        style={style}
      />
    </div>
  );
}
