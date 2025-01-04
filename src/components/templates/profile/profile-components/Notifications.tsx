import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router";
import { useFetch, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { Button } from "../../../atoms";
import { EditIcon } from "../../../atoms/icons";
import { Modal } from "../../../molecules";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import Prevpagination from "../../../atoms/icons/prevpagination";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import i18n from "../../../../i18n";
import { useDebouncedState } from "@mantine/hooks";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
function Notifications({ teacherId }: any) {
  type Notifications = {
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
  const [word, setWord] = useDebouncedState("", 300);

  // column table
  const cols = useMemo<ColumnDef<Notifications>[]>(
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
          <>
            <div>{info.row.original?.contant?.title}</div>
            <div>{info.row.original?.contant?.body}</div>
          </>
        ),
        accessorKey: "contant",
      },
    ],
    [i18n.language, page]
  );

  //all data
  const {
    isLoading,
    isSuccess,
    data: NotificationsData,
    isFetching,
 
  } = useFetch<any>({
    endpoint: `dashboard/teachers/${teacherId}/notifications?page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&search=${word ? word : ""}`,
    queryKey: [
      `dashboard/teachers/${teacherId}/notifications`,
      pagePagination,
      word,
      page,
    ],
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
                NotificationsData?.data?.notifications
                  ? NotificationsData?.data?.notifications
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

export default Notifications;
