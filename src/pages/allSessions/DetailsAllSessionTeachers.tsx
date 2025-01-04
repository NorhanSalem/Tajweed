import { TimeInput } from "@mantine/dates";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/atoms";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import ReComponent from "../../components/atoms/icons/RefundIcon";
import { WhatsAppIcon } from "../../components/atoms/icons/WhatsAppIcon";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { InnerFormLayout, Modal } from "../../components/molecules";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useLanguageContext } from "../../context/language";
import { useFetch, useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { indexTable, pagePaginate } from "../../utils/helpers";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import RefoundSession from "../../components/molecules/Actions/RefoundSession/RefoundSession";
import i18n from "../../i18n";
import { IoReceiptOutline } from "react-icons/io5";
import ReportModal from "../../components/molecules/ReportModal";
import Report from "../../components/molecules/Report";

export type DetailsAllSessionTeachers = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type DetailsAllSessionTeachers_TP = {
  title: string;
};

export default function DetailsAllSessionTeachers({
  title,
}: DetailsAllSessionTeachers_TP) {
  const [editJoinedTeacherSession, setEditJoinedTeacherSession] =
    useState(false);
  const navigate = useNavigate();
  const [sessionTeacher, setSessionTeacher] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const { id, type } = useParams();
  const [openReport, setOpenReport] = useState(false);
  const [detailsReport, setDetailsReport] = useState("");

  const cols = useMemo<ColumnDef<DetailsAllSessionTeachers>[]>(() => {
    let columns = [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
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
        header: `${t("Class duration")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "session_duration",
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
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            {info.row.original.can_refund && (
              <div>
                <RefoundSession info={info} refetch={refetch} />
              </div>
            )}
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("Added by")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "added_by",
      },
    ];
    if (type == "incoming" || type == "Incoming") {
      columns = columns.filter(
        (col) =>
          col.accessorKey !== "teacher_joined_at" &&
          col.accessorKey !== "student_joined_at" &&
          col.accessorKey !== "report"
      );
    }

    return columns;
  }, [i18n.language, page]);

  const queryParams = {
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions?status=${type}&teacher_id=${id}?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: DetailsAllSessionTeachersData,
    isRefetching,
    error,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
    console.log("🚀 ~ DetailsAllSessionTeachersData:", DetailsAllSessionTeachersData)

  const { mutate, isLoading: submitFormLoading } = useMutate({
    mutationKey: [`update-dalay/${sessionId}`],
    endpoint: `dashboard/sessions/update-dalay/${sessionId}`,
    onSuccess: (data) => {
      refetch();
      notify("success");
      setEditJoinedTeacherSession(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
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
                DetailsAllSessionTeachersData?.data
                  ? DetailsAllSessionTeachersData?.data
                  : []
              }
              totalItemsData={
                DetailsAllSessionTeachersData?.data?.paginate?.total
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setPage={setPage}
              setWord={setWord}
            />
            <Modal
              isOpen={editJoinedTeacherSession}
              onClose={() => setEditJoinedTeacherSession(false)}
            >
              <InnerFormLayout
                customStyle="p-8"
                title={`${t("Book")}`}
                showpopuptitle={true}
              >
                <div>
                  <TimeInput
                    styles={{
                      input: {
                        textAlign: "center",
                      },
                    }}
                    withSeconds
                    dir="ltr"
                    id="time"
                    className="w-auto text-center bg-[green]"
                    placeholder={`${t("Select time")}`}
                    onChange={(e) => setSessionTeacher(e.target.value)}
                    value={sessionTeacher?.teacher_joined_at}
                  />

                  <Button
                    type="submit"
                    className="mx-auto mt-5 block"
                    action={() => mutate({ date: sessionTeacher })}
                    loading={submitFormLoading}
                  >
                    {t("Confirm")}
                  </Button>
                </div>
              </InnerFormLayout>
            </Modal>
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
                pagesCount={
                  DetailsAllSessionTeachersData?.data?.paginate?.total_pages
                }
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
