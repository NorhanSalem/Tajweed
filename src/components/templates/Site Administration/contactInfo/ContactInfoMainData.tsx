/////////// IMPORTS
import { t } from 'i18next';

import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from '../../../molecules';

export const ContactInfoMainData = () => {

  ///
  return (
    <>
      <InnerFormLayout title={`${t("Contact info")}`} showpopuptitle={false} scroll={true}>
        <BaseInputField
          id="name"
          label={`${t("App Store Link")}`}
          name="app_store_link_ar"
          type="text"
          placeholder={`${t("App Store Link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="name"
          label={`${t("Play Store link")}`}
          name="play_store_link_ar"
          type="text"
          placeholder={`${t("Play Store link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />

        <BaseInputField
          id="name"
          label={`${t("Facebook Link")}`}
          name="facebook_link_ar"
          type="text"
          placeholder={`${t("Facebook Link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
      

        <BaseInputField
          id="name"
          label={`${t("Instagram Link")}`}
          name="instagram_link_ar"
          type="text"
          placeholder={`${t("Instagram Link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="name"
          label={`${t("Youtube Link")}`}
          name="youtube_link_ar"
          type="text"
          placeholder={`${t("Youtube Link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="name"
          label={`${t("linkedin Link")}`}
          name="linkedin_link_ar"
          type="text"
          placeholder={`${t("linkedin Link")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />


        <TextAreaField
          label={`${t("Footer Text Ar")}`}
          name="footer_text_ar"
          placeholder={`${t("Footer Text Ar")}`}
          id="footer_text_ar"
          rows={3}
        />

        <TextAreaField
          label={`${t("Footer Text En")}`}
          name="footer_text_en"
          placeholder={`${t("Footer Text En")}`}
          id="footer_text_en"
          rows={3}
        />
        <TextAreaField
          label={`${t("Footer Blog Ar")}`}
          name="footer_blog_ar"
          placeholder={`${t("Footer Blog Ar")}`}
          id="footer_text_ar"
          rows={3}
        />
        <TextAreaField
          label={`${t("Footer Blog En")}`}
          name="footer_blog_en"
          placeholder={`${t("Footer Blog En")}`}
          id="footer_text_en"
          rows={3}
        />
        <BaseInputField
          id='name'
          label={`${t('Location')}`}
          name='location_ar'
          type='text'
          placeholder={`${t('Location')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        /> 

        {/* <BaseInputField
          id='name'
          label={`${t('Email Ar')}`}
          name='email_ar'
          type='text'
          placeholder={`${t('Email Ar')}`}
          labelProps={{ className: 'mb-1' }}
          className='mb-3'
          required
        />
        <BaseInputField
          id="name"
          label={`${t("Phone Number Ar")}`}
          name="Phone_Number_ar"
          type="text"
          placeholder={`${t("Phone Number Ar")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        <BaseInputField
          id="name"
          label={`${t("Whatsapp Phone")}`}
          name="whatsapp_phone_ar"
          type="text"
          placeholder={`${t("Whatsapp Phone Ar")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        /> */}
      </InnerFormLayout>
    </>
  )
};