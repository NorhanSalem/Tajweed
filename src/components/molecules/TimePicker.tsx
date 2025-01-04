import React, { useState } from "react";
import { IconClock } from "@tabler/icons-react";

type TimePickerProps = {
  label: string;
  name: string;
  onChange: (value: string) => void;
};

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 1; hour <= 12; hour++) {
    times.push(`${hour}:00`, `${hour}:30`);
  }
  return times;
};

const TimePicker: React.FC<TimePickerProps> = ({ label, name, onChange }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");
  const [isOpen, setIsOpen] = useState(false);

  const times = generateTimeOptions();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setIsOpen(false);
    onChange(`${selectedTime} ${period}`);
  };

  return (
    <div className="relative w-full">
      <label className="block mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-gray-300 rounded-md p-2 text-left flex items-center justify-between"
        >
          <span>
            {selectedTime ? `${selectedTime} ${selectedPeriod}` : "Select Time"}
          </span>
          <IconClock size={18} className="text-gray-500" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-md bg-white shadow-md">
            <div className="max-h-48 overflow-y-auto">
              {times.map((time) => (
                <div
                  key={time}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedTime === time ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </div>
              ))}
            </div>
            <div className="flex justify-between p-2 border-t border-gray-300">
              <button
                className={`w-1/2 p-2 text-center ${
                  selectedPeriod === "AM" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handlePeriodSelect("AM")}
              >
                AM
              </button>
              <button
                className={`w-1/2 p-2 text-center ${
                  selectedPeriod === "PM" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handlePeriodSelect("PM")}
              >
                PM
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
