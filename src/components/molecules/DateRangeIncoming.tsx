import { Form, Formik } from "formik";
import { DateRangePicker } from "materialui-daterange-picker";
import { useState, useEffect, useCallback } from "react";
import { SelectOption_TP } from "../../types";
import { Select } from "./formik-fields";
import { t } from "i18next";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  setDateFilterIncoming?: (date: string) => void;
}

const DateRangeIncoming: React.FC<DateRangePickerProps> = ({
  setDateFilterIncoming,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  // Utility function for formatting date
  const formatDate = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }, []);

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().getFullYear() - 1, 0, 2),
    endDate: new Date(new Date().getFullYear(), 11, 31),
  });

  const [valueDate, setValueDate] = useState<string>(
    `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
  );

  // Update parent component or context with the new date range
  useEffect(() => {
    const formattedDateRange = `${formatDate(
      dateRange.startDate
    )} - ${formatDate(dateRange.endDate)}`;
    setValueDate(formattedDateRange);
    if (setDateFilterIncoming) {
      setDateFilterIncoming(formattedDateRange);
    }
  }, [dateRange, setDateFilterIncoming, formatDate]);

  // Toggles the date range picker visibility
  const toggle = () => setOpen(!open);

  // Array of options for the Select component
  const optionDate: SelectOption_TP[] = [
    { label: t("Today"), value: "today" },
    { label: t("Tomorrow"), value: "tomorrow" },
    { label: t("Next Week"), value: "next-week" },
    { label: t("Next Month"), value: "next-month" },
    { label: t("Next Year"), value: "next-year" },
    // Add other options as needed
  ];

  const handleOptionChange = useCallback((option: string) => {
    const currentDate = new Date();
    switch (option) {
      case "today":
        setDateRange({ startDate: currentDate, endDate: currentDate });
        break;
      case "tomorrow":
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDateRange({ startDate: tomorrow, endDate: tomorrow });
        break;
      case "next-week":
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setDateRange({ startDate: currentDate, endDate: nextWeek });
        break;
      case "next-month":
        const nextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        setDateRange({ startDate: currentDate, endDate: nextMonth });
        break;
      case "next-year":
        const nextYear = new Date(currentDate.getFullYear() + 1, 0, 0);
        setDateRange({ startDate: currentDate, endDate: nextYear });
        break;
      default:
        console.warn("Unhandled option:", option);
    }
  }, []);

  return (
    <Formik
      initialValues={{ dateRange: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ setFieldValue }) => (
        <Form>
          <Select
            // label={`${t("Date")}`}
            options={optionDate}
            name="dateRange"
            placeholder={valueDate}
            onChange={(option: SelectOption_TP) => {
              handleOptionChange(option.value);
              setFieldValue("dateRange", valueDate);
            }}
            value={valueDate}
          />
          {open && (
            <DateRangePicker
              open={open}
              toggle={toggle}
              onChange={(range: DateRange) => {
                setDateRange(range);
                setFieldValue(
                  "dateRange",
                  `${formatDate(range.startDate)} - ${formatDate(
                    range.endDate
                  )}`
                );
              }}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DateRangeIncoming;
