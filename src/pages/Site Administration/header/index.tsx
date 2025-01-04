/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { Button } from "../../../components/atoms";
import { OuterFormLayout } from "../../../components/molecules";
import { Loading } from "../../../components/organisms/Loading/Loading";
import { useFetch, useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Helmet } from "react-helmet-async";
import { HeaderMainData } from "../../../components/templates/Site Administration/header/HeaderMainData";

type ContactInfo_props = {
  title: string;
  resetForm?: any;
};

export const Header = ({ title, resetForm }: ContactInfo_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };

  const {
    isSuccess,
    data: HeadersData,
    isLoading: loadingData,
  } = useFetch<any>({
    endpoint: `dashboard/headers`,
    queryKey: [`dashboard/headers`],
  });

  const HeadersValidatingSchema = () =>
    Yup.object({
      header_ar: Yup.string().trim().required(requiredTranslation),
      header_en: Yup.string().trim().required(requiredTranslation),
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      title2_ar: Yup.string().trim().required(requiredTranslation),
      title2_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    header_ar: !resetForm ? HeadersData?.data?.header_ar : "",
    header_en: !resetForm ? HeadersData?.data?.header_en : "",
    title_ar: !resetForm ? HeadersData?.data?.title_ar : "",
    title_en: !resetForm ? HeadersData?.data?.title_en : "",
    title2_ar: !resetForm ? HeadersData?.data?.title2_ar : "",
    title2_en: !resetForm ? HeadersData?.data?.title2_en : "",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/headers"],
    endpoint: `dashboard/headers`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
    },

    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateHeader } = useMutate({
    mutationKey: ["dashboard/header"],
    endpoint: `dashboard/header`,
    onSuccess: (data: InitialValues_TP) => {
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
          validationSchema={HeadersValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            mutate({
              ...values,
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
                      loading={isLoading || LoadingUpdateHeader}
                    >
                      {t("Save")}
                    </Button>
                  }
                >
                  <HeaderMainData />
                </OuterFormLayout>
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
          
    </>
  );
};
