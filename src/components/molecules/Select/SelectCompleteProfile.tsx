import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { Select } from '..';

type SelectCompleteProfile_tp = {
  setStatus: any;
};
export default function SelectCompleteProfile({
  setStatus,
}: SelectCompleteProfile_tp) {
  const dataOptions = [
    {
      value: 1,
      label: t('complete'),
    },
    {
      value: '0',
      label: t('unComplete'),
    },
    {
      value: '',
      label: t('All'),
    },
  ];

  return (
    <div>
      <Formik
        initialValues={{ dataOption: '' }}
        onSubmit={(values) => {
          setStatus(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className='w-full'>
            <Select
              // label={`${t('profile status')}`}
              placeholder={`${t('Choose your profile completion status')}`}
              id='optionStatus'
              name='dataOption'
              loadingPlaceholder={`${t('loading')}`}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value);
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
