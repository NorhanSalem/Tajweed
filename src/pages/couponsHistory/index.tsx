import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { indexTable, pagePaginate } from "../../utils/helpers";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import showAlert from "../../components/molecules/ShowAlert";
import { useFetch } from "../../hooks";
import { AddButton } from "../../components/molecules/AddButton";
import { Table } from "../../components/organisms/tantable/Table";
import Paginate from "../../components/molecules/table/Paginate";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import { useDebouncedState } from "@mantine/hooks";
import i18n from "../../i18n";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidChat } from "react-icons/bi";

export type CouponsHistory = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type CouponsHistory_TP = {
  title: string;
};

function CouponsHistory({ title }: CouponsHistory_TP) {
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<CouponsHistory>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Coupon code")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon",
      },
      {
        header: `${t("Date used")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "used_at_date",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original?.student_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original?.student}
            </Link>
          </div>
        ),
        accessorKey: "student",
      },

      {
        header: `${t("chat")}`,
        cell: (info) => (
          <div
            onClick={() => navigate(`/chat/students/${info.row.original?.student_id}`)}
            className="cursor-pointer  flex justify-center"
          >
            <BiSolidChat className="!w-[20px] h-[20px]" />
          </div>
        ),
        accessorKey: "chat",
      },
      {
        header: `${t("subscription price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "subscription_price",
      },

      {
        header: `${t("Discount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "discount",
      },
      {
        header: `${t("paid up")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "paid_price",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/advertisement/coupons/history?${searchParams.toString()}`;
  //all data
  const {
    isLoading,
    isSuccess,
    data: CouponsHistory,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="home-cards   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0  col-span-4 mb-10">
          <div className="flex  justify-between p-2">
            <p>{t("Total discount coupons")}</p>
            <p>
              {
                //@ts-ignore
                CouponsHistory?.total_discount
              }
            </p>
          </div>
        </div>
        <div className="col-span-12">
          <Table
            data={
              CouponsHistory?.data?.items ? CouponsHistory?.data?.items : []
            }
            showNavigation
            columns={cols ? cols : []}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            //@ts-ignore
            isRefetching={isRefetching}
            setPagePagination={setPagePagination}
            setWord={setWord}
            columnsToRemove={[9]}
            setDateFilter={setDateFilter}

            // Status
          />

          <div className="flex justify-end mt-3">
            <Paginate
              pagesCount={CouponsHistory?.data?.paginate.total_pages}
              previousLabel={<Prevpagination />}
              nextLabel={<NextPaginationIc />}
              onPageChange={handlePageChange}
              initialPage={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CouponsHistory;
