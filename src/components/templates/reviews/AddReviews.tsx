/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import {requiredTranslation } from "../../../utils/helpers"
import { useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors"
import { OuterFormLayout } from "../../molecules"
import { Button } from "../../atoms"
import { ReviewsMainData } from "./ReviewsMainData"

///
/////////// Types
///
type AddReviews_props = {
  title?: string
  dataSource?: any
  updateData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddReviews = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
}: AddReviews_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string
  }

  const ReviewsValidatingSchema = () =>
    Yup.object({
      student_name: Yup.string().trim().required(requiredTranslation),
      job: Yup.string().trim().required(requiredTranslation),
      rate: Yup.number().required(requiredRateTranslation).typeError(t("Enter numbers only")),
      comment: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    student_name: !resetForm ? updateData?.student_name : "",
    job: !resetForm ? updateData?.job : "",
    rate: !resetForm ? updateData?.rate : "",
    comment: !resetForm ? updateData?.comment : "",
    image: !resetForm
      ? !!updateData?.image
        ? [
            {
              path: updateData?.image,
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
    mutationKey: ["dashboard/site-reviews"],
    endpoint: `dashboard/site-reviews`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/site-reviews"])
      setModel(false)
      notify("success")
    },
    onError: (err) => {
      console.log("err", err)
      notify("error", err.response.data.message)
    },
    formData: true,
  })

  // update student

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/site-reviews"],
    endpoint: `dashboard/site-reviews/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/site-reviews"])

      notify("success")
      setModel(false)
    },
    onError: (err) => {
      console.log("err", err)
      notify("error", err?.response?.data.message)
    },

    formData: true,
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ReviewsValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
         
          resetForm
            ? mutate({
                ...values,
                image: values.image[0],
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
              <ReviewsMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
