import React, { useState } from "react"
import { useFetch } from "../../../../hooks"
import { Select } from "../../../../components/molecules"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"

function EditRequestStatusSelect({ setRequestStatus }: any) {
  const [dataOption, setDataOption] = useState("")

  const { data: editRequestStatus, isLoading,refetch } = useFetch({
    endpoint: `dashboard/edit-requests-status`,
    queryKey: ["dashboard/edit-requests-status"],
    onSuccess: (data) => {
      const lol = Object.keys(data?.data)
      const options = lol.map((item) => ({ label: t(item), value: item }))
      setDataOption(options)
    },
    onError: (error) => {},
  })
  const { t } = useTranslation()

  return (
    <div>
      <Formik initialValues={{}} onSubmit={(values) => {}}>
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={t(`${"Choose status request"}`).toString()}
              name="nationality_id"
              // isDisabled={!isLoading }
              loadingPlaceholder={`${t("loading")}`}
              loading={isLoading}
              options={dataOption}
              onChange={(option) => {
                setRequestStatus(option.value)
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditRequestStatusSelect
