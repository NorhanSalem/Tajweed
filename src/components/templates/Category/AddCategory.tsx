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
import CategoryMainData from "./CategoryMainData";
///
// types
interface UpdateData {
  name_ar: string;
  name_en?: string;
  id: string;
}
type InitialValues_TP = {
  name_ar: string;
  name_en?: string;
};
type AddCategory_props = {
  title?: string;
  updateData?: UpdateData;
  setModel?: Dispatch<SetStateAction<boolean>> | undefined;
  resetForm?: boolean;
  refetch: any;
};

export const AddCategory = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddCategory_props) => {
  /// validation schema
  const blogsValidation = () =>
    Yup.object({
      name_ar: Yup.string().trim().required(requiredTranslation),
      name_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    name_ar: !resetForm ? updateData?.name_ar || "" : "",
    name_en: !resetForm ? updateData?.name_en : "",
  };

  const { mutate, isLoading } = useMutate({
    endpoint: `dashboard/categories`,
    mutationKey: ["dashboard/categories"],
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      setModel?.(false);
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });
  const { mutate: update, isLoading: LoadingUpdateBlog } = useMutate({
    mutationKey: [`dashboard/categories_update${updateData?.id}`],
    endpoint: `dashboard/categories/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      notify("success");
      setModel?.(false);
    },
    onError: (err: any) => {
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={blogsValidation}
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
                  loading={isLoading || LoadingUpdateBlog}
                >
                  {t("submit")}
                </Button>
              }
            >
              <CategoryMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
