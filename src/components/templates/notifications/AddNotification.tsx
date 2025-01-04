/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { NotificationMainData } from "./NotificationMainData";
///
/////////// Types
///
type AddNotification_props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddNotification = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddNotification_props) => {
  /////////// VARIABLES
  ///

  type InitialValues_TP = {
    name: string;
    email: string;
    admin: string;
    phone: string;
    birthday: Date;
    password?: string;
    password_confirmation: string;
    specialization?: string;
    gender?: string;
    state_id?: string;
    phone_country?: string;
    language?: string;
    marital_status?: string;
    nationality_id?: string;
  };

  const NotificationValidatingSchema = () =>
    Yup.object({
      admins: Yup.array()
        //@ts-ignore
        .min(1, t("pick at least one items"))
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
        ),
      // teachers: Yup.array()
      //   //@ts-ignore
      //   .min(1, t("pick at least one items"))
      //   .of(
      //     Yup.object().shape({
      //       label: Yup.string().required(),
      //       value: Yup.string().required(),
      //     })
      //   ),
      // students: Yup.array()
      //   //@ts-ignore
      //   .min(1, t("pick at least one items"))
      //   .of(
      //     Yup.object().shape({
      //       label: Yup.string().required(),
      //       value: Yup.string().required(),
      //     })
      //   ),
      data_ar: Yup.string().trim().required(requiredTranslation),
      data_en: Yup.string().trim().required(requiredTranslation),
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      // country_id: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    admins: !resetForm ? updateData?.admins : [],
    teachers: !resetForm ? updateData?.teachers : "",
    students: !resetForm ? updateData?.students : "",
    title_ar: !resetForm ? updateData?.title_ar : "",
    title_en: !resetForm ? updateData?.title_en : "",
    data_ar: !resetForm ? updateData?.data_ar : "",
    data_en: !resetForm ? updateData?.data_en : "",
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/advertisement/notifications"],
    endpoint: `dashboard/advertisement/notifications`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(["All-Notifications"]);
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
    mutationKey: ["dashboard/advertisement/notifications"],
    endpoint: `dashboard/advertisement/notifications/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
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
        validationSchema={NotificationValidatingSchema}
        onSubmit={(values: any) => {
          console.log("first", {
            ...values,
            admins: values?.admins?.map((item: { id: any }) => item.id),
            teachers:values?.teachers ?  values?.teachers?.map(
              (item: { value: any }) => item.value
            ):null,
            students:values?.students ? values?.students?.map(
              (item: { value: any }) => item.value
            ): null,
          });

          resetForm
            ? mutate({
                ...values,
                admins: values?.admins?.map((item: { id: any }) => item.id),
                teachers:values?.teachers ?  values?.teachers?.map(
                  (item: { value: any }) => item.value
                ):null,
                students:values?.students ? values?.students?.map(
                  (item: { value: any }) => item.value
                ): null,
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
              <NotificationMainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
