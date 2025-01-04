import { rankItem } from "@tanstack/match-sorter-utils";
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import {
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { t } from "i18next";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import EditRequestStatusSelect from "../../../pages/teatcher/profile/edit-requests/EditRequestStatusSelect";
import { Header } from "../../atoms/Header";
import DateRange from "../../molecules/DateRange/DateRange";
import CustomeDateRange from "../../molecules/DateRange/CustomeRange";
import Excel from "../../molecules/Excell/Excell";
import FilterTable from "../../molecules/FilterTable/FilterTable";
import Print from "../../molecules/Print/Print";
import SelectCompensationsFilter from "../../molecules/Select/SelectCompensationsFilter";
import SelectCompleteProfile from "../../molecules/Select/SelectCompleteProfile";
import SelectCountryFilter from "../../molecules/Select/SelectCountryFilter";
import SelectGenderFilter from "../../molecules/Select/SelectGenderFilter";
import SelectInterviewStatusFilter from "../../molecules/Select/SelectInterviewStatusFilter";
import SelectSpecializationFilter from "../../molecules/Select/SelectSpecializationFilter";
import SelectStatus from "../../molecules/Select/SelectStatus";
import { Loading } from "../Loading/Loading";
import SelectCategoryBlogFilter from "../../molecules/Select/SelectCategoryBlogFilter";
import SelectYear from "../../molecules/Select/SelectYear";
import SelectMonth from "../../molecules/Select/SelectMonth";
import SelectSubscriptionFilter from "../../molecules/Select/SelectSubscriptionFilter";
import { downloadCSV } from "../../../utils/helpers";
import SelectPercentageCoupon from "../../molecules/Select/SelectPercentageCoupon";
import SelectCouponType from "../../molecules/Select/SelectCouponType";
import SelectSalariesType from "../../molecules/Select/SelectSalariesType";
import DateRangeIncoming from "../../molecules/DateRangeIncoming";
import ExcelExportButton from "../../molecules/ExcelExporter ";
import { useLocation } from "react-router-dom";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  setStatus?: Dispatch<SetStateAction<string>>;
  setDateFilter?: Dispatch<SetStateAction<SetStateAction<string>>>;
  setSpecializationFilter?: Dispatch<SetStateAction<string>>;
  setProfileCompleteFilter?: Dispatch<SetStateAction<string>>;
  setStatusFilter?: Dispatch<SetStateAction<string>>;
  setStatusZoomFilter?: Dispatch<SetStateAction<string>>;
  setInterViewStatus?: Dispatch<SetStateAction<string>>;
  setCountry?: Dispatch<SetStateAction<string>>;
  setRequestStatus?: Dispatch<SetStateAction<string>>;
  isSuccess?: boolean;
  requestStatus?: boolean;
  StatusStudent?: boolean;
  country?: boolean;
  setPagePagination: Dispatch<SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
  Specialization?: boolean;
  type?: boolean;
  ProfileComplete?: boolean;
  Status?: boolean;
  StatusZoom?: boolean;
  interViewStatus?: boolean;
  typeCompensations?: Dispatch<SetStateAction<string>>;
  setWord: Dispatch<SetStateAction<any>>;
  setTypeFilter?: Dispatch<SetStateAction<string>>;
  totalItemsData?: string;
  columnsToRemove: number[];
  setCategory_id?: any;
  setYearValue: any;
  setMonthValue: any;
  setSubscriptionValue: any;
  setPercentage?: any;
  setCouponType?: any;
  SetSalariesType?: any;
  setDateFilterIncoming?: any;
  dataExcell: any;
  customColumnExcell: any;
  setYear: any;
  setMonth: any;
  setDay: any;
}

