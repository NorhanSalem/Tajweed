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
import { TermsOfAcceptanceOfTeachersMainData } from "../terms of acceptance of teachers/TermsOfAcceptanceOfTeachersMainData";
import { Helmet } from "react-helmet-async";

///
/////////// Types
///
type TermsOfAcceptanceOfTeachers_props = {
  title: string;
  dataSource?: any;
  TermsOfAcceptanceOfTeachersData?: any;
  setModel?: any;
  resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const TermsOfAcceptanceOfTeachers = ({
  title,
  resetForm,
}: TermsOfAcceptanceOfTeachers_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };

  //all data
  const {
    isSuccess,
    refetch,
    data: TermsOfAcceptanceOfTeachersData,
    isFetching,
    isLoading: loadingData,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/terms-of-acceptance-of-teachers`,

    queryKey: [`dashboard/terms-of-acceptance-of-teachers`],
    onSuccess(data) {
      // setDataSource(data)
    },
    onError(err) {
    },
  });
    console.log("🚀 ~ TermsOfAcceptanceOfTeachersData:", TermsOfAcceptanceOfTeachersData)

  const TermsAcceptValidatingSchema = () =>
    Yup.object({
      text_ar: Yup.string()
        .trim()
        .required(requiredTranslation),
        text_en: Yup.string()
        .trim()
        .required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    text_ar: !resetForm
      ? TermsOfAcceptanceOfTeachersData?.data
          ?.text_ar
      : "",
      text_en: !resetForm
      ? TermsOfAcceptanceOfTeachersData?.data
          ?.text_en
      : "",
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  // const [gender, setGender] = useState(!resetForm ? TermsOfAcceptanceOfTeachersData?.gender : "")

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/terms-of-acceptance-of-teachers"],
    endpoint: `dashboard/terms-of-acceptance-of-teachers`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["View-all-Teacher"]);
      queryClient.refetchQueries(["teacher-finances"]);
      notify("success");
      // setModel(false);
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
          validationSchema={TermsAcceptValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            mutate({
        ...values,
            });
          }}
        >
          <Form>
            <HandleBackErrors>
              {!loadingData || !isFetching ? (
                <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
                  <OuterFormLayout
                    //   header={title}
                    className="gap-8"
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
                    <TermsOfAcceptanceOfTeachersMainData
                      resetForm={resetForm}
                    />
                  </OuterFormLayout>
                </div>
              ) : (
                <Loading />
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
          
    </>
  );
};
