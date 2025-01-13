import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { tv } from "tailwind-variants";
import { useIsRTL } from "../../../hooks";
import { calculateAgeWithMonths } from "../../../utils/helpers";
import { FormikError, Label } from "../../atoms";

export default function DateInput2({
  labelProps,
  label,
  name,
  value,
  hiddenBirthDay,
}: {
  labelProps?: string;
  label: string;
  name: string;
  value?: Date;
  hiddenBirthDay?: boolean;
}) {
  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, index) => 1950 + index
  );

  const { setFieldValue, errors, touched, handleBlur, values } =
    useFormikContext<{
      [key: string]: any;
    }>();
  const isRTl = useIsRTL();

  const months = [
    t("January"),
    t("February"),
    t("March"),
    t("April"),
    t("May"),
    t("June"),
    t("July"),
    t("August"),
    t("September"),
    t("October"),
    t("November"),
    t("December"),
  ];

  const dateInputField = tv({
    base: "direction-rtl",
    variants: {
      active: {
        true: "!rounded-md !border-2 !border-mainGreen !ring-0",
      },
      error: {
        true: "!rounded-md !border-2 !border-mainRed",
      },
    },
  });

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: any) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
      className="items-center "
    >
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className=" bg-mainBlue text-white  rounded-full flex justify-center items-center mx-1"
      >
        {isRTl ? (
          <MdOutlineKeyboardArrowRight className="text-[25px]" />
        ) : (
          <MdKeyboardArrowLeft className="text-[25px]" />
        )}
      </button>
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className=" bg-mainBlue text-white  rounded-full flex justify-center items-center mx-1"
      >
        {isRTl ? (
          <MdKeyboardArrowLeft className="text-[25px]" />
        ) : (
          <MdOutlineKeyboardArrowRight className="text-[25px]" />
        )}
      </button>
    </div>
  );

  const [dateActive, setDateActive] = useState(false);

  return (
    <div className="col-span-1 relative w-[50rem]">
      <div className="flex lg:flex-row flex-col gap-1 ">
        <div className="flex mb-3 items-center gap-2  w-[5rem]">
          <Label htmlFor={name} {...labelProps} className="text-sm">
            {label}
          </Label>
          {/* {!hiddenBirthDay && values[name] && (
            <p>({calculateAgeWithMonths(values[name])})</p>
          )} */}
        </div>
        <DatePicker
          selected={values[name] ? new Date(values[name]) : null}
          onChange={(date: Date) => {
            setFieldValue(name, date);
          }}
          onBlur={handleBlur(name)}
          className={dateInputField({
            active: dateActive,
            error: touched[name] && !!errors[name],
          })}
          onCalendarOpen={() => {
            setDateActive(true);
          }}
          onCalendarClose={() => {
            setDateActive(false);
          }}
          renderCustomHeader={CustomHeader}
          name={name}
          dateFormat="dd/MM/yyyy"
          isClearable={true}
          value={
            values[name] && !isNaN(Date.parse(values[name]))
              ? new Date(values[name]).toLocaleDateString()
              : new Date().toLocaleDateString()
          }
          customInput={
            <input
              style={{
                width: "100%", // Takes full available width
              }}
            />
          }
        ></DatePicker>
      </div>
      <FormikError name={name} />
    </div>
  );
}
