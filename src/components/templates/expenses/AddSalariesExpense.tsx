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
import { AddSalariesExpenseMainData } from "./AddSalariesExpenseMainData";

/////////// Types
///
type AddSalairesExpense_props = {
  title?: string;
  refetch?: any;
  editData?: any;
  setModel?: any;
  resetForm: any;
  salariesExpensesID: any;
};

export const AddSalariesExpense = ({
  title,
  refetch,
  setModel,
  salariesExpensesID,
  resetForm,
  editData,
}: AddSalairesExpense_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    name: string;
    date: Date;
    amount: string;
  };

  const SalariesExpenseValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      date: Yup.date().required(requiredTranslation),
      amount: Yup.string().trim().required(requiredTranslation),
    });
  const initialValues: InitialValues_TP = {
    name: !resetForm ? editData?.name : "",
    date: !resetForm ? new Date(editData.date) : new Date(),
    amount: !resetForm ? editData?.amount : "",
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const queryClient = useQueryClient();

  ///
  /////////// SIDE EFFECTS
  ///
  //post
  const { mutate, isLoading } = useMutate({
    mutationKey: [`mutats/dashboard/reports/expenses/salaries-expenses`],
    endpoint: `dashboard/reports/expenses/salaries-expenses`,
    onSuccess: (data: any) => {
      refetch();

      setModel(false);
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  // update teacher

  const { mutate: update, isLoading: LoadingUpdateSalariesExpenses } =
    useMutate({
      mutationKey: [
        `update/dashboard/reports/expenses/salaries-expenses/${salariesExpensesID}`,
      ],
      endpoint: `dashboard/reports/expenses/salaries-expenses/${salariesExpensesID}`,
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
  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SalariesExpenseValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          if (resetForm) {
            mutate({
              ...values,
            });
          } else {
            update({
              ...values,
              _method: "put",
            });
          }
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
                  loading={isLoading || LoadingUpdateSalariesExpenses}
                >
                  {t("submit")}
                </Button>
              }
            >
              <AddSalariesExpenseMainData editData={editData} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
