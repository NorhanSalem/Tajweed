import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { OptionType } from "../../../utils/helpers";

type SelectTypePopularQuestions_TP = {
  setStatus?: any;
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  fieldKey?: any;
  placeholder?: string;
};
export default function SelectTypePopularQuestions({
  onChange,
  name,
  placeholder,
  label,
}: SelectTypePopularQuestions_TP) {
  const { values } = useFormikContext<any>();

  const dataOptions = [
    { label: t("home"), value: "home" },
    { label: t("student"), value: "student" },
    { label: t("teacher"), value: "teacher" },
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
      />
    </div>
  );
}
