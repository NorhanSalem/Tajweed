import { t } from "i18next";
import { useFetch } from "../../../hooks";
import { Select } from "..";
import { useFormikContext } from "formik";

type SelectSpokenLanguage_tp = {
  setStatus?: any;
  updateData?: any;
  resetForm?: any;
  onChange?: (option: any) => void;
  name: string;
  label: string;
  fieldKey?: any;
  placeholder?: string;
  style?: string;
};
export default function SelectSpokenLanguage({
  updateData,
  resetForm,
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectSpokenLanguage_tp) {
  const {
    data: TeachingLanguage,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["teachingLanguage"],
    endpoint: "dashboard/teachingLanguage",
  });
  const { values } = useFormikContext<any>();

  const initialFormattedOptions = values[name]?.map((id: any) => {
    const option = TeachingLanguage?.data?.find(
      (option: any) => option.id === id
    );
    return { value: option?.id, label: option?.name };
  });
  const dataOptions = TeachingLanguage?.data?.map((item: any) => ({
    value: item?.id,
    label: item?.name,
  }));
  const selectedOptions = dataOptions?.filter((option: any) =>
    initialFormattedOptions?.some(
      (initialOption: any) => initialOption.value === option.value
    )
  );

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={name}
        isDisabled={!StatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={StatusLoading}
        options={dataOptions}
        onChange={onChange}
        style={style}
        isMulti
        value={selectedOptions}
      />
    </div>
  );
}
