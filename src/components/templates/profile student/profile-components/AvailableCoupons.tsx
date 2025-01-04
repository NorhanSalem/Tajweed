import { useDebouncedState } from "@mantine/hooks";
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
function AvailableCoupons({ studentId }: any) {
  type AvailableCoupons = {
    id: string;
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
    end_date: string;
    start_date: string;
  };

  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<AvailableCoupons>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Coupon")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon",
      },

      {
        header: `${t("Percentage")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "is_percentage",
      },
      {
        header: `${t("Discount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "discount",
      },
      {
        header: `${t("Max Used")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "max_used",
      },
      {
        header: `${t("Remainder")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "remainder",
      },
      {
        header: `${t("Start Date")}`,
        cell: (info) => (
          <span>
            {info.row.original?.start_date
              ? info.row.original?.start_date
              : "--"}
          </span>
        ),
        accessorKey: "start_date",
      },
      {
        header: `${t("End Date")}`,
        cell: (info) =>  <span>
        {info.row.original?.end_date
          ? info.row.original?.end_date
          : "--"}
      </span>,
        accessorKey: "end_date",
      },

      {
        header: `${t("Active")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "active",
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
  const endpoint = `dashboard/students/coupons/${studentId}?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AvailableCouponsData,
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
                AvailableCouponsData?.data.coupons
                  ? AvailableCouponsData?.data.coupons
                  : []
              }
              totalItemsData={AvailableCouponsData?.data?.paginate?.total}
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
                pagesCount={AvailableCouponsData?.data?.paginate.total_pages}
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

export default AvailableCoupons;
