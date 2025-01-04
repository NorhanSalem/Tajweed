import { Form, Formik } from "formik";
import { t } from "i18next";
import { DateRangePicker } from "materialui-daterange-picker";
import { useEffect, useState } from "react";
import { Select } from "..";
type DateRange_TP = {
  setDateFilter?: any;
  setMonth?: any;
  setYear?: any;
  setDay?: any;
};
export default function DateRange({
  setDateFilter,
  setMonth,
  setYear,
  setDay,
}: DateRange_TP) {
  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [open, setOpen] = useState(false);
  const currentDate = new Date();
  const scurrentYear = currentDate.getFullYear();
  const sday = currentDate.getDate();
  const currentYearEnd = new Date(currentDate.getFullYear(), 11, 31);
  const scurrentMonth = currentDate.getMonth() + 1;
  const [dateRange, setDateRange] = useState(
    `${sday} - ${scurrentMonth} - ${scurrentYear}`
  );
  const [valueDate, setValueDate] = useState(
    `${sday} - ${scurrentMonth} - ${scurrentYear}`
  );

  useEffect(() => {
    if (setMonth) {
      setMonth(scurrentMonth);
      setYear(scurrentYear);
      setDay(sday);
      setDateFilter(`${sday} - ${scurrentMonth} - ${scurrentYear}`);
    }
  }, [setDay, setMonth, setYear]);

  const toggle = () => setOpen(!open);

  const handleOptionChange = (option: any) => {
    if (option === "last-day") {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 1);
    } else if (option === "Day") {
      const currentDay = new Date();
    } else if (option === "last-week") {
      const currentDate = new Date();
      const lastWeekStart = new Date();
      lastWeekStart.setDate(currentDate.getDate() - 7);
    } else if (option === "current-month") {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const day = currentDate.getDate(); // Use getDate() for the day of the month

      setMonth(currentMonth);
      setYear(currentYear);
      setValueDate(`${day} - ${currentMonth} - ${currentYear}`); // Correct format for current month
    } else if (option === "last-month") {
      const currentDate = new Date();
      let lastMonth = currentDate.getMonth();
      const day = currentDate.getDay();
      const currentYear = currentDate.getFullYear();
      if (lastMonth === 0) {
        lastMonth = 12;
      }
      setMonth(lastMonth);
      setYear(
        lastMonth === 12
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear()
      );
      setValueDate(`${day} - ${lastMonth} - ${currentYear}`);
    } else if (option === "current-year") {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      let lastMonth = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      setYear(currentYear);
      setMonth(null);
    } else if (option === "limited-period") {
      setOpen(true);
    } else if (option === "all") {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      setMonth(null);
      setYear(null);
      setValueDate(`${day} - ${currentMonth} - ${currentYear}`);
    }
  };

  const optionDate = [
    // { label: `${t("Day")}`, value: "Day" },
    // { label: `${t("Last Day")}`, value: "last-day" },
    // { label: `${t("Last Week")}`, value: "last-week" },
    { label: `${t("current month")}`, value: "current-month" },
    { label: `${t("last Month")}`, value: "last-month" },
    { label: `${t("current year")}`, value: "current-year" },
    { label: `${t("All")}`, value: "all" },
    // { label: `${t("Limited Period")}`, value: "limited-period" },
  ];

  return (
    <Formik
      onSubmit={(values) => console.log(values)}
      initialValues={{ date_rang: "" }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <Select
              // label={`${t("date")}`}
              options={optionDate}
              name="date_rang"
              placeholder={`${valueDate}`}
              onChange={(option: any) => {
                console.log("sadasd", option);

                setFieldValue("date_rang", `${valueDate}`);
                handleOptionChange(option.value);
              }}
              //@ts-ignore
              value={valueDate}
            />
            {open && (
              <div className="DateRangePicker DateRangePickerHomePage dark:text-dark-textWhite">
                <DateRangePicker
                  open={open}
                  toggle={toggle}
                  onChange={(range: any) => {
                    setDateRange(range);
                    setFieldValue("date_rang", range);
                  }}
                />
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
