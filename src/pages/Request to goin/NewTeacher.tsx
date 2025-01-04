import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import InterviewMene from "../../components/molecules/Select/InterviewMenue";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";

export type NewTeacher = {
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
type NewTeacher_TP = {
  title: string;
};

function NewTeacher({ title }: NewTeacher_TP) {
  const [status, setStatus] = useState<any>(0);
  const [dateFilter, setDateFilter] = useState("");
  const [SpecializationFilter, setSpecializationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [profileCompleteFilter, setProfileCompleteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [interViewStatus, setInterViewStatus] = useState("");
  const [dataTeacherID, setDataTeacherID] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);

  const queryParams = {
    page: page,
    date_range: dateFilter,
    specialization: SpecializationFilter,
    interview_status: interViewStatus,
    is_complete: profileCompleteFilter ? profileCompleteFilter : "",
    is_active: statusFilter ? statusFilter : "",
    gender: typeFilter ? typeFilter : "",
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/getNewTeachers?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: AllTeacher,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
    console.log("🚀 ~ NewTeacher ~ AllTeacher:", AllTeacher)
  // column table
  const cols = useMemo<ColumnDef<NewTeacher>[]>(
    () => [
      {
        header: "#",
        cell: (info: any) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info: any) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.name}
            </Link>
          </div>
        ),
        accessorKey: "name",
      },
      {
        header: `${t("Email")}`,
        cell: (info: any) => (
          <div>
            <a target="_blank" href={`mailto:${info.row.original?.email}`}>
              {info.row.original?.email}
            </a>
          </div>
        ),
        accessorKey: "email",
      },
      {
        header: `${t("Phone")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "phone_all",
      },

      {
        header: `${t("Teacher Chat")}`,
        cell: (info) => <ChatUserTable id={info.row.original?.id} />,
        accessorKey: "chat",
      },
      {
        header: `${t("Country")}`,
        cell: (info: any) => (
          <div className="flex items-center justify-center gap-4">
            <p>
              {info?.row?.original?.country
                ? info?.row?.original?.country?.name
                : "___"}
            </p>
          </div>
        ),
        accessorKey: `nationality`,
      },

      {
        header: `${t("Specialization")}`,
        cell: (info: any) => (
          <ul>
            {" "}
            {Array.isArray(info?.row?.original?.specialization)
              ? info.row.original.specialization.map((item: any) => (
                  <li>{item}</li>
                ))
              : null}
          </ul>
        ),
        accessorKey: "specialization" + "a",
      },
      {
        header: `${t("is_azher")}`,
        cell: (info: any) => (
          <div>{info?.row?.original?.is_azhary == 1 ? t("Yes") : t("No")}</div>
        ),
        accessorKey: "is_azher",
      },
      {
        header: `${t("is_mogaz")}`,
        cell: (info: any) => (
          <div>{info?.row?.original?.is_mogaz == 1 ? t("Yes") : t("No")}</div>
        ),
        accessorKey: "is_mogaz",
      },
      {
        header: `${t("Interview Status")}`,
        cell: (info: any) => (
          <div className=" ">
            <InterviewMene
              setStatus={setStatus}
              data={info.row.original}
              placeholder={info.row.original?.interview_status_text}
              mutate={mutate}
              setDataTeacherID={setDataTeacherID}
            />
          </div>
        ),
        accessorKey: "interview_status",
      },
      {
        header: `${t("activation status")}`,
        cell: (info: any) => (
          <div>
            {info?.row?.original?.activation_status === true ? (
              <p
                className="bg-[#50cd89] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    "هل أنت متأكد؟",
                    "سوف تقوم بإلغاء التفعيل",
                    false,
                    t("done"),
                    true,
                    t("warning"),
                    () => {
                      changeActivation(dataTeacherID);
                    }
                  );
                  setDataTeacherID(info?.row?.original?.id);
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white rounded-md cursor-pointer"
                onClick={() => {
                  if (info?.row?.original?.profile_completed === true) {
                    showAlert(
                      t("Are you sure?"),
                      t("You cannot go back in this process"),
                      false,
                      t("done"),
                      true,
                      "warning",
                      () => {
                        changeActivation(dataTeacherID);
                      }
                    );

                    setDataTeacherID(info?.row?.original?.id);
                  }
                }}
              >
                {t("notactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "activation_status",
      },
      {
        header: `${t("Created At")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Required Hours")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "required_hours",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <Link
            to={`/teacher/newTeacher/DetailsTeacher/${info.row.original.id}`}
            className="flex justify-center gap-2"
          >
            <FaEye className="!w-[22px] !h-[22px] m-auto  text-[#43916d] cursor-pointer" />
          </Link>
        ),
        accessorKey: "join",
      },
    ],
    [i18n.language, page]
  );

  //update status interview teacher
  const { mutate } = useMutate({
    mutationKey: ["teachers/id", dataTeacherID],
    endpoint: `dashboard/teachers/${dataTeacherID}/update-interview-status`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err.response.data.message);
    },
    formData: true,
  });

  //change activation status
  const { mutate: changeActivation, isLoading: loadingActivation } = useMutate({
    mutationKey: [`dashboard/teachers/${dataTeacherID}/activate`],
    endpoint: `dashboard/teachers/${dataTeacherID}/activate`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err);
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
          <div className="col-span-12 ">
            <Table
              data={
                AllTeacher?.data?.teachers ? AllTeacher?.data?.teachers : []
              }
              totalItemsData={AllTeacher?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              //@ts-ignore
              setDateFilter={setDateFilter}
              setWord={setWord}
              setTypeFilter={setTypeFilter}
              setProfileCompleteFilter={setProfileCompleteFilter}
              setStatusFilter={setStatusFilter}
              Specialization
              setSpecializationFilter={setSpecializationFilter}
              type
              interViewStatus
              setInterViewStatus={setInterViewStatus}
              columnsToRemove={[4, 12, 13]}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllTeacher?.data?.paginate.total_pages}
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
export default NewTeacher;
