import { t } from "i18next";
import { CFile_TP } from "../types";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { Dispatch, SetStateAction } from "react";
import { CountryPhoneCodes } from "../../public/countries/country-phone-code";

//  PDF OR IMAGE
type pdfOrImageReturn = "pdf" | "image" | "unknown";
export const pdfOrImage = (file: CFile_TP): pdfOrImageReturn => {
  const pdfWordOccurrence = file.type.indexOf("pdf");
  const imageWordOccurrence = file.type.indexOf("image");
  if (pdfWordOccurrence !== -1) {
    return "pdf";
  } else if (imageWordOccurrence !== -1) {
    return "image";
  } else {
    return "unknown";
  }
};

// translate
export const link = () =>
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
export const Must_be_only_number = () => `${t("Must be only number")}`;
export const Enter_correct_url = () => `${t("Enter correct url!")}`;
export const requiredTranslation = () => `${t("required")}`;

export const pagePaginate = 100;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
export type OptionType = {
  value: number;
  label: string;
};
export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  options: any
) => {
  await sleep(1000);

  let filteredOptions: OptionType[];
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }: any) =>
      label.toLowerCase().includes(searchLower)
    );
  }

  const hasMore = filteredOptions.length > prevOptions.length + 10;
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + 10
  );

  return {
    options: slicedOptions,
    hasMore,
  };
};

// delete string spaces
export const deleteSpaces = (str: string) => str.replace(/\s+/g, "");

export function getIDfromURL(url: any) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

  const match = url?.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return "";
}

export const indexTable = (index: any, page: any) => {
  return index + 1 + Math.abs(page - 1) * pagePaginate;
};

export const formatPhoneNumber = (phoneCode: string, phone: string): string => {
  const dial_code =
    CountryPhoneCodes.find(
      (country) => phoneCode?.toLowerCase() == country.code.toLowerCase()
    )?.dial_code || "";
  return `${dial_code}${phone}`;
};

export function convertTo24Hour(timeString: any) {
  const match = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) {
    return timeString; // or throw new Error("Invalid time format");
  }
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = match[3].toUpperCase();

  if (ampm === "AM" && hours == 12) {
    hours = 0;
  } else if (ampm === "PM" && hours < 12) {
    hours += 12;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

export function downloadCSV(data, filename) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(",")); // Add header row

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function convertTimeTo12HourFormat(time: string) {
  // Split the time into hours, minutes, and seconds
  var timeParts = time.split(":");
  var hours = parseInt(timeParts[0], 10);
  var minutes = timeParts[1];
  var seconds = timeParts[2];

  // Determine AM or PM
  var period = hours >= 12 ? t("PM") : t("AM");

  // Convert to 12-hour format
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours == 0 ? 12 : hours; // If hours is 0, set it to 12

  // Return the formatted time
  return hours + ":" + minutes + " " + period;
}



export function formatTextWithBreaks(text, wordLimit = 50) {
  const words = text.split(" "); // Split the text into individual words.
  let formattedText = "";

  // Loop through the words and add a <br> tag after every `wordLimit` words.
  for (let i = 0; i < words.length; i += wordLimit) {
    if (i > 0) formattedText += "<br>"; // Add a break tag before every chunk except the first.
    formattedText += words.slice(i, i + wordLimit).join(" ");
  }

  return formattedText;
}
// Function to calculate age in years and months from a birthday string
export function calculateAgeWithMonths(birthday: string | number | Date) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
  }
  if (today.getDate() < birthDate.getDate()) {
      months--;
  }
  if (months < 0) {
      months += 12;
  }

  return `${years} سنه و${months} شهور`;
}



export function createTimeOptions(period) {
  const times = [];
  for (let hour = 1; hour <= 12; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    times.push(`${formattedHour}:00 ${period}`, `${formattedHour}:30 ${period}`);
  }
  return times;
}

export const convertTo12HourFormat = (time24: string): string => {
  const [hours, minutes] = time24.split(':');
  const hoursInt = parseInt(hours, 10);
  const isPM = hoursInt >= 12;
  const period = isPM ? t("PM") : t("AM"); 
  const hours12 = ((hoursInt + 11) % 12 + 1);
  const formattedHours = hours12 < 10 ? `0${hours12}` : `${hours12}`;
  return `${period} ${formattedHours}:${minutes}`; 
};
