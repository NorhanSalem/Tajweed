import { useFormikContext } from "formik";
import { t } from "i18next";
import { InnerFormLayout, Radio, TextAreaField } from "../../molecules";
import SelectStudent from "../../molecules/Select/SelectStudent";
import SelectTeacher from "../../molecules/Select/SelectTeacher";
import { DropFile } from "../../molecules/files/DropFile";

function MainDataSendMessageAllUser() {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div>
      <InnerFormLayout title={`${t("add Message")}`} showpopuptitle={true}>
        <div className="grid grid-cols-12 col-span-12 gap-5 ">
          <div className="flex gap-5 col-span-12 ">
            <Radio
              checked={values?.message_type === "text"}
              label={`${t("message")}`}
              name="message_type"
              id=""
              onChange={() => {
                setFieldValue("message_type", "text");
              }}
            />

            <Radio
              label={`${t("image")}`}
              checked={values?.message_type === "image"}
              name="message_type"
              id=""
              onChange={() => {
                setFieldValue("message_type", "image");
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectTeacher
              label={`${t("Teachers")}`}
              multi
              placeholder={`${t("Select")}`}
              name="teacher_ids"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectStudent
              label={`${t("Students")}`}
              placeholder={`${t("Select")}`}
              multi
              name="student_ids"
            />
          </div>
          {values.message_type == "text" && (
            <div className="col-span-12 md:col-span-6">
              <TextAreaField
                placeholder={`${t("message")}`}
                label={`${t("message")}`}
                id="message"
                name="message"
                rows={5}
              />
            </div>
          )}
          {values.message_type == "image" && (
            <div className="col-span-12 md:col-span-6">
              <h2 className="dark:text-white"> {`${t("image")}`}</h2>
              <DropFile name="file" setRemoved={true} />
            </div>
          )}
        </div>
      </InnerFormLayout>
    </div>
  );
}

export default MainDataSendMessageAllUser;
