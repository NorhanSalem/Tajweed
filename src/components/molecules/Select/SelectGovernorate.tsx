import { Form, Formik } from "formik"
import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import * as Yup from "yup"
import { useEffect } from "react"

type SelectGovernorate_tp = {
  setStatus?: any
  updateData?: any
  resetForm?: any
  onChange?: (option: any) => void
  GovernorateName?: string | undefined
  label?: string
  fieldKey?: any

  placeholder?: string
}

export default function SelectGovernorate({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  GovernorateName,
  placeholder,
  label,
}: SelectGovernorate_tp) {
  const {
    data: GovernorateOptions,
    isLoading: GovernorateLoading,
    failureReason,
  } = useFetch<any>({
    endpoint: `dashboard/states?show_all=${true}`,
    queryKey: [`dashboard/states/${updateData}`],
    onSuccess(data) {},
  })

  const GovernorateValidatingSchema = () =>
    Yup.object({
      state_id: Yup.string().trim().required(requiredTranslation),
    })

  const dataOptions = GovernorateOptions?.data.map((state: any) => ({
    value:  state.id,
    label: state.title,
  }))

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={GovernorateName}
        isDisabled={!GovernorateLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={GovernorateLoading}
        fieldKey={fieldKey}
        options={dataOptions}
        onChange={onChange}
        defaultValue={{
          value: !resetForm ? updateData?.state?.id : "",
          label: !resetForm ? updateData?.state?.title?.ar : t("Choose the governorate"),
        }}
      />
    </div>
  )
}
