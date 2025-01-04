import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { useFetch } from '../../../hooks';
import { Select } from '..';

type SelectCompensationsFilter_tp = {
  setStatus: any;
  placeholder?: string;
};
export default function SelectCompensationsFilter({
  setStatus,
  placeholder,
}: SelectCompensationsFilter_tp) {
  const dataOptions = [
    {
      value: '',
      label: t('All'),
    },
    {
      value: 'Award',
      label: t('Reward'),
    },
    {
      value: 'Deduction',
      label: t('Rival'),
    },
  ];

  return (
    <div>
      <Formik initialValues={{ compensations: '' }} onSubmit={(values) => {}}>
        <Form className='w-full'>
          <Select
            placeholder={placeholder}
            // label={`${t('Tybe')}`}
            id='optionStatus'
            name='compensations'
            loadingPlaceholder={`${t('loading')}`}
            options={dataOptions}
            onChange={(option) => {
              //@ts-ignore
              setStatus(option?.value);
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}
