import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { useFetch } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import { useDebouncedState } from "@mantine/hooks";

function DelayLog({ teacherId }: any) {
  type Absence = {
    id: string;
  };

  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);

  // column table
  const cols = useMemo<ColumnDef<Absence>[]>(
    () => [
      {
        header: `${t("Class Id")}`,
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_name",
      },
      {
        header: `${t("Class Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time",
      },
      {
        header: `${t("Teacher Joined at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "teacher_joined_at",
      },
      {
        header: `${t("Student Joined at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_joined_at",
      },
      {
        header: `${t("Teacher Delay ( minutes )")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "delay",
      },
      {
        header: `${t("Delay Deduction (pounds)")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "delay_deducation",
      },
    ],
    [i18n.language, page]
  );
  const queryParams = {
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers/${teacherId}/delays?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: NotificationsData,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

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
                NotificationsData?.data?.items
                  ? NotificationsData?.data?.items
                  : []
              }
              totalItemsData={NotificationsData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={NotificationsData?.data?.paginate.total_pages}
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

export default DelayLog;
