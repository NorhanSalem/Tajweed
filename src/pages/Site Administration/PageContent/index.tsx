/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';
import { Button } from '../../../components/atoms';
import { OuterFormLayout } from '../../../components/molecules';
import { Loading } from '../../../components/organisms/Loading/Loading';
import { useFetch, useMutate } from '../../../hooks';
import { requiredTranslation } from '../../../utils/helpers';
import { notify } from '../../../utils/toast';
import { HandleBackErrors } from '../../../utils/utils-components/HandleBackErrors';
import { Helmet } from 'react-helmet-async';
import { PageContentMainData } from '../../../components/templates/Site Administration/PageContent/PageContentMainData';

///
/////////// Types
///
type ContactInfo_props = {
  title: string;
  dataSource?: any;
  tartilsData?: any;
  setModel?: any;
  resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PageContent = ({
  title,
  dataSource,
  setModel,
  resetForm,
}: ContactInfo_props) => {
  type InitialValues_TP = {
    [x: string]: string;
  };

  //all data
  const {
    isSuccess,
    refetch,
    data: PageContent,
    isFetching,
    isLoading: loadingData,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/what-questions`,

    queryKey: [`dashboard/what-questions`],
    onSuccess(data) {
      // setDataSource(data)
    },
    onError(err) {
    },
  });

  const tartilstValidatingSchema = () =>
    Yup.object({
      question_ar: Yup.string().trim().required(requiredTranslation),
      question_en: Yup.string().trim().required(requiredTranslation),
      answer_ar: Yup.string().trim().required(requiredTranslation),
      answer_en: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    question_ar: !resetForm ? PageContent?.data?.question_ar : '',
    question_en: !resetForm ? PageContent?.data?.question_en : '',
    answer_ar: !resetForm ? PageContent?.data?.answer_ar : '',
    answer_en: !resetForm ? PageContent?.data?.answer_en : '',
  };
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  // const [gender, setGender] = useState(!resetForm ? ContactInfoData?.gender : "")

  ///
  /////////// SIDE EFFECTS
  ///
  // const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutate({
    mutationKey: ['dashboard/what-questions'],
    endpoint: `dashboard/what-questions/1`,
    onSuccess: (data: InitialValues_TP) => {
      // queryClient.refetchQueries(["View-all-Teacher"]);
      // queryClient.refetchQueries(["teacher-finances"]);

      notify('success');
      // setModel(false);
    },

    onError: (err) => {
      notify('error', err?.response?.data.message);
    },
    formData: true,
  });

  const { mutate: update, isLoading: LoadingUpdatePageContent } = useMutate({
    mutationKey: ['dashboard/page-content'],
    endpoint: `dashboard/page-content`,
    onSuccess: (data: InitialValues_TP) => {
      notify('success');
      // setModel(false);
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
      {loadingData && <Loading />}
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={tartilstValidatingSchema}
          onSubmit={(values: InitialValues_TP) => {
            mutate({
              ...values,
              _method: 'put',
            });
          }}
        >
          <Form>
            <HandleBackErrors>
              {loadingData ? (
                <Loading />
              ) : (
                <OuterFormLayout
                  //   header={title}
                  submitComponent={
                    <Button
                      type='submit'
                      className='mr-auto mt-8'
                      loading={isLoading || LoadingUpdatePageContent}
                    >
                      {t('submit')}
                    </Button>
                  }
                >
                  <PageContentMainData resetForm={resetForm} />
                </OuterFormLayout>
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
          
    </>
  );
};
