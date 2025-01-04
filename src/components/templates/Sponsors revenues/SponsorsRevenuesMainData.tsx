/////////// IMPORTS
///
///
/////////// Types
///

import { t } from 'i18next';
import { BaseInputField, InnerFormLayout } from '../../molecules';
import DateInput2 from '../../molecules/formik-fields/DateInput2';

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SponsorsRevenuesMainData = ({ resetForm }: any) => {
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
  console.log("ssssssssssssssssssssssss")
  return (
    <>
      <InnerFormLayout
        title={`${t('Add sponsor revenues')}`}
        showpopuptitle={true}
      >
        <BaseInputField
          id='name'
          label={`${t('name')}`}
          name='name'
          type='text'
          placeholder={`${t('name')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        {/* <DateInputField label={`${t("ُEnter Date")}`} name="date"  maxDate={new Date()}  /> */}
        <DateInput2 label={`${t('Enter Date')}`} name='date'  hiddenBirthDay/>
        <BaseInputField
          id='amount'
          label={`${t('amount price')}`}
          name='amount'
          type='text'
          placeholder={`${t('Enter amount price')}`}
          labelProps={{ className: 'mb-1' }}
          required
        />
      </InnerFormLayout>
    </>
  );
};
