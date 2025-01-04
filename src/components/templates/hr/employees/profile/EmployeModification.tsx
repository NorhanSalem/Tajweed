/////////// IMPORTS
///
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import { HandleBackErrors } from '../../../../../utils/utils-components/HandleBackErrors';
import { Button } from '../../../../atoms';
import { OuterFormLayout } from '../../../../molecules';
import * as Yup from 'yup';
import { useFetch, useMutate } from '../../../../../hooks';
import { requiredTranslation } from '../../../../../utils/helpers';
import { notify } from '../../../../../utils/toast';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../organisms/Loading/Loading';
import { EmployeesMainData } from '../EmployeesMainData';

const EmployeModification = ({ hideHeader }: any) => {
  const employeId = useParams().employeeId;
  type InitialValues_TP = {
    name: string;
    employment_date: Date;
    salary: string;
    job: string;
    phone_country:string
    phone: string;
  };

  const employeValidation = () =>
    Yup.object({
      name: Yup.string().trim().required(requiredTranslation),
      phone: Yup.string().trim().required(requiredTranslation),
      job: Yup.string().trim().required(requiredTranslation),
      employment_date: Yup.date().required(requiredTranslation),
      salary: Yup.number().required(`${t(`Must be a number`)}`),
    });
  const { data: EditingData, isLoading: loadingData  , refetch } = useFetch<any>({
    endpoint: `dashboard/hr/employees/${employeId}`,
    queryKey: [`dashboard/hr/employees/${employeId}`],
  });

  const initialValues: InitialValues_TP = {
    name: EditingData?.data?.name,
    phone: EditingData?.data?.phone,
    phone_country: EditingData?.data?.phone_country,
    job: EditingData?.data?.job,
    employment_date: new Date() || EditingData?.data?.employment_date,
    salary: EditingData?.data?.salary,
  };



  console.log("🚀 ~ EmployeModification ~ EditingData:", EditingData)
  const { mutate: update, isLoading } = useMutate({
    mutationKey: ['dashboard/hr/employees'],
    endpoint: `dashboard/hr/employees/${employeId}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch()
      notify('success');
    },
    onError: (err) => {
      console.log('err', err);
      notify('error', err?.response?.data?.message);
    },

    formData: true,
  });
  console.log(EditingData?.data?.name);
  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values: InitialValues_TP) => {
           
            
            update({
              ...values,
              _method: "put",
            })
          }}
        >
          <Form>
            <HandleBackErrors>
              <OuterFormLayout
                // header="
                submitComponent={
                  <Button
                    type="submit"
                    className="mr-auto mt-8"
                    loading={isLoading}
                  >
                    {t("submit")}
                  </Button>
                }
              >
                <EmployeesMainData
                  updateData={EditingData?.data}
                  hideHeader={hideHeader}
                />
              </OuterFormLayout>
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
    </>
  )
};

export default EmployeModification;
