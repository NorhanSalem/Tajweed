import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddEmploys } from "../../../components/templates/hr/employees/AddEmploys";
import { pagePaginate } from "../../../utils/helpers";
import { useLanguageContext } from "../../../context/language";
import { Helmet } from "react-helmet-async";

export type AllEmployees = {
  id: number;
  name: string;
  job: string;
  salary: number;
  phone: number;
  activation_status: number;
  procedures: string;
  action: string;
};
type AllEmployees_TP = {
  title: string;
};

function Employees({ title }: AllEmployees_TP) {
  const [resetForm, setResetForm] = useState(true);
  const { currentLang } = useLanguageContext();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const [employeeId, setEmployeeId] = useState({});
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState({});
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useState("");
  const cols = useMemo<ColumnDef<AllEmployees>[]>(
    () => [
      {
        header: "#",
        cell: (info) => info.renderValue(),
        accessorKey: "id",
      },
      {
        header: `${t("name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/hr/employees/profile/${info.row.original.id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700 font-normal text-[14px]"
            >
              {info.row.original.name}
            </Link>
          </div>
        ),
        accessorKey: "name",
      },
      {
        header: `${t("Job")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "job",
      },
      {
        header: `${t("Salary")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "salary",
      },
      {
        header: `${t("Phone")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "phone",
      },
      {
        header: `${t("activation status")}`,
        cell: (info) => (
          <div className="flex justify-center">
            {info.row.original.active === 1 ? (
              <p
                className="bg-[#50cd89] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeStatus(employeeId);
                    }
                  );
                  setEmployeeId(info.row.original.id);
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeStatus(employeeId);
                    }
                  );
                  setEmployeeId(info.row.original.id);
                }}
              >
                {t("Inactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "zoom_status",
      },
      {
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_action_user",
      },
      {
        header: `${t("last update Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_action_date",
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
                      deleteEmployee(info?.row?.original?.id);
                      console.log(employeeId);
                    }
                  );
                  setEmployeeId(info?.row?.original?.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [currentLang, page]
  );
  const queryParams = {
    status:  status ,
    page: page,
    date_range: dateFilter,
    pagenate: pagePagination,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/hr/employees?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    data: AllEmployees,
    refetch,
    isFetching,
  } = useFetch({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const { mutate: deleteEmployee, isLoading: loadingDelete } = useMutate({
    mutationKey: [`allEmployees${employeeId}`],
    endpoint: `dashboard/hr/employees/${employeeId}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error",err?.response?.data?.message);
    },
    method: "delete",
    formData: true,
  });
  const { mutate: changeStatus } = useMutate({
    mutationKey: [`dashboard/hr/employees/${employeeId}/activate`],
    endpoint: `dashboard/hr/employees/${employeeId}/activate`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
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
            <div className=" flex justify-end ">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("add employee")}`}
                />
              </div>
            </div>
            <Table
              data={
                //@ts-ignore
                AllEmployees?.data?.employees
                  ? AllEmployees?.data?.employees
                  : []
              }
              // data={0 ? AllStudent?.data?.students : []}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setDateFilter={setDateFilter}
              columnsToRemove={[7]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddEmploys
                refetch={refetch}
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllEmployees?.data?.paginate.total_pages}
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
export default Employees;
