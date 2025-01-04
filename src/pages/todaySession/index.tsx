import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import RescheduleIcon from "../../components/atoms/icons/RescheduleIcon";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { Modal } from "../../components/molecules";
import Actions from "../../components/molecules/Actions/Actions";
import Reschedule from "../../components/molecules/Actions/Reschedule/Reschedule";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";

export type TodaySessionData_TP = {
  [x: string]: any;
};
type TodaySession_TP = {
  title: string;
};

function TodaySession({ title }: TodaySession_TP) {
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [openModal, setOpenModal] = useState(false);
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [data, setData] = useState({});

  const cols = useMemo<ColumnDef<TodaySessionData_TP>[]>(
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
        header: `${t("Class Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: `${t("Subscription Date")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "booked_at",
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
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2 w-full">
            <Actions
              info={info}
              refetch={refetch}
              joinSession={true}
              refoundSession={true}
            />
            <div className="cursor-pointer">
              <RescheduleIcon
                action={() => {
                  setOpenModal(true);
                  setData({
                    session_id: info.row.original.id,
                    time: info.row.original.time,
                    date: info.row.original.date,
                    teacherId: info.row.original.teacher_id,
                    teacherName: info.row.original.teacher_name,
                    session_duration: info.row.original.session_duration,
                  });
                }}
              />
            </div>
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
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions/today?${searchParams.toString()}`;

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
  const transformData = (sessions: any) => {
    return sessions?.map((item, index) => ({
      id: index + 1,
      teacher_name: item?.teacher_name,
      student_name: item?.student_name,
      date: item?.date,
      time: item?.time,
      status: item?.status,
      booked_at: item?.booked_at,
      package_title: item?.package_title,
      session_number: item?.session_number,
      session_duration: item?.session_duration,
      time_for_student: item?.time_for_student,
      time_for_teacher: item?.time_for_teacher,
      last_updated_id: item?.last_updated_id,
    }));
  };
  const TodaySessionsExcellData = useMemo(() => {
    if (isSuccess && sessions) {
      return transformData(sessions?.data);
    }
    return [];
  }, [isSuccess, sessions]);
  const customColumnExcell = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
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
        header: `${t("Class Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: `${t("Subscription Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "booked_at",
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
        header: `${t("Class duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_duration",
      },
      {
        header: `${t("Student Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time_for_student",
      },
      {
        header: `${t("Teacher Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time_for_teacher",
      },
      {
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_updated_id",
      },
    ],
    [page]
  );

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <>
      {console.log(sessions)}
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
              setPagePagination={setPagePagination}
              isLoading={isLoading}
              isRefetching={isRefetching}
              setWord={setWord}
              dataExcell={TodaySessionsExcellData}
              customColumnExcell={customColumnExcell}
              showPaginate
            />
          </div>
        </div>
        <div className="">
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <Reschedule
              data={data}
              refetch={refetch}
              setOpenModal={setOpenModal}
            />
          </Modal>
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
export default TodaySession;
