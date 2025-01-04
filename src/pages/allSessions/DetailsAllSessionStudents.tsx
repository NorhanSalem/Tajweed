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
import Actions from "../../components/molecules/Actions/Actions";
import BookSessionForm from "../../components/templates/profile student/BookSessionForm";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import RescheduleIcon from "../../components/atoms/icons/RescheduleIcon";
import Reschedule from "../../components/molecules/Actions/Reschedule/Reschedule";
import { IoReceiptOutline } from "react-icons/io5";
import ReportModal from "../../components/molecules/ReportModal";
import Report from "../../components/molecules/Report";
import DeleteSession from "../../components/templates/incomingSessions/DeleteSession";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import ChargeTheWalletModal from "../../components/templates/profile student/ChargeWalletModal";
import { useTranslation } from "react-i18next";
import { WalletStudent } from "../../components/templates/Student/WalletStudent";
import SubscribeToPackageForm from "../../components/templates/profile student/SubscribeToPackageForm";

export type DetailsAllSessionStudents = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type DetailsAllSessionStudents_TP = {
  title: string;
};

export default function DetailsAllSessionStudents({
  title,
}: DetailsAllSessionStudents_TP) {
  const { currentLang } = useLanguageContext();
  const [editJoinedTeacherSession, setEditJoinedTeacherSession] =
    useState(false);
  const navigate = useNavigate();
  const [sessionTeacher, setSessionTeacher] = useState("");
  const [sessionId, setSessionId] = useState("");
  const { id, type } = useParams();
  const [isOpenS, setIsOpenS] = useState(false);
  const closeModal = () => setIsOpenS(false);
  console.log("🚀 ~ type:", type);
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [refundDataId, setRefundDataId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenW, setIsOpenW] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [openReport, setOpenReport] = useState(false);
  const [detailsReport, setDetailsReport] = useState("");
  const { t } = useTranslation();
  const params = useParams();
  const { studentId } = params;
  const cols = useMemo<ColumnDef<DetailsAllSessionStudents>[]>(() => {
    let columns = [
      {
        header: "#",
        cell: (info) => (
          <span>{indexTable(info?.row?.index, page)}</span>
        ),
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
        header: `${t("Day")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "day_name",
      },
      {
        header: `${t("Added by")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "added_by",
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
        header: `${t("Teacher Time")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time_for_teacher",
      },
      {
        header: `${t("Time Student")}`,
        cell: (info) => `${info.renderValue() ? info.renderValue() : "__"}  `,
        accessorKey: "time_for_student",
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
        header: `${t("Class duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_duration",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            {info.row.original?.can_refund && (
              <Actions
                info={info}
                refundDataId={info.row.original.id}
                refetch={refetch}
                setRefundDataId={setRefundDataId}
                refoundSession={true}
              />
            )}
            <div className="cursor-pointer">
              <RescheduleIcon
                action={() => {
                  setOpenModal(true);
                  setData({
                    session_id: info.row.original.id,
                    time: info.row.original.time,
                    date: info.row.original.date,
                    teacherId: info.row.original.teacher_id,
                    studentId: info.row.original.student_id,
                    packageId: info.row.original.package_id,
                    day: info.row.original.day_name,
                    sessionNumber: info.row.original.session_number,
                    duration: info.row.original.session_duration,
                    session_duration: info.row.original.session_duration,
                    teacherName: info.row.original.teacher_name,
                    studentName: info.row.original.student_name,
                  });
                }}
              />
            </div>
            <DeleteSession info={info} refetch={refetch} />
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("Latest Update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_updated_id",
      },
    ];
    if (type == "Incoming" || type == "incoming") {
      columns = columns.filter(
        (col) =>
          col.accessorKey !== "teacher_joined_at" &&
          col.accessorKey !== "student_joined_at" &&
          col.accessorKey !== "student_name"
      );
    }

    return columns;
  }, [currentLang, page]);

  const queryParams = {
    status: type,
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
    student_id: id,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/sessions?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: DetailsAllSessionStudentsData,
    isRefetching,
    error,
  } = useFetch<DetailsAllSessionStudents[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

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

  // useEffect(() => {}, [dataSource])

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="flex gap-5">
              <Button
                type="submit"
                className="ms-auto  block w-[200px]"
                action={() => setIsOpen(true)}
                loading={submitFormLoading}
              >
                {t("Book a class")}
              </Button>
              <div>
                <div>
                  <Modal
                    isOpen={isOpenW}
                    onClose={() => {
                      setIsOpenW(false);
                    }}
                  >
                    <WalletStudent setModel={setIsOpenW} studentId={id} />
                  </Modal>
                  <button
                    className="hover:text-black border-black border p-3 rounded-lg"
                    onClick={() => setIsOpenW(true)}
                  >
                    {t("Charge the wallet")}
                  </button>
                </div>

                <div></div>
              </div>
              <div>
                <Modal
                  isOpen={isOpenS}
                  onClose={() => {
                    setIsOpenS(false);
                  }}
                >
                  <SubscribeToPackageForm
                    studentId={id as string}
                    closeModal={closeModal}
                  />
                </Modal>
                <button
                  className="hover:text-black border-black border p-3 rounded-lg"
                  onClick={() => setIsOpenS(true)}
                >
                  {t("Pick a package")}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <Table
              data={
                DetailsAllSessionStudentsData?.data.items
                  ? DetailsAllSessionStudentsData?.data.items
                  : []
              }
              totalItemsData={
                DetailsAllSessionStudentsData?.data?.paginate?.total
              }
              showNavigation
              columns={cols ? cols : []}
              // setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              // setDateFilter={setDateFilter}
              // setDateFilterAll={setDateFilterAll}
              setPagePagination={setPagePagination}
              setPage={setPage}
              setWord={setWord}
              // StatusStudent
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
            <Modal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            >
              <BookSessionForm
                studentId={id as string}
                teacher_id={DetailsAllSessionStudentsData?.teacher_id}
                closeModal={() => setIsOpen(false)}
                refetch={refetch}
              />
            </Modal>
            <div className="">
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
                  DetailsAllSessionStudentsData?.paginate?.total_pages
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
