import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
type SelectSpecialization_tp = {
  setStatus?: any;
  updateData?: any;
  resetForm?: any;
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  fieldKey?: any;
  placeholder?: string;
  style?: string;
};
export default function SelectSpecialization({
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectSpecialization_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["specializations"],
    endpoint: "dashboard/teachers/specializations?active=1",
    onSuccess(data) {},
  });
  const { values } = useFormikContext<any>();
  const initialFormattedOptions = values[name]?.map((id: any) => {
    const option = StatusOptions?.data?.specializations?.find(
      (option: any) => option.id === id
    );
    return { value: option?.id, label: option?.name };
  });

  const dataOptions = StatusOptions?.data?.specializations?.map(
    (state: any) => ({
      value: state.id,
      label: state.name,
    })
  );

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
        value={selectedOptions}
        style={style}
        isMulti
      />
    </div>
  );
}
