import { Form, Formik, useFormikContext } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import * as Yup from "yup"
import { requiredTranslation } from "../../../utils/helpers"
import { OptionType } from "dayjs"

type SelectPermission_tp = {
  onChange?: (option: any) => void
  PermissionName: string 
  label?: string
  fieldKey?: any
  placeholder?: string
}
export default function SelectPermission({
  onChange,
  PermissionName,
  placeholder,
  label,
}: SelectPermission_tp) {
  const { values  } = useFormikContext<any>();

  const {
    data: PermissionOptions,
    isLoading: PermissionLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/roles"],
    endpoint: `dashboard/roles`,

    onSuccess(data) {},
  })


  const dataOptions = PermissionOptions?.data.roles.map((state: any) => ({
    value: state.id,
    label: state.name,
  }))

  const SelectOptionData = dataOptions?.find(
    (option: OptionType) => option?.value == values[PermissionName]
  );

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={PermissionName}
        isDisabled={!PermissionLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={PermissionLoading}
        options={dataOptions}
        onChange={onChange}
        value={SelectOptionData}
  
      />
    </div>
  )
}
