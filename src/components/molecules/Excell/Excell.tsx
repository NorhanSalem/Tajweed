import React, { useEffect, useRef, useState } from "react";
import ExcelIcon from "../../atoms/icons/Excell";
import { CSVLink } from "react-csv";
import { t } from "i18next";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ExcelFile.ExcelSheet;
// const ExcelColumn = ExcelFile.ExcelColumn;
export default function Excel({ data, column }: any) {
  const [dataToDownload, setDataToDownload] = useState([]);
  const csvLinkRef = useRef(null);

  useEffect(() => {
    if (data && column) {
      const columnNames = column.map((col: { accessorKey: any; }) => col.accessorKey);
      const filteredData = data.map((item: { [x: string]: any; hasOwnProperty: (arg0: any) => any; }) => {
        const filteredItem = {};
  
        columnNames.forEach((name: string) => {
          if (item.hasOwnProperty(name)) {
            filteredItem[name] = item[name];
          } else {
            let found = false;
            const searchDeep = (obj: { [x: string]: any; }) => {
              Object.keys(obj).forEach((key) => {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                  searchDeep(value);
                } else if (key === name) {
                  filteredItem[name] = value;
                  found = true;
                }
              });
            };
            searchDeep(item);
            if (!found) {
              filteredItem[name] = '-';
            }
          }
        });
  
        return filteredItem;
      });
  
      setDataToDownload(filteredData);
    }
  }, [data, column]);
  
  const handleExport = () => {
    csvLinkRef.current.link.click();
  };

  return (
    <div className="sm-b:w-full">
      <button
        onClick={handleExport}
        className="flex sm-b:w-full items-center justify-center  gap-2  border-none hover:!border-mainBlue text-[#3f4254] h-[28px] rounded-[5px] !py-[20px]"
      >
        <ExcelIcon />
        {/* {t('Export')} */}
      </button>
      <CSVLink
        data={dataToDownload}
        filename='data.csv'
        className='hidden'
        ref={csvLinkRef}
        target='_blank'
      />
   
    </div>
  );
}
