import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
import { useFetch, useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import DeleteTable from "../../atoms/icons/DeleteTable"
import EditTable from "../../atoms/icons/EditTable"
import NextPaginationIc from "../../atoms/icons/NextPaginationIc"
import Prevpagination from "../../atoms/icons/prevpagination"
import { AddButton } from "../../molecules/AddButton"
import { ModalTemplate } from "../../molecules/ModalTemplate"
import showAlert from "../../molecules/ShowAlert"
import Paginate from "../../molecules/table/Paginate"
import { Table } from "../../organisms/tantable/Table"
import { AddSponsorsRevenues } from "./AddSponsorsRevenues"
import { indexTable, pagePaginate } from "../../../utils/helpers"

export type SponsorsRevenues = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type SponsorsRevenues_TP = {
  title: string
}

type Search_TP = {
  search: string
}

const validationSchema = Yup.object({
  search: Yup.string().trim(),
})
function SponsorsRevenues({ title }: SponsorsRevenues_TP) {
  const [dataSource, setDataSource] = useState<SponsorsRevenues[]>([])
  const [open, setOpen] = useState(false)
  const [check, setCheck] = useState(false)

  const cols = useMemo<ColumnDef<SponsorsRevenues>[]>(
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
        header: `${t("amount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "amount",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true)
                  setEditData(info.row.original)
                  setResetForm(false)
                }}
              />
            </div>

            <div>
              <DeleteTable
                className="cursor-pointer"
                action={() => {
                  showAlert(
                    t("Are you sure?"),
                    "You cannot go back in this process",
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      deleteSponsorsRevenues(dataSponsorsRevenuesID)
                      console.log("deleted")
                    }
                  )
                  setDataSponsorsRevenuesID(info.row.original.id)
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
  const [status, setStatus] = useState<SponsorsRevenues[]>(0)
  const [page, setPage] = useState(0)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [dateFilter, setDateFilter] = useState("")
  const [dateFilterAll, setDateFilterAll] = useState("")
  const [dataSponsorsRevenuesID, setDataSponsorsRevenuesID] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState(false)
  const [resetForm, setResetForm] = useState(true)

  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: SponsorsRevenuesData,
    isRefetching,
    error,
  } = useFetch<SponsorsRevenues[]>({
    endpoint: `dashboard/reports/revenues/sponsor-revenues?page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }`,
    queryKey: [`sponsor-revenues`, page, pagePagination],
    onSuccess(data) {
      setDataSource(data)
    },
  })

  //update status interview teacher
  const { mutate } = useMutate({
    mutationKey: ["teachers/id"],
    endpoint: `dashboard/teachers/${dataSponsorsRevenuesID}/update-interview-status`,
    onSuccess: (data: any) => {
      notify("success")
    },
    onError: (err) => {
      notify("error", err)
    },
    formData: true,
  })

  //Delete SponsorsRevenues
  const { mutate: deleteSponsorsRevenues, isLoading: loadingDelete } =
    useMutate({
      mutationKey: ["teachers/id"],
      endpoint: `dashboard/reports/revenues/sponsor-revenues/${dataSponsorsRevenuesID}`,
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

  useEffect(() => {
    if (page > 0) {
      //   fetchData()
      refetch()
    }
  }, [page, status])
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage)
  }

  useEffect(() => {}, [dateFilter, dateFilterAll])

  useEffect(() => {
    if (check) {
      refetch()
    }
  }, [check])

  useEffect(() => {
    if (!open) {
      setCheck(false)
    }
  }, [open])
  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12 ">
          <div className=" flex justify-end">
            <div className="">
              <AddButton
                className="!w-max"
                action={() => {
                  setModel(true)
                  setResetForm(true)
                }}
                addLabel={`${t("Add sponsor revenues")}`}
              />
            </div>
          </div>
          <Table
            data={
              SponsorsRevenuesData?.data?.sponsor_revenue
                ? SponsorsRevenuesData?.data?.sponsor_revenue
                : []
            }
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isRefetching={isRefetching}
            setPagePagination={setPagePagination}
            columnsToRemove={[4]}
          />

          {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h2 className='text-start mt-5'>هل أنت متأكد من حذف هذا</h2>
            <div className='flex justify-between px-5 mt-5'>
              <Button
                action={() => deleteSponsorsRevenues(dataSponsorsRevenuesID)}
                loading={loadingDelete}
              >
                حذف
              </Button>
              <Button onClick={() => setOpenModal(false)} variant='danger'>
                إلغاء
              </Button>
            </div>
          </Modal> */}

          <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
            <AddSponsorsRevenues
              setModel={setModel}
              editData={editData}
              resetFormresetForm={resetForm}
              resetForm={resetForm}
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
  )
}
export default SponsorsRevenues
