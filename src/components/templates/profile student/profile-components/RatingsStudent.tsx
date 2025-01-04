import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { useFetch, useMutate } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { Button } from "../../../atoms";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import { Modal } from "../../../molecules";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import { Link } from "react-router-dom";
function RatingsStudent({ studentId }: any) {
  type RatingsStudent = {
    id: number;
    name: string;
    Phone: string;
    whatsapp: string;
    specialization: string;
    is_azher: boolean;
    is_mogaz: boolean;
    interview_status: string;
    join: string;
    required_hours: string;
    created_at: string;
    total_subscriptions: string;
    state_name: string;
    activation_status: string;
    zoom_status: string;
  };

  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useState();
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  // column table
  const cols = useMemo<ColumnDef<RatingsStudent>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Class Number")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_number",
      },
      {
        header: `${t("Teacher Name")}`,
        cell: (info) =>     <div>
        <Link
          to={`/teacher/teachers/profile/${info.row.original?.teacher_id}`}
          style={{ fontSize: "14px" }}
          className="cursor-pointer text-blue-700"
        >
          {info.row.original?.teacher_name}
        </Link>
      </div>,
        accessorKey: "teacher_name",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },

      {
        header: `${t("Rating")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "rating",
      },
      {
        header: `${t("Comment")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "rating_comment",
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
  const endpoint = `dashboard/students/ratings/${studentId}?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: RatingsStudentData,
    isFetching,
    error,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
    console.log("🚀 ~ RatingsStudent ~ RatingsStudentData:", RatingsStudentData)

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <Table
              data={
                RatingsStudentData?.data.ratings
                  ? RatingsStudentData?.data.ratings
                  : []
              }
              totalItemsData={RatingsStudentData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setDateFilter={setDateFilter}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={RatingsStudentData?.data?.paginate.total_pages}
                previousLabel={<Prevpagination />}
                nextLabel={<NextPaginationIc />}
                onPageChange={handlePageChange}
                initialPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsStudent;
