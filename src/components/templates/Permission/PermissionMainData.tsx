import { t } from "i18next";
/////////// IMPORTS
///
///
/////////// Types
///
import { useFormikContext } from "formik";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import { AddPermission } from "./AddPermission";

/////////// HELPER VARIABLES & FUNCTIONS
///
type PermissionProps_TP = {
  permissions: PermissionGroup_TP[];
  editData: PermissionGroup_TP | undefined;
};
///
export const PermissionMainData = ({
  permissions,
  editData,
  showPermissions,
}: PermissionProps_TP) => {
  /////////// VARIABLES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  //   const { setFieldValue } = useFormikContext()
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  {
    [{}];
  }

  ///
  return (
    <InnerFormLayout layoutStyle={"my-8"} scroll={true}>
      <div className="col-span-1 p-4 sm:p-0">
        <BaseInputField
          placeholder={`${t("admin")}`}
          labelProps={{ className: "mb-5" }}
          type="text"
          id="name"
          label={`${t("name")}`}
          name="name"
        />
      </div>
      <div className="flex flex-col gap-1 col-span-4">
        <h4 className="flex items-center justify-center text-2xl underline  underline-offset-2 decoration-1 mb-5 dark:text-dark-textWhite">
          {t("Permissions")}
        </h4>

        <AddPermission
          // key={id}
          // name={name}
          permissions={permissions}
          editData={editData}
          showPermissions={showPermissions}
        />
      </div>
    </InnerFormLayout>
  );
};
