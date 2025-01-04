/////////// IMPORTS
import { t } from 'i18next';

import DateInput2 from '../../molecules/formik-fields/DaetInput2';
import { useFormikContext } from 'formik';
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from '../../../molecules';
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SliderMainData = ({
  setGender,
  setState_id,
  setPhoneCode,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  updateData,
  resetForm,
  setPhone_country,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const { values, setFieldValue } = useFormikContext(); /////////// STATES

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
      <InnerFormLayout title={`${t('Add Slider')}`} showpopuptitle={true}>
        <BaseInputField
          id='name'
          label={`${t('Normal Title Arabic')}`}
          name='normal_title_ar'
          type='text'
          placeholder={`${t('Normal Title Arabic')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id='name'
          label={`${t('Normal Title English')}`}
          name='normal_title_en'
          type='text'
          placeholder={`${t('Normal Title English')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />

        <BaseInputField
          id='name'
          label={`${t('Colored Title Arabic')}`}
          name='colored_title_ar'
          type='text'
          placeholder={`${t('Colored Title Arabic')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id='name'
          label={`${t('Colored Title English')}`}
          name='colored_title_en'
          type='text'
          placeholder={`${t('Colored Title English')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />

        <BaseInputField
          id='priority'
          label={`${t('Priority')}`}
          name='priority'
          type='number'
          placeholder={`${t('Priority')}`}
          labelProps={{ className: 'mb-1' }}
          required
        />

        <TextAreaField
          label={`${t('Description in Arabic')}`}
          name='description_ar'
          placeholder={`${t('Description in Arabic')}`}
          id='description_ar'
          rows={3}
        />
        <TextAreaField
          label={`${t('Description in English')}`}
          name='description_en'
          placeholder={`${t('Description in English')}`}
          id='description_en'
          rows={3}
        />
      </InnerFormLayout>
    </>
  );
};
