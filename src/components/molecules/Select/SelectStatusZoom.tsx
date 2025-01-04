import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { Select } from '..';

type SelectStatusZoom_tp = {
  setStatus: any;
};
export default function SelectStatusZoom({ setStatus }: SelectStatusZoom_tp) {
  const dataOptions = [
    {
      value: t("active"),
      label: t("active"),
    },
    {
      value:t("notactive"),
      label:t("notactive"),
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
              label={`${t('zoom status')}`}
              placeholder={`${t("Choose the zoom mode")}`}
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
