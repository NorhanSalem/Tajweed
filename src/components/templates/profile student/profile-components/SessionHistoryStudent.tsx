import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { useFetch, useMutate } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";
import { Button } from "../../../atoms";
import DeleteTable from "../../../atoms/icons/DeleteTable";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import { Modal, TextAreaField } from "../../../molecules";
import showAlert from "../../../molecules/ShowAlert";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import { Link } from "react-router-dom";
function SessionHistoryStudent({ studentId }: any) {
  type SessionHistoryStudent = {
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
  // state
  const [openModal, setOpenModal] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [sessionID, setSessionID] = useState();
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<SessionHistoryStudent>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
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
        header: `${t("Class Time")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "time12",
      },
      {
        header: `${t("Teacher Joined at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "teacher_joined_at",
      },
      {
        header: `${t("Student Joined at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_joined_at",
      },
      {
        header: `${t("Class Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: `${t("Class Booked at")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "booked_at",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package",
      },
      {
        header: `${t("Class Number")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_number",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <DeleteTable
                className="cursor-pointer"
                action={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      setOpenModal(true);
                      setSessionID(info.row.original.id);
                    }
                  );
                  setSessionID(info.row.original.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/students/sessions/${studentId}?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: SessionHistoryStudentData,
    isFetching,
    error,
  } = useFetch<SessionHistoryStudent[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
  });
  console.log(
    "🚀 ~ SessionHistoryStudent ~ SessionHistoryStudentData:",
    SessionHistoryStudentData
  );

  const { mutate: cancelSession, isLoading: loadingCancel } = useMutate({
    mutationKey: [
      `dashboard/teachers/${studentId}/cancel-session/${sessionID}`,
    ],
    endpoint: `dashboard/teachers/${studentId}/cancel-session/${sessionID}`,
    onSuccess: (data: any) => {
      notify("success");
      setOpenModal(false);
      refetch();
    },
    onError: (err: any) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <Table
              data={
                SessionHistoryStudentData?.data?.sessions
                  ? SessionHistoryStudentData?.data?.sessions
                  : []
              }
              totalItemsData={SessionHistoryStudentData?.data.paginate.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
              setWord={setWord}
              columnsToRemove={[]}
            />

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <div className="p-5">
                <h2 className="text-start mt-5">هل أنت متأكد إلغاء الجلسه؟</h2>

                <Formik
                  initialValues={{ reason: "" }}
                  onSubmit={(values) => {
                    cancelSession(values);
                  }}
                >
                  <Form>
                    <TextAreaField
                      label="سبب الحذف"
                      name="reason"
                      id="reason"
                      placeholder="سبب الحذف"
                    />
                    <div className="flex justify-between px-5 mt-5">
                      <Button
                        //  studentId
                        loading={loadingCancel}
                        type="submit"
                      >
                        حذف
                      </Button>
                      <Button
                        onClick={() => setOpenModal(false)}
                        variant="danger"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Modal>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={
                  SessionHistoryStudentData?.data?.paginate.total_pages
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
    </div>
  );
}

export default SessionHistoryStudent;
