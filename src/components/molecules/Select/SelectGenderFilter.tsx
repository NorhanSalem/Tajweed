import { Form, Formik } from "formik"
import { t } from "i18next"
import { useFetch } from "../../../hooks"
import { Select } from ".."

type SelectGenderFilter_tp = {
  setStatus: any
  placeholder?: string
}
export default function SelectGenderFilter({
  setStatus,
  placeholder,
}: SelectGenderFilter_tp) {
  const {
    data: GenderOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/genders"],
    endpoint: `dashboard/genders`,
    onSuccess(data) {},
  })

  const mapStatusOptions = (options: any) => {
    return (
      options?.data?.map((state: any) => ({
        value: state.key,
        label: state.value,
      })) || []
    )
  }
  const dataOptions = [
    {
      value: "",
      label: "الكل",
    },
    ...mapStatusOptions(GenderOptions),
  ]

  return (
    <div>
      <Formik initialValues={{ gender: "" }} onSubmit={(values) => {}}>
        <Form className="w-full">
          <Select
            placeholder={placeholder}
            // label={`${t("Tybe")}`}
            id="optionStatus"
            name="gender"
            loadingPlaceholder={`${t("loading")}`}
            options={dataOptions}
            onChange={(option) => {
              //@ts-ignore
              setStatus(option?.value)
            }}
          />
        </Form>
      </Formik>
    </div>
  )
}
