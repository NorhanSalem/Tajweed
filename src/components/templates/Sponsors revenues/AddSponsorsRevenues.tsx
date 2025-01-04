/////////// IMPORTS
///
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { isValidPhoneNumber } from "react-phone-number-input"
import * as Yup from "yup"
import { useMutate } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import { notify } from "../../../utils/toast"
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../atoms"
import { OuterFormLayout } from "../../molecules"
import { SponsorsRevenuesMainData } from "./SponsorsRevenuesMainData"
import { useQueryClient } from "@tanstack/react-query"

/////////// Types
///
type AddSponsorsRevenues_props = {
  title?: string
  dataSource?: any
  editData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddSponsorsRevenues = ({
  title,
  resetForm,
  setModel,
  editData,
}: AddSponsorsRevenues_props) => {

  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    name: string
    date: Date
    amount: string
  }

  const SponserRevenuesValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      date: Yup.date().required(requiredTranslation),
      amount: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    name: !resetForm ? editData?.name : "",
    date: !resetForm ? new Date(editData.date) : new Date(),
    amount: !resetForm ? editData?.amount : "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const queryClient = useQueryClient()

  ///
  /////////// SIDE EFFECTS
  ///
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/reports/revenues/sponsor-revenues"],
    endpoint: `dashboard/reports/revenues/sponsor-revenues`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success")
      queryClient.invalidateQueries(["sponsor-revenues"])

      setModel(false)
    },
    onError: (err) => {
      console.log("err", err)

      notify("error", err.response.data.message)
    },
    formData: true,
  })
  const { mutate: Update, isLoading: updateLoading } = useMutate({
    mutationKey: [`dashboard/reports/revenues/sponsor-revenues/${editData.id}`],
    endpoint: `dashboard/reports/revenues/sponsor-revenues/${editData.id}`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success")
      queryClient.invalidateQueries(["sponsor-revenues"])

      setModel(false)
    },
    onError: (err) => {
      console.log("err", err)

      notify("error", err.response.data.message)
    },
    formData: true,
  })

  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SponserRevenuesValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          if (resetForm) {
            mutate({
              ...values,
            })
          } else {
            Update({
              ...values,
              _method: "put",
            })
          }

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
                  loading={isLoading || updateLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <SponsorsRevenuesMainData
                editData={editData}
                resetForm={resetForm}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
