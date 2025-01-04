import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiSolidChat } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Button } from "../../components/atoms";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { Link } from "react-router-dom";
import Actions from "../../components/molecules/Actions/Actions";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import { AddTeacher } from "../../components/templates/Teacher/AddTeacher";
import { AllTeachers } from "../teatcher/allTeachers";
import UpdateHourlyTeacher from "../../components/templates/Teacher/UpdateHourlyTeacher";
import TransferRevenueModal from "../../components/templates/Teacher/TranseferRevenueModal";

export type InActiveTeachers = {
  id: string;
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
  activation_status: boolean;
  zoom_status: string;
  profile_completed: boolean;
  teacher_profile: {
    total_profit: string;
  };
};
type InActiveTeachers_TP = {
  title: string;
};

function InActiveTeachers({ title }: InActiveTeachers_TP) {
  const [dateFilter, setDateFilter] = useState<any>("");
  const [SpecializationFilter, setSpecializationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [interViewStatus, setInterViewStatus] = useState("");
  const [isOpenHourlyDate, setIsOpenHourlyDate] = useState(false);
  const [dataTeacherID, setDataTeacherID] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [resetForm, setResetForm] = useState(true);
  const [editData, setEditData] = useState(false);
  const [model, setModel] = useState(false);
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<InActiveTeachers>[]>(
    () => [
      {
        header: "#",
        cell: (info: any) => <span>{info?.row?.index + 1}</span>,
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
        header: `${t("chat")}`,
        cell: (info) => (
          <div
            onClick={() => navigate(`/chat/all/${info.row.original.id}`)}
            className="cursor-pointer  flex justify-center"
          >
            <BiSolidChat className="!w-[20px] h-[20px]" />
          </div>
        ),
        accessorKey: "chat",
      },
      {
        header: `${t("Country")}`,
        cell: (info: any) => (
          <div className="flex items-center justify-center gap-4">
            <p>{info?.row?.original?.country.name}</p>
          </div>
        ),
        accessorKey: `country`,
      },

      {
        header: `${t("Total Subscriptions")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "total_subscriptions",
      },
      {
        header: `${t("time zone")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "timezone",
      },
      {
        header: `${t("Hour Price")}`,
        cell: (info: any) => (
          <div
            className="cursor-pointer border p-1 border-dashed rounded-md border-mainBlue"
            onClick={() => {
              setIsOpenHourlyDate(true);
              setData(info.row?.original);
            }}
          >
            {info.row.original?.hourly_rate}
          </div>
        ),
        accessorKey: "hourly_rate",
      },

      {
        header: `${t("activation status")}`,
        cell: (info) => (
          <div>
            {info?.row?.original?.activation_status === true ? (
              <p
                className="bg-[#50cd89] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You will deactivate"),
                    false,
                    t("done"),
                    true,
                    //@ts-ignore
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
                      t("You will activate"),
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
                {t("Inactive")}
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
        header: `${t("Teacher Delay")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "delay_time",
      },
      {
        header: `${t("Required Hours")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "required_hours",
      },
      {
        header: `${t("Available Balance")}`,
        cell: (info) => (
          <div
            className="cursor-pointer border p-1 border-dashed rounded-md border-mainBlue"
            onClick={() => {
              setIsOpen(true);
              setData(info.row?.original);
            }}
          >
            {info.row?.original?.teacher_profile?.total_profit}
          </div>
        ),
        accessorKey: "total_profit",
      },
      {
        header: `${t("order")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "order",
      },
      {
        header: `${t("Class")}`,
        cell: (info) => (
          <div className="flex gap-1 justify-evenly">
            <a
              className="bg-[#5cb85c]  p-2 rounded-md text-white"
              href={`/details-incoming-session-student/Incoming/${info.row.original?.id}`}
              target="_blank"
            >
              {t("Incoming classes")}
            </a>
            <a
              className="bg-[#292b2c]  p-2 rounded-md text-white"
              href={`/details-incoming-session-teacher/Finished/${info.row.original?.id}`}
              target="_blank"
            >
              {t("Past")}
            </a>
          </div>
        ),
        accessorKey: "actions",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <Actions
              deleteTeacher
              info={info}
              Id_teacher={info?.row?.original?.id}
              refetch={refetch}
              setDataTeacherID={setDataTeacherID}
              Edit
              setResetForm={setResetForm}
              setEditData={setEditData}
              setModel={setModel}
            />
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update.name",
      },
      {
        header: `${t("last update Date")}`,
        cell: (info) => <div>{info.row.original?.last_update?.update_at}</div>,
        accessorKey: "last_update.update_at",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    date_range: dateFilter,
    specialization: SpecializationFilter ? SpecializationFilter : "",
    is_active: "0",
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers?${searchParams.toString()}`;

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
  const transformData = (allTeachers: any) => {
    return allTeachers?.map((teacher, index) => ({
      id: index + 1, // Assumes you want a 1-based index for display
      name: teacher.name,
      email: teacher.email,
      phone_all: teacher.phone,
      country: teacher.country?.name || "", // Assuming country is an object with a name property
      total_subscriptions: teacher?.teacher_profile.total_subscriptions,
      timezone: teacher.timezone,
      hourly_rate: teacher.hourly_rate,
      created_at: teacher.created_at,
      delay_time: teacher.delay_time,
      required_hours: teacher.required_hours,
      available_balance: teacher?.teacher_profile.available_balance,
      order: teacher.order,
      last_update: teacher.last_update?.name,
    }));
  };
  const allTeachers = useMemo(() => {
    if (isSuccess && AllTeacher) {
      return transformData(AllTeacher?.data?.teachers);
    }
    return [];
  }, [isSuccess, AllTeacher]);
  const customColumnExcell = useMemo<ColumnDef<AllTeachers>[]>(
    () => [
      {
        header: "#",
        cell: (info: any) => <span>{info?.row?.index + 1}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "name",
      },
      {
        header: `${t("Email")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "email",
      },
      {
        header: `${t("Phone")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "phone_all",
      },

      {
        header: `${t("Country")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: `country`,
      },

      {
        header: `${t("Total Subscriptions")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "total_subscriptions",
      },
      {
        header: `${t("time zone")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "timezone",
      },
      {
        header: `${t("Hour Price")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "hourly_rate",
      },
      {
        header: `${t("Created At")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Teacher Delay")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "delay_time",
      },
      {
        header: `${t("Required Hours")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "required_hours",
      },

      {
        header: `${t("order")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "order",
      },

      {
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update",
      },
      {
        header: `${t("last update Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update",
      },
    ],
    [i18n.language, page]
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
          <div className="col-span-12 ">
            <Table
              data={
                AllTeacher?.data?.teachers ? AllTeacher?.data?.teachers : []
              }
              totalItemsData={AllTeacher?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setDateFilter={setDateFilter}
              setWord={setWord}
              setTypeFilter={setTypeFilter}
              setStatusFilter={setStatusFilter}
              Specialization
              setSpecializationFilter={setSpecializationFilter}
              setInterViewStatus={setInterViewStatus}
              dataExcell={allTeachers}
              customColumnExcell={customColumnExcell}
              columnsToRemove={[4, 5, 13, 14]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddTeacher
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <UpdateHourlyTeacher
              setIsOpen={setIsOpenHourlyDate}
              isOpen={isOpenHourlyDate}
              data={data}
              refetch={refetch}
            />
            <TransferRevenueModal
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              data={data}
              refetch={refetch}
            />
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllTeacher?.data?.paginate?.total_pages}
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
export default InActiveTeachers;
