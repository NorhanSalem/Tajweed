////////// IMPORTS
import { Form, Formik } from "formik";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { useMutate } from "../../../../hooks";
import { requiredTranslation } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../../atoms";
import { OuterFormLayout } from "../../../molecules";
import { CompensationsMainData } from "./CompensationsMainData"
///
// types
interface UpdateData {
  date: Date;
  name: string;
  type: string;
  value: string;
  note: string;
  employee_id: string;
  employee_name: string;
  id: string;
  last_action_user: string;
  last_action_date: string;
}
type InitialValues_TP = {
  date: Date;
  type: string;
  value: string;
  note: string;
  employee_id: string;
};
type AddCompensations_props = {
  title?: string;
  updateData: UpdateData; // Use the UpdateData interface here
  setModel?: Dispatch<SetStateAction<boolean>> | undefined;
  resetForm?: boolean;
  refetch: any;
};

export const AddCompensations = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddCompensations_props) => {
  console.log("🚀 ~ updateData:", updateData)
  const compensationsValidation = () =>
    Yup.object({
      date: Yup.date().required(requiredTranslation),
      value: Yup.number()
        .required(requiredTranslation)
        //@ts-ignore
        .typeError(t("Enter numbers only")),
      note: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    date: !resetForm ? new Date(updateData?.date) : new Date(),
    employee_id: !resetForm ? updateData?.employee_id || "" : "",
    type: !resetForm ? updateData?.type || "" : "",
    value: !resetForm ? updateData?.value || "" : "",
    note: !resetForm ? updateData?.note || "" : "",
  };
  const endpoint = "dashboard/hr/compensations";
  const { mutate, isLoading } = useMutate({
    mutationKey: [endpoint],
    endpoint: endpoint,
    onSuccess: () => {
      setModel?.(false);
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateTeacher } = useMutate({
    mutationKey: [`${endpoint}/${updateData?.id}`],
    endpoint: `${endpoint}/${updateData?.id}`,
    onSuccess: () => {
      refetch();
      notify("success");
      setModel?.(false);
    },
    onError: (err: any) => {
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={compensationsValidation}
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
                  loading={isLoading || LoadingUpdateTeacher}
                >
                  {t("submit")}
                </Button>
              }
            >
              <CompensationsMainData
         
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
