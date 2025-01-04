/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import {
  Must_be_only_number,
  requiredTranslation,
} from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { CouponMainData } from "./CouponMainData";

///
///
type AddCoupon_props = {
  title?: string;
  refetch: () => void;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
};

///

///
export const AddCoupon = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddCoupon_props) => {
  /////////// VARIABLES

  ///
  type InitialValues_TP = {
    [x: string]: string;
  };
  const [openInput, setOpenInput] = useState(updateData?.is_percentage || 0);

  const CouponValidatingSchema = (openInput: any) => {
    switch (openInput) {
      case 1:
        return Yup.object({
          //   @ts-ignore
          start_date: openInput
            ? Yup.string().trim().required(requiredTranslation)
            : Yup.string().trim(),
          //@ts-ignore

          end_date: openInput
            ? Yup.string().trim().required(requiredTranslation)
            : Yup.string().trim(),
            coupon: Yup.string().trim().required(requiredTranslation),
            discount: Yup.string()
              .matches(/^[0-9]+$/, Must_be_only_number())
              .required(requiredTranslation),
            coupon_type: Yup.string().trim().required(requiredTranslation),
            is_percentage: Yup.string().trim().required(requiredTranslation),
            max_used: Yup.string().trim().required(requiredTranslation),
        });

      default:
        return Yup.object({
          coupon: Yup.string().trim().required(requiredTranslation),
          discount: Yup.string()
            .matches(/^[0-9]+$/, Must_be_only_number())
            .required(requiredTranslation),
          coupon_type: Yup.string().trim().required(requiredTranslation),
          is_percentage: Yup.string().trim().required(requiredTranslation),
          max_used: Yup.string().trim().required(requiredTranslation),
        });
    }
  };

  const [couponVal, setCouponVal] = useState("");

  const initialValues: InitialValues_TP = {
    coupon: !resetForm ? updateData?.coupon : "",
    //@ts-ignore
    discount: !resetForm ? +updateData?.discount : "",
    coupon_type: !resetForm ? updateData?.coupon_type : "",
    is_percentage: !resetForm ? updateData?.is_percentage : 0,
    max_used: !resetForm ? updateData?.max_used : "",
    //@ts-ignore
    start_date: !resetForm
      ? updateData?.start_date
        ? new Date(updateData?.start_date)
        : new Date()
      : new Date(),
    //@ts-ignore
    end_date: !resetForm
      ? updateData?.end_date
        ? new Date(updateData?.end_date)
        : new Date()
      : new Date(),
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/advertisement/coupons"],
    endpoint: `dashboard/advertisement/coupons`,
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
    mutationKey: ["dashboard/advertisement/coupons"],
    endpoint: `dashboard/advertisement/coupons/${updateData?.id}`,
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
        validationSchema={CouponValidatingSchema(openInput)}
        onSubmit={(values: InitialValues_TP) => {
          resetForm
            ? mutate({
                ...values,
                start_date: new Date(values.start_date).toLocaleDateString(
                  "en-CA"
                ),
                end_date: new Date(values.end_date).toLocaleDateString("en-CA"),
              })
            : update({
                ...values,
                start_date: new Date(values.start_date).toLocaleDateString(
                  "en-CA"
                ),
                end_date: new Date(values.end_date).toLocaleDateString("en-CA"),

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
              <CouponMainData
                openInput={openInput}
                setCouponVal={setCouponVal}
                updateData={updateData}
                resetForm={resetForm}
                couponVal={couponVal}
                setOpenInput={setOpenInput}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
