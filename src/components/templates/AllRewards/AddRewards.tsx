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
import { RewardsMainData } from "./RewardsMainData";

///
/////////// Types
///
type AddRewards_props = {
  title?: string;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddRewards = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddRewards_props) => {
  console.log("🚀 ~ updateData:", updateData);
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string;
  };
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };
  const SpecializationValidatingSchema = () =>
    Yup.object({
      user_id: Yup.string().trim().required(requiredTranslation),
      type: Yup.string().trim().required(requiredTranslation),
      amount: Yup.string().trim().required(requiredTranslation),
      teacher_name: Yup.string().trim(),
    });
  const [couponVal, setCouponVal] = useState("");

  const initialValues: InitialValues_TP = {
    user_id: !resetForm ? updateData?.teacher_id : "",
    type: !resetForm ? updateData?.type : "",
    amount: !resetForm ? +updateData?.amount : "",
    date: !resetForm ? parseDate(updateData?.created_at) : new Date(),
    teacher_name: !resetForm ? updateData?.teacher_name : "",
  };

  const queryClient = useQueryClient();
  // all student
  const { mutate, isLoading } = useMutate({
    mutationKey: ["add-rewards"],
    endpoint: `dashboard/teachers/rewards`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["All-Coupons"]);
      setModel(false);
      notify("success");
      refetch();
    },
    onError: (err) => {
      console.error("Submission error:", err);
      notify("error", err?.response?.data?.message || "An error occurred");
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard-teachers-rewards"],
    endpoint: `dashboard/teachers/rewards/${updateData?.id}`,
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
  console.log("resetForm", resetForm);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SpecializationValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          resetForm
            ? mutate({
                ...values,
                date: new Date(values.date).toLocaleDateString("en-CA"),
              })
            : update({
                ...values,
                date: new Date(values.date).toLocaleDateString("en-CA"),
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
              <RewardsMainData
                setCouponVal={setCouponVal}
                updateData={updateData}
                resetForm={resetForm}
                couponVal={couponVal}
                data={updateData}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
