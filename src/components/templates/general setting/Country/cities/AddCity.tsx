/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { HandleBackErrors } from "../../../../../utils/utils-components/HandleBackErrors"
import { OuterFormLayout } from "../../../../molecules"
import { Button } from "../../../../atoms"
import { useMutate } from "../../../../../hooks"
import { requiredTranslation } from "../../../../../utils/helpers"
import { notify } from "../../../../../utils/toast"
import { CityMainData } from "./CityMainData"

///
/////////// Types
///
type AddCity_props = {
  title?: string
  dataSource?: any
  updateData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddCity = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: AddCity_props) => {
  ///
  type InitialValues_TP = {
    [x: string]: string
  }

  const CityValidatingSchema = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      country_id: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar : "",
    title_en: !resetForm ? updateData?.title_en : "",
    country_id: !resetForm ? updateData?.country?.id    : "",
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
    mutationKey: ["dashboard/states"],
    endpoint: `dashboard/states`,
    onSuccess: (data: InitialValues_TP) => {
      refetch()
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
    mutationKey: ["dashboard/states"],
    endpoint: `dashboard/states/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch()

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
        validationSchema={CityValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
    
          resetForm
            ? mutate({
                ...values,
              })
            : update({
                ...values,

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
              <CityMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
