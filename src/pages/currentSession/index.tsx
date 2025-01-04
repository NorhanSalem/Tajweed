import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import Actions from "../../components/molecules/Actions/Actions";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { useDebouncedState } from "@mantine/hooks";

export type CurrentSession = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  teacher_name: string;
  teacher_id: string;
  student_id: string;
  student_name: string;
  student_whatsapp: string;
  teacher_whatsapp: string;
};
type CurrentSession_TP = {
  title: string;
};

function CurrentSession({ title }: CurrentSession_TP) {
  const navigate = useNavigate();
  const [refundDataId, setRefundDataId] = useState("");
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<CurrentSession>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Teacher Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row.original.teacher_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.teacher_name}
            </Link>
          </div>
        ),
        accessorKey: "teacher_name",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.student_id}`}
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
        header: `${t("Class time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },

      {
        header: `${t("Teacher start time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "teacher_joined_at",
      },
      {
        header: `${t("Student start time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "student_joined_at",
      },
      {
        header: `${t("Teacher delay")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "teacher_delay",
      },
      {
        header: `${t("Subscription Date")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "subscription_date",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "package_title",
      },
      {
        header: `${t("Class Number")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "session_number",
      },
      {
        header: `${t("Class duration")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "session_duration",
      },
      {
        header: `${t("Student Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time_for_student",
      },
      {
        header: `${t("Teacher Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time_for_teacher",
      },
      {
        header: `${t("Student delay")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "student_delay",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <Actions
            info={info}
            joinSession={true}
            refetch={refetch}
            // refoundSession={true}
            // refundDataId={refundDataId}
            // setRefundDataId={setRefundDataId}
          />
        ),

        accessorKey: "join",
      },
      {
        header: `${t("Latest Update")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "last_updated_id",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    page: page,
    search: word ? word : "",

    pagenate: pagePagination,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions/current?${searchParams.toString()}`;

  const {
    data: sessions,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
  } = useFetch<any>({
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
          <div className="col-span-12">
            <Table
              data={sessions?.data ? sessions?.data : []}
              showNavigation
              //@ts-ignore
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              setWord={setWord}
              isRefetching={isRefetching}
              //@ts-ignore
              setPagePagination={setPagePagination}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Paginate
            pagesCount={sessions?.paginate?.total_pages}
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
export default CurrentSession;
