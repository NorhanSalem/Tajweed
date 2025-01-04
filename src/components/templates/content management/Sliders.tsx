import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useMemo, useState } from "react"
import * as Yup from "yup"
import { useFetch, useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import DeleteTable from "../../atoms/icons/DeleteTable"
import EditTable from "../../atoms/icons/EditTable"
import NextPaginationIc from "../../atoms/icons/NextPaginationIc"
import { AddButton } from "../../molecules/AddButton"
import { ModalTemplate } from "../../molecules/ModalTemplate"
import showAlert from "../../molecules/ShowAlert"
import Paginate from "../../molecules/table/Paginate"
import { Table } from "../../organisms/tantable/Table"
import { AddGeneralExpense } from "../expenses/AddGeneralExpense"
import { useDebouncedState } from "@mantine/hooks"
import { indexTable, pagePaginate } from "../../../utils/helpers"

export type Sliders = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type Sliders_TP = {
  title: string
}

type Search_TP = {
  search: string
}

const validationSchema = Yup.object({
  search: Yup.string().trim(),
})

function Sliders({ title }: Sliders_TP) {
  const [dataSource, setDataSource] = useState<Sliders[]>([])
  const [open, setOpen] = useState(false)
  const [check, setCheck] = useState(false)

  const cols = useMemo<ColumnDef<Sliders>[]>(
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
                      deleteTeacher(generalExpensesID)
                    }
                  )
                  setSlidersID(info.row.original.id)
                }}
              />
            </div>
            <div>
              <EditTable
                action={() => {
                  setModel(true)
                  setEditData(info.row.original)
                  setSlidersID(info.row.original.id)
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    []
  )

  // state
  const [status, setStatus] = useState<AllTeachers[]>(0)
  const [page, setPage] = useState(0)
  const [dateFilter, setDateFilter] = useState("")
  const [dateFilterAll, setDateFilterAll] = useState("")
  const [generalExpensesID, setSlidersID] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState(false)
  const [resetForm, setResetForm] = useState(false)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [word, setWord] = useDebouncedState("", 300)

  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: genralExponses,
    isRefetching,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/reports/expenses/general-expenses?page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&search=${word ? word : ""}`,
    queryKey: [
      `dashboard/reports/expenses/general-expenses`,
      page,
      pagePagination,
      word,
    ],
    onSuccess(data) {
      setDataSource(data)
    },
    onError(err) {
    },
  })

  //Delete❌
  const { mutate: deleteTeacher, isLoading: loadingDelete } = useMutate({
    mutationKey: [
      `delete/dashboard/reports/expenses/general-expenses/${generalExpensesID}`,
    ],
    endpoint: `dashboard/reports/expenses/general-expenses/${generalExpensesID}`,
    onSuccess: (data: any) => {
      notify("success")
      setOpenModal(false)
      refetch()
    },
    onError: (err) => {
      notify("error", err)
      setOpenModal(false)
    },
    method: "delete",
    formData: true,
  })

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage)
  }

  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className=" flex justify-end items-">
            <div className="">
              <AddButton
                action={() => {
                  // setEditData(true)
                  setModel(true)
                  setResetForm(true)
                }}
                addLabel={`${t("add general expense")}`}
              />
            </div>
          </div>

          <Table
            data={
              genralExponses?.data?.general_expenses
                ? genralExponses?.data?.general_expenses
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
          />

          {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h2 className='text-start mt-5'>هل أنت متأكد من حذف هذا المصروف</h2>
            <div className='flex justify-between px-5 mt-5'>
              <Button
                action={() => deleteTeacher(generalExpensesID)}
                loading={loadingDelete}
              >
                حذف
              </Button>
              <Button onClick={() => setOpenModal(false)} variant='danger'>
                إلغاء
              </Button>
            </div>
          </Modal> */}

          <ModalTemplate
            isOpen={model}
            onClose={() => {
              setModel(false)
            }}
          >
            <AddGeneralExpense
              setModel={setModel}
              editData={editData}
              resetForm={resetForm}
              generalExpensesID={generalExpensesID}
            />
          </ModalTemplate>

          <div className="flex justify-end mt-3">
            <Paginate
              pagesCount={dataSource?.data?.paginate.total_pages}
              previousLabel={<Prevpaginationnation />}
              nextLabel={<NextPaginationIc />}
              onPageChange={handlePageChange}
              initialPage={page}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sliders
