import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddSalariesExpense } from "../../../components/templates/expenses/AddSalariesExpense";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import i18n from "../../../i18n";
import { useDebouncedState } from "@mantine/hooks";
import { Helmet } from "react-helmet-async";

export type SalariesExpenses = {
  [x: string]: string;
};
type SalariesExpenses_TP = {
  title: string;
};

function SalariesExpenses({ title }: SalariesExpenses_TP) {
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [salariesExpensesID, setSalariesExpensesID] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [resetForm, setResetForm] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<SalariesExpenses>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Employee Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "name",
      },
      {
        header: `${t("Expense value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "amount",
      },
      {
        header: `${t("Name manager")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "responsible_name",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  setEditData(info.row.original);
                  setResetForm(false);
                  setSalariesExpensesID(info.row.original.id);
                }}
              />
            </div>

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
                      deleteTeacher(salariesExpensesID);
                      console.log("deleted");
                    }
                  );
                  setSalariesExpensesID(info.row.original.id);
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
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/reports/expenses/salaries-expenses?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: salariesExpenses,
    isRefetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],

    onError(err) {
      console.log(err);
    },
  });
  const deleteEndPont = `dashboard/reports/expenses/salaries-expenses/${salariesExpensesID}`;
  const { mutate: deleteTeacher } = useMutate({
    mutationKey: [deleteEndPont],
    endpoint: deleteEndPont,
    onSuccess: (data: any) => {
      refetch();
      notify("success");
    },
    onError: (err: any) => {
      notify("error", err.response.data?.message
      );
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
            <div className="home-cards   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0  col-span-4 mb-10">
              <div className="flex  justify-between p-2">
                <p>{t("total expenses")}</p>
                <p>
                  {
                    //@ts-ignore
                    salariesExpenses?.total_expenses_amount
                  }
                </p>
              </div>
              <div className="flex  justify-between p-2">
                <p>{t("Total number of invoices")}</p>
                <p>
                  {
                    //@ts-ignore

                    salariesExpenses?.total_expenses_count
                  }
                </p>
              </div>
            </div>
          <div className="col-span-12 ">
            <div className=" flex justify-end items-">
              <div className="">
                <AddButton
                  className="!w-max"
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
                salariesExpenses?.data?.salaries_expenses
                  ? salariesExpenses?.data?.salaries_expenses
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              //@ts-ignore
              setDateFilter={setDateFilter}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[5]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddSalariesExpense
                setModel={setModel}
                editData={editData}
                refetch={refetch}
                resetForm={resetForm}
                salariesExpensesID={salariesExpensesID}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={salariesExpenses?.data?.paginate.total_pages}
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

export default SalariesExpenses;
