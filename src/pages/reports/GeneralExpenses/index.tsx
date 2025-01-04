import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddGeneralExpense } from "../../../components/templates/expenses/AddGeneralExpense";
import { useFetch, useMutate } from "../../../hooks";
import { pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import i18n from "../../../i18n";
import { Helmet } from "react-helmet-async";

export type GeneralExpenses = {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
};
type GeneralExpenses_TP = {
  title: string;
};

function GeneralExpenses({ title }: GeneralExpenses_TP) {
  // state
  const [page, setPage] = useState(0);
  const [generalExpensesID, setGeneralExpensesID] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState("");

  const cols = useMemo<ColumnDef<GeneralExpenses>[]>(
    () => [
      {
        header: "#",
        cell: (info) => info.renderValue(),
        accessorKey: "id",
      },
      {
        header: `${t("Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("name")}`,
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
                  //@ts-ignore
                  setEditData(info.row.original);
                  setResetForm(false);
                  setGeneralExpensesID(info.row.original.id);
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
                      deleteTeacher(generalExpensesID);
                      console.log("deleted");
                    }
                  );
                  setGeneralExpensesID(info.row.original.id);
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
  const endpoint = `dashboard/reports/expenses/general-expenses?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    refetch,
    data: generalExpanses,
    isRefetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  const DeleteEndPOint = `dashboard/reports/expenses/general-expenses/${generalExpensesID}`;
  const { mutate: deleteTeacher } = useMutate({
    mutationKey: [DeleteEndPOint],
    endpoint: DeleteEndPOint,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
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
            <p>{t("total general expenses")}</p>
            <p>
              {
                //@ts-ignore
                generalExpanses?.sum
              }
            </p>
          </div>
          <div className="flex  justify-between p-2">
            <p>{t("Total number of invoices")}</p>
            <p>
              {
                //@ts-ignore

                generalExpanses?.count
              }
            </p>
          </div>
        </div>
        <div className=" flex justify-end col-span-8 ">
          <div className="">
            <AddButton
              className="!w-max"
              action={() => {
                // setEditData(true)
                setModel(true);
                setResetForm(true);
              }}
              addLabel={`${t("add general expense")}`}
            />
          </div>
        </div>
        <div className="col-span-12 ">
          <Table
            data={
              generalExpanses?.data?.general_expenses
                ? generalExpanses?.data?.general_expenses
                : []
            }
            showNavigation
            columns={cols ? cols : []}
            isSuccess={isSuccess}
            isLoading={isLoading}
            //@ts-ignore
            isRefetching={isRefetching}
            columnsToRemove={[5]}
            setPagePagination={setPagePagination}
            setWord={setWord}
            //@ts-ignore

            setDateFilter={setDateFilter}

          />

          <ModalTemplate
            isOpen={model}
            onClose={() => {
              setModel(false);
            }}
          >
            <AddGeneralExpense
              setModel={setModel}
              editData={editData}
              resetForm={resetForm}
              refetch={refetch}
              generalExpensesID={generalExpensesID}
            />
          </ModalTemplate>

          <div className="flex justify-end mt-3">
            <Paginate
              pagesCount={generalExpanses?.data?.paginate.total_pages}
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

export default GeneralExpenses;
