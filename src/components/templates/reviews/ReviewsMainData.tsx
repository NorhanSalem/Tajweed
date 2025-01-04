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
export const ReviewsMainData = ({
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
        title={`${t('Add your opinion')}`}
        showpopuptitle={true}
        customStyle={'block p-8 dark:bg-dark-tertiary'}
      >
        <div className='styleing-modal-info'>
          <BaseInputField
            id='name'
            label={`${t('Student Name')}`}
            name='student_name'
            type='text'
            placeholder={`${t('Student Name')}`}
            labelProps={{ className: 'mb-1' }}
            className='mb-3'
            required
          />

          <BaseInputField
            id='name'
            label={`${t('Job')}`}
            name='job'
            type='text'
            placeholder={`${t('Job')}`}
            labelProps={{ className: 'mb-1' }}
            className='mb-3'
            required
          />

          <BaseInputField
            id='sessions'
            label={`${t('Rate')}`}
            name='rate'
            type='text'
            placeholder={`${t('Rate')}`}
            labelProps={{ className: 'mb-1' }}
            className='mb-3'
            required
          />
          <TextAreaField
            name='comment'
            label={`${t("comment")}`}
            id='comment'
            placeholder={`${t("comment")}`}
            className='mt-3'
          />
        </div>

        <div className='col-span-3 text-start pt-4'>
          <h2> {`${t('Image')}`}</h2>
          <DropFile name='image' />
        </div>
      </InnerFormLayout>
    </>
  );
};
