import { useDebouncedState } from "@mantine/hooks";
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
function Appointments({ teacherId }: any) {
  type Appointments = {
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
  // column table
  const cols = useMemo<ColumnDef<Appointments>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Day Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "day_name",
      },


      {
        header: `${t("From Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "from_time",
      },
      {
        header: `${t("To Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "to_time",
      },
      {
        header: `${t("Active status")}`,
        cell: (info) =><div>{info?.row?.original?.is_active == 1 ? t("Active") : t("notactive") }</div>,
        accessorKey: "is_active",
      },
      {
        header: `${t("Active Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "active_time",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    pagenate: pagePagination,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers/${teacherId}/worktimes?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AppointmentsData,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
    console.log("🚀 ~ Appointments ~ AppointmentsData:", AppointmentsData)

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Table
              data={
                AppointmentsData?.data?.worktimes
                  ? AppointmentsData?.data?.worktimes
                  : []
              }
              totalItemsData={AppointmentsData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              columnsToRemove={[]}
              setYearValue={undefined}
              setMonthValue={undefined}
              setSubscriptionValue={undefined}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AppointmentsData?.data?.paginate.total_pages}
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

export default Appointments;
