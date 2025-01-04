import { t } from "i18next";
import { useFetch } from "../../../hooks";
import { Select } from "..";
import { useFormikContext } from "formik";
import { OptionType } from "../../../utils/helpers";

type SelectCategoryBlog_tp = {
  setStatus?: any;
  updateData?: any;
  resetForm?: any;
  onChange?: (option: any) => void;
  name: string;
  label?: string;
  fieldKey?: any;
  placeholder?: string;
};
export default function SelectCategoryBlog({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  name,
  placeholder,
  label,
}: SelectCategoryBlog_tp) {
  const {
    data: AllCategory,
    isLoading: categoryLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/categories"],
    endpoint: `dashboard/categories`,
  });
  const { values } = useFormikContext<any>();

  const dataOptions = AllCategory?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  const selectedCountry = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );
  return (
    <div>
      <Select
        placeholder={`${t("choose category")}`}
        label={label}
        id="optionStatus"
        name={name}
        value={selectedCountry}
        isDisabled={!categoryLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={categoryLoading}
        options={dataOptions}
        onChange={onChange}
      />
    </div>
  );
}
