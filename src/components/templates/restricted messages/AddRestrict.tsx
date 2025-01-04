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
import { RestrictMainData } from "./RestrictMainData";

///
/////////// Types
///
type AddRestrict_props = {
  title?: string;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddRestrict = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddRestrict_props) => {
  type InitialValues_TP = {
    restricts: [
      {
        restrict: string;
        active: number;
      }
    ];
  };

  const SpecializationValidatingSchema = Yup.object({
    restricts: Yup.array()
      .of(
        Yup.object({
          restrict: Yup.string().trim().required(requiredTranslation),
          active: Yup.number().required(requiredTranslation), // Assuming 'active' is a number field
        })
      )
      .required(requiredTranslation),
  });

  const initialValues: InitialValues_TP = {
    restricts: [
      {
        restrict: updateData.restrict || "",
        active: updateData.active  ? updateData.active  :  1,
      },
    ],
  };

  const queryClient = useQueryClient();
  // all student
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/restricted-messages"],
    endpoint: `dashboard/restricted-messages`,
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
    mutationKey: ["dashboard/restricted-messages"],
    endpoint: `dashboard/restricted-messages/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["All-specializations"]);
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
                ...values.restricts[0],
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
              <RestrictMainData resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
