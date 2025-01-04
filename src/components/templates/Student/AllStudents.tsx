import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { BiSolidChat } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { notify } from "../../../utils/toast";
import { Button } from "../../atoms";
import DeleteTable from "../../atoms/icons/DeleteTable";
import EditTable from "../../atoms/icons/EditTable";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../atoms/icons/prevpagination";
import { Modal } from "../../molecules";
import { AddButton } from "../../molecules/AddButton";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import showAlert from "../../molecules/ShowAlert";
import Paginate from "../../molecules/table/Paginate";
import { Table } from "../../organisms/tantable/Table";
import { AddStudent } from "./AddStudent";
import { WalletStudent } from "./WalletStudent";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { Helmet } from "react-helmet-async";
import ActivateStudent from "./ActivateStudent";

export type AllStudents = {
  id: number;
  name: string;
  phone: string;
  country: {
    name: string;
  };
  total_paid: string;
  created_at: string;
  activation_status: number;
  zoom_status: string;
  wallet_balance: {
    wallet: string;
  };
  student_profile: {
    total_unbooked_sessions: string;
  };
};
type AllStudents_TP = {
  title: string;
};

function AllStudents({ title }: AllStudents_TP) {
  const [resetForm, setResetForm] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const [typeFilter, setTypeFilter] = useState("");
  const [studentId, setStudentId] = useState({});
  const [model, setModel] = useState(false);
  const [modelWallet, setModelWallet] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [country, setCountry] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<AllStudents>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.name.length > 50
                ? info.row.original.name.slice(0, 30) + "..."
                : info.row.original.name}
            </Link>
          </div>
        ),
        accessorKey: "name",
      },
       {
        header: `${t("Gender")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "gender",
      },
      {
        header: `${t("EMAIL")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "email",
      },
      // {
      //   header: `${t("Phone")}`,
      //   cell: (info) => info.renderValue(),
      //   accessorKey: "phone_all",
      // },
      {
        header: `${t("time zone")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "timezone",
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
        cell: (info) => (
          <div>
            {info.row.original.country.name
              ? info.row.original.country.name
              : "_"}
          </div>
        ),
        accessorKey: "country",
      },
      {
        header: `${t("Total Paid")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total_paid",
      },
      {
        header: `${t("Wallet Balance")}`,
        cell: (info) => (
          <div
            className="cursor-pointer border-mainBlue border rounded-md"
            onClick={() => {
              setStudentId(info?.row?.original?.id);

              setModelWallet(true);
            }}
          >
            {info.row.original.wallet_balance.wallet
              ? info.row.original.wallet_balance.wallet
              : 0}
          </div>
        ),
        accessorKey: "wallet_balance.wallet",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },

      {
        header: `${t("activation status")}`,
        cell: (info) => <ActivateStudent info={info} refetch={refetch} />,
        accessorKey: "zoom_status",
      },
      {
        header: `${t("remaining classes")}`,
        cell: (info) => (
          <div>
            {info?.row?.original?.student_profile?.total_unbooked_sessions}
          </div>
        ),
        accessorKey: "total_unbooked_sessions",
      },
      {
        header: `${t("Upcoming classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_profile.total_incomming",
      },
      {
        header: `${t("Class")}`,
        cell: (info) => (
          <div className="flex gap-2 justify-evenly">
            <Link
              className="bg-[#5cb85c] p-2 rounded-md text-white"
              to={`/details-incoming-session-student/Incoming/${info.row.original?.id}`}
            >
              {t("Incoming classes")}
            </Link>
            <Link
              className="bg-[#292b2c] p-2 rounded-md text-white"
              to={`/details-incoming-session-student/Finished/${info.row.original?.id}`}
            >
              {t("Past")}
            </Link>
          </div>
        ),
        accessorKey: "actions",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  setEditData(info?.row?.original);
                  setResetForm(false);
                }}
              />
            </div>
            <div>
              <DeleteTable
                className="cursor-pointer"
                action={() => {
                  showAlert(
                    `${t("Are you sure?")}`,
                    `${t("You cannot go back in this process")}`,
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      deleteStudent(studentId);
                    }
                  );
                  setStudentId(info?.row?.original?.id);
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
    date_range: dateFilter,
    gender: typeFilter ? typeFilter : "",
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    country: country,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/students?${searchParams.toString()}`;
  //all data
  const {
    isLoading,
    isSuccess,
    data: AllStudent,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  console.log("🚀 ~ AllStudents ~ AllStudent:", AllStudent);

  //Delete Student
  const { mutate: deleteStudent, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/students/${studentId}`],
    endpoint: `dashboard/students/${studentId}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.message);
    },
    method: "delete",
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
            <div className=" flex justify-end ">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("add student")}`}
                />
              </div>
            </div>
            <Table
              data={
                AllStudent?.data?.students ? AllStudent?.data?.students : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setDateFilter={setDateFilter}
              setWord={setWord}
              setTypeFilter={setTypeFilter}
              setCountry={setCountry}
              country
              type
              columnsToRemove={[4, 12]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddStudent
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <Modal isOpen={modelWallet} onClose={() => setModelWallet(false)}>
              <WalletStudent
                setModel={setModelWallet}
                refetch={refetch}
                studentId={studentId}
              />
            </Modal>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllStudent?.data?.paginate.total_pages}
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
export default AllStudents;
