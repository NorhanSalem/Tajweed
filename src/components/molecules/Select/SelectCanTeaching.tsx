import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type Option = {
  value: number;
  label: string;
};

type SelectCanTeaching_tp = {
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  placeholder?: string;
  style?: string;
};

export default function SelectCanTeaching({
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectCanTeaching_tp) {
  const { data: StatusOptions } = useFetch<any>({
    queryKey: ["dashboard/teachers/get-teaching-fields"],
    endpoint: "dashboard/teachers/get-teaching-fields?active=1",
    onSuccess(data) {},
  });

  if (
    !StatusOptions ||
    !StatusOptions.data ||
    !StatusOptions.data.teachingFields ||
    !Array.isArray(StatusOptions.data.teachingFields)
  ) {
    console.log("Loading StatusOptions...");
    return <div>{t("loading")}</div>;
  }

  const { values } = useFormikContext<any>();

  console.log("Teaching Fields Data:", StatusOptions.data.teachingFields);
  console.log("Formik Values:", values);

  const dataOptions: Option[] = (StatusOptions.data.teachingFields || []).map(
    (state: any) => ({
      value: state.id,
      label: state.name || "Unknown",
    })
  );

  const initialFormattedOptions: Option[] = (values[name] || []).map(
    (id: any) => {
      const option = StatusOptions.data.teachingFields.find(
        (item: any) => item.id.toString() === id.toString()
      );

      if (!option) {
        console.warn(`No matching option found for ID: ${id}`);
      }

      return {
        value: option?.id || id,
        label: option?.name || option?.id || id,
      };
    }
  );

  const selectedOptions: Option[] = dataOptions.filter((option) =>
    initialFormattedOptions.some(
      (initialOption) =>
        initialOption.value.toString() === option.value.toString()
    )
  );

  console.log("Selected Options:", selectedOptions);

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={name}
        value={initialFormattedOptions}
        loadingPlaceholder={`${t("loading")}`}
        options={dataOptions}
        onChange={onChange}
        style={style}
        isMulti
      />
    </div>
  );
}
