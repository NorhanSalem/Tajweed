/////////// IMPORTS
///
import { FormikSharedConfig, useFormikContext } from "formik";
import { t } from "i18next";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../molecules";
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const WalletMainData = ({
  updateData,
  setPhone_country,
  setPhoneCode,
  resetForm,
  hideHeader,
}: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const { setFieldValue, values } = useFormikContext<FormikSharedConfig>();

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
      <div>
        <InnerFormLayout
          showpopuptitle={hideHeader ? false : true}
          title={`${t("Add ")}`}
          // layoutStyle="p"
          // customStyle="p-4"
        >
          <div className="col-span-4">
            <BaseInputField
              id="name"
              label={`${t("Balance")}`}
              name="wallet"
              type="text"
              placeholder={`${t("Balance")}`}
              labelProps={{ className: "mb-1 " }}
              className="mb-3"
              required
            />
          </div>
          <div className="col-span-4">
            <TextAreaField
              label={`${t("Add reason")}`}
              name="reason"
              id="reason"
              placeholder={`${t("Add reason")}`}
              rows={3}
              // cols={10}
            />
          </div>
        </InnerFormLayout>
      </div>
    </>
  );
};
