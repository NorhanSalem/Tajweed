import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import RescheduleIcon from "../../components/atoms/icons/RescheduleIcon";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { Modal } from "../../components/molecules";
import Reschedule from "../../components/molecules/Actions/Reschedule/Reschedule";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import DeleteSession from "../../components/templates/incomingSessions/DeleteSession";
import { useLanguageContext } from "../../context/language";
import { useFetch } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";

export type AllSession = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  student_id: string;
  student_name: string;
  teacher_id: string;
  teacher_name: string;
};
type AllSession_TP = {
  title: string;
};

export default function IncomingSession({ title }: AllSession_TP) {
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [dateFilterIncoming, setDateFilterIncoming] = useState<any>("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [debouncedSearchTerm] = useDebouncedValue(word, 500);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any>({});
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
        header: `${t("Class duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_duration",
      },
      {
        header: `${t("Class Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time12",
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
        header: `${t("Package Name")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "package_title",
      },

      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="cursor-pointer flex  gap-2 justify-center">
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
            <DeleteSession info={info} refetch={refetch} />
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    pagenate: pagePagination,
    date_range: dateFilterIncoming,
    search: debouncedSearchTerm ? debouncedSearchTerm : "",
    page: page,
    status: "incoming",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    refetch,
    data: allSessionData,
    isRefetching,
  } = useFetch<AllSession[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilterIncoming,
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
              data={
                //@ts-ignore
                allSessionData?.data.items ? allSessionData?.data.items : []
              }
              //@ts-ignore

              totalItemsData={allSessionData?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              //@ts-ignore
              isRefetching={isRefetching}
              setDateFilterIncoming={setDateFilterIncoming}
              setPagePagination={setPagePagination}
              setPage={setPage}
              setWord={setWord}
              columnsToRemove={[3, 5, 10]}
              // StatusStudent
            />
            <div className="w-full">
              <ModalTemplate
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
              >
                <Reschedule
                  data={data}
                  refetch={refetch}
                  setOpenModal={setOpenModal}
                />
              </ModalTemplate>
            </div>
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
