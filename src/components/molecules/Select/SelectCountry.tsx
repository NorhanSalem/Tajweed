import { t } from "i18next";
import { useFetch } from "../../../hooks";
import { Select } from "..";
import { useFormikContext } from "formik";
import { OptionType } from "../../../utils/helpers";

type SelectCountry_tp = {
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
export default function SelectCountry({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  name,
  placeholder,
  label,
  style,
}: SelectCountry_tp) {
  const {
    data: NationalityOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/get-countries"],
    endpoint: `dashboard/get-countries?show_all=${true}`,

    onSuccess(data) {},
  });
  const { values } = useFormikContext<any>();

  const dataOptions = NationalityOptions?.data?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));
  const selectedCountry = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );
  return (
    <div>
      <Select
        placeholder={`${t("choose country")}`}
        label={label}
        id="optionStatus"
        name={name}
        value={selectedCountry}
        isDisabled={!NationalityLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={NationalityLoading}
        options={dataOptions}
        onChange={onChange}
        style={style}
      />
    </div>
  );
}
