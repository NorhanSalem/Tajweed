import { useFormikContext } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import { OptionType } from "../../../utils/helpers";

type SelectLanguage_tp = {
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
export default function SelectLanguage({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectLanguage_tp) {
  const {
    data: LanguageOptions,
    isLoading: LanguageLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/language"],
    endpoint: "dashboard/language",
    onSuccess(data) {},
  });
  const { values } = useFormikContext<any>();

  const dataOptions = LanguageOptions?.data.map((state: any) => ({
    value: state.key,
    label: state.value,
  }));

  const selectedLanguage = dataOptions?.find(
    (option: OptionType) => option?.value == values[name].toUpperCase()
  );
  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={name}
        isDisabled={!LanguageLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={LanguageLoading}
        options={dataOptions}
        onChange={onChange}
        value={selectedLanguage}
        style={style}
      />
    </div>
  );
}
