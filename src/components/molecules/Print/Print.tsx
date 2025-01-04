import React from "react";
import { BsFillPrinterFill } from "react-icons/bs";

interface PrintProps {
  columnsToRemove: number[];
}

const Print: React.FC<PrintProps> = ({ columnsToRemove=[]  }) => {
  const handleExportPrint = () => {
    //@ts-ignore
    const table = document.getElementById("print-table").cloneNode(true);

    // Remove the specified columns (cells) from the cloned table
    //@ts-ignore

    const rows = table.querySelectorAll("tr");
    rows.forEach((row: any) => {
      const cells = row.querySelectorAll("td, th");
      columnsToRemove.forEach((colIndex) => {
        if (cells.length > colIndex) {
          cells[colIndex].remove();
        }
      });
    });

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head dir='rtl'>
            <title>Print</title>
            <style>
              /* Add any desired CSS styles for printing */
              @media print {
                #print-table {
                  display: block !important;
                  direction: rtl;
                }
                td {
                  border: 1px solid #e5e7eb !important;
                }
              }
              #print-table {
                direction: rtl;
              }
              th {
                background: #021268;
                padding: 5px;
                color: white;
                border: 2px solid black;

              }
              tr{
                border: 2px solid black !important;

              }
              td {
                border: 2px solid black !important;
                text-align:center; 
                padding:0 10px 


              }
            </style>
          </head>
          <body>
            <div id="print-table" style="direction: rtl;">
            ${
              //@ts-ignore
              table?.outerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
      }, 1000); // Adjust the delay as needed
    }
  };

  return (
    <div className="sm-b:w-full">
      <div className="flex items-center sm-b:w-full">
        <button
          onClick={handleExportPrint}
          className="flex sm-b:w-full items-center justify-center gap-2 border-none text-[#3f4254] h-[28px] !py-[20px]"
        >
          <BsFillPrinterFill className="text-mainBlue dark:text-white w-5 h-5" />
          {/* {t('Print')} */}
        </button>
      </div>
    </div>
  );
};

export default Print;
