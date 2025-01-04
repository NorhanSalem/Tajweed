/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';

import { Helmet } from 'react-helmet-async';
import { useFetch, useMutate } from '../../../../hooks';
import { requiredTranslation } from '../../../../utils/helpers';
import { notify } from '../../../../utils/toast';
import { Loading } from '../../../organisms/Loading/Loading';
import { HandleBackErrors } from '../../../../utils/utils-components/HandleBackErrors';
import { OuterFormLayout } from '../../../molecules';
import { Button } from '../../../atoms';
import { TeacherTermsConditionAdd } from './TeacherTermsConditionAdd';

///
/////////// Types
///
type StudentTermsCondition_props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch:any
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const TeacherTermsConditionMain = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
  refetch
}: StudentTermsCondition_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };


  const StudentTermsValidatingSchema = () =>
    Yup.object({
      text_ar: Yup.string().trim().required(requiredTranslation),
      text_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    text_ar: !resetForm ? updateData?.text_ar : '',
    text_en: !resetForm ? updateData?.text_en : '',
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ['dashboard/teachers-terms-conditions'],
    endpoint: `dashboard/teachers-terms-conditions`,
    onSuccess: (data: InitialValues_TP) => {
      notify('success');
      setModel(false);
      refetch()
    },

    onError: (err) => {
      notify('error', err?.response?.data.message);
    },
    formData: true,
  });

  // update student
  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ['dashboard/teachers-terms-conditions'],
    endpoint: `dashboard/teachers-terms-conditions/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      refetch()

      notify('success');
      setModel(false);
    },
    onError: (err) => {
      notify('error', err?.response?.data.message);
    },

    formData: true,
  });
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* {loadingData && <Loading />}
      {isSuccess && ( */}
        <Formik
          initialValues={initialValues}
          validationSchema={StudentTermsValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            resetForm
              ? mutate({
                  ...values,
                })
              : update({
                  ...values,
                  _method: 'put',
                });
          }}
        >
          <Form>
            <HandleBackErrors>
              <OuterFormLayout
                header={title}
                className='gap-8'
                submitComponent={
                  <Button
                    type='submit'
                    className='mr-auto mt-8'
                    loading={LoadingUpdateSponsor || isLoading}
                  >
                    {t('submit')}
                  </Button>
                }
              >
                <TeacherTermsConditionAdd
                  updateData={updateData}
                  resetForm={resetForm}
                />
              </OuterFormLayout>
            </HandleBackErrors>
          </Form>
        </Formik>
      {/* )} */}
    </>
  );
};
