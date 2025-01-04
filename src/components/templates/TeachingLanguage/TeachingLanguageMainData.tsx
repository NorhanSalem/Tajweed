/////////// IMPORTS
///
import { Radio } from '@mantine/core';
import { useFormikContext } from 'formik';
import { t } from 'i18next';
import { BaseInputField, InnerFormLayout } from '../../molecules';

export const TeachingLanguageMainData = ({ updateData, resetForm }: any) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <>
      <InnerFormLayout
        title={!resetForm ? `${t("Edit")}` :`${t('Add')}`}
        showpopuptitle={true}
        scroll={true}
      >
        <BaseInputField
          id='discount'
          label={`${t('Name Ar')}`}
          name='name_ar'
          type='text'
          placeholder={`${t('Name Ar')}`}
          labelProps={{ className: 'mb-1' }}
          required
        />

        <BaseInputField
          id='discount'
          label={`${t('Name En')}`}
          name='name_en'
          type='text'
          placeholder={`${t('Name En')}`}
          labelProps={{ className: 'mb-1' }}
          required
        />
        <div className='flex gap-4  mantine-radio-style flex-col'>
          <label>{t('activation status')}</label>
          <div className='flex gap-5  mantine-radio-style'>
            <Radio
              checked={values?.active === 1}
              label={`${t('active')}`}
              onChange={() => {
                setFieldValue('active', 1);
              }}
            />

            <Radio
              label={`${t('notactive')}`}
              checked={values?.active === 0}
              onChange={() => {
                setFieldValue('active', 0);
              }}
            />
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
};
