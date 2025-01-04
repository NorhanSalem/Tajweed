import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { PopularQuestionsMainData } from "./PopularQuestionsMainData";

type AddPopularQuestions_props = {
  title?: string;
  refetch?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
};

export const AddPopularQuestions = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: AddPopularQuestions_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };

  const PopularValidatingSchema = () =>
    Yup.object({
      question_ar: Yup.string().trim().required(requiredTranslation),
      question_en: Yup.string().trim().required(requiredTranslation),
      answer_ar: Yup.string().trim().required(requiredTranslation),
      answer_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    question_ar: !resetForm ? updateData?.question_ar : "",
    question_en: !resetForm ? updateData?.question_en : "",
    answer_ar: !resetForm ? updateData?.answer_ar : "",
    answer_en: !resetForm ? updateData?.answer_en : "",
    type: !resetForm ? updateData?.type : "",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/popular-questions"],
    endpoint: `dashboard/popular-questions`,
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      setModel(false);
      notify("success");
    },
    onError: (err) => {
      notify("error", err.response.data.message);
    },
    formData: true,
  });

  // update student
  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/popular-questions"],
    endpoint: `dashboard/popular-questions/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      notify("success");
      setModel(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PopularValidatingSchema}
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
                  loading={isLoading || LoadingUpdateSponsor}
                >
                  {t("submit")}
                </Button>
              }
            >
              <PopularQuestionsMainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
