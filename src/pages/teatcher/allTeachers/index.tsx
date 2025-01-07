import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiSolidChat } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { Modal } from "../../../components/molecules";
import Actions from "../../../components/molecules/Actions/Actions";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddTeacher } from "../../../components/templates/Teacher/AddTeacher";
import ChangeOrder from "../../../components/templates/Teacher/ChangeOrder";
import TransferRevenueModal from "../../../components/templates/Teacher/TranseferRevenueModal";
import UpdateHourlyTeacher from "../../../components/templates/Teacher/UpdateHourlyTeacher";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { LoginForm } from "../../../components/templates/login/LoginForm";

export type AllTeachers = {
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
  order: string;
  activation_status: boolean;
  zoom_status: string;
  profile_completed: boolean;
  teacher_profile: {
    total_profit: string;
  };
};
type AllTeachers_TP = {
  title: string;
};

function AllTeachers({ title }: AllTeachers_TP) {
  const [dateFilter, setDateFilter] = useState<any>("");
  const [SpecializationFilter, setSpecializationFilter] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [changeOrderModal, setChangeOrderModal] = useState(false);
  const [isOpenHourlyDate, setIsOpenHourlyDate] = useState(false);
  const [dataTeacherID, setDataTeacherID] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [word, setWord] = useDebouncedState("", 300);
  const [resetForm, setResetForm] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [editData, setEditData] = useState(false);
  const [model, setModel] = useState(false);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<AllTeachers>[]>(
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
            <Link target="_blank" to={`mailto:${info.row.original?.email}`}>
              {info.row.original?.email}
            </Link>
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
        cell: (info: any) => info.renderValue(),
        accessorKey: `country.name`,
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
            {info.row?.original?.teacher_profile?.available_balance}
          </div>
        ),
        accessorKey: "available_balance",
      },
      {
        header: `${t("order")}`,
        cell: (info) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setDataTeacherID(info.row?.original);
              setChangeOrderModal(true);
            }}
          >
            {info.row?.original?.order}
          </div>
        ),
        accessorKey: "order",
      },
      {
        header: `${t("Class")}`,
        cell: (info) => (
          <div className="flex gap-1 justify-evenly">
            <a
              className="bg-[#5cb85c]  p-2 rounded-md text-white"
              href={`/details-incoming-session-teacher/Incoming/${info.row.original?.id}`}
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
      {
        header: `${t("login from ")}`,
        cell: (info) => (
          <div className="flex gap-1 justify-evenly">
            <span
              className={` p-2 rounded-md text-white ${
                info.row.original?.loginType?.type === "web"
                  ? "bg-[#5cb85c]"
                  : "bg-[#5c9bb8]"
              } `}
            >
              {info.row.original?.loginType?.type}
            </span>
          </div>
        ),
        accessorKey: "last_update.update_at",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    date_range: dateFilter,
    specialization: SpecializationFilter ? SpecializationFilter : "",
    is_active: statusFilter ? statusFilter : "",
    gender: typeFilter ? typeFilter : "",
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

  const { mutate: changeActivation } = useMutate({
    mutationKey: [`dashboard/teachers/${dataTeacherID}/activate`],
    endpoint: `dashboard/teachers/${dataTeacherID}/activate`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });

  const transformData = (
    allTeachers: AllTeachers[]
  ): {
    id: number;
    name: string;
    email?: string; // Email is not in the original type, so it's optional if it might not be present
    phone_all: string;
    country: string;
    total_subscriptions: string;
    timezone: string;
    hourly_rate: string;
    created_at: string;
    delay_time: string;
    required_hours: string;
    available_balance: string;
    order: string;
    last_update: string;
  }[] => {
    return allTeachers.map((teacher, index) => ({
      id: index + 1, // Assumes you want a 1-based index for display
      name: teacher.name,
      email: teacher.whatsapp, // There's no 'email' field in your type, so I'm using 'whatsapp' as a placeholder
      phone_all: teacher.Phone, // Uppercase 'Phone' as per your type definition
      country: teacher.state_name || "", // Assuming country info is stored in 'state_name'
      total_subscriptions: teacher.total_subscriptions,
      timezone: teacher.zoom_status, // Using 'zoom_status' for timezone
      hourly_rate: teacher.teacher_profile.total_profit, // Assuming 'total_profit' is the hourly rate
      created_at: teacher.created_at,
      delay_time: teacher.required_hours, // Assuming 'required_hours' as the delay time
      required_hours: teacher.required_hours,
      available_balance: teacher.teacher_profile.total_profit, // Using 'total_profit' as available balance
      order: teacher.order,
      last_update: teacher.join, // Using 'join' as the last update name
    }));
  };

  // const allTeachers = useMemo(() => {
  //   if (isSuccess && AllTeacher) {
  //     return transformData(AllTeacher?.data?.teachers);
  //   }
  //   return [];
  // }, [isSuccess, AllTeacher]);

  const allTeachers = useMemo(() => {
    if (isSuccess && AllTeacher?.data?.teachers?.length) {
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
        header: `${t("Available Balance")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "available_balance",
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
            <div className=" flex justify-end items mb-4">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add")}`}
                />
              </div>
            </div>

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
              dataExcell={allTeachers}
              customColumnExcell={customColumnExcell}
              setStatusFilter={setStatusFilter}
              Specialization
              setSpecializationFilter={setSpecializationFilter}
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
            <TransferRevenueModal
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              data={data}
              refetch={refetch}
            />
            <UpdateHourlyTeacher
              setIsOpen={setIsOpenHourlyDate}
              isOpen={isOpenHourlyDate}
              data={data}
              refetch={refetch}
            />
            <Modal
              isOpen={changeOrderModal}
              onClose={() => {
                setChangeOrderModal(false);
              }}
            >
              <ChangeOrder
                data={dataTeacherID}
                refetch={refetch}
                setChangeOrderModal={setChangeOrderModal}
              />
            </Modal>

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
export default AllTeachers;
