/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useMutate } from '../../../hooks';
import { requiredTranslation } from '../../../utils/helpers';
import { notify } from '../../../utils/toast';
import { HandleBackErrors } from '../../../utils/utils-components/HandleBackErrors';
import { Button } from '../../atoms';
import { OuterFormLayout } from '../../molecules';
import { AddGeneralExpenseMainData } from './AddGeneralExpenseMainData';

/////////// Types
///
type AddSponsorsRevenues_props = {
  title?: string;
  dataSource?: any;
  editData?: any;
  setModel?: any;
  resetForm:any
  generalExpensesID:any
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddGeneralExpense = ({
  title,
  dataSource,
  setModel,
  generalExpensesID,
  resetForm,
  editData,
  refetch
}: AddSponsorsRevenues_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    name: string;
    date: Date;
    amount: string;
  };

  const GeneralExpenseValidatingSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      date: Yup.date().required(requiredTranslation),
      amount: Yup.string().trim().required(requiredTranslation),
    });
  const initialValues: InitialValues_TP = {
    name: !resetForm ? editData?.name : '',
    date: !resetForm ? new Date(editData.date) : new Date(),
    amount: !resetForm ? editData?.amount : '',
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
    mutationKey: [`mutats/dashboard/reports/expenses/general-expenses`],
    endpoint: `dashboard/reports/expenses/general-expenses`,
    onSuccess: (data: any) => {
      refetch()
      setModel(false);
      notify('success');
    },
    onError: (err) => {
      notify('error', err?.response?.data.message);
    },
    formData: true,
  });

  // update teacher

  const { mutate: update, isLoading: LoadingUpdateGeneralExpenses } = useMutate(
    {
      mutationKey: [
        `update/dashboard/reports/expenses/general-expenses/${generalExpensesID}`,
      ],
      endpoint: `dashboard/reports/expenses/general-expenses/${generalExpensesID}`,
      onSuccess: (data: InitialValues_TP) => {
        refetch()


        notify('success');
        setModel(false);
      },
      onError: (err) => {
        notify('error', err?.response?.data.message);
      },

      formData: true,
    }
  );
  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={GeneralExpenseValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          if (resetForm) {
            mutate({
              ...values,
            });
          } else {
            update({
              ...values,
              _method: 'put',
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
                  type='submit'
                  className='mr-auto mt-8'
                  loading={isLoading || LoadingUpdateGeneralExpenses}
                >
                  {t('submit')}
                </Button>
              }
            >
              <AddGeneralExpenseMainData editData={editData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  );
};
