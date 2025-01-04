import { Form, Formik } from "formik"

import { t } from "i18next"
import { Select } from ".."
import { useFetch } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import * as Yup from "yup"

type SelectLanguageFilter_tp = {
  setStatus: any
  updateData?: any
  resetForm?:any
}
export default function SelectLanguageFilter({
  setStatus,
  updateData,
  resetForm,
}: SelectLanguageFilter_tp) {
  const {
    data: LanguageOptions,
    isLoading: LanguageLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/language"],
    endpoint: "dashboard/language",
    onSuccess(data) {},
  })

  const dataOptions = LanguageOptions?.data.map((state: any) => ({
    value: state.key,
    label: state.value,
  }))

  const LanguageValidatingSchema = () =>
    Yup.object({
      language: Yup.string().trim().required(requiredTranslation),
    })

  return (
    <div>
      <Formik
        initialValues={{ language: "" }}
        validationSchema={LanguageValidatingSchema}
        onSubmit={(values) => {
          setStatus(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("Choose Language")}`}
              label={t(`${"Language"}`).toString()}
              name="language"
              isDisabled={!LanguageLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={LanguageLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value)
              }}
              defaultValue={{
                value: !resetForm ? updateData?.language : "",
                label: !resetForm ? updateData?.language : t("Choose Language"),
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
