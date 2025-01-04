import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../../atoms";
import { OuterFormLayout } from "../../../molecules";
import { useQueryClient } from "@tanstack/react-query";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import { useFetch, useMutate } from "../../../../hooks";
import { requiredTranslation } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { Loading } from "../../../organisms/Loading/Loading";
import { StudentMainData } from "../../Student/StudentMainData";

const TeacherModificationStudent = ({ studentId, hideHeader }: any) => {
  type InitialValues_TP = {
    name: string;
    email: string;
    phone: string;
    birthday: Date;
    password?: string;
    password_confirmation: string;
    specialization?: string;
    gender?: string;
    state_id?: string;
    phone_country?: string;
    language?: string;
    marital_status?: string;
    country_id?: string;
    nationality_id?: string;
    is_mogaz?: boolean;
    is_azhary?: boolean;
  };

  const TeacherValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      email: Yup.string().trim().required(requiredTranslation),
      phone: Yup.string()
        .trim()
        .required(requiredTranslation)
        .test(
          "isValidateNumber",
          `${t("wrong number")}`,
          function (value: string) {
            return isValidPhoneNumber(value || "");
          }
        ),
      birthday: Yup.date().required(requiredTranslation),
      password: Yup.string().trim().required(requiredTranslation),
      password_confirmation: Yup.string().trim().required(requiredTranslation),
    });

  const { data: EditingData, isLoading: loadingData } = useFetch<any>({
    endpoint: `dashboard/students/${studentId}`,
    queryKey: [`dashboard/students/${studentId}`],
  });

  const initialValues: InitialValues_TP = {
    name: EditingData?.data?.model?.name,
    phone: EditingData?.data?.model?.phone,
    email: EditingData?.data?.model?.email,
    birthday: new Date(EditingData?.data?.model?.birthday),
    password: null,
    gender: EditingData?.data?.model?.gender_en,
    state_id: EditingData?.data?.model?.state?.id,
    password_confirmation: "",
    nationality_id: EditingData?.data?.model?.nationality?.id,
    marital_status: EditingData?.data?.model?.marital_status,
    country_id: EditingData?.data?.model?.country.id,
    phone_country: EditingData?.data?.model?.phone_country,
    specialization: EditingData?.data?.model?.specialization_id,
    language: EditingData?.data?.model?.language,
    preferred_days: EditingData?.data?.model?.preferred_days,
    preferred_time_from: EditingData?.data?.model?.preferred_time_from,
    preferred_time_to: EditingData?.data?.model?.preferred_time_to,
    student_number: EditingData?.data?.model?.student_number,
    preferred_learning: EditingData?.data?.model?.preferred_learning,
    is_mogaz:
      EditingData?.data?.model?.data?.is_mogaz === 0 || null ? false : true,
    is_azhary:
      EditingData?.data?.model?.data?.is_azhary === 0 || null ? false : true,
    mogaz_image: !!EditingData?.data?.model?.data?.mogaz_image
      ? [
          {
            path: EditingData?.data?.model?.data?.mogaz_image,
            type: "image",
          },
        ]
      : [],
    azhary_image: !!EditingData?.data?.model?.data?.azher_image
      ? [
          {
            path: EditingData?.data?.model?.data?.azher_image,
            type: "image",
          },
        ]
      : [],
  };
  console.log("🚀 ~ TeacherModificationStudent ~ EditingData:", EditingData);
  const [resetForm, setResetForm] = useState(false);
  const [phone_country, setPhone_country] = useState(
    EditingData?.data?.model?.phone_country
  );
  const [phoneCode, setPhoneCode] = useState();
  const queryClient = useQueryClient();
  // Edit Profile Teacher
  const { mutate: update, isLoading } = useMutate({
    mutationKey: ["dashboard/students"],
    endpoint: `dashboard/students/${studentId}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["View-all-Teacher"]);
      notify("success");
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values: InitialValues_TP) => {
            const azhar = values?.is_azhary === true ? 1 : 0;
            const mogaz = values?.is_mogaz === true ? 1 : 0;
            update({
              ...values,
              is_azhary: azhar,
              is_mogaz: mogaz,
              _method: "put",
            });
          }}
        >
          <Form>
            <HandleBackErrors>
              <OuterFormLayout
                // header="
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
                <StudentMainData
                  updateData={EditingData?.data?.model}
                  resetForm={resetForm}
                  hideHeader={hideHeader}
                />
              </OuterFormLayout>
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
    </>
  );
};
export default TeacherModificationStudent;
