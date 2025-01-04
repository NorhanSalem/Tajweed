/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { Button } from "../../../atoms"
import { OuterFormLayout } from "../../../molecules"
import { useMutate } from "../../../../hooks"
import { requiredTranslation } from "../../../../utils/helpers"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { PackageMainData } from "../packages/PackageMainData"
import { PaymentMethodsMainData } from "./PaymentMethodsMainData"

///
/////////// Types
///
type AddPaymentMethods_props = {
  title?: string
  dataSource?: any
  updateData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddPaymentMethods = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
}: AddPaymentMethods_props) => {

  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string
  }

  const PaymentValidatingSchema = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar : "",
    title_en: !resetForm ? updateData?.title_en : "",
    logo: !resetForm
      ? !!updateData?.logo
        ? [
            {
              path: updateData?.logo,
              type: "image",
            },
          ]
        : []
      : [],
  }
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient()
  // all student
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/payments"],
    endpoint: `dashboard/payments`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/payments"])
      setModel(false)
      notify("success")
    },
    onError: (err) => {
      notify("error", err.response.data.message)
    },
    formData: true,
  })

  // update student

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/payments"],
    endpoint: `dashboard/payments/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/payments"])

      notify("success")
      setModel(false)
    },
    onError: (err) => {
      notify("error", err?.response?.data.message)
    },

    formData: true,
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PaymentValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          let logo =
          !resetForm &&
          values?.logo?.length > 0 &&
          values?.logo[0]?.path !== updateData?.logo
          ? values?.logo[0]
          : undefined
          if( !resetForm){

            if (!logo) {
              delete values?.logo
            }
          }
      
          resetForm
            ? mutate({
                ...values,
                logo: values?.logo[0],
              })
            : update({
                ...values,
                logo: values?.logo && values?.logo[0],
                _method: "put",
              })
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
                  loading={isLoading || LoadingUpdateSponsor}
                >
                  {t("submit")}
                </Button>
              }
            >
              <PaymentMethodsMainData
                updateData={updateData}
                resetForm={resetForm}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
