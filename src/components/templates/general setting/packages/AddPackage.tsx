/////////// IMPORTS
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../../hooks";
import { requiredTranslation } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../../atoms";
import { OuterFormLayout } from "../../../molecules";
import { PackageMainData } from "./PackageMainData";

type AddPackage_props = {
  title?: string;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

export const AddPackage = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddPackage_props) => {
  console.log("🚀 ~ updateData:", updateData);
  type InitialValues_TP = {
    [x: string]: string;
  };

  const PackageValidatingSchema = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      sessions: Yup.string().trim().required(requiredTranslation),
      package_duration: Yup.string().trim().required(requiredTranslation),
      price: Yup.string().trim().required(requiredTranslation),
      old_price: Yup.string().trim().required(requiredTranslation),
      popular: Yup.string().trim().required(requiredTranslation),
      package_type: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar : "",
    title_en: !resetForm ? updateData?.title_en : "",
    sessions: !resetForm ? updateData?.sessions : "",
    package_duration: !resetForm ? updateData?.package_duration : "28",
    price: !resetForm ? updateData?.price : "",
    old_price: !resetForm ? updateData?.old_price : "",
    popular: !resetForm ? updateData?.popular : 1,
    package_type: !resetForm ? updateData?.package_type : "",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/packages"],
    endpoint: `dashboard/packages`,
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
    mutationKey: ["dashboard/packages"],
    endpoint: `dashboard/packages/${updateData?.id}`,
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
        validationSchema={PackageValidatingSchema}
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
              <PackageMainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  );
};
