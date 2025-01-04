import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddCompensations } from "../../../components/templates/hr/compensations/AddCompensations";
import { useLanguageContext } from "../../../context/language";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { Helmet } from "react-helmet-async";

export type AllCompensations = {
  date: Date;
  name: string;
  type: string;
  value: string;
  note: string;
  employee_id: string;
  employee_name: string;
  id: string;
  last_action_user: string;
  last_action_date: string;
};
type AllCompensations_TP = {
  title: string;
};

function Compensations({ title }: AllCompensations_TP) {
  const [resetForm, setResetForm] = useState(true);
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const [typeCompensationsFilter, setTypeCompensationsFilter] = useState("");
  const [compensationsId, setCompensationsId] = useState({});
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>();
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useState("");

  const cols = useMemo<ColumnDef<AllCompensations>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Type")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "type_text",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={
                `/hr/employees/profile/${info.row.original.employee_id}`

                // setEmployeeId(info.row.original.employee_id)
                // console.log(EmployeeId)
              }
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.employee_name}
            </Link>
          </div>
        ),
        accessorKey: "employee_name",
      },
      {
        header: `${t("value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "value",
      },
      {
        header: `${t("note")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "note",
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
                    ` ${t("Are you sure?")}`,
                    `  ${t("You cannot go back in this process")}`,
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      deleteCompensations(compensationsId);
                    }
                  );
                  setCompensationsId(info?.row?.original?.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("last action")}`,
        cell: (info) => (
          <div>
            <h2>{info?.row?.original?.last_action_user}</h2>
            <h2>{info?.row?.original?.last_action_date}</h2>
          </div>
        ),
        accessorKey: "join",
      },
    ],
    [currentLang, page]
  );
  const queryParams = {
    pagenate: pagePagination,
    date_range: dateFilter,
    search: word ? word : "",
    page: page,
    type: typeCompensationsFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/hr/compensations?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: AllCompensations,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
    console.log("🚀 ~ Compensations ~ AllCompensations:", AllCompensations)
  const { mutate: deleteCompensations, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/hr/compensations/${compensationsId}`],
    endpoint: `dashboard/hr/compensations/${compensationsId}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
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
      <div className="bg-white p-3 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className=" flex justify-end ">
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
                AllCompensations?.data?.compensations
                  ? AllCompensations?.data?.compensations
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setDateFilter={setDateFilter}
              typeCompensations={setTypeCompensationsFilter}
              columnsToRemove={[6]}
              setWord={setWord}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddCompensations
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllCompensations?.data?.paginate.total_pages}
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
export default Compensations;
