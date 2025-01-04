/////////// IMPORTS
///
import { useFormikContext } from "formik";
import { t } from "i18next";
import randomstring from "random-string";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import SelectCouponType from "../../molecules/Select/SelectCouponType";
import SelectDiscountType from "../../molecules/Select/SelectDiscountType";
import DateInput2 from "../../molecules/formik-fields/DateInput2";
import SelectTypeCoupon from "../../molecules/Select/SelectTypeCoupon";


///
export const CouponMainData = ({
  updateData,
  resetForm,
  openInput,
  setOpenInput,
}: any) => {

  const { setFieldValue } = useFormikContext(); /////////// STATES

  return (
    <>
      <InnerFormLayout title={"إضافة كوبون"} showpopuptitle={true}>
        <div className="flex items-end gap-2">
          <div className="grow">
            <BaseInputField
              id="name"
              label={`${t("Coupon Code")}`}
              name="coupon"
              type="text"
              placeholder={`${t("Coupon Code")}`}
              labelProps={{ className: "mb-1" }}
              className="grow"
              required
            />
          </div>
          <button
            className="rounded bg-gray-200 p-2 font-12"
            type="button"
            onClick={() =>
              setFieldValue("coupon", randomstring({ length: 15 }))
            }
          >
            {t("create a coupon")}
          </button>
        </div>

        <SelectTypeCoupon
          name="coupon_type"
          label={`${t("Coupon Type")}`}
          placeholder={`${t("Choose Coupon Type")}`}
          onChange={(option) => {
            setFieldValue("coupon_type", option.value);
          }}
        />

        <SelectDiscountType
          label={t("Discount type")}
          placeholder={`${t("Choose Discount type")}`}
          TypeName="Type"
          multi={false}
          resetForm={resetForm}
          updateData={updateData}
          onChange={(option) => {
            setFieldValue("is_percentage", option.value);
            setOpenInput(option?.value);
          }}
        />
        {openInput === 1 && (
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <DateInput2 label={t("start date")} name="start_date" hiddenBirthDay />
            </div>
            <div className="col-span-1">
              <DateInput2 label={t("end date")} name="end_date" hiddenBirthDay />
            </div>
          </div>
        )}

        <BaseInputField
          id="discount"
          label={`${t("Discount")}`}
          name="discount"
          type="text"
          placeholder={`${t("Discount")}`}
          labelProps={{ className: "mb-1" }}
          required
        />

        <BaseInputField
          id="title[en]"
          label={`${t("Max Used")}`}
          name="max_used"
          type="text"
          placeholder={`${t("Max Used")}`}
          labelProps={{ className: "mb-1" }}
          className="mb-3"
          required
        />
        {/* <SelectCountry
          CountryName="country"
          label={`${t("country")}`}
          placeholder={`${t("Select country")}`}
        />
        <SelectNationality
          NationalityName="country"
          label={`${t("Nationality")}`}
          placeholder={`${t("Select Nationality")}`}
        /> */}
      </InnerFormLayout>
    </>
  );
};
