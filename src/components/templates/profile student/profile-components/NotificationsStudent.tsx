import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { useFetch } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import { useDebouncedState } from "@mantine/hooks";
function NotificationsStudent({ studentId }: any) {
  type NotificationsStudent = {
    id: number;
    contant: {
      title: string;
      body: string;
    };
  };

  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<NotificationsStudent>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Notification")}`,
        cell: (info) => (
          <div>
            <p>{info?.row?.original?.contant?.title}</p>
            <p>{info?.row?.original?.contant?.body}</p>
          </div>
        ),
        accessorKey: "contant",
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
  const endpoint = `dashboard/students/notifications/${studentId}?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: NotificationsStudentData,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled:!!dateFilter
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
                NotificationsStudentData?.data.notifications
                  ? NotificationsStudentData?.data.notifications
                  : []
              }
              totalItemsData={NotificationsStudentData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setDateFilter={setDateFilter}
              columnsToRemove={[]}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={
                  NotificationsStudentData?.data?.paginate.total_pages
                }
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

export default NotificationsStudent;
