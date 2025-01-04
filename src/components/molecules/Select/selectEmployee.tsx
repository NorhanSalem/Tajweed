import { useFormikContext } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import { OptionType } from "../../../utils/helpers";

type SelectEmployee_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  multi?: boolean;
  EmployeeName?: string | undefined;
  fieldKey?: "id" | "value" | undefined;
  name: string;
};

type options_TP = {
  [x: string]: any;
  data: any;
  id: number;
  value: string;
  label: string;
};
export default function SelectEmployee({
  placeholder,
  fieldKey,
  onChange,
  label,
  name,
}: SelectEmployee_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch({
    endpoint: "dashboard/hr/employees?active=1",
    queryKey: ["employees-select"],
  });
  const { values } = useFormikContext<any>();
  const mapStatusOptions = (options: options_TP) => {
    return (
      options?.data?.employees?.map((state: options_TP) => ({
        id: state?.id,
        value: state?.id,
        label: state?.name,
      })) || []
    );
  };

  const dataOptions = [...mapStatusOptions(StatusOptions as options_TP)];
  const selectedCountry = dataOptions?.find(
    (option: OptionType) => option?.value == values[name]
  );

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={name}
        isDisabled={!StatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={StatusLoading}
        value={selectedCountry}
        fieldKey={fieldKey}
        options={dataOptions}
        onChange={onChange}
      />
    </div>
  );
}
