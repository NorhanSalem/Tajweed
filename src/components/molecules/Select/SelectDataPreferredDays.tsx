import { t } from "i18next";
import { Select } from "../formik-fields";
import { useFormikContext } from "formik";

type SelectDataPreferredDays_TP = {
  onChange: (option: any) => void;
  label: any;
  name: string;
  style?: string;
};
function SelectDataPreferredDays({
  onChange,
  label,
  name,
  style,
}: SelectDataPreferredDays_TP) {
  const { values } = useFormikContext<any>();
  console.log(values);
  const DataPreferredDays = [
    { label: t("Monday"), value: "monday" },
    { label: t("Tuesday"), value: "tuesday" },
    { label: t("Wednesday"), value: "wednesday" },
    { label: t("Thursday"), value: "thursday" },
    { label: t("Friday"), value: "friday" },
    { label: t("Saturday"), value: "saturday" },
    { label: t("Sunday"), value: "sunday" },
  ];
  const initialFormattedOptions = values[name]?.map((val: any) => {
    const option = DataPreferredDays?.find(
      (option: any) => option.value == val
    );
    return { value: option?.value, label: option?.value };
  });
  const selectedOptions = DataPreferredDays?.filter((option: any) =>
    initialFormattedOptions?.some(
      (initialOption: any) => initialOption.value === option.value
    )
  );

  return (
    <div>
      <Select
        label={label}
        placeholder={`${t("preferred days")}`}
        onChange={onChange}
        isMulti
        value={selectedOptions}
        id="preferred_days"
        name="preferred_days"
        options={DataPreferredDays}
        style={style}
      />
    </div>
  );
}

export default SelectDataPreferredDays;
