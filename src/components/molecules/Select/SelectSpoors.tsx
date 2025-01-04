import { Form, Formik, useFormikContext } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { AddSponsor } from "../../templates/sponser/AddSponsor"

type SelectSpoors_tp = {
  placeholder?: string
  onChange?: (option: any) => void
  label?: string
  multi?: boolean
  name?: string | undefined
  fieldKey?: "id" | "value" | undefined
}

type options_TP = {
  [x: string]: any
  data: any
  id: number
  value: string
  label: string
}
export default function SelectSpoors({
  placeholder,
  multi,
  name,
  fieldKey,
  onChange,
  label,
}: SelectSpoors_tp) {
  const {
    data: SponsorOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<options_TP>({
    endpoint: "dashboard/advertisement/sponsors",
    queryKey: ["Roles"],
    onSuccess(data) {},
  })
  const { setFieldValue, values } = useFormikContext()


  const dataOptions = SponsorOptions?.data?.sponsors.map((sponsor: any) => ({
    value: sponsor.id,
    label: sponsor.responsable_name,
  }))


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
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
        creatable
        CreateComponent={AddSponsor}
        // {...{ ...(value && { value }) }}
      />
    </div>
  )
}
