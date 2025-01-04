import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
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
import { GiCancel } from "react-icons/gi";
import { IoReceiptOutline } from "react-icons/io5";
import { Rating } from "@mantine/core";
import ReportModal from "../../../molecules/ReportModal";
import Report from "../../../molecules/Report";
function SessionHistory({ teacherId }: any) {
  type SessionHistory = {
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
  const [openModal, setOpenModal] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [sessionID, setSessionID] = useState();
  const [openReport, setOpenReport] = useState(false);
  const [detailsReport, setDetailsReport] = useState("");

  const cols = useMemo<ColumnDef<SessionHistory>[]>(
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
        header: `${t("Class Booked At")}`,
        cell: (info) =>
          info?.row?.original?.booked_at
            ? info?.row?.original?.booked_at
            : t("The session has not been booked yet"),
        accessorKey: "booked_at",
      },
      {
        header: `${t("Class Date")}`,
        cell: (info) =>
          info?.row?.original?.date
            ? info?.row?.original?.date
            : t("No date has been set yet"),
        accessorKey: "date",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
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
                setSessionID(info.row.original.id);
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
        header: `${t("Student Report")}`,
        cell: (info) => (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setSessionID(info.row.original.id);
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
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update.name",
      },
      {
        header: `${t("last update Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update.update_at",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <DeleteTable
                className="cursor-pointer"
                action={() => {
                  setOpenModal(true);
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
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers/${teacherId}/sessions?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: SessionHistoryData,
    isFetching,
    error,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
  });
  const cancelSessionEndPoint = `dashboard/teachers/${teacherId}/cancel-session/${sessionID}`;

  const { mutate: cancelSession, isLoading: loadingCancel } = useMutate({
    endpoint: cancelSessionEndPoint,
    mutationKey: [cancelSessionEndPoint],
    onSuccess: (data: any) => {
      notify("success");
      setOpenModal(false);
      refetch();
    },
    onError: (err: any) => {
      notify("error", err?.response?.data?.error);
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
                SessionHistoryData?.data?.sessions
                  ? SessionHistoryData?.data?.sessions
                  : []
              }
              totalItemsData={SessionHistoryData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              columnsToRemove={[]}
            />

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <h2 className="text-center mt-5">
                {t("Are you sure you can cancel the session?")}
              </h2>
              <Formik
                initialValues={{ reason: "" }}
                onSubmit={(values) => {
                  cancelSession(values);
                }}
              >
                <Form>
                  <div className="p-5 test-start">
                    <TextAreaField
                      // label={t(`${"Reason for cancellation"}`)}
                      name="reason"
                      id="reason"
                      placeholder={t("Reason for cancellation")}
                      className="text-start"
                    />
                    <div className="flex justify-between px-5 mt-5">
                      <Button
                        //  teacherId
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
                  </div>
                </Form>
              </Formik>
            </Modal>
            <ReportModal
              isOpen={openReport}
              onClose={() => setOpenReport(false)}
            >
              <Report
                detailsReport={detailsReport}
                refetch={refetch}
                sessionId={sessionID}
                setOpenReport={setOpenReport}
              />
            </ReportModal>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={SessionHistoryData?.data?.paginate.total_pages}
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

export default SessionHistory;
