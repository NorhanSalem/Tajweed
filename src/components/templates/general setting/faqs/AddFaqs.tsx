/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik, useFormikContext } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { useMutate } from "../../../../hooks"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { OuterFormLayout } from "../../../molecules"
import { Button } from "../../../atoms"
import { FaqsMainData } from "./FaqsMainData"
import { requiredTranslation } from "../../../../utils/helpers"
import { useState } from "react"

///
/////////// Types
///
type AddFaqs_props = {
  title?: string
  dataSource?: any
  updateData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddFaqs = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
}: AddFaqs_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string
  }


  const FaqValidatingSchema = () =>
    Yup.object({
      type: Yup.string().trim().required(requiredTranslation),
      question_ar: Yup.string().trim().required(requiredTranslation),
      question_en: Yup.string().trim().required(requiredTranslation),
      answer_ar: Yup.string().trim().required(requiredTranslation),
      answer_en: Yup.string().trim().required(requiredTranslation),
    })

    const [formsValue , setFormsValue] =useState()

  const initialValues: InitialValues_TP = {
    type: !resetForm ? updateData?.type : "",
    question_ar: !resetForm ? updateData?.question_ar : "",
    question_en: !resetForm ? updateData?.question_en : "",
    answer_ar: !resetForm ? updateData?.answer_ar : "",
    answer_en: !resetForm ? updateData?.answer_en : "",
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
    mutationKey: ["dashboard/faq-popular-questions"],
    endpoint: `dashboard/faq-popular-questions`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/faq-popular-questions"])
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
    mutationKey: ["dashboard/faq-popular-questions"],
    endpoint: `dashboard/faq-popular-questions/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["dashboard/faq-popular-questions"])

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
        validationSchema={FaqValidatingSchema}
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
              <FaqsMainData
                updateData={updateData}
                resetForm={resetForm}
                setFormsValue={setFormsValue}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
