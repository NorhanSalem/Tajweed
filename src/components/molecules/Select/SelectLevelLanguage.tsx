import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";

type SelectLevelLanguage_tp = {
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  placeholder?: string;
  style?: string;
};
export default function SelectLevelLanguage({
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectLevelLanguage_tp) {
  const { values } = useFormikContext<any>();

  const dataOptions = [
    { label: t("Weak"), value: "WEAK" },
    { label: t("Beginner"), value: "BEGINNER" },
    { label: t("Intermediate"), value: "INTERMEDIATE" },
    { label: t("Fluent"), value: "FLUENT" },
    { label: t("Mother language"), value: "MOTHER_LANGUAGE" },
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
        style={style}
      />
    </div>
  );
}
