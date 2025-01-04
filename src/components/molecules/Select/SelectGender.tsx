import { t } from "i18next";
import { useFetch } from "../../../hooks";
import { Select } from "..";
import { useFormikContext } from "formik";
import { OptionType } from "../../../utils/helpers";

type SelectGender_tp = {
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
export default function SelectGender({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectGender_tp) {
  const {
    data: GenderOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/genders"],
    endpoint: `dashboard/genders`,
    onSuccess(data) {},
  });
  const { setFieldValue, values, handleBlur } = useFormikContext<any>();

  const dataOptions = GenderOptions?.data.map((state: any) => ({
    value: state.key,
    label: state.value,
  }));
  const selectGender = dataOptions?.find(
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
        fieldKey={fieldKey}
        onChange={onChange}
        value={selectGender}
        style={style}
      />
    </div>
  );
}
