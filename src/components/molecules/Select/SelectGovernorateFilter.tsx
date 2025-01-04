import { Form, Formik } from "formik"
import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import * as Yup from "yup"
import { useEffect } from "react"

type SelectGovernorateFilter_tp = {
  setStatus: any
  updateData?: any
  resetForm ?:any
}

export default function SelectGovernorateFilter({
  setStatus,
  updateData,
  resetForm,
}: SelectGovernorateFilter_tp) {
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
    value: state.id,
    label: state.title,
  }))

  return (
    <div>
      <Formik
        initialValues={{ state_id: "" }}
        validationSchema={GovernorateValidatingSchema}
        onSubmit={(values) => {
          setStatus(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${"Choose the governorate"}`}
              label={t(`${"governorate"}`).toString()}
              name="state_id"
              isDisabled={!GovernorateLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={GovernorateLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value)
              }}
              defaultValue={{
                value: !resetForm ? updateData?.state_id : "",
                label: !resetForm
                  ? dataOptions?.find(
                      (option) => option?.value === updateData?.state_id
                    )?.label || t("Choose the governorate")
                  : t("Choose the governorate"),
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
