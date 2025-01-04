import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import DeleteTable from "../../../components/atoms/icons/DeleteTable"
import EditTable from "../../../components/atoms/icons/EditTable"
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc"
import Prevpagination from "../../../components/atoms/icons/prevpagination"
import { AddButton } from "../../../components/molecules/AddButton"
import { ModalTemplate } from "../../../components/molecules/ModalTemplate"
import showAlert from "../../../components/molecules/ShowAlert"
import Paginate from "../../../components/molecules/table/Paginate"
import { Table } from "../../../components/organisms/tantable/Table"
import { AddPaymentMethods } from "../../../components/templates/general setting/payment-methods/AddPaymentMethods"
import { useFetch, useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import { indexTable } from "../../../utils/helpers"

export type PaymentMethods = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type PaymentMethods_TP = {
  title: string
}

type Search_TP = {
  search: string
}

function PaymentMethods({ title }: PaymentMethods_TP) {
  const [dataSource, setDataSource] = useState<PaymentMethods[]>([])
  const [resetForm, setResetForm] = useState(true)
  const [methodId, setMethodID] = useState()
  const cols = useMemo<ColumnDef<PaymentMethods>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title",
      },
      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div>
            {info.row.original.active === 1 ? (
              <p
                className="bg-emerald-600 text-white rounded-md  m-auto cursor-pointer w-1/2"
                onClick={() => {
                  setMethodID(info.row.original.id)
                  changeStatus({ active: 0 })
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-red-600 text-white rounded-md  m-auto cursor-pointer w-1/2"
                onClick={() => {
                  setMethodID(info.row.original.id)
                  changeStatus({ active: 1 })
                }}
              >
                {t("notactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "active",
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
                      deletePackage(paymentId)
                      console.log("deleted")
                    }
                  )
                  setSponsorId(info.row.original.id)
                }}
              />
            </div>
            <div>
              <EditTable
                action={() => {
                  setModel(true)
                  setEditData(info.row.original)
                  setResetForm(false)
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
  const [status, setStatus] = useState<PaymentMethods[]>(0)
  const [page, setPage] = useState(0)

  const [paymentId, setSponsorId] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState(false)

  const [word, setWord] = useState()

  const queryClient = useQueryClient()

  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    data: PaymentMethods,
    isRefetching,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useFetch<PaymentMethods[]>({
    endpoint: `dashboard/payments?search=${word ? word : ""}`,
    queryKey: [`dashboard/payments`, word],
    onSuccess(data) {
      setDataSource(data)
    },
  })

  const { mutate: changeStatus } = useMutate({
    mutationKey: [`payments/${methodId}`],
    endpoint: `dashboard/payments/${methodId}/activate`,
    onSuccess: (data: any) => {
      refetch()
      notify("success")
    },
    onError: (err) => {
      notify("error", err)
    },
  })

  //Delete Student
  const { mutate: deletePackage, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/payments/`, paymentId],
    endpoint: `dashboard/payments/${paymentId}`,

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
      refetch()
    }
  }, [page, status])
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage)
  }

  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12 ">
          <div className=" flex justify-end">
            <div className="">
              <AddButton
                className="!w-max"
                action={() => {
                  //setEditData(undefined)
                  setModel(true)
                  // setOpen(true)
                  setResetForm(true)
                }}
                addLabel={`${t("Add Payment Methods")}`}
              />
            </div>
          </div>
          <Table
            data={
              PaymentMethods?.data?.payments
                ? PaymentMethods?.data?.payments
                : []
            }
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            isRefetching={isRefetching}
            setWord={setWord}
          />

          {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h2 className='text-start mt-5'>هل أنت متأكد من حذف طريقة الدفع</h2>
            <div className='flex justify-between px-5 mt-5'>
              <Button
                action={() => deletePackage(paymentId)}
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
            <AddPaymentMethods
              setModel={setModel}
              // value={editData?.name}
              resetForm={resetForm}
              updateData={editData}
              setDataSource={setDataSource}
              //setShow={setOpen}
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
export default PaymentMethods
