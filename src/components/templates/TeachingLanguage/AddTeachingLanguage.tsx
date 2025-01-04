/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { TeachingLanguageMainData } from "./TeachingLanguageMainData";

///
/////////// Types
///
type AddTeachingLanguage_props = {
  title?: string;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddTeachingLanguage = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddTeachingLanguage_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string;
  };

  const SpecializationValidatingSchema = () =>
    Yup.object({
      name_ar: Yup.string().trim().required(requiredTranslation),
      name_en: Yup.string().trim().required(requiredTranslation),
      active: Yup.string().trim().required(requiredTranslation),
    });
  const [couponVal, setCouponVal] = useState("");
  console.log("couponVal", couponVal);

  const initialValues: InitialValues_TP = {
    name_ar: !resetForm ? updateData.name : "",
    name_en: !resetForm ? updateData.name_en : "",
    active: !resetForm ? updateData.active : 1,
  };

  // all student
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/teachingLanguage"],
    endpoint: `dashboard/teachingLanguage`,
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

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/teachingLanguage"],
    endpoint: `dashboard/teachingLanguage/${updateData?.id}`,
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
        validationSchema={SpecializationValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          console.log("values", { ...values });

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
              <TeachingLanguageMainData
                setCouponVal={setCouponVal}
                updateData={updateData}
                resetForm={resetForm}
                couponVal={couponVal}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
