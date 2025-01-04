/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';
import { requiredTranslation } from '../../../utils/helpers';
import { useMutate } from '../../../hooks';
import { notify } from '../../../utils/toast';
import { HandleBackErrors } from '../../../utils/utils-components/HandleBackErrors';
import { OuterFormLayout } from '../../molecules';
import { Button } from '../../atoms';
import { LearningStepsMainData } from './LearningStepsMainData';

///
/////////// Types
///
type AddLearningSteps_props = {
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
export const AddLearningSteps = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: AddLearningSteps_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string;
  };

  const LearningValidatingSchema = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      priority: Yup.string().trim().required(requiredTranslation),
      description_ar: Yup.string().trim().required(requiredTranslation),
      description_en: Yup.string().trim().required(requiredTranslation),
      // image: Yup.mixed().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar : '',
    title_en: !resetForm ? updateData?.title_en : '',
    priority: !resetForm ? updateData?.priority : '',
    description_ar: !resetForm ? updateData?.description_ar : '',
    description_en: !resetForm ? updateData?.description_en : '',
    image: !resetForm
      ? !!updateData?.image
        ? [
            {
              path: updateData?.image,
              type: 'image',
            },
          ]
        : []
      : [],
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient();
  // all student
  const { mutate, isLoading } = useMutate({
    mutationKey: ['dashboard/learning-steps'],
    endpoint: `dashboard/learning-steps`,
    onSuccess: (data: InitialValues_TP) => {
      setModel(false);
      notify('success');
      refetch()
    },
    onError: (err) => {
      console.log('err', err);
      notify('error', err.response.data.message);
    },
    formData: true,
  });

  // update student

  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ['dashboard/learning-steps'],
    endpoint: `dashboard/learning-steps/${updateData?.id}`,
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LearningValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          let imgFuture =
            !resetForm &&
            //@ts-ignore
            values?.image?.length > 0 &&
            //@ts-ignore
            values?.image[0]?.path !== updateData?.image
              ? //@ts-ignore
                values.image[0]
              : undefined;
          if (!resetForm) {
            if (!imgFuture) {
              //@ts-ignore
              delete values?.image;
            }
          }
          resetForm
            ? mutate({
                ...values,
                image: values.image[0],
              })
            : update({
                ...values,
                image: values?.image && values?.image[0],
                avatar_remove: values?.image && true,
                _method: 'put',
              });
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
                  loading={isLoading || LoadingUpdateSponsor}
                >
                  {t('Save')}
                </Button>
              }
            >
              <LearningStepsMainData
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
