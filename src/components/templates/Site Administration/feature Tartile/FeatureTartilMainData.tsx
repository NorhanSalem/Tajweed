/////////// IMPORTS
///
import { t } from 'i18next';
import { DropFile } from '../../../molecules/files/DropFile';
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from '../../../molecules';

/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const FeatureTartilMainData = ({
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
        title={`${t("Add Why Quran Curses")}`}
        showpopuptitle={true}
        customStyle={"block p-8 dark:bg-dark-tertiary"}
      >
        <div className="styleing-modal-info">
          <BaseInputField
            id="name"
            label={`${t("Title Arabic")}`}
            name="title_ar"
            type="text"
            placeholder={`${t("Title Arabic")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="name"
            label={`${t("Title English")}`}
            name="title_en"
            type="text"
            placeholder={`${t("Title English")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="sessions"
            label={`${t("Priority")}`}
            name="order"
            type="number"
            placeholder={`${t("Priority")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />
        </div>

        <TextAreaField
          label={`${t("Description Arabic")}`}
          name="description_ar"
          placeholder={`${t("Description Arabic")}`}
          id="answer_ar"
          rows={6}
        />

        <TextAreaField
          label={`${t("Description English")}`}
          name="description_en"
          placeholder={`${t("Description English")}`}
          id="answer_en"
          rows={6}
        />

        <div className="col-span-3 text-start mt-4 dark:text-white">
          <h2> {`${t("Image")}`}</h2>
          <DropFile name="image" />
        </div>
      </InnerFormLayout>
    </>
  )
};
