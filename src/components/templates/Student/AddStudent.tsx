/////////// IMPORTS
import { Form, Formik } from "formik";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { StudentMainData } from "./StudentMainData";
import { isEmail } from "../Teacher/Types_and_validation";
///
// types
interface UpdateData {
  id: string;
  name: string;
  birthday: string;
  gender: string;
  country_id: string;
  nationality: {
    id: string;
  };
  marital_status: string;
  phone: string;
  email?: string;
  phone_country: string;
  gender_en: string;
  country: {
    id: string;
  };
  phone_all: string;
}
type InitialValues_TP = {
  name: string;
  birthday: Date;
  gender?: string;
  country_id?: string;
  nationality_id?: string;
  marital_status?: string;
  phone: string;
  email: string;
  password?: string;
  password_confirmation: string;
};
type AddStudent_props = {
  title?: string;
  updateData: UpdateData; // Use the UpdateData interface here
  setModel?: Dispatch<SetStateAction<boolean>> | undefined;
  resetForm?: boolean;
  refetch: () => void;
};

export const AddStudent = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddStudent_props) => {
  const studentValidation = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      email: Yup.string()
        .required(t("email is required"))
        .matches(isEmail, t("Please enter a valid email address")),

      birthday: Yup.date().required(requiredTranslation),
      gender: Yup.string().trim().required(requiredTranslation),
      country_id: Yup.string().trim().required(requiredTranslation),

      password: resetForm
        ? Yup.string().trim().required(requiredTranslation)
        : Yup.string().trim(),

      password_confirmation: resetForm
        ? Yup.string().trim().required(requiredTranslation)
        : Yup.string().trim(),
    });

  const initialValues: InitialValues_TP = {
    name: !resetForm ? updateData?.name || "" : "",
    birthday: !resetForm ? new Date(updateData?.birthday) : new Date(),
    gender: !resetForm ? updateData?.gender_en : "",
    country_id: !resetForm ? updateData?.country.id : "",
    phone: !resetForm ? updateData?.phone : "",
    email: !resetForm ? updateData?.email || "" : "",
    student_number: !resetForm ? updateData?.student_number || "" : "",
    preferred_days: !resetForm
      ? updateData?.preferred_days?.map((item) => item)
      : [],
    preferred_learning: !resetForm
      ? updateData?.preferred_learning?.map((item) => item)
      : [],

    phone_country: !resetForm ? updateData?.phone_country : "",
    preferred_time_from: !resetForm ? updateData?.preferred_time_from : "",
    preferred_time_to: !resetForm ? updateData?.preferred_time_to : "",

    password: "",
    password_confirmation: "",
  };

  const { mutate, isLoading } = useMutate({
    endpoint: `dashboard/students`,
    mutationKey: ["dashboard_students"],
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
      refetch();
      setModel?.(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  // update student
  const { mutate: update, isLoading: LoadingUpdateStudent } = useMutate({
    mutationKey: [`dashboard_students_update${updateData?.id}`],
    endpoint: `dashboard/students/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      notify("success");
      setModel?.(false);
    },
    onError: (err: any) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={studentValidation}
        onSubmit={(values: InitialValues_TP) => {
          resetForm
            ? mutate({
                ...values,
              })
            : update({
                ...values,
                _method: "put",
              });
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
                  loading={isLoading || LoadingUpdateStudent}
                >
                  {t("submit")}
                </Button>
              }
            >
              <StudentMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
