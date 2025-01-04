/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { requiredTranslation } from "../../../../utils/helpers";
import { useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { OuterFormLayout } from "../../../molecules";
import { Button } from "../../../atoms";
import { UserMainData } from "./UserMainData";
import { useState } from "react";

type AddUser_props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch?: any;
};

export const AddUser = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddUser_props) => {

  type InitialValues_TP = {
    [x: string]: string;
  };

  const UserValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      phone: Yup.string().trim().required(requiredTranslation),
      email: Yup.string().trim().required(requiredTranslation),
      role_id: Yup.string().trim().required(requiredTranslation),
      password: !resetForm
        ? Yup.string().trim()
        : Yup.string().trim().required(requiredTranslation),
      password_confirmation: !resetForm
        ? Yup.string().trim()
        : Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    name: !resetForm ? updateData?.name : "",
    phone: !resetForm ? updateData?.phone : "",
    phone_country: !resetForm ? updateData?.phone_country : "",
    email: !resetForm ? updateData?.email : "",
    role_id: !resetForm ? updateData?.role_id : "",
    password: !resetForm ? updateData?.password : "",
    password_confirmation: !resetForm ? updateData?.password_confirmation : "",
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/users"],
    endpoint: `dashboard/users`,
    onSuccess: (data: InitialValues_TP) => {
      refetch();
      setModel(false);
      notify("success");
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err.response.data.message);
    },
    formData: true,
  });


  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/users"],
    endpoint: `dashboard/users/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidatingSchema}
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
              <UserMainData  resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
