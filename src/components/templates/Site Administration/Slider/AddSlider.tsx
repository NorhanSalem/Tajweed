/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';
import { useMutate } from '../../../../hooks';
import { requiredTranslation } from '../../../../utils/helpers';
import { notify } from '../../../../utils/toast';
import { HandleBackErrors } from '../../../../utils/utils-components/HandleBackErrors';
import { Button } from '../../../atoms';
import { OuterFormLayout } from '../../../molecules';
import { SliderMainData } from './SliderMainData';

///
/////////// Types
///
type AddSlider_props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddSlider = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
}: AddSlider_props) => {
  console.log('🚀 ~ file: AddSlider.tsx:38 ~ updateData:', updateData);
  type InitialValues_TP = {
    [x: string]: string;
  };

  const TeacherValidatingSchema = () =>
    Yup.object({
      normal_title_ar: Yup.string().trim().required(requiredTranslation),
      normal_title_en: Yup.string().trim().required(requiredTranslation),
      colored_title_ar: Yup.string().trim().required(requiredTranslation),
      colored_title_en: Yup.string().trim().required(requiredTranslation),
      description_ar: Yup.string().trim().required(requiredTranslation),
      description_en: Yup.string().trim().required(requiredTranslation),
      priority: Yup.number().required(`${t(`Must be a number`)}`),
    });

  const initialValues: InitialValues_TP = {
    normal_title_ar: !resetForm ? updateData?.normal_title_ar : '',
    normal_title_en: !resetForm ? updateData?.normal_title_en : '',
    colored_title_ar: !resetForm ? updateData?.colored_title_ar : '',
    colored_title_en: !resetForm ? updateData?.colored_title_en : '',
    description_ar: !resetForm ? updateData?.description_ar : '',
    description_en: !resetForm ? updateData?.description_en : '',
    priority: !resetForm ? updateData?.priority : '',
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  // const [gender, setGender] = useState(!resetForm ? updateData?.gender : "")

  ///
  /////////// SIDE EFFECTS
  ///
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ['dashboard/sliders'],
    endpoint: `dashboard/sliders`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(['View-all-Teacher']);
      queryClient.refetchQueries(['teacher-finances']);

      notify('success');
      setModel(false);
    },

    onError: (err) => {
      console.log('err', err);
      notify('error', err?.response?.data.message);
    },
    formData: true,
  });

  // update teacher

  const { mutate: update, isLoading: LoadingUpdateTeacher } = useMutate({
    mutationKey: [`dashboard/sliders/${updateData.id}`],
    endpoint: `dashboard/sliders/${updateData.id}`,
    onSuccess: (data: InitialValues_TP) => {
      queryClient.refetchQueries(['View-all-Teacher']);
      queryClient.refetchQueries(['teacher-finances']);

      notify('success');
      setModel(false);
    },
    onError: (err) => {
      console.log('err', err);
      notify('error', err?.response?.data.message);
    },

    formData: true,
  });

  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={TeacherValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          console.log(values);
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
                  loading={isLoading || LoadingUpdateTeacher}
                >
                  {t('submit')}
                </Button>
              }
            >
              <SliderMainData updateData={updateData} resetForm={resetForm} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
