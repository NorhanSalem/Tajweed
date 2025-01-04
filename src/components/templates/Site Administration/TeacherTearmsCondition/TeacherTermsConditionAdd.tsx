/////////// IMPORTS
import { t } from 'i18next';

import { useFormikContext } from 'formik';
import { InnerFormLayout, TextAreaField } from '../../../molecules';
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const TeacherTermsConditionAdd = ({}: any) => {
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
      <InnerFormLayout
        title={`${t('Teachers Terms And Conditions')}`}
        showpopuptitle={true}
      >
        <TextAreaField
          label={`${t('Terms and conditions for teachers in Arabic')}`}
          name='text_ar'
          placeholder={`${t('Terms and conditions for teachers in Arabic')}`}
          id='text_ar'
          rows={3}
        />

        <TextAreaField
          label={`${t('Terms and conditions for teachers in English')}`}
          name='text_en'
          placeholder={`${t('Terms and conditions for teachers in English')}`}
          id='text_en'
          rows={3}
        />
      </InnerFormLayout>
    </>
  );
};
