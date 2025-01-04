import { Form, Formik, useFormikContext } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"

type SelectRoles_tp = {
  placeholder?: string
  onChange?: (option: any) => void
  label?: string
  multi?: boolean
  RolesName?: string | undefined
  fieldKey?: "id" | "value" | undefined
}

type options_TP = {
  [x: string]: any
  data: any
  id: number
  value: string
  label: string
}
export default function SelectRoles({
  placeholder,
  multi,
  RolesName,
  fieldKey,
  onChange,
  label,
}: SelectRoles_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<options_TP>({
    endpoint: "dashboard/roles",
    queryKey: ["Roles"],
    onSuccess(data) {},
  })
  const { setFieldValue, values } = useFormikContext()

  const mapStatusOptions = (options: options_TP) => {
    return (
      options?.data?.roles.map((state: options_TP) => ({
        id: state?.id,
        value: state?.name,
        label: state?.name,
      })) || []
    )
  }

  const dataOptions = [
    ...mapStatusOptions(StatusOptions),
    {
      id: "all",
      value: 0,
      label: "الكل",
    },
  ]

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={RolesName}
        isDisabled={!StatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={StatusLoading}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
        // {...{ ...(value && { value }) }}
      />
    </div>
  )
}
