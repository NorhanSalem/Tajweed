import { Form, Formik } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import * as Yup from "yup"

type SelectMaritalStatus_tp = {
  setStatus?: any
  updateData?: any
  resetForm?: any
  onChange?: (option: any) => void
  MaritalStatusName?: string | undefined
  label?: string
  fieldKey?: any
  placeholder?: string
}
export default function SelectMaritalStatus({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  MaritalStatusName,
  placeholder,
  label,
}: SelectMaritalStatus_tp) {
  const {
    data: MaritalStatus,
    isLoading: MaritalStatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["/dashboard/marital-status"],
    endpoint: "dashboard/marital-status",
    onSuccess(data) {},
  })

  const dataOptions = MaritalStatus?.data.map((state: any) => ({
    value: state.key,
    label: state.value,
  }))

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={MaritalStatusName}
        isDisabled={!MaritalStatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={MaritalStatusLoading}
        options={dataOptions}
        onChange={onChange}
        defaultValue={{
          value: !resetForm ? updateData?.marital_status : "",
          label: !resetForm
            ? updateData?.marital_status
            : t("Choose marital status"),
        }}
      />
    </div>
  )
}
