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
function Packages({ teacherId }: any) {
  type Packages = {
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

  const cols = useMemo<ColumnDef<Packages>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },
      {
        header: `${t("Price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "price",
      },
      {
        header: `${t("Old price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "old_price",
      },
      {
        header: `${t("Classes Number")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "sessions_number",
      },

      {
        header: `${t("Class Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_duration",
      },
      {
        header: `${t("Package Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_duration",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "active",
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
  const endpoint = `dashboard/teachers/${teacherId}/packages?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: PackagesData,
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
          <div className="col-span-12">
            <Table
              data={
                PackagesData?.data?.packages ? PackagesData?.data?.packages : []
              }
              totalItemsData={PackagesData?.data?.paginate?.total}
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
                pagesCount={PackagesData?.data?.paginate.total_pages}
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

export default Packages;
