import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";

type SelectPackageType_tp = {
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  placeholder?: string;
  style?: string;
  labelStyle?: string;
};
export default function SelectPackageType({
  onChange,
  name,
  placeholder,
  label,
  style,
  labelStyle,
}: SelectPackageType_tp) {
  const { values } = useFormikContext<any>();

  const dataOptions = [
    { label: t("Recurring"), value: "recurring" },
    { label: t("One time"), value: "one_time" },
  ];
  const selectedLanguage = dataOptions?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={name}
        value={selectedLanguage}
        loadingPlaceholder={`${t("loading")}`}
        options={dataOptions}
        onChange={onChange}
        labelStyle={labelStyle}
        style={style}
      />
    </div>
  );
}
