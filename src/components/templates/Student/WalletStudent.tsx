/////////// IMPORTS
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"
import { useMutate } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import { notify } from "../../../utils/toast"
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../atoms"
import { OuterFormLayout } from "../../molecules"
import { WalletMainData } from "./WalletMainData"

type InitialValues_TP = {
  name: string
  reason: string
}
type WalletStudent_props = {
  title?: string
  setModel?: Dispatch<SetStateAction<boolean>> | undefined
  resetForm?: boolean
  refetch?: any
  studentId?: any
}

export const WalletStudent = ({
  title,
  setModel,
  refetch,
  studentId,
}: WalletStudent_props) => {
  /// validation schema
  const studentValidation = () =>
    Yup.object({
      wallet: Yup.number()
        .required(requiredTranslation)
        .typeError(t("Enter numbers only")),
      reason: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    name: "",
    reason: "",
  }

  const { mutate, isLoading } = useMutate({
    endpoint: `dashboard/students/${studentId}/wallets`,
    mutationKey: ["dashboard_students"],
    onSuccess: (data: InitialValues_TP) => {
      if (refetch) {
        refetch()
      }
      setModel?.(false)
      notify("success")
    },
    onError: (err) => {
      console.log("err", err)
      notify("error", err?.response?.data?.message)
    },
    formData: true,
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={studentValidation}
        onSubmit={(values: InitialValues_TP) => {
          mutate({ ...values })
        }}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <WalletMainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
