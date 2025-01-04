import { t } from "i18next";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../molecules";
import { DropFile } from "../../molecules/files/DropFile";
import { useFormikContext } from "formik";

function CategoryMainData({
  hideHeader,
  setRemoved,
  updateData,
  resetForm,
}: any) {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <>
      <InnerFormLayout
        title={`${t("Add")}`}
        showpopuptitle={hideHeader ? false : true}
        customStyle={hideHeader ? "max-h-[auto]" : ""}
      >
        <div className="col-span-12 gap-3 grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <BaseInputField
              id="name"
              label={`${t("Title Arabic")}`}
              name="name_ar"
              type="text"
              placeholder={`${t("Title Arabic")}`}
              labelProps={{ className: "mb-1" }}
              className=" input-style-maining "
              required
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <BaseInputField
              id="email"
              label={`${t("Title English")}`}
              name="name_en"
              type="text"
              placeholder={`${t("Title English")}`}
              labelProps={{ className: "mb-1" }}
              className="input-style-maining "
              required
            />
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
}

export default CategoryMainData;
