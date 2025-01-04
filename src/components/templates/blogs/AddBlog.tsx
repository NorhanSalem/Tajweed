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
import BlogsMainData from "./BlogsMainData";
///
// types
interface UpdateData {
  id: string;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image: string;
  category_id: string;
  cover: string;
}
type InitialValues_TP = {
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image: string;
  category_id: string;
};
type AddBlog_props = {
  title?: string;
  updateData?: UpdateData;
  setModel?: Dispatch<SetStateAction<boolean>> | undefined;
  resetForm?: boolean;
  refetch: any;
};

export const AddBlog = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddBlog_props) => {
  /// validation schema
  const blogsValidation = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      description_ar: Yup.string().trim().required(requiredTranslation),
      description_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar || "" : "",
    title_en: !resetForm ? updateData?.title_en : "",
    description_ar: !resetForm ? updateData?.description_ar : "",
    description_en: !resetForm ? updateData?.description_en : "",
    //@ts-ignore
    category_id: !resetForm ? updateData?.category?.id : "",
    //@ts-ignore
    image: !resetForm
      ? updateData?.image
        ? [
            {
              path: updateData?.image,
              type: "image",
            },
          ]
        : []
      : [],
    //@ts-ignore
    cover: !resetForm
      ? updateData?.cover
        ? [
            {
              path: updateData?.cover,
              type: "image",
            },
          ]
        : []
      : [],
  };

  const { mutate, isLoading } = useMutate({
    endpoint: `dashboard/blogs`,
    mutationKey: ["dashboard/blogs"],
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
    mutationKey: [`dashboard/blogs_update${updateData?.id}`],
    endpoint: `dashboard/blogs/${updateData?.id}`,
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
  const handleSubmit = (values) => {
    const formData = {
      ...values,
    };

    if (!resetForm) {
      if (values?.image[0]?.path == updateData?.image) {
        delete formData.image;
      } else {
        formData.image = values?.image[0];
      }
      if (values?.cover[0]?.path == updateData?.cover) {
        delete formData.cover;
      } else {
        formData.cover = values?.cover[0];
      }
    } else {
      formData.image = values?.image[0];
      formData.cover = values?.cover[0];
    }
    resetForm ? mutate(formData) : update({ ...formData, _method: "put" });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={blogsValidation}
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
                  loading={isLoading || LoadingUpdateBlog}
                >
                  {t("submit")}
                </Button>
              }
            >
              <BlogsMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
