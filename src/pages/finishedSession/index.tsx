import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
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
import { Rating } from "@mantine/core";
import { IoReceiptOutline } from "react-icons/io5";
import ReportModal from "../../components/molecules/ReportModal";
import Report from "../../components/molecules/Report";

export type AllSession = {
  [x: string]: any;
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type AllSession_TP = {
  title: string;
};

export default function FinishedSession({ title }: AllSession_TP) {
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [debouncedSearchTerm] = useDebouncedValue(word, 500);
  const [openReport, setOpenReport] = useState(false);
  const [detailsReport, setDetailsReport] = useState("");
  const [sessionId, setSessionId] = useState("");

  const cols = useMemo<ColumnDef<AllSession>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
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
        header: `${t("Day")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "day_name",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Class Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time12",
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
        header: `${t("Class Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: `${t("Time Student")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time_for_student",
      },
      {
        header: `${t("Teacher Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time_for_teacher",
      },
      {
        header: `${t("Teacher delay")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "teacher_delay",
      },
      {
        header: `${t("Student delay")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_delay",
      },
      {
        header: `${t("Subscription Date")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "created_at",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "package_title",
      },
      {
        header: `${t("Rating")}`,
        cell: (info) => (
          <div>
            <Rating value={info.row.original?.rating} readOnly />
          </div>
        ),
        accessorKey: "rating",
      },
      {
        header: `${t("Teacher Report")}`,
        cell: (info) => (
          <div className="flex justify-center">
            <button
              disabled={!info.row.original.report}
              onClick={() => {
                setOpenReport(true);
                setDetailsReport(info.row.original.report);
                setSessionId(info.row.original.id);
              }}
              className="cursor-pointer flex justify-center disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <IoReceiptOutline className="text-2xl " />
            </button>
          </div>
        ),
        accessorKey: "report",
      },
      {
        header: `${t("Student Report")}`,
        cell: (info) => (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setOpenReport(true);
                setDetailsReport(info.row.original.rating_comment);
              }}
              disabled={!info.row.original.rating_comment}
              className="cursor-pointer flex justify-center disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <IoReceiptOutline className="text-2xl " />
            </button>
          </div>
        ),
        accessorKey: "rating_comment",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex items-center ">
            {info.row.original.can_refund && (
              <Actions info={info} refetch={refetch} refoundSession />
            )}
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("last update")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "last_updated_id",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    pagenate: pagePagination ? pagePagination : 20,
    date_range: dateFilter,
    search: debouncedSearchTerm ? debouncedSearchTerm : "",
    page: page,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions?status=finished&${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: allSessionData,
    isRefetching,
    refetch,
  } = useFetch<AllSession[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  const transformData = (sessions: any) => {
    return sessions?.map((item, index) => ({
      id: index + 1,
      teacher_name: item?.teacher_name,
      student_name: item?.student_name,
      package_title: item?.package_title,
      session_number: item?.session_number,
      booked_at: item?.booked_at,
      date: item?.date,
      time: item?.time,
      status: item?.status,
      teacher_joined_at: item?.teacher_joined_at,
      student_joined_at: item?.student_joined_at,
    }));
  };
  const AllSessionsExcellData = useMemo(() => {
    if (isSuccess && allSessionData) {
      return transformData(allSessionData?.data?.items);
    }
    return [];
  }, [isSuccess, allSessionData]);
  const customColumnExcell = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => info.renderValue(),

        accessorKey: "student_name",
      },

      {
        header: `${t("Teacher Name")}`,
        cell: (info) => info.renderValue(),

        accessorKey: "teacher_name",
      },

      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },
      {
        header: `${t("Class Number")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_number",
      },
      {
        header: `${t("Subscription Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "booked_at",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Class Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time12",
      },
      {
        header: `${t("teacher joined")}`,
        cell: (info) => info.renderValue(),

        accessorKey: "teacher_joined_at",
      },
      {
        header: `${t("student joined")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_joined_at",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
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
          <div className="col-span-12">
            <Table
              data={
                //@ts-ignore
                allSessionData?.data.items ? allSessionData?.data.items : []
              }
              //@ts-ignore

              totalItemsData={allSessionData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              //@ts-ignore

              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
              dataExcell={AllSessionsExcellData}
              customColumnExcell={customColumnExcell}
              setPage={setPage}
              setWord={setWord}
              columnsToRemove={[4, 5, 11]}
            />
            <ReportModal
              isOpen={openReport}
              onClose={() => setOpenReport(false)}
            >
              <Report
                detailsReport={detailsReport}
                refetch={refetch}
                sessionId={sessionId}
                setOpenReport={setOpenReport}
              />
            </ReportModal>

            <div className="flex justify-end mt-3">
              <Paginate
                //@ts-ignore
                pagesCount={allSessionData?.paginate?.total_pages}
                previousLabel={<Prevpagination />}
                nextLabel={<NextPaginationIc />}
                onPageChange={handlePageChange}
                initialPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
