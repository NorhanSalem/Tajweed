/////////// IMPORTS
///
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../../atoms";
import { OuterFormLayout } from "../../../molecules";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import { useFetch, useMutate } from "../../../../hooks";
import { requiredTranslation } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { Loading } from "../../../organisms/Loading/Loading";
import { TeacherMainData } from "../../Teacher/TeacherMainData";

const TeacherModification = ({ teacherId }: any) => {
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
    nationality_id?: string;
    is_mogaz?: boolean;
    is_azhary?: boolean;
    order: string;
    country_id: string;
    teaching_fields: string;
    education_data: string;
    experience_data: string;
    hourly_rate: string;
    working_online: string;
    bio: string;
    is_mogaz_media: {
      path: string;
      type: string;
    }[];
    is_azhary_media: {
      path: string;
      type: string;
    }[];
    identity: {
      path: string;
      type: string;
    }[];
    juz_number: string;
    English_level: string;
    spoken_languages: [];
    video_file: string;
    interview_status: string;
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
    endpoint: `dashboard/teachers/${teacherId}`,
    queryKey: [`dashboard/teachers/${teacherId}`],
  });

  const initialValues: InitialValues_TP = {
    name: EditingData?.data?.model?.name,
    email: EditingData?.data?.model?.email,
    phone: EditingData?.data?.model?.phone,
    birthday: new Date(EditingData?.data?.model?.birthday),
    password: "",
    password_confirmation: "",
    gender: EditingData?.data?.model?.gender_en,
    order: EditingData?.data?.model?.order,
    hourly_rate: EditingData?.data?.model?.hourly_rate,
    country_id: EditingData?.data?.model?.country?.id,
    phone_country: EditingData?.data?.model?.phone_country,
    specialization: EditingData?.data?.model
      ? EditingData?.data?.model?.specialization_id?.map((item: any) => item.id)
      : [],
    teaching_fields: EditingData?.data?.model?.teachingFieldIds?.map(
      (item: any) => item.id
    ),
    spoken_languages: EditingData?.data?.model?.spoken_languages?.map(
      (item: any) => item.value
    ),
    language: EditingData?.data?.model?.language,
    education_data: EditingData?.data?.model?.education_data,
    experience_data: EditingData?.data?.model?.experience_data,
    bio: EditingData?.data?.model?.bio,
    is_mogaz: EditingData?.data?.model?.is_mogaz === 0 || null ? false : true,
    is_azhary: EditingData?.data?.model?.is_azhary === 0 || null ? false : true,
    juz_number: EditingData?.data?.model?.juz_number,
    English_level: EditingData?.data?.model?.English_level,
    video_file: EditingData?.data?.model?.video_file,
    interview_status: EditingData?.data?.model?.interview_status,
    is_working_online: EditingData?.data?.model?.is_working_online,
    is_mogaz_media: !!EditingData?.data?.model?.mogaz_image
      ? [
          {
            path: EditingData?.data?.model?.mogaz_image,
            type: "image",
          },
        ]
      : [],
    is_azhary_media: !!EditingData?.data?.model?.azher_image
      ? [
          {
            path: EditingData?.data?.model?.azher_image,
            type: "image",
          },
        ]
      : [],

    identity: EditingData?.data?.model?.identity_image
      ? [
          {
            path: EditingData?.data?.model?.identity_image,
            type: "image",
          },
        ]
      : [],
    meta_title_ar: EditingData?.data?.model?.meta_title?.ar,
    meta_title_en: EditingData?.data?.model?.meta_title?.en,
    meta_description_ar: EditingData?.data?.model?.meta_description?.ar,
    meta_description_en: EditingData?.data?.model?.meta_description?.en,
  };

  const [removed, setRemoved] = useState(false);
  const { mutate: update, isLoading } = useMutate({
    mutationKey: ["dashboard/teachers"],
    endpoint: `dashboard/teachers/${teacherId}`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
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
          onSubmit={(values: any) => {
            const azhar = values?.is_azhary === true ? 1 : 0;
            const mogaz = values?.is_mogaz === true ? 1 : 0;
            //@ts-ignore
            let mogazImage =
              values?.is_mogaz_media?.length > 0 &&
              values?.is_mogaz_media[0]?.path !==
                EditingData?.data?.model?.mogaz_image
                ? values.is_mogaz_media[0]
                : false;
            //@ts-ignore
            let azhreImage =
              values?.is_azhary_media?.length > 0 &&
              values?.is_azhary_media[0]?.path !==
                EditingData?.data?.model?.azher_image
                ? values.is_azhary_media[0]
                : false;

            let identifyImage =
              values?.identity?.length > 0 &&
              //@ts-ignore
              values?.identity[0]?.path !==
                EditingData?.data?.model?.identity_image
                ? //@ts-ignore
                  values.identity[0]
                : false;

            // Remove mogaz_image if it's undefined
            if (!mogazImage) {
              delete values?.is_mogaz_media;
            }

            if (!azhreImage) {
              delete values?.is_azhary_media;
            }

            if (!identifyImage) {
              delete values?.identity;
            }

            console.log("a7a", {
              ...values,
              is_azhary: azhar,
              is_mogaz: mogaz,
              is_mogaz_media: mogazImage ? mogazImage : "",
              is_azhary_media: azhreImage ? azhreImage : "",
              identity: identifyImage ? identifyImage : "",
              is_mogaz_media_remove: !!removed
                ? 1
                : mogazImage == false
                ? 0
                : 0,
              is_azhary_media_remove: !!removed
                ? 1
                : azhreImage == false
                ? 0
                : 0,

              _method: "put",
            });
            update({
              ...values,
              is_azhary: azhar,
              is_mogaz: mogaz,
              is_mogaz_media: mogazImage ? mogazImage : "",
              birthday: new Date(values.birthday).toLocaleDateString("en-CA"),
              is_azhary_media: azhreImage ? azhreImage : "",
              identity: identifyImage ? identifyImage : "",
              is_mogaz_media_remove: !!removed
                ? 1
                : mogazImage == false
                ? 0
                : 0,
              is_azhary_media_remove: !!removed
                ? 1
                : azhreImage == false
                ? 0
                : 0,

              _method: "put",
              "meta_title[ar]": values.meta_title_ar,
              "meta_title[en]": values.meta_title_en,
              "meta_description[ar]": values.meta_description_ar,
              "meta_description[en]": values.meta_description_en,
              is_working_online: values.is_working_online,
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
                <TeacherMainData
                  hideHeader={true}
                  updateData={EditingData?.data?.model}
                  setRemoved={setRemoved}
                />
              </OuterFormLayout>
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
        
    </>
  );
};

export default TeacherModification;
