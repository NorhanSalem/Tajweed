import { Form, Formik } from "formik"
import { t } from "i18next"
import { Select } from ".."

type SelectStatus_tp = {
  setStatus: any
}
export default function SelectStatus({ setStatus }: SelectStatus_tp) {
  const dataOptions = [
    {
      value: "",
      label: t("All"),
    },
    {
      value: "1",
      label: t("active"),
    },
    {
      value: "0",
      label: t("notactive"),
    },
  ]

  return (
    <div>
      <Formik
        initialValues={{ dataOption: "" }}
        onSubmit={(values) => {
          setStatus(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              placeholder={`${t("Choose the status")}`}
              label={`${t("Status")}`}
              id="optionStatus"
              name="dataOption"
              loadingPlaceholder={`${t("loading")}`}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value)
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
