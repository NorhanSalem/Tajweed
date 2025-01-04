import { Form, Formik } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import * as Yup from "yup"

type SelectMaritalStatusFilter_tp = {
  setStatus: any
  updateData?: any
  resetForm?:any
}
export default function SelectMaritalStatusFilter({
  setStatus,
  updateData,
  resetForm,
}: SelectMaritalStatusFilter_tp) {
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

  const marital_statusValidationSchema = () =>
    Yup.object({
      marital_status: Yup.string().trim().required(requiredTranslation),
    })

  return (
    <div>
      <Formik
        initialValues={{ marital_status: "" }}
        validationSchema={marital_statusValidationSchema}
        onSubmit={(values) => {
          setStatus(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("Choose marital status")}`}
              label={t(`${"Marital Status"}`).toString()}
              name="marital_status"
              isDisabled={!MaritalStatusLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={MaritalStatusLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value)
              }}
              defaultValue={{
                value: !resetForm ? updateData?.marital_status : "",
                label: !resetForm
                  ? updateData?.marital_status
                  : t("Choose marital status"),
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
