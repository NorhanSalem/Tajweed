import { Form, Formik } from 'formik';

import { t } from 'i18next';
import { Select } from '..';
import { useFetch } from '../../../hooks';
import { useQueryClient } from '@tanstack/react-query';

type SelectInterviewStatus_tp = {
  setStatus: any;
  placeholder?: any;
  setDataTeacherID?: any;
  data?: any;
  setDataTeacherValue?: any;
  mutate?: any;
  label?:string
  refetch?:any
};
export default function SelectInterviewStatusFilter({
  setStatus,
  placeholder,
  setDataTeacherID,
  setDataTeacherValue,
  mutate,
  data,
  refetch,
  label
}: SelectInterviewStatus_tp) {

  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
    
  } = useFetch<any>({
    endpoint: 'dashboard/teachers/interview-status',
    queryKey: ['interview-status'],
    onSuccess(){
    }
  });
  
  const mapStatusOptions = (options:any) => {
    return (
      options?.data?.map((state:any) => ({
        value: state.key,
        label: state.value,
      })) || []
      );
    };

  const dataOptions = [
    {
      value: '',
      label: 'الكل',
    },
    ...mapStatusOptions(StatusOptions),
  ];

  return (
    <div>
      <Formik
        initialValues={{ interview_status: '' }}
        onSubmit={(values) => {
        }}
      >
        {({ setFieldValue }) => (
          <Form className='w-full'>
            <Select
              id='optionStatus'
              // label={label}
              placeholder={placeholder}
              name='dataOption'
              isDisabled={!StatusLoading && !!failureReason}
              loadingPlaceholder={`${t('loading')}`}
              loading={StatusLoading}
              options={dataOptions}
          
              
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value);
                {
                  setDataTeacherID && setDataTeacherID(data?.id);
                }
                {
                  //@ts-ignore
                  setDataTeacherValue && setDataTeacherValue(option?.value);
                }
                {
                  //@ts-ignore

                  mutate && mutate({ interview_status: option?.value })
                }
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
