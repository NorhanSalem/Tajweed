import { useFormikContext } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import { OptionType } from "../../../utils/helpers";

type SelectInterviewStatus_tp = {
  placeholder?: any;
  data?: any;
  setDataTeacherValue?: any;
  mutate?: any;
  label: string;
  name: string;
  updateData?: any;
  resetForm?: any;
  style?: string;
};
export default function SelectInterviewStatus({
  placeholder,
  name,
  label,
  style,
  resetForm,
  updateData,
}: SelectInterviewStatus_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    endpoint: "dashboard/teachers/interview-status",
    queryKey: ["interview-status"],
    onSuccess(data) {},
  });

  const mapStatusOptions = (options: any) => {
    return (
      options?.data?.map((state: any) => ({
        value: state.key,
        label: state.value,
      })) || []
    );
  };
  const { setFieldValue, values } = useFormikContext<any>();

  const dataOptions = [...mapStatusOptions(StatusOptions)];
  const selectedLanguage = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );
  return (
    <div>
      <Select
        id="optionStatus"
        placeholder={placeholder}
        label={label}
        name={name}
        isDisabled={!StatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={StatusLoading}
        options={dataOptions}
        onChange={(option) => {
          //@ts-ignore
          setFieldValue(name, option?.value);
        }}
        value={selectedLanguage}
        style={style}
      />
    </div>
  );
}
