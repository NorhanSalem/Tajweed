import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import RescheduleIcon from "../../components/atoms/icons/RescheduleIcon";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { Modal } from "../../components/molecules";
import RefoundSession from "../../components/molecules/Actions/RefoundSession/RefoundSession";
import Reschedule from "../../components/molecules/Actions/Reschedule/Reschedule";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import EditJoinedTeacherSession from "../../components/molecules/EditJoinedTeacherSession";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch, useIsRTL } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import DeleteSession from "../../components/templates/incomingSessions/DeleteSession";

export type AllSession = {
  id: number;
  page: string;
  student_id: number;
  student_name: string;
  teacher_id: number;
  teacher_name: string;
  teacher_joined_at: string;
  time: string;
  date: string;
  can_refund: boolean;
  can_reschedule: boolean;
  session_duration?: string | number;
};
type AllSession_TP = {
  title: string;
};

export default function AllSession({ title }: AllSession_TP) {
  const [editJoinedTeacherSession, setEditJoinedTeacherSession] =
    useState(false);
  const [sessionTeacher, setSessionTeacher] = useState<any>("");
  const [sessionId, setSessionId] = useState<number>();
  const [timeSession, setTimeSession] = useState("");
  const [session, setsSession] = useState("");
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<any>("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const isRTL = useIsRTL();
  const cols = useMemo<ColumnDef<AllSession>[]>(
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
        header: `${t("Subscription Date")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "booked_at",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "date",
      },
      {
        header: `${t("Class Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time12",
      },
      {
        header: `${t("teacher joined")}`,
        cell: (info) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setEditJoinedTeacherSession(true);
              setSessionTeacher(info.row.original);
              setSessionId(info.row.original.id);
              setTimeSession(info.row.original?.teacher_joined_at);
              setsSession(info.row?.original?.session_duration);
            }}
          >
            {info.row.original?.teacher_joined_at}
          </div>
        ),
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
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div className="flex items-center ">
              {info.row.original.can_refund && (
                <RefoundSession info={info} refetch={refetch} />
              )}

              {info.row.original.can_reschedule && (
                <div className="cursor-pointer">
                  <RescheduleIcon
                    action={() => {
                      setOpenModal(true);
                      setData({
                        session_id: info?.row?.original?.id,
                        time: info?.row?.original?.time,
                        date: info?.row?.original?.date,
                        teacherId: info?.row?.original?.teacher_id,
                        teacherName: info?.row?.original?.teacher_name,
                        session_duration: info?.row?.original?.session_duration,
                      });
                    }}
                  />
                </div>
              )}
              <DeleteSession info={info} refetch={refetch} />
            </div>
          </div>
        ),

        accessorKey: "",
      },
    ],
    [isRTL, page]
  );

  const queryParams = {
    status: status.length ? status : 0,
    page: page,
    date_range: dateFilter,
    pagenate: pagePagination,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: allSessionData,
    isRefetching,
  } = useFetch({
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
      session_duration: item?.session_duration,
    }));
  };
  const AllSessionsExcellData = useMemo(() => {
    if (isSuccess && allSessionData) {
      return transformData(allSessionData?.data.items);
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
  console.log();

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
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              //@ts-ignore
              isRefetching={isRefetching}
              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
              dataExcell={AllSessionsExcellData}
              customColumnExcell={customColumnExcell}
              setPage={setPage}
              setWord={setWord}
              StatusStudent
              columnsToRemove={[12]}
            />
            <div className="">
              <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <Reschedule
                  data={data}
                  refetch={refetch}
                  setOpenModal={setOpenModal}
                />
              </Modal>
            </div>
            <EditJoinedTeacherSession
              sessionId={sessionId}
              refetch={refetch}
              setEditJoinedTeacherSession={setEditJoinedTeacherSession}
              editJoinedTeacherSession={editJoinedTeacherSession}
              sessionTeacher={sessionTeacher}
              setSessionTeacher={setSessionTeacher}
              timeSession={timeSession}
              setTimeSession={setTimeSession}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                //@ts-ignore
                pagesCount={allSessionData?.paginate.total_pages}
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
