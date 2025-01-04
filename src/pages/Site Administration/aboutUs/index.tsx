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
import {
  requiredTranslation,
} from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Helmet } from "react-helmet-async";
import { AboutUsMainData } from "../../../components/templates/Site Administration/aboutUs/AboutUsMainData";

///
/////////// Types
///
type ContactInfo_props = {
  title: string;
  dataSource?: any;
  tartilsData?: any;
  setModel?: any;
  resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AboutUs = ({
  title,
  dataSource,
  setModel,
  resetForm,
}: ContactInfo_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };

  //all data
  const {
    isSuccess,
    refetch,
    data: PageContent,
    isFetching,
    isLoading: loadingData,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/page-content`,

    queryKey: [`dashboard/page-content`],
    onSuccess(data) {
      // setDataSource(data)
    },
    onError(err) {
      console.log(err);
    },
  });
  

  const tartilstValidatingSchema = () =>
    Yup.object({
      about_normal_before_ar: Yup.string().trim().required(requiredTranslation),
      about_normal_before_en: Yup.string().trim().required(requiredTranslation),
      about_colored_ar: Yup.string().trim().required(requiredTranslation),
      about_colored_en: Yup.string().trim().required(requiredTranslation),
      about_normal_after_ar: Yup.string().trim().required(requiredTranslation),
      about_normal_after_en: Yup.string().trim().required(requiredTranslation),
      about_text_en: Yup.string().trim().required(requiredTranslation),
      about_text_ar: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    about_normal_before_ar: !resetForm ? PageContent?.data?.about_normal_before_ar : "",
    about_normal_before_en: !resetForm ? PageContent?.data?.about_normal_before_en : "",
    about_colored_ar: !resetForm ? PageContent?.data?.about_colored_ar : "",
    about_colored_en: !resetForm ? PageContent?.data?.about_colored_en : "",
    about_normal_after_ar: !resetForm ? PageContent?.data?.about_normal_after_ar : "",
    about_normal_after_en: !resetForm ? PageContent?.data?.about_normal_after_en : "",
    about_text_ar: !resetForm ? PageContent?.data?.about_text_ar : "",
    about_text_en: !resetForm ? PageContent?.data?.about_text_en : ""
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  // const [gender, setGender] = useState(!resetForm ? ContactInfoData?.gender : "")

  ///
  /////////// SIDE EFFECTS
  ///
  // const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/page-content"],
    endpoint: `dashboard/page-content`,
    onSuccess: (data: InitialValues_TP) => {
      // queryClient.refetchQueries(["View-all-Teacher"]);
      // queryClient.refetchQueries(["teacher-finances"]);

      notify("success");
      // setModel(false);
    },

    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdatePageContent } = useMutate({
    mutationKey: ["dashboard/page-content"],
    endpoint: `dashboard/page-content`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
      // setModel(false);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });
  {console.log(initialValues)}

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
          validationSchema={tartilstValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            mutate({
              settings:values,
            });
          }}
        >
          <Form>
            <HandleBackErrors>
              {loadingData ? (
                <Loading />
              ) : (
                <OuterFormLayout
                  //   header={title}
                  submitComponent={
                    <Button
                      type="submit"
                      className="mr-auto mt-8"
                      loading={isLoading || LoadingUpdatePageContent}
                    >
                      {t("submit")}
                    </Button>
                  }
                >
                  <AboutUsMainData resetForm={resetForm} />
                </OuterFormLayout>
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
          
    </>
  );
};
