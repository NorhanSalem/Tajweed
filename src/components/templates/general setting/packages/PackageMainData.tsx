/////////// IMPORTS
///
import { t } from "i18next";
import React, { useState } from "react";
import { BaseInputField, InnerFormLayout, Radio } from "../../../molecules";
import { useFormikContext } from "formik";
import SelectPackageType from "../../../molecules/Select/SelectPackageType";
import SelectRecurring from "../../../molecules/Select/SelectRecurring";

export const PackageMainData = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { setFieldValue, values } = useFormikContext();

  const handlePackageTypeChange = (value) => {
    setSelectedValue(value); // Update state with the selected value
    setFieldValue("package_type", value); // Set form field value if needed
  };
  return (
    <>
      <InnerFormLayout
        title={`${t("Add Package")}`}
        showpopuptitle={true}
        scroll={true}
      >
        <Radio
          checked={values?.popular == 1}
          label={`${t("Popular")}`}
          name="popular"
          id=""
          onChange={() => {
            setFieldValue("popular", 1);
          }}
        />

        <Radio
          label={`${t("Unpopular")}`}
          checked={values?.popular == 0}
          name="popular"
          id=""
          onChange={() => {
            setFieldValue("popular", 0);
          }}
        />
        <div className="lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-5 col-span-3  grid">
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
            labelProps={{ className: "mb-1 " }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="sessions"
            label={`${t("Classes")}`}
            name="sessions"
            type="text"
            placeholder={`${t("Classes")}`}
            labelProps={{ className: "mb-1 mt-0" }}
            className="mb-3"
            required
          />

          <BaseInputField
            id="package_duration"
            label={`${t("Package Duration")}`}
            name="package_duration"
            type="text"
            placeholder={`${t("Package Duration")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-3"
            required
          />
          <BaseInputField
            id="price"
            label={`${t("Price")}`}
            name="price"
            type="text"
            placeholder={`${t("Price")}`}
            labelProps={{ className: "mb-1" }}
            className=""
            required
          />
          <BaseInputField
            id="price_en"
            label={`${t("Old price")}`}
            name="old_price"
            type="text"
            placeholder={`${t("Old price")}`}
            labelProps={{ className: "mb-1" }}
            className="mb-0"
            required
          />
          <SelectPackageType
            name="package_type"
            label={`${t("Package type")}`}
            placeholder={`${t("Package type")}`}
            onChange={(e) => handlePackageTypeChange(e.value)}
            style="lg:w-[17rem] md:w-[21rem]"
            labelStyle=" flex-col"
          />

          {/* Conditionally Render Additional Inputs */}
          {selectedValue === "recurring" && (
            <>
              {/* Input */}
              <BaseInputField
                id="every-input"
                label={`${t("every")}`}
                name="every-input"
                type="text"
                labelProps={{ className: "mb-1" }}
                className=" md:w-[21rem] lg:w-[17rem]"
                labelStyle="mt-4"
              />

              {/* Select */}

              <SelectRecurring
                name="Select_recurring"
                label={`${t("  ")}`}
                placeholder={`${t("select")}`}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </>
          )}
        </div>
      </InnerFormLayout>
    </>
  );
};
