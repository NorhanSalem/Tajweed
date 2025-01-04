import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../atoms/icons/prevpagination";
import ChatUserTable from "../../molecules/ChatUserTable";
import Paginate from "../../molecules/table/Paginate";
import { Table } from "../../organisms/tantable/Table";
import TransferRevenueModal from "./TranseferRevenueModal";
import { notify } from "../../../utils/toast";

export type TeachersFinances = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type TeachersFinances_TP = {
  title: string;
};

function TeachersFinances({ title }: TeachersFinances_TP) {
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [yearValue, setYearValue] = useState(currentYear.toString());
  const [monthValue, setMonthValue] = useState(currentMonth.toString());

  const cols = useMemo<ColumnDef<TeachersFinances>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "teacher_id",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.name}
            </Link>
          </div>
        ),
        accessorKey: "name",
      },
      {
        header: `${t("Teacher Chat")}`,
        cell: (info) => <ChatUserTable id={info.row.original?.id} />,
        accessorKey: "chat",
      },
      {
        header: `${t("Available balance")}`,
        cell: (info) => (
          <div
            className="cursor-pointer border p-1 border-dashed rounded-md border-mainBlue"
            onClick={() => {
              setIsOpen(true);
              setData(info.row?.original);
            }}
          >
            {info.row?.original?.available_balance}
          </div>
        ),
        accessorKey: "available_balance",
      },
      {
        header: `${t("Available balance By Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "available_balance_by_date",
      },
      {
        header: `${t("Latest WithDraw By Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "latest_withdraw_by_date",
      },
      {
        header: `${t("Pending Balance")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "pending_balance",
      },
      {
        header: `${t("Teachers' Finances")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "available_balance",
      },
      {
        header: `${t("Delayed balance")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "delayed_balance",
      },
      {
        header: `${t("All Withdraws")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "all_withdraws",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
    balance_year: yearValue,
    balance_month: monthValue,
  };

  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `dashboard/teachers/finances?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    isFetching,
    refetch,
    data: TeachersFinancesData,
    isRefetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  // useEffect(() => {
  //   if (isSuccess && TeachersFinancesData?.status === true) {
  //     notify(
  //       "success",
  //       TeachersFinancesData?.message || t("Request executed successfully")
  //     );
  //     console.log("success");
  //   } else if (isSuccess && TeachersFinancesData?.status === false) {
  //     notify(
  //       "error",
  //       TeachersFinancesData?.message || t("Something went wrong")
  //     );
  //   } else if (error) {
  //     console.log("error");
  //     notify("error", error?.message || t("Something went wrong"));
  //   }
  // }, [isSuccess, error, TeachersFinancesData]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="home-cards rounded-xl col-span-12 p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0  mb-10">
            <div className="flex justify-between p-2">
              <p>{t("Total salaries")}</p>
              <p>{TeachersFinancesData?.availableBalances}</p>
            </div>
            <div className="flex justify-between p-2">
              <p>{t("Total discount")}</p>
              <p>{TeachersFinancesData?.delayedBalances}</p>
            </div>
            <div className="flex justify-between p-2">
              <p>{t("pending Balances")}</p>
              <p>{TeachersFinancesData?.pendingBalances}</p>
            </div>
            <div className="flex justify-between p-2">
              <p>{t("total transfer current month")}</p>
              <p>{TeachersFinancesData?.totalTransfersByDate}</p>
            </div>
            <div className="flex justify-between p-2">
              <p>{t("total Transfers")}</p>
              <p>{TeachersFinancesData?.totalTransfer}</p>
            </div>
          </div>
          <div className="col-span-12">
            <Table
              data={TeachersFinancesData?.data?.teachers || []}
              showNavigation
              columns={cols || []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              isFetching={isFetching}
              setWord={setWord}
              setMonthValue={setMonthValue}
              setYearValue={setYearValue}
              setPagePagination={setPagePagination}
            />
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={TeachersFinancesData?.data?.paginate.total_pages}
                previousLabel={<Prevpagination />}
                nextLabel={<NextPaginationIc />}
                onPageChange={handlePageChange}
                initialPage={page}
              />
            </div>
          </div>
          <TransferRevenueModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            data={data}
            refetch={refetch}
          />
        </div>
      </div>
    </>
  );
}

export default TeachersFinances;
