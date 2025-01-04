/////////// IMPORTS
///
import { Form, Formik } from "formik";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Button } from "../../../components/atoms";
import { OuterFormLayout } from "../../../components/molecules";
import { Loading } from "../../../components/organisms/Loading/Loading";
import { ContactInfoMainData } from "../../../components/templates/Site Administration/contactInfo/ContactInfoMainData";
import { useFetch, useMutate } from "../../../hooks";
import {
  Enter_correct_url,
  link,
  requiredTranslation,
} from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";

type ContactInfo_props = {
  title: string;
  resetForm?: any;
};

export const ContactInfo = ({ title, resetForm }: ContactInfo_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };
  const {
    isSuccess,
    data: ContactInfoData,
    isLoading: loadingData,
  } = useFetch<any>({
    endpoint: `dashboard/contact-info`,
    queryKey: [`dashboard/contact-info`],
  });

  const ContactValidatingSchema = () =>
    Yup.object({
      app_store_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      play_store_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      facebook_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      twitter_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      instagram_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      youtube_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      linkedin_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      snap_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      tiktok_link_ar: Yup.string()
        .matches(link(), Enter_correct_url)
        .required(requiredTranslation),
      footer_text_ar: Yup.string().trim().required(requiredTranslation),
      footer_text_en: Yup.string().trim().required(requiredTranslation),
      location_ar: Yup.string().trim().required(requiredTranslation),
      // location_en: Yup.string().trim().required(requiredTranslation),
      email_ar: Yup.string().trim().required(requiredTranslation),
      Phone_Number_ar: Yup.string().trim().required(requiredTranslation),
      whatsapp_phone_ar: Yup.string().trim().required(requiredTranslation),
      footer_blog_ar: Yup.string().trim().required(requiredTranslation),
      footer_blog_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    app_store_link_ar: !resetForm
      ? ContactInfoData?.data?.app_store_link_ar
      : "",
    play_store_link_ar: !resetForm
      ? ContactInfoData?.data?.play_store_link_ar
      : "",
    facebook_link_ar: !resetForm ? ContactInfoData?.data?.facebook_link_ar : "",
    twitter_link_ar: !resetForm ? ContactInfoData?.data?.twitter_link_ar : "",
    instagram_link_ar: !resetForm
      ? ContactInfoData?.data?.instagram_link_ar
      : "",
    youtube_link_ar: !resetForm ? ContactInfoData?.data?.youtube_link_ar : "",
    linkedin_link_ar: !resetForm ? ContactInfoData?.data?.linkedin_link_ar : "",
    snap_link_ar: !resetForm ? ContactInfoData?.data?.snap_link_ar : "",
    tiktok_link_ar: !resetForm ? ContactInfoData?.data?.tiktok_link_ar : "",
    footer_blog_ar: !resetForm ? ContactInfoData?.data?.footer_blog_ar : "",
    footer_blog_en: !resetForm ? ContactInfoData?.data?.footer_blog_en : "",
    footer_text_ar: !resetForm ? ContactInfoData?.data?.footer_text_ar : "",
    footer_text_en: !resetForm ? ContactInfoData?.data?.footer_text_en : "",
    location_ar: !resetForm ? ContactInfoData?.data?.location_ar : "",
    // location_en: !resetForm ? ContactInfoData?.data?.location_en : "",
    email_ar: !resetForm ? ContactInfoData?.data?.email_ar : "",
    Phone_Number_ar: !resetForm ? ContactInfoData?.data?.phone_number_ar : "",
    whatsapp_phone_ar: !resetForm
      ? ContactInfoData?.data?.whatsapp_phone_ar
      : "",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/contact-info"],
    endpoint: `dashboard/contact-info`,
    onSuccess: () => {
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {loadingData && <Loading />}
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={ContactValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            mutate({
              settings: values,
            });
          }}
        >
          <Form>
            <HandleBackErrors>
              {loadingData ? (
                <Loading />
              ) : (
                <OuterFormLayout
                  submitComponent={
                    <Button
                      type="submit"
                      className="mr-auto mt-8"
                      loading={isLoading}
                    >
                      {t("Save")}
                    </Button>
                  }
                >
                  <ContactInfoMainData  />
                </OuterFormLayout>
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
          
    </>
  );
};
