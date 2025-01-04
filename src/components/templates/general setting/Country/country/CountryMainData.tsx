/////////// IMPORTS
///
import { t } from 'i18next';
import {
  BaseInputField,
  InnerFormLayout,
} from '../../../../molecules';

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CountryMainData = ({
  setGender,
  setState_id,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  updateData,
  setPhone_country,
  setPhoneCode,
  setCountry,
  resetForm,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

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
      <InnerFormLayout title={`${t('Add Country')}`}showpopuptitle={true} scroll={true}>
        <BaseInputField
          id='name'
          label={`${t('Code')}`}
          name='code'
          type='text'
          placeholder={`${t('Code')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
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
        <BaseInputField
          id='name'
          label={`${t('Nationality Arabic')}`}
          name='nationality_ar'
          type='text'
          placeholder={`${t('Nationality Arabic')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id='sessions'
          label={`${t('Nationality English')}`}
          name='nationality_en'
          type='text'
          placeholder={`${t('Nationality English')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
      </InnerFormLayout>
    </>
  );
};
