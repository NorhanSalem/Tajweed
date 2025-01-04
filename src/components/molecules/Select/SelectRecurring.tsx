import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";

type SelectRecurringType = {
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  placeholder?: string;
};
export default function SelectRecurring({
  onChange,
  name,
  placeholder,
  label,
}: SelectRecurringType) {
  const { values } = useFormikContext<any>();

  const dataOptions = [
    { label: t("days"), value: "day" },
    { label: t("weeks"), value: "weeks" },
    { label: t("months"), value: "months" },
    { label: t("year"), value: "year" },
  ];
  const selectedLanguage = dataOptions?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="selectPeriod"
        name={name}
        value={selectedLanguage}
        loadingPlaceholder={`${t("loading")}`}
        options={dataOptions}
        onChange={onChange}
        style="lg:mt-12 lg:ml-[-4rem] md:mt-6 mb-3 w-[17rem] lg:w-[17rem] md:w-[20rem]"
      />
    </div>
  );
}
