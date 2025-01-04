import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import Actions from "../../components/molecules/Actions/Actions";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import ChatUserTable from "../../components/molecules/ChatUserTable";

export type AllSubscriptions = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  teacher_id: string;
  teacher_name: string;
  student_id: string;
  student_name: string;
  status_text_color: string;
  status_bg_color: string;
  can_cancel: boolean;
};
type AllSubscriptions_TP = {
  title: string;
};

function AllSubscriptions({ title }: AllSubscriptions_TP) {
  const navigate = useNavigate();
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [subscriptionValue, setSubscriptionValue] = useState("");
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<AllSubscriptions>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Teacher Name")}`,
        cell: (info) => (
          <div>
            <h2
              onClick={() =>
                navigate(
                  `/teacher/teachers/profile/${info.row.original.teacher_id}`
                )
              }
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.teacher_name}
            </h2>
          </div>
        ),
        accessorKey: "teacher_name",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <h2
              onClick={() =>
                navigate(
                  `/student/students/profile/${info.row.original.student_id}`
                )
              }
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.student_name}
            </h2>
          </div>
        ),
        accessorKey: "student_name",
      },
      {
        header: `${t("Student Chat")}`,
        cell: (info) => <ChatUserTable id={info.row.original?.student_id} />,
        accessorKey: "chat",
      },
      {
        header: `${t("Teacher Chat")}`,
        cell: (info) => <ChatUserTable id={info.row.original?.teacher_id} />,
        accessorKey: "chat",
      },

      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },
      {
        header: `${t("package price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price",
      },
      {
        header: `${t("Paid value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price_after_discount",
      },
      {
        header: `${t("Package expiration date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_finished_date",
      },
      {
        header: `${t("Reason for cancellation")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "cancellation_reason",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => (
          <div
            style={{
              color: info?.row?.original?.status_text_color,
              background: info?.row?.original?.status_bg_color,
            }}
          >
            {info.renderValue()}
          </div>
        ),
        accessorKey: "status_text",
        className: `bg-red-500`,
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
    [currentLang, page]
  );

  const queryParams = {
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
    date_range: dateFilter,

    status: subscriptionValue,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/subscriptions?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    refetch,
    data: AllSubscription,
    isRefetching,
  } = useFetch<AllSubscriptions[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
  const transformData = (AllSubscription: any) => {
    return AllSubscription?.map((item, index) => ({
      id: index + 1,
      created_at:item?.created_at,
      teacher_name:item?.teacher_name,
      student_name:item?.student_name,
      package_title:item?.package_title,
      package_price:item?.package_price,
      package_price_after_discount:item?.package_price_after_discount,
      package_finished_date:item?.package_finished_date,
      cancellation_reason:item?.cancellation_reason
    }));
  };
  const AllSubscriptionExcellData = useMemo(() => {
    if (isSuccess && AllSubscription) {
      return transformData(AllSubscription?.data?.subscriptions);
    }
    return [];
  }, [isSuccess, AllSubscription]);
  const customColumnExcell = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Teacher Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "teacher_name",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_name",
      },

      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },
      {
        header: `${t("package price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price",
      },
      {
        header: `${t("Paid value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price_after_discount",
      },
      {
        header: `${t("Package expiration date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_finished_date",
      },
      {
        header: `${t("Reason for cancellation")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "cancellation_reason",
      },
    ],
    [page]
  );

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
                AllSubscription?.data?.subscriptions
                  ? //@ts-ignore

                    AllSubscription?.data?.subscriptions
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              setSubscriptionValue={setSubscriptionValue}
              //@ts-ignore
              setPagePagination={setPagePagination}
              dataExcell={AllSubscriptionExcellData}
              customColumnExcell={customColumnExcell}
              setPage={setPage}
              setWord={setWord}
              setDateFilter={setDateFilter}
              columnsToRemove={[10]}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Paginate
            //@ts-ignore
            pagesCount={AllSubscription?.data?.paginate.total_pages}
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
export default AllSubscriptions;
