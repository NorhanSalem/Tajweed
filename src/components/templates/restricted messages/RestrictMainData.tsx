// IMPORTS
import { Radio } from "@mantine/core";
import { FieldArray, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { SvgDelete } from "../../atoms/icons/SvgDelete";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import { Key } from "react";
import BaseInputRepeater from "../../molecules/formik-fields/BaseInputRepeater";

export const RestrictMainData = ({ resetForm }: any) => {
  const { setFieldValue, values } = useFormikContext<any>();
  console.log("🚀 ~ RestrictMainData ~ values:", values)
  const { t } = useTranslation();

  return (
    <InnerFormLayout title={t("Add")} showpopuptitle scroll>
      <FieldArray name="restricts">
        {({ push, remove }) => (
          <div className="grid grid-cols-12 col-span-12  gap-4 relative">
            {values.restricts?.map(
              (item: any, index: Key | null | undefined) => (
                <div className="col-span-10 flex gap-3" key={index}>
                  <BaseInputRepeater
                    id={`restrict-${index}`}
                    label={`${t("word")}`}
                    name={`restricts[${index}].restrict`}
                    type="text"
                    placeholder={`${t("word")}`}
                    value={item.restrict}
                    required
                    onChange={(e) =>
                     
                      setFieldValue(
                        `restricts[${index}].restrict`,
                        e.target.value
                      )
                    }
                  />
                  <div className="flex gap-4 mantine-radio-style flex-col">
                    <label>{t("activation status")}</label>
                    <div className="flex gap-5 mantine-radio-style">
                      <Radio
                        checked={item.active == 1}
                        label={t("active")}
                        onChange={(value) =>
                          setFieldValue(`restricts[${index}].active`, 1)
                        }
                      />
                      <Radio
                        checked={item.active == 0}
                        label={t("notactive")}
                        onChange={(value) =>
                          setFieldValue(`restricts[${index}].active`, 0)
                        }
                      />
                    </div>
                  </div>
                  {values.restricts.length > 1 && (
                    <button
                      type="button"
                      className="mt-[35px]"
                      onClick={() => remove(index)}
                    >
                      <SvgDelete stroke="red" />
                    </button>
                  )}
                </div>
              )
            )}
            {!resetForm ? (
              ""
            ) : (
              <div className="col-span-2 absolute top-0 left-1/2">
                <button
                  type="button"
                  className="w-8 h-8 bg-red-500 text-white rounded-md bg-primary"
                  onClick={() => push({ restrict: "", active: 1 })}
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </FieldArray>
    </InnerFormLayout>
  );
};
