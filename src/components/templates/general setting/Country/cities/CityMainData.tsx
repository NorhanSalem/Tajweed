/////////// IMPORTS
///
import { t } from 'i18next';
import {
  BaseInputField,
  InnerFormLayout,
} from '../../../../molecules';
import SelectCountry from '../../../../molecules/Select/SelectCountry';
import { FormikSharedConfig, useFormikContext } from 'formik';

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CityMainData = ({

  updateData,

  resetForm,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { setFieldValue, values } = useFormikContext<FormikSharedConfig>();

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <InnerFormLayout title={`${t('Add City')}`} showpopuptitle={true} scroll={true}>
        <BaseInputField
          id='name'
          label={`${t('Title Arabic')}`}
          name='title_ar'
          type='text'
          placeholder={`${t('Title Arabic')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id='name'
          label={`${t('Title English')}`}
          name='title_en'
          type='text'
          placeholder={`${t('Title English')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <SelectCountry
          name='country_id'
          label={`${t("Country")}`}
          updateData={updateData}
          resetForm={resetForm}
          onChange={(option) => {
            setFieldValue('country_id', option.value);
          }}
        />
      </InnerFormLayout>
    </>
  );
};
