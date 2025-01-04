/////////// IMPORTS
///
import { t } from "i18next";
import { BaseInputField, InnerFormLayout } from "../../../molecules";
import PhoneInput2 from "../../../molecules/phone-input/PhoneInput2";
import SelectPermission from "../../../molecules/Select/SelectPermission";
import { FormikSharedConfig, useFormikContext } from "formik";

export const UserMainData = ({ resetForm }: any) => {
  const { setFieldValue } = useFormikContext<FormikSharedConfig>();

  return (
    <>
      <InnerFormLayout
        title={resetForm ? `${t("Add Manger")}` : t("Edit")}
        showpopuptitle={true}
        scroll={true}
      >
        <BaseInputField
          id="name"
          label={`${t("Name")}`}
          name="name"
          type="text"
          placeholder={`${t("Name")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3 input-style-maining"
          labelStyle="mb-4"
          required
        />
        <PhoneInput2 label={`${t("mobile number")}`} name="phone" />
        <BaseInputField
          id="name"
          label={`${t("Email")}`}
          name="email"
          type="email"
          placeholder={`${t("Email")}`}
          labelProps={{ className: "mb-1" }}
          labelStyle="mb-4"
          className="mb-3 input-style-maining"
          required
        />
        <SelectPermission
          label={`${t("permission")}`}
          PermissionName="role_id"
          onChange={(option) => {
            setFieldValue("role_id", option.value);
          }}
        />

        <BaseInputField
          id="name"
          label={`${t("password")}`}
          name="password"
          type="password"
          placeholder={`${t("password")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3 input-style-maining "
          labelStyle="mb-4"
          required
        />
        <BaseInputField
          id="passwordConfirm"
          label={`${t("Password Confirm")}`}
          name="password_confirmation"
          type="password"
          placeholder={`${t("Password Confirm")}`}
          labelProps={{ className: "mb-1" }}
          labelStyle="mb-4"
          className="mb-3 input-style-maining"
          required
        />
      </InnerFormLayout>
    </>
  );
};
