/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { isValidPhoneNumber } from "react-phone-number-input"
import * as Yup from "yup"
import { useFetch, useLocalStorage, useMutate } from "../../hooks"
import { requiredTranslation } from "../../utils/helpers"
import { HandleBackErrors } from "../../utils/utils-components/HandleBackErrors"
import { Loading } from "../../components/organisms/Loading/Loading"
import { OuterFormLayout } from "../../components/molecules"
import { Button } from "../../components/atoms"
import { OuterSettingMainData } from "../../components/templates/outer setting/OuterSettingMainData"
import { notify } from "../../utils/toast"
import { useAuth } from "../../context/auth-and-perm/AuthProvider"

///
/////////// Types
///
type OuterSetting_props = {
  title: string
  dataSource?: any
  OuterSettingData?: any
  setModel?: any
  resetForm?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OuterSetting = ({
  title,
  dataSource,
  setModel,
  resetForm,
}: OuterSetting_props) => {
  type InitialValues_TP = {
    [x: string]: string
  }

  const { user } = useAuth()
  console.log("🚀 ~ file: OuterSetting.tsx:47 ~ user:", user?.data)
  //all data
  const OuterSettingData = user?.data
  const TeacherValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      email: Yup.string().trim().required(requiredTranslation),
      phone: Yup.string()
        .trim()
        .required(requiredTranslation)
        .test("isValidateNumber", `${t("wrong number")}`, function (value: string) {
          return isValidPhoneNumber(value || "")
        }),
      birthday: Yup.date().required(requiredTranslation),
      password: Yup.string().trim().required(requiredTranslation),
      password_confirmation: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    name: !resetForm ? OuterSettingData?.data?.name : "",
    email: !resetForm ? OuterSettingData?.data?.email : "",
    phone: !resetForm ? OuterSettingData?.data?.phone : "",
    Password: !resetForm ? OuterSettingData?.data?.Password : "",
    password: !resetForm ? OuterSettingData?.data?.password : "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  // const [gender, setGender] = useState(!resetForm ? OuterSettingData?.gender : "")

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient()
    const [ userData, setUserData ] = useLocalStorage("user", user)
    
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/auth/update-profile"],
    endpoint: `dashboard/auth/update-profile`,
    onSuccess: (data: InitialValues_TP) => {
      console.log("🚀 ~ file: OuterSetting.tsx:89 ~ data:", data?.data?.data)
      notify("success")
        // localStorage.setItem()
        setUserData(data)
    },

    onError: (err) => {
      console.log("err", err)
      notify("error", err?.response?.data.message)
    },
    formData: true,
  })

  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: InitialValues_TP) => {
          console.log("values", values)
          mutate({
            ...values,
          })
        }}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              //   header={title}
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
              <OuterSettingMainData resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  )
}
