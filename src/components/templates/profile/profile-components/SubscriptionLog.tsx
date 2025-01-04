import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import Actions from "../../../molecules/Actions/Actions";
function SubscriptionLog({ teacherId }: any) {
  type SubscriptionLog = {
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
    student_name: string;
    country: {
      name: string;
    };
  };
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<SubscriptionLog>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.student_name}
            </Link>
          </div>
        ),
        accessorKey: "student_name",
      },
      {
        header: `${t("Country")}`,
        cell: (info) => info?.row?.original?.country?.name,
        accessorKey: "country",
      },

      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },

      {
        header: `${t("Remaining Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "remain_sessions",
      },
      {
        header: `${t("Booked Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "booked_sessions",
      },
      {
        header: `${t("Finished Classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "finished_sessions",
      },
      {
        header: `${t("price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "price",
      },
      // {
      //   header: `${t("Commission")}`,
      //   cell: (info) => info.renderValue(),
      //   accessorKey: "commission",
      // },

      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("finished at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_finished_date",
      },
      {
        header: `${t("Package Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_duration",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <Actions refetch={refetch} deleteSubscription info={info} />
            </div>
          </div>
        ),

        accessorKey: "join",
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
  const endpoint = `dashboard/teachers/${teacherId}/subscriptions?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: SubscriptionLogData,
    isFetching,
    refetch
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
    console.log("🚀 ~ SubscriptionLog ~ SubscriptionLogData:", SubscriptionLogData)

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
                SubscriptionLogData?.data?.subscriptions
                  ? SubscriptionLogData?.data?.subscriptions
                  : []
              }
              totalItemsData={SubscriptionLogData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              columnsToRemove={[]}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={SubscriptionLogData?.data?.paginate.total_pages}
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

export default SubscriptionLog;
