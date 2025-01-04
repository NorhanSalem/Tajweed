import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";

import { requiredTranslation } from "../../../utils/helpers";
import * as Yup from "yup";
import SeoDetails from "./SeoDetails";

type SEO_Props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: boolean;
  refetch: () => void;
};

export const SeoModal = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: SEO_Props) => {
  const [removed, setRemoved] = useState(false);

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/seo-data/:id"],
    endpoint: `dashboard/seo-data/`,
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
    mutationKey: [`dashboard/seo-data/${updateData?.id}`],
    endpoint: `dashboard/seo-data/${updateData?.id}`,
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

  const handleSubmit = (values: any) => {
    if (updateData) {
      update({
        ...values,
      });
    } else {
      mutate(values);
    }
  };

  const initialValues = updateData
    ? {
        meta_description: updateData.meta_description || "",
        meta_description_ar: updateData.meta_description_ar || "",
        meta_description_en: updateData.meta_description_en || "",
        meta_title: updateData.meta_title || "",
        meta_title_ar: updateData.meta_title_ar || "",
        meta_title_en: updateData.meta_title_en || "",
        section: updateData.section || "",
        section_ar: updateData.section_ar || "",
        section_en: updateData.section_en || "",
      }
    : {
        meta_description: "",
        meta_description_ar: "",
        meta_description_en: "",
        meta_title: "",
        meta_title_ar: "",
        meta_title_en: "",
        section: "",
        section_ar: "",
        section_en: "",
      };

  const SeoValidation = (resetForm: boolean) =>
    Yup.object({
      meta_description: Yup.string().trim().required(requiredTranslation),
      meta_description_ar: Yup.string().trim().required(requiredTranslation),
      meta_description_en: Yup.string().trim().required(requiredTranslation),
      meta_title: Yup.string().trim().required(requiredTranslation),
      meta_title_ar: Yup.string().trim().required(requiredTranslation),
      meta_title_en: Yup.string().trim().required(requiredTranslation),
      section: Yup.string().trim().required(requiredTranslation),
      section_ar: Yup.string().trim().required(requiredTranslation),
      section_en: Yup.string().trim().required(requiredTranslation),
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SeoValidation(resetForm)}
      onSubmit={(values: any) => handleSubmit(values)}
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
            <SeoDetails
              updateData={updateData}
              resetForm={resetForm}
              setRemoved={setRemoved}
            />
          </OuterFormLayout>
        </HandleBackErrors>
      </Form>
    </Formik>
  );
};
