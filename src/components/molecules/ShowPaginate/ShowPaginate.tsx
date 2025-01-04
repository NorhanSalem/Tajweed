import { Form, Formik } from "formik"
import { Select } from ".."
import { t } from "i18next"

type ShowPaginate_TP = {
  total?: string
  setShowPaginate: React.Dispatch<React.SetStateAction<undefined>>
}

export default function ShowPaginate({
  total,
  setShowPaginate,
}: ShowPaginate_TP) {
  interface ShowPaginationItem {
    key: number | string
    value: number | string
  }

  const ShowPagination = {
    data: [
      { key: 10, value: 10 },
      { key: 20, value: 20 },
      { key: 50, value: 50 },
      { key: `${total}`, value: "الكل" },
    ] as ShowPaginationItem[],
  }

  type ShowPaginationArray_TP = {
    value: number | string
    label: number | string
  }

  const dataOptions: ShowPaginationArray_TP[] = ShowPagination.data.map(
    (paginate: ShowPaginationItem) => ({
      value: paginate.key,
      label: paginate.value,
    })
  )

  return (
    <div>
      <div>
        <Formik
          initialValues={{ dataOption: "" }}
          onSubmit={(values) => {
            //  setStatus(values)
          }}
          // validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className="w-full">
              <Select
                id="optionStatus"
                //  label={t(`${label}`).toString()}
                name="dataOption"
                //  isDisabled={!StatusLoading && !!failureReason}
                loadingPlaceholder={`${t("loading")}`}
                //      loading={StatusLoading}
                options={dataOptions}
                onChange={(option) => {
                  //@ts-ignore
                  setShowPaginate(option?.value)
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
