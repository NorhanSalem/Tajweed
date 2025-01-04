/////////// IMPORTS
///
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
import { TeachMainData } from "./TeachMainData";

type AddTeach_props = {
  title?: string;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

///
export const AddTeach = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddTeach_props) => {
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

  const initialValues: InitialValues_TP = {
    name_ar: !resetForm ? updateData.name : "",
    name_en: !resetForm ? updateData.name_en : "",
    active: !resetForm ? updateData.active : 1,
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["add_specializations"],
    endpoint: `dashboard/teachers/teaching-fields`,
    onSuccess: (data: InitialValues_TP) => {
      setModel(false);
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response.data.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/teachers/teaching-fields"],
    endpoint: `dashboard/teachers/teaching-fields/${updateData?.id}`,
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
              <TeachMainData
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
