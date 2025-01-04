import { Form, Formik } from "formik";
import { t } from "i18next";
import { DateRangePicker } from "materialui-daterange-picker";
import { useEffect, useState } from "react";
import { Select } from "..";
type DateRange_TP = {
  setDateFilter?: any;
};
export default function DateRange({ setDateFilter }: DateRange_TP) {
  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [open, setOpen] = useState(false);
  const currentDate = new Date();

  const currentYearEnd = new Date(currentDate.getFullYear(), 11, 31);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(currentDate.getFullYear() - 1, 0, 2),
    endDate: currentYearEnd,
  });
  const [valueDate, setValueDate] = useState(
    `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
  );

  setDateFilter(valueDate);

  useEffect(() => {
    setValueDate(
      `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
    );
  }, [dateRange]);

  const toggle = () => setOpen(!open);

  const handleOptionChange = (option: any) => {
    if (option === "last-day") {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 1);
      setDateRange({ startDate: lastDay, endDate: lastDay });
    } else if (option === "Day") {
      const currentDay = new Date();
      setDateRange({ startDate: currentDay, endDate: currentDay });
    } else if (option === "last-week") {
      const currentDate = new Date();
      const lastWeekStart = new Date();
      lastWeekStart.setDate(currentDate.getDate() - 7);
      setDateRange({
        startDate: lastWeekStart,
        endDate: currentDate,
      });
    } else if (option === "current-month") {
      const currentDate = new Date();
      const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const nextMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
      const lastDayOfCurrentMonth = new Date(nextMonthStart - 1);
      setDateRange({
        startDate: currentMonthStart,
        endDate: lastDayOfCurrentMonth,
      });
    } else if (option === "last-month") {
      const currentDate = new Date();
      const lastMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const lastMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      setDateRange({
        startDate: lastMonthStart,
        endDate: lastMonthEnd,
      });
    } else if (option === "current-year") {
      const currentDate = new Date();
      const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);
      const nextYearStart = new Date(currentDate.getFullYear() + 1, 0, 1);
      const lastDayOfCurrentYear = new Date(nextYearStart - 1);

      setDateRange({
        startDate: currentYearStart,
        endDate: lastDayOfCurrentYear,
      });
    } else if (option === "limited-period") {
      setOpen(true);
    } else if (option === "all") {
      const currentDate = new Date();
      const lastYearStart = new Date(currentDate.getFullYear() - 1, 0, 2);
      const lastYearEnd = new Date(currentDate.getFullYear() - 1, 11, 31);
      setDateRange({
        startDate: lastYearStart,
        endDate: currentDate,
      });
    }
  };

  const optionDate = [
    { label: `${t("Today")}`, value: "Day" },
    { label: `${t("Yesterday")}`, value: "last-day" },
    { label: `${t("Last Week")}`, value: "last-week" },
    { label: `${t("Current Month")}`, value: "current-month" },
    { label: `${t("Last Month")}`, value: "last-month" },
    { label: `${t("Current Year")}`, value: "current-year" },
    { label: `${t("All")}`, value: "all" },
    { label: `${t("Limited Period")}`, value: "limited-period" },
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
                    setFieldValue(
                      "date_rang",
                      `${formatDate(range.startDate)} - ${formatDate(
                        range.endDate
                      )}`
                    );
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
