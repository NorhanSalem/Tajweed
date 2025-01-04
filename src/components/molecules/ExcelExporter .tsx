import React from "react";
import * as XLSX from "xlsx";
import { BsFileExcel } from "react-icons/bs";
import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ExcelIcon from "../atoms/icons/Excell";

interface Column {
  accessorKey: string;
  header: string;
}

interface Props {
  data: any[];
  columns: Column[];
}

const ExcelExportButton: React.FC<Props> = ({ data, columns }) => {
  console.log("🚀 ~ columns:", columns);
  const { t } = useTranslation();

  const exportToExcel = () => {
    const filteredColumns = columns?.filter(
      (column) => column.accessorKey !== "actions"
    );
    const sheetData = prepareSheetData(data, filteredColumns);
    exportDataToExcel(sheetData);
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    } else if (typeof value == "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  const prepareSheetData = (data: any[], filteredColumns: Column[]) => {
    const values = data.map((row) => {
      const activeStatus = row.hasOwnProperty("status")
        ? row["status"] === 1
          ? t("Active")
          : t("Not Active")
        : "";

      return filteredColumns.map((column) => {
        if (column.accessorKey === "status") {
          return activeStatus;
        } else if (column.accessorKey === "type") {
          return row.hasOwnProperty("type")
            ? row["type"] === 1
              ? "percentage"
              : "fixed"
            : "";
        } else {
          const cellValue = row.hasOwnProperty(column.accessorKey)
            ? row[column.accessorKey]
            : "";
          return formatValue(cellValue);
        }
      });
    });

    return [
      filteredColumns?.map((column) => column.header), // Headers
      ...values, // Values
    ];
  };

  const exportDataToExcel = (sheetData: any[][]) => {
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
    XLSX.writeFile(wb, "tableData.xlsx");
  };

  return (
    <div onClick={exportToExcel} className=" cursor-pointer ">
      <ExcelIcon />
    </div>
  );
};

export default ExcelExportButton;
