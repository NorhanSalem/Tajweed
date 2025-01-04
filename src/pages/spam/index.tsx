import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";

export type AllSpam = {
  id: number;
  title: string;
  description: string;
  category: {
    name: string;
  };
  user_name:string
};
type AllSpam_TP = {
  title: string;
};

function AllSpam({ title }: AllSpam_TP) {
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<AllSpam>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "",
      },
      {
        header: `${t("name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.user_name}
            </Link>
          </div>
        ),
        accessorKey: "user_name",
      },
      {
        header: `${t("message")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "message",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/spam?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: AllSpam,
    isRefetching,
  } = useFetch<AllSpam[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
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
          <div className="col-span-12 ">
            <Table
              data={
                //@ts-ignore
                AllSpam?.data?.items
                  ? //@ts-ignore

                    AllSpam?.data?.items
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              //@ts-ignore
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setPage={setPage}
              setWord={setWord}
              columnsToRemove={[10]}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Paginate
            //@ts-ignore
            pagesCount={AllSpam?.data?.paginate?.total_pages}
            previousLabel={<Prevpagination />}
            nextLabel={<NextPaginationIc />}
            onPageChange={handlePageChange}
            initialPage={page}
          />
        </div>
      </div>
    </>
  );
}
export default AllSpam;
