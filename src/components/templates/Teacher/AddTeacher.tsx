import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { TeacherMainData } from "./TeacherMainData";
import {
  AddTeacher_props,
  InitialValues_TP,
  TeacherValidation,
} from "./Types_and_validation";

export const AddTeacher = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: AddTeacher_props) => {
  const [removed, setRemoved] = useState(false);

  const initialValues: InitialValues_TP = {
    name: !resetForm ? updateData?.name : "",
    email: !resetForm ? updateData?.email : "",
    phone: !resetForm ? updateData?.phone : "",
    birthday: !resetForm ? new Date(updateData?.birthday) : null,
    password: !resetForm ? "" : "",
    password_confirmation: "",
    gender: !resetForm ? updateData?.gender_en : "",
    order: !resetForm ? updateData?.order : "",
    phone_country: !resetForm ? updateData.phone_country : "",
    country_id: !resetForm ? updateData?.country?.id : "",
    is_working_online: !resetForm ? updateData?.is_working_online : "",
    hourly_rate: !resetForm ? updateData?.hourly_rate : "",
    specialization: !resetForm
      ? updateData?.specialization_id?.map((item: any) => item.id)
      : [],
    teaching_fields: !resetForm
      ? updateData?.teachingFieldIds?.map((item: any) => item.id)
      : [],
    spoken_languages: !resetForm
      ? updateData?.spoken_languages?.map((item: any) => item.value)
      : [],
    language: !resetForm ? updateData?.language : "",
    education_data: !resetForm
      ? updateData?.education_data
      : [
          {
            id: crypto.randomUUID(),
            school: "",
            degree: "",
            start_date: "1970",
            end_date: "1970",
          },
        ],
    experience_data: !resetForm
      ? updateData?.experience_data
      : [
          {
            id: crypto.randomUUID(),
            title: "",
            company_name: "",
            start_date: "1970",
            end_date: "1970",
          },
        ],
    bio: !resetForm ? updateData?.bio : "",
    is_mogaz: !resetForm
      ? updateData?.is_mogaz === 0 || null
        ? false
        : true
      : false,
    is_azhary: !resetForm
      ? updateData?.is_azhary === 0 || null
        ? false
        : true
      : false,
    is_mogaz_media: !resetForm
      ? !!updateData?.mogaz_image
        ? [
            {
              path: updateData?.mogaz_image,
              type: "image",
            },
          ]
        : []
      : [],
    is_azhary_media: !resetForm
      ? !!updateData?.azher_image
        ? [
            {
              path: updateData?.azher_image,
              type: "image",
            },
          ]
        : []
      : [],
    juz_number: !resetForm ? updateData?.juz_number : 0,
    English_level: !resetForm ? updateData?.English_level : "",
    video_file: !resetForm ? updateData?.video_file : "",
    interview_status: !resetForm ? updateData?.interview_status : "",
    identity: !resetForm
      ? updateData?.identity_image
        ? [
            {
              path: updateData?.identity_image,
              type: "image",
            },
          ]
        : []
      : [],
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/teacher"],
    endpoint: `dashboard/teachers`,
    onSuccess: () => {
      refetch();
      notify("success");
      setModel(false);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateTeacher } = useMutate({
    mutationKey: ["dashboard/teachers"],
    endpoint: `dashboard/teachers/${updateData?.id}`,
    onSuccess: () => {
      refetch();
      notify("success");
      setModel(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const handleSubmit = (values: InitialValues_TP) => {
    const azhar = values?.is_azhary === true ? 1 : 0;
    const mogaz = values?.is_mogaz === true ? 1 : 0;
    let mogazImage =
      values?.is_mogaz_media?.length > 0 &&
      values?.is_mogaz_media[0]?.path !== updateData?.mogaz_image
        ? values.is_mogaz_media[0]
        : false;
    let azhreImage =
      values?.is_azhary_media?.length > 0 &&
      values?.is_azhary_media[0]?.path !== updateData?.azher_image
        ? values.is_azhary_media[0]
        : false;

    let identifyImage =
      values?.identity?.length > 0 &&
      values?.identity[0]?.path !== updateData?.identity_image
        ? values.identity[0]
        : false;

    if (!resetForm) {
      if (!mogazImage) {
        delete values?.is_mogaz_media;
      }
    }
    if (!resetForm) {
      if (!azhreImage) {
        delete values?.is_azhary_media;
      }
    }
    if (!resetForm) {
      if (!identifyImage) {
        delete values?.identity;
      }
    }
    //mutate
    if (resetForm) {
      mutate({
        ...values,
        is_azhary: azhar,
        is_mogaz: mogaz,
        is_mogaz_media: mogazImage ? mogazImage : "",
        is_azhary_media: azhreImage ? azhreImage : "",
        identity: identifyImage,
        is_mogaz_media_remove: !!removed
          ? true
          : mogazImage == false
          ? false
          : false,
        is_azhary_media_remove: !!removed
          ? true
          : azhreImage == false
          ? false
          : false,
      });
    } else {
      //update
      update({
        ...values,
        is_azhary: azhar,
        is_mogaz: mogaz,
        is_mogaz_media: mogazImage ? mogazImage : "",
        is_azhary_media: azhreImage ? azhreImage : "",
        identity: identifyImage ? identifyImage : "",
        is_mogaz_media_remove: !!removed ? 1 : mogazImage == false ? 0 : 0,
        is_azhary_media_remove: !!removed ? 1 : azhreImage == false ? 0 : 0,
        _method: "put",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={TeacherValidation(resetForm)}
        onSubmit={(values: InitialValues_TP) => handleSubmit(values)}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading || LoadingUpdateTeacher}
                >
                  {t("submit")}
                </Button>
              }
            >
              <TeacherMainData
                updateData={updateData}
                resetForm={resetForm}
                setRemoved={setRemoved}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  );
};
