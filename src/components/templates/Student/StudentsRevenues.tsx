import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../atoms/icons/prevpagination";
import Paginate from "../../molecules/table/Paginate";
import { Table } from "../../organisms/tantable/Table";
import { BiSolidChat } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import { useDebouncedState } from "@mantine/hooks";

export type StudentsRevenues = {
  id: number;
  student_id: string;
  name: string;
};
type StudentsRevenues_TP = {
  title: string;
};

function StudentsRevenues({ title }: StudentsRevenues_TP) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<StudentsRevenues>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_name",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.student_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.name}
            </Link>
          </div>
        ),
        accessorKey: "student_name",
      },
      {
        header: `${t("chat")}`,
        cell: (info) => (
          <div
            onClick={() => navigate(`/chat/all/${info.row.original.student_id}`)}
            className="cursor-pointer  flex justify-center"
          >
            <BiSolidChat className="!w-[20px] h-[20px]" />
          </div>
        ),
        accessorKey: "chat",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },

      {
        header: `${t("Email")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "email",
      },

      {
        header: `${t("Amount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "amount",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    date_range: dateFilter,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",

  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/reports/revenues/students-revenues?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: StudentsRevenuesData,
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
          <div className="home-cards   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0  col-span-4 mb-10">
            <div className="flex  justify-between p-2">
              <p>{t("Total revenues")}</p>

              <p>
                {
                  //@ts-ignore
                  StudentsRevenuesData?.sum
                }
              </p>
            </div>
          </div>
          <div className="col-span-12 ">
            <Table
              data={
                StudentsRevenuesData?.data?.student_revenues
                  ? StudentsRevenuesData?.data?.student_revenues
                  : []
              }
              showNavigation
              //@ts-ignore
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              setWord={setWord}
              //@ts-ignore
              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={StudentsRevenuesData?.data?.paginate.total_pages}
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
export default StudentsRevenues;
