/////////// IMPORTS
import { t } from 'i18next';

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
export const AboutUsMainData = ({
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
  ///
  /////////// STATES
  ///
  const { values, setFieldValue } = useFormikContext(); /////////// STATES

  ///
  return (
    <>
      <InnerFormLayout title={`${t('AboutUs')}`} showpopuptitle={false} scroll={true}>
      <TextAreaField
          label={`${t('Header Text Ar')}`}
          name='about_normal_before_ar'
          placeholder={`${t('Footer Text Ar')}`}
          id='footer_text_ar'
          rows={6}
        />

        <TextAreaField
          label={`${t('Header Text En')}`}
          name='about_normal_before_en'
          placeholder={`${t('Header Text En')}`}
          id='footer_text_en'
          rows={6}
        />
        
        <TextAreaField
          label={`${t('Title Text Ar')}`}
          name='about_colored_ar'
          placeholder={`${t('Title Text Ar')}`}
          id='footer_text_en'
          rows={6}
        />

        <TextAreaField
          label={`${t('Title Text En')}`}
          name='about_colored_en'
          placeholder={`${t('Title Text En')}`}
          id='footer_text_en'
          rows={6}
        /><TextAreaField
        label={`${t('Header Text Ar')}`}
        name='about_normal_after_ar'
        placeholder={`${t('Footer Text Ar')}`}
        id='footer_text_ar'
        rows={6}
      />

      <TextAreaField
        label={`${t('Header Text En')}`}
        name='about_normal_after_en'
        placeholder={`${t('Header Text En')}`}
        id='footer_text_en'
        rows={6}
      />
      
      <TextAreaField
        label={`${t('Title Text Ar')}`}
        name='about_text_ar'
        placeholder={`${t('Title Text Ar')}`}
        id='footer_text_en'
        rows={6}
      />

      <TextAreaField
        label={`${t('Title Text En')}`}
        name='about_text_en'
        placeholder={`${t('Title Text En')}`}
        id='footer_text_en'
        rows={6}
      />

        
      </InnerFormLayout>
    </>
  );
};