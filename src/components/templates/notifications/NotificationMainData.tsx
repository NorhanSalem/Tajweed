import { useFormikContext } from "formik";
import { t } from "i18next";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../molecules";
import SelectRoles from "../../molecules/Select/SelectRoles";
import SelectStudent from "../../molecules/Select/SelectStudent";
import SelectTeacher from "../../molecules/Select/SelectTeacher";

export const NotificationMainData = () => {
  const { values, setFieldValue } = useFormikContext(); /////////// STATES

  return (
    <>
      <InnerFormLayout
        showpopuptitle={true}
        title={`${t("Add Notification")}`}
        customStyle={"block p-8 dark:bg-dark-tertiary"}
      >
        <div className="styleing-modal-info">
          <SelectRoles
            label={`${t("RolesName")}`}
            placeholder={`${t("Select")}`}
            multi
            RolesName="admins"
            onChange={(option) => {
              setFieldValue("admins", option);
            }}
          />
          <SelectTeacher
            label={`${t("Teachers")}`}
            multi
            placeholder={`${t("Select")}`}
            name="teachers"
          />
          <SelectStudent
            label={`${t("Students")}`}
            placeholder={`${t("Select")}`}
            multi
            name="students"
          />

          <BaseInputField
            id="title[ar]"
            label={`${t("Title Arabic")}`}
            name="title_ar"
            type="text"
            placeholder={`${t("Title Arabic")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />
          <BaseInputField
            id="title[en]"
            label={`${t("Title English")}`}
            name="title_en"
            type="text"
            placeholder={`${t("Title English")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />
          <div className="col-span-3">
            <TextAreaField
              label={`${t("content arabic")}`}
              name="data_ar"
              id="data_ar"
              placeholder={`${t("content arabic")}`}
              required
            />
          </div>
          <div className="col-span-3">
            <TextAreaField
              label={`${t("content english")}`}
              name="data_en"
              id="data_en"
              placeholder={`${t("content english")}`}
              required
            />
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
};
