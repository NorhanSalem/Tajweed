/////////// IMPORTS
import { t } from 'i18next';

import {
  InnerFormLayout,
  TextAreaField
} from '../../../molecules';
///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const StudentTermsConditionAdd = () => {

  return (
    <>
      <InnerFormLayout
        title={`${t('Students Terms And Conditions')}`}
        showpopuptitle={true}
      >
        <TextAreaField
          label={`${t('Terms and conditions for students in Arabic')}`}
          name='text_ar'
          placeholder={`${t('Terms and conditions for students in Arabic')}`}
          id='text_ar'
          rows={3}
        />

        <TextAreaField
          label={`${t('Terms and conditions for students in English')}`}
          name='text_en'
          placeholder={`${t('Terms and conditions for students in English')}`}
          id='text_en'
          rows={3}
        />
      </InnerFormLayout>
    </>
  );
};
