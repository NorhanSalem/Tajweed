/////////// IMPORTS
///
import { t } from 'i18next';
import { BaseInputField, InnerFormLayout } from '../../../molecules';
import { DropFile } from '../../../molecules/files/DropFile';

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PaymentMethodsMainData = ({
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
      <InnerFormLayout
        title={`${t('Add Payment Methods')}`}
        showpopuptitle={true}
        customStyle={'block py-6 sm: p-8 dark:!bg-dark-tertiary'}
      >
        <div className='styleing-modal-info'>
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
        </div>
        <div
          className='col-span-3'
          style={{ textAlign: 'start', marginTop: '2rem' }}
        >
          <h2 className='dark:!text-white'> {`${t('Logo')}`}</h2>

          <DropFile name='logo' />
        </div>
      </InnerFormLayout>
    </>
  );
};
