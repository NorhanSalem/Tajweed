import { useFormikContext } from "formik";
import { ChangeEvent, useEffect } from "react";
import { CheckBoxField } from "../../molecules";
import { Permission_TP } from "../../../context/auth-and-perm/auth-permissions-types";
import { Loading } from "../../organisms/Loading/Loading";

type AddPermissionProps_TP = {
  permissions: Permission_TP[];
  name: string;
  editData: AddPermission_TP | undefined;
  showPermissions: any;
};

export const AddPermission = ({
  name,
  permissions,
  editData,
  showPermissions,
}: AddPermissionProps_TP) => {
  const { setFieldValue, values } = useFormikContext();

  const handleCheckAll = (
    e: ChangeEvent<HTMLInputElement>,
    groupName: string,
    permissionSource: "showPermissions" | "permissions"
  ) => {
    const isChecked = e.target.checked;
    const group =
      permissionSource === "showPermissions"
        ? showPermissions?.data?.permissions.find((p) => p.name === groupName)
        : permissions.find((p) => p.name === groupName);

    if (group) {
      group.value.forEach((item) => {
        setFieldValue(item.value, isChecked);
      });
    }
  };

  const areAllChecked = (group: any) => {
    return group.value.every((item: any) => values[item.value]);
  };

  useEffect(() => {
    console.log("editData:", editData);
    console.log("showPermissions:", showPermissions);
  }, [editData, showPermissions]);

  const renderPermissionGroup = (
    { name, value }: any,
    permissionSource: "showPermissions" | "permissions"
  ) => (
    <div className="col-span-1" key={name}>
      <div className="bg-white m-5 rounded-xl dark:bg-dark-tertiary">
        <div className="shadow border rounded-xl p-3">
          <div>
            <div className="flex border-b-2 mb-4 items-center justify-between">
              <h2 className="p-1 dark:text-dark-textWhite">{name}</h2>
              <input
                className="border-gray-300 focus:outline-none shadow-none rounded h-5 w-5"
                type="checkbox"
                checked={areAllChecked({ name, value })}
                onChange={(e) => handleCheckAll(e, name, permissionSource)}
              />
            </div>
            {value.map((item: any) => (
              <CheckBoxField
                key={item.value}
                label={item.name}
                type="checkbox"
                id={item.value}
                name={item.value}
                checked={!!values[item.value]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(item.value, e.target.checked);
                }}
                editData={editData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionGroups = () => {
    if (editData) {
      return values?.name !== undefined ? (
        showPermissions?.data?.permissions?.map((group) =>
          renderPermissionGroup(group, "showPermissions")
        )
      ) : (
        <Loading />
      );
    } else {
      return permissions?.map((group) =>
        renderPermissionGroup(group, "permissions")
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {renderPermissionGroups()}
    </div>
  );
};
