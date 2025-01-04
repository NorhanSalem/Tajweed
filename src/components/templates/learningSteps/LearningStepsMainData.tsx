/////////// IMPORTS
///
import { t } from 'i18next';
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from '../../molecules';
import { DropFile } from '../../molecules/files/DropFile';

/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const LearningStepsMainData = ({
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
        showpopuptitle={true}
        title={`${t('Add')}`}
        customStyle={'block p-8 dark:bg-dark-tertiary'}
      >
        <div className='styleing-modal-info '>
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
            id='sessions'
            label={`${t('Priority')}`}
            name='priority'
            type='number'
            placeholder={`${t('Priority')}`}
            labelProps={{ className: 'mb-1' }}
            className='mb-3'
            required
          />

          <TextAreaField
            id='description_ar'
            name='description_ar'
            label={`${t('Description in Arabic')}`}
            placeholder={`${t('Description in Arabic')}`}
          />

          <TextAreaField
            id='description_en'
            name='description_en'
            label={`${t('Description in English')}`}
            placeholder={`${t('Description in English')}`}
          />
        <div className='col-span-2' style={{ marginTop: '1rem' }}>
          <h2 className='dark:text-white' style={{ textAlign: 'start' }}>
            {' '}
            {`${t('Image')}`}
          </h2>
          <DropFile name='image' />
        </div>
        </div>

      </InnerFormLayout>
    </>
  );
};
