import { t } from 'i18next';
import { BaseInputField, InnerFormLayout } from '../../molecules';
import DateInput2 from '../../molecules/formik-fields/DateInput2';
///
export const AddGeneralExpenseMainData = ({
  setGender,
  setState_id,
  setSpecialization,
  setNationality_id,
  setMarital_status,
  setLanguage,
  editData,
  setPhone_country,
  setCountry,
}: any) => {
  ///
  return (
    <>
      <InnerFormLayout showpopuptitle={true} title={`${t('Add general expense')}`} scroll={true}>
        {/* <DateInputField label={`${t("ُEnter Date")}`} name="date"  maxDate={new Date()}  /> */}
        <DateInput2 label={`${t('Enter Date')}`} name='date' hiddenBirthDay />
        <BaseInputField
          id='name'
          label={`${t('Name of the expense')}`}
          name='name'
          type='text'
          placeholder={`${t('name')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id='amount'
          label={`${t('Total')}`}
          name='amount'
          type='text'
          placeholder={`${t('Enter total')}`}
          labelProps={{ className: 'mb-1' }}
          required
        />
      </InnerFormLayout>
    </>
  );
};
