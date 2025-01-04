import { useMemo, useState } from "react";
import { BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useDebouncedState } from "@mantine/hooks";
import showAlert from "../../../../components/molecules/ShowAlert";
import { useFetch, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import Paginate from "../../../../components/molecules/table/Paginate";
import Prevpagination from "../../../../components/atoms/icons/prevpagination";
import NextPaginationIc from "../../../../components/atoms/icons/NextPaginationIc";
import { Table } from "../../../../components/organisms/tantable/Table";
import i18n from "../../../../i18n";
import { t } from "i18next";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import ChatUserTable from "../../../../components/molecules/ChatUserTable";
import { Helmet } from "react-helmet-async";

interface EditRequest {
  id: number;
  created_at: string;
  old: {
    name: string;
  };
  status: string;
  status_en: string;
}

interface TeacherProfileEditRequestsData {
  data: {
    edits: EditRequest[];
    paginate: {
      total: number;
      total_pages: number;
    };
  };
}

function TeacherEditProfileRequests({ title }: any) {
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [requestId, setRequestId] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  const { mutate: acceptEditRequest } = useMutate({
    mutationKey: [`dashboard/editRequests/accept/${requestId}`],
    endpoint: `dashboard/editRequests/accept/${requestId}`,
    onSuccess: () => {
      notify("success");
      refetch();
    },
    onError: () => {
      notify("error");
    },
  });

  const { mutate: declineEditRequest, isLoading: declineEditRequestLoading } =
    useMutate({
      mutationKey: [`dashboard/editRequests/decline/${requestId}`],
      endpoint: `dashboard/editRequests/decline/${requestId}`,
      onSuccess: () => {
        notify("success");
        refetch();
      },
      onError: () => {
        notify("error");
      },
    });

  const cols = useMemo<ColumnDef<EditRequest>[]>(
    () => [
      {
        header: "##",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Edit Request Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row?.original.old.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info?.row?.original?.old?.name}
            </Link>
          </div>
        ),
        accessorKey: "old",
      },
      {
        header: `${t("Teacher Chat")}`,
        cell: (info) => <ChatUserTable id={info.row?.original.old.id} />,
        accessorKey: "chat",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "status",
      },
      {
        header: "",
        cell: (info) => (
          <div className="flex items-center gap-3 justify-center">
            <Link
              to={`/teacher/profile/edit-requests/${info?.row?.original?.id}`}
            >
              <BsEye />
            </Link>
            {info?.row?.original?.status_en === "Pending" && (
              <div className="flex gap-3">
                <button
                  className="bg-[lightgreen] px-3 py-1 rounded-xl"
                  onClick={() =>
                    handleRequestAction(
                      info?.row?.original?.id,
                      acceptEditRequest
                    )
                  }
                >
                  {t("Accept")}
                </button>
                <button
                  className="bg-red-300 px-3 py-1 rounded-xl"
                  onClick={() =>
                    handleRequestAction(
                      info?.row?.original?.id,
                      declineEditRequest
                    )
                  }
                >
                  {t("Decline")}
                </button>
              </div>
            )}
          </div>
        ),
        accessorKey: "id",
      },
    ],

    [i18n.language, page]
  );

  const queryParams = {
    status: requestStatus ? requestStatus : "",
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    date_range: dateFilter,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/editRequests?${searchParams.toString()}`;
  const {
    data: teacherProfileEditRequests,
    isRefetching,
    isSuccess,
    refetch,
    isLoading,
    isFetching,
  } = useFetch<TeacherProfileEditRequestsData>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  console.log(
    "🚀 ~ TeacherEditProfileRequests ~ teacherProfileEditRequests:",
    teacherProfileEditRequests
  );

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleRequestAction = (id: string, action: () => void) => {
    setRequestId(id);
    showAlert(
      action === acceptEditRequest
        ? t("Accept Edit Request?")
        : t("Decline Edit Request?"),
      t(""),
      false,
      t("done"),
      true,
      "warning",
      action
    );
  };
  const pagesCount = teacherProfileEditRequests?.data?.paginate.total_pages;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="home-cards flex  justify-between   rounded-xl p-3 px-[1.7rem]  dark:bg-dark-primary dark:border-0  col-span-12 mb-10">
            <div className="flex  justify-between p-2 border rounded-md gap-2">
              <p>{t("All request")} :</p>
              <p>
                {
                  //@ts-ignore
                  teacherProfileEditRequests?.all_requests
                }
              </p>
            </div>
            <div className="flex  justify-between p-2 border rounded-md gap-2">
              <p>{t("Accept request")} :</p>
              <p>
                {" "}
                {
                  //@ts-ignore

                  teacherProfileEditRequests?.accepted_requests
                }
              </p>
            </div>
            <div className="flex  justify-between p-2 border rounded-md gap-2">
              <p>{t("Declined request")} :</p>
              <p>
                {" "}
                {
                  //@ts-ignore

                  teacherProfileEditRequests?.declined_requests
                }
              </p>
            </div>
          </div>
          <div className="col-span-12 ">
            <Table
              data={teacherProfileEditRequests?.data?.edits || []}
              //@ts-ignore
              totalItemsData={teacherProfileEditRequests?.data?.paginate?.total}
              showNavigation
              columns={cols || []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setRequestStatus={setRequestStatus}
              requestStatus
              //@ts-ignore
              setDateFilter={setDateFilter}
              columnsToRemove={[4]}
            />
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={pagesCount ? pagesCount : 1}
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

export default TeacherEditProfileRequests;
