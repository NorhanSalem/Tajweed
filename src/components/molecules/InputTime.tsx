import { useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useState } from "react";
import { convertTo12HourFormat, createTimeOptions } from "../../utils/helpers";
import { OptionType, Select } from "./formik-fields";

interface InputTimeProps {}

const InputTime: FC<InputTimeProps> = () => {
  const { values, setFieldValue } = useFormikContext<{ time: string }>();
  const convertedTime = convertTo12HourFormat(values.time);

  const [period, setPeriod] = useState<string>(
    convertedTime.includes("م" || "PM") ? `${t("PM")}` : `${t("AM")}`
  );

  const timeOptions: OptionType[] = createTimeOptions(period).map((time) => ({
    value: time,
    label: time,
  }));

  const handleTimeChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setFieldValue("time", selectedOption.value);
    }
  };

  const handlePeriodChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value);
    }
  };
  console.log(timeOptions.find((option) => option.value).value.trim());
  console.log(convertedTime);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-10 rtl:text-start">
        <Select
          id="time"
          options={timeOptions}
          name="time"
          value={timeOptions.find((option) => option.value == convertedTime)}
          onChange={handleTimeChange}
          placeholder={`${t("Select time")}`}
        />
      </div>
      <div className="col-span-2 rtl:text-start">
        <Select
          id="period"
          name="period"
          value={{ value: period, label: t(period) }}
          onChange={handlePeriodChange}
          options={[
            { value: "AM", label: t("AM") },
            { value: "PM", label: t("PM") },
          ]}
          placeholder={`${t("AM/PM")}`}
        />
      </div>
    </div>
  );
};

export default InputTime;
