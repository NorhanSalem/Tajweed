////////// IMPORTS
import { useQueryClient } from "@tanstack/react-query";
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
import { EmployeesMainData } from "./EmployeesMainData";
///
// types
interface UpdateData {
  id: string;
  name: string;
  job: string;
  employment_date: Date;
  salary: string;
  phone: string;
  phone_country: string;
}
type InitialValues_TP = {
  name: string;
  employment_date: Date;
  salary: string;
  job: string;
  phone: string;
  phone_country: string;
};
type AddEmploys_props = {
  title?: string;
  updateData: UpdateData;
  setModel?: Dispatch<SetStateAction<boolean>> | undefined;
  resetForm?: boolean;
  refetch: any;
};

export const AddEmploys = ({
  title,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddEmploys_props) => {
  const employValidation = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      phone: Yup.string().trim().required(requiredTranslation),
      job: Yup.string().trim().required(requiredTranslation),
      employment_date: Yup.date().required(requiredTranslation),
      salary: Yup.number()
        .positive(`${t(`It must be positive`)}`)
        .required(`${t(`Must be a number`)}`),
    });

  const initialValues: InitialValues_TP = {
    name: !resetForm ? updateData?.name || "" : "",
    //@ts-ignore
    phone: !resetForm ? updateData?.phone_all : "",
    phone_country: updateData?.phone_country || "",
    job: !resetForm ? updateData?.job || "" : "",
    //@ts-ignore
    employment_date: !resetForm
      ? new Date(updateData?.employment_date)
      : new Date(),
    salary: !resetForm ? updateData?.salary || "" : "",
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/hr/employees"],
    endpoint: `dashboard/hr/employees`,
    onSuccess: () => {
      refetch();
      setModel?.(false);
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdateTeacher } = useMutate({
    mutationKey: ["dashboard/hr/employees"],
    endpoint: `dashboard/hr/employees/${updateData?.id}`,
    onSuccess: () => {
      queryClient.refetchQueries(["All-Employees"]);
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
        validationSchema={employValidation}
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
              <EmployeesMainData
                updateData={updateData}
                resetForm={resetForm}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
