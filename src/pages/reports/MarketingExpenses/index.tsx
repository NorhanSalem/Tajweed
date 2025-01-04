import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";

import { useDebouncedState } from "@mantine/hooks";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddMarketingExpense } from "../../../components/templates/expenses/AddMarketingExpense";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";

export type MarketingExpenses = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type MarketingExpenses_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

const validationSchema = Yup.object({
  search: Yup.string().trim(),
});

function MarketingExpenses({ title }: MarketingExpenses_TP) {
  const [dataSource, setDataSource] = useState<MarketingExpenses[]>([]);

  const cols = useMemo<ColumnDef<MarketingExpenses>[]>(
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
        header: `${t("Name of the expense")}`,
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
                      deleteTeacher(markeingExpensesID);
                      console.log("deleted");
                    }
                  );
                  setMarketingExpensesID(info.row.original.id);
                }}
              />
            </div>

            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  setEditData(info.row.original);
                  setResetForm(false);
                  setMarketingExpensesID(info.row.original.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    []
  );

  // state
  const [status, setStatus] = useState<AllTeachers[]>(0);
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [dateFilterAll, setDateFilterAll] = useState("");
  const [markeingExpensesID, setMarketingExpensesID] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [pagePagination, setPagePagination] = useState(20);
  const [word, setWord] = useDebouncedState("", 300);
  const total = dataSource.data?.paginate?.total;
  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: marketingExpenses,
    isRefetching,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/reports/expenses/marketing-expenses?page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&search=${word ? word : ""}`,
    queryKey: [
      `dashboard/reports/expenses/marketing-expenses`,
      page,
      pagePagination,
      word,
    ],
    onSuccess(data) {
      setDataSource(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  //Delete❌
  const { mutate: deleteTeacher, isLoading: loadingDelete } = useMutate({
    mutationKey: [
      `delete/dashboard/reports/expenses/marketing-expenses/${markeingExpensesID}`,
    ],
    endpoint: `dashboard/reports/expenses/marketing-expenses/${markeingExpensesID}`,
    onSuccess: (data: any) => {
      notify("success");
      setOpenModal(false);
      refetch();
    },
    onError: (err) => {
      notify("error", err);
      setOpenModal(false);
    },
    method: "delete",
    formData: true,
  });
  useEffect(() => {
    if (page > 0) {
      refetch();
    }
  }, [page, status]);
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12 ">
          <div className=" flex justify-end items-">
            <div className="">
              <AddButton
                className="!w-max"
                action={() => {
                  // setEditData(true)
                  setModel(true);
                  setResetForm(true);
                }}
                addLabel={`${t("add marketing expense")}`}
              />
            </div>
          </div>

          <Table
            data={
              marketingExpenses?.data?.marketing_expenses
                ? marketingExpenses?.data?.marketing_expenses
                : []
            }
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isRefetching={isRefetching}
            setDateFilter={setDateFilter}
            setDateFilterAll={setDateFilterAll}
            setPagePagination={setPagePagination}
            columnsToRemove={[5]}
          />

          {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h2 className='text-start mt-5'>هل أنت متأكد من حذف هذا المصروف</h2>
            <div className='flex justify-between px-5 mt-5'>
              <Button
                action={() => deleteTeacher(markeingExpensesID)}
                loading={loadingDelete}
              >
              {t("Delete")}
              </Button>
              <Button onClick={() => setOpenModal(false)} variant='danger'>
                إلغاء
              </Button>
            </div>
          </Modal> */}

          <ModalTemplate
            isOpen={model}
            onClose={() => {
              setModel(false);
            }}
          >
            <AddMarketingExpense
              setModel={setModel}
              editData={editData}
              resetForm={resetForm}
              markeingExpensesID={markeingExpensesID}
            />
          </ModalTemplate>

          <div className="flex justify-end mt-3">
            <Paginate
              pagesCount={dataSource?.data?.paginate.total_pages}
              previousLabel={<Prevpagination />}
              nextLabel={<NextPaginationIc />}
              onPageChange={handlePageChange}
              initialPage={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingExpenses;