export const Table = <T extends object>({
  data,
  columns,
  isSuccess,
  Status,
  interViewStatus,
  StatusStudent,
  setStatusFilter,
  setSpecializationFilter,
  setProfileCompleteFilter,
  setInterViewStatus,
  Specialization,
  totalItemsData,
  isLoading,
  ProfileComplete,
  setCountry,
  columnsToRemove,
  setSubscriptionValue,
  country,
  setPagePagination,
  setTypeFilter,
  setMonthValue,
  type,
  setWord,
  isFetching,
  setStatus,
  setDateFilter,
  setRequestStatus,
  setYearValue,
  setPercentage,
  SetSalariesType,
  typeCompensations,
  setCouponType,
  requestStatus,
  setCategory_id,
  setDateFilterIncoming,
  dataExcell,
  setDay,
  setMonth,
  setYear,
  customColumnExcell,
}: ReactTableProps<T>) => {
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const location = useLocation();

  const isSalariesRoute = location.pathname === "/hr/salaries";
  const table = useReactTable(
    {
      data,
      columns,
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      state: {
        globalFilter,
        sorting,
      },
      initialState: {
        pagination: {
          pageSize: 100,
        },
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),

      getPaginationRowModel: getPaginationRowModel(),
    },
    //@ts-ignore
    (hooks: { onPageChange: (({ rows }: { rows: any }) => void)[] }) => {
      hooks.onPageChange.push(({ rows }) => {
        setCurrentPageData(rows.map((row: { original: any }) => row.original));
      });
    }
  );

  useEffect(() => {
    // Assuming `table` is your table instance
    // This ensures we get the data from the current pagination state, after filtering and sorting
    const visibleRowsData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    setCurrentPageData(visibleRowsData);
  }, [table.getFilteredRowModel(), table.getState().pagination]);

  return (
    <>
      <div className=" hidden md:grid grid-cols-2 items-center sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2 sm:gap-y-4 md:gap-y-8 gap-y-8 mb-5">
        {StatusStudent && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 ">
            <FilterTable
              setStatus={setStatus}
              // label={`${t("Choose the status")}`}
            />
          </div>
        )}

        {setDateFilter && !isSalariesRoute && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <DateRange setDateFilter={setDateFilter} />
          </div>
        )}
        {isSalariesRoute && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CustomeDateRange
              setYear={setYear}
              setMonth={setMonth}
              setDateFilter={setDateFilter}
              setDay={setDay}
            />
          </div>
        )}
        {setDateFilterIncoming && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <DateRangeIncoming setDateFilterIncoming={setDateFilterIncoming} />
          </div>
        )}
        {setWord && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2 ">
            {/* <label className="mb-3 dark:text-white" htmlFor="">
              {`${t("search")}`}
            </label> */}
            <input
              id="search"
              name="search"
              type="text"
              className="!rounded-md !shadow-none !border-1 border-style 
                  false css-1h06qz8-control dark:!bg-[#151521]  dark:!text-white dark:!border-dark-borderDark  w-[100%]  h-[39.3px]"
              onChange={(e) => {
                setWord(e.target.value);
              }}
              placeholder={`${t("search")}`}
            />
          </div>
        )}
        {setPercentage && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <SelectPercentageCoupon setPercentage={setPercentage} />
          </div>
        )}
        {SetSalariesType && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <SelectSalariesType SetSalariesType={SetSalariesType} />
          </div>
        )}
        {setCouponType && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <SelectCouponType setCouponType={setCouponType} />
          </div>
        )}

        {setSubscriptionValue && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <SelectSubscriptionFilter
              setSubscriptionValue={setSubscriptionValue}
            />
          </div>
        )}

        {requestStatus && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <EditRequestStatusSelect setRequestStatus={setRequestStatus} />
          </div>
        )}

        {Specialization && (
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <SelectSpecializationFilter setStatus={setSpecializationFilter} />
          </div>
        )}
        {type && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectGenderFilter
              setStatus={setTypeFilter}
              placeholder={`${t("choose type")}`}
            />
          </div>
        )}
        {typeCompensations && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectCompensationsFilter
              setStatus={typeCompensations}
              placeholder={`${t("choose type")}`}
            />
          </div>
        )}

        {setCategory_id && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectCategoryBlogFilter setCategory_id={setCategory_id} />
          </div>
        )}

        {Status && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectStatus setStatus={setStatusFilter} />
          </div>
        )}
        {setYearValue && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectYear setYearValue={setYearValue} />
          </div>
        )}
        {setMonthValue && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectMonth setMonthValue={setMonthValue} />
          </div>
        )}
        {interViewStatus && (
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <SelectInterviewStatusFilter
              // label={`${t("interview status")}`}
              setStatus={setInterViewStatus}
              placeholder={`${t("interview status")}`}
            />
          </div>
        )}
        {ProfileComplete && (
          <div className="sm:col-span-1 md:col-span-2 xl:col-span-2">
            <SelectCompleteProfile setStatus={setProfileCompleteFilter} />
          </div>
        )}

        {country && (
          <div className="sm:col-span-1 md:col-span-2">
            <SelectCountryFilter setStatus={setCountry} />
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between  ">
          <div className="flex flex-row  sm:justify-between gap-4 items-end">
            <div className="flex gap-2 items-center">
              {/* <Excel data={currentPageData} column={columns} /> */}
              <ExcelExportButton
                data={dataExcell || []}
                columns={customColumnExcell}
              />
              <Print columnsToRemove={columnsToRemove} />
            </div>

            <div className="col-span-1 flex justify-end items-center">
              <div className="flex flex-col gap-1 w-max">
                {/* <Label className='mb-3'>العدد</Label> */}
                <select
                  className="!rounded-md mr-auto !shadow-none  border-style
                          false css-1h06qz8-control  dark:!bg-[#151521] dark:text-white dark:!border-dark-borderDark h-[39px] dark:!border-[2px] !w-[90px]"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    const pageSize = Number(e.target.value);
                    table.setPageSize(pageSize);
                    setPagePagination(pageSize);
                  }}
                >
                  {[
                    { key: 100, value: 100 },
                    { key: 200, value: 200 },
                    { key: 300, value: 300 },
                    { key: 400, value: 400 },
                    { key: 500, value: 500 },
                    { key: 600, value: 600 },
                    { key: 1000, value: 1000 },
                    // { key: "الكل", value: totalItemsData },
                  ].map((pageSize) => (
                    <option
                      key={pageSize.key}
                      value={pageSize.value}
                      className=" h-[10px]"
                    >
                      {pageSize.key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="GlobalTable w-full flex flex-col gap-4 mt-8 overflow-x-scroll overflow-y-hidden">
        {isLoading && <Loading />}
        {isFetching && <Loading />}

        <table id="print-table" className="min-w-full text-center">
          <thead className="border-b bg-mainBlue dark:!bg-dark-tertiary">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-sm font-medium text-white dark:!bg-dark-tertiary"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="table-sort-arrow">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isSuccess && !!data.length && (
            <tbody className="">
              {table?.getRowModel()?.rows?.map((row) => (
                <tr key={row.id} className="border-b !bg-white">
                  {row?.getVisibleCells()?.map((cell) => (
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 td-col-dark"
                      key={cell.id}
                      style={{
                        background: !!row.original.is_free_session
                          ? "#F4FFFA"
                          : "",
                      }}
                    >
                      {flexRender(
                        cell?.column?.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isSuccess && !!!data?.length && !!!isLoading && !!!isFetching && (
          <div className="mb-5 pr-5">
            <Header
              header={t("nothing")}
              className="text-center text-2xl font-bold dark:text-white"
            />
          </div>
        )}
      </div>
    </>
  );
};
