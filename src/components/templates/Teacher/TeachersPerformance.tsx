import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../atoms/icons/prevpagination";
import Paginate from "../../molecules/table/Paginate";
import { Table } from "../../organisms/tantable/Table";
import ChatUserTable from "../../molecules/ChatUserTable";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export type TeachersPerformance = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type TeachersPerformance_TP = {
  title: string;
};

function TeachersPerformance({ title }: TeachersPerformance_TP) {
  const [page, setPage] = useState(0);
  const [word, setWord] = useState();
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<TeachersPerformance>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info: any) => (
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
        header: `${t("Total Subscriptions")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_subscriptions",
      },

      {
        header: `${t("Total classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_sessions",
      },
      {
        header: `${t("Successful Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_succeeded_sessions",
      },
      {
        header: `${t("Total Pending Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_pending_sessions",
      },
      {
        header: `${t("Total Expired Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_expired_sessions",
      },
      {
        header: `${t("Total Cancelled Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_cancelled_sessions",
      },
    ],
    [i18n.language, page]
  );
  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers/performance?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    isFetching,
    data: TeachersPerformanceData,
    isRefetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <Table
              data={
                TeachersPerformanceData?.data?.teachers
                  ? TeachersPerformanceData?.data?.teachers
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
              columnsToRemove={[8]}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={TeachersPerformanceData?.data?.paginate.total_pages}
                previousLabel={<Prevpagination />}
                nextLabel={<NextPaginationIc />}
                onPageChange={handlePageChange}
                initialPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeachersPerformance;
