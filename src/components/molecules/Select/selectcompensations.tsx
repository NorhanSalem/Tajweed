import { t } from "i18next";
import { Select } from "..";
import { useFormikContext } from "formik";
import { OptionType } from "../../../utils/helpers";

type Selectcompensations_TP = {
  [x: string]: any;
  label: string;
  name:string
  multi:boolean
  placeholder:string
};
export default function Selectcompensations({
  placeholder,
  multi,
  name,
  fieldKey,
  onChange,
  label,
}: Selectcompensations_TP) {
  const { values } = useFormikContext<any>();
  const dataOptions = [
    {
      value: "AWARD",
      label: `${t("Award")}`,
    },
    {
      value: "DEDUCTION",
      label: `${t("Deduction")}`,
    },
  ];

  const selectedCountry = dataOptions?.find(
    //@ts-ignore
    (option: OptionType) => option?.value == values[name]
  );

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={name}
        value={selectedCountry}
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}

      />
    </div>
  );
}
