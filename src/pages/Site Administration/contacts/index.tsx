import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { Button } from "../../../components/atoms"
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc"
import Prevpagination from "../../../components/atoms/icons/prevpagination"
import { Modal } from "../../../components/molecules"
import Paginate from "../../../components/molecules/table/Paginate"
import { Table } from "../../../components/organisms/tantable/Table"
import { useFetch, useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import { Helmet } from "react-helmet-async"
import DeleteTable from "../../../components/atoms/icons/DeleteTable"
import showAlert from "../../../components/molecules/ShowAlert"
import { indexTable, pagePaginate } from "../../../utils/helpers"

export type ContactUs = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type ContactUs_TP = {
  title: string
}

type Search_TP = {
  search: string
}

function ContactUs({ title }: ContactUs_TP) {
  const [dataSource, setDataSource] = useState<ContactUs[]>([])
  const [resetForm, setResetForm] = useState(true)
  const [stepsId, setStepsId] = useState("")
  const [status, setStatus] = useState<ContactUs[]>(0)
  const [page, setPage] = useState(0)
  const [packageId, setSponsorId] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [modelStatusRead, setModelStatusRead] = useState(false)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [dateFilterAll, setDateFilterAll] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const cols = useMemo<ColumnDef<ContactUs>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Message date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("The sender's name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "name",
      },
      {
        header: `${t("Phone")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "phone",
      },
      {
        header: `${t("email")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "email",
      },
      {
        header: `${t("Message")}`,
        cell: (info) => {
          const words = info.row.original?.message?.split(" ")
          const first50Words = words?.slice(0, 15).join(" ")
          const remainingWords = words?.slice(15).join(" ")

          return (
            <div>
              {first50Words}
              {remainingWords && (
                <>
                  <br />
                  <span>{remainingWords}</span>
                </>
              )}
            </div>
          )
        },
        accessorKey: "message",
      },
      {
        header: `${t("Read")}`,
        cell: (info) => (
          <div>
            {info.row.original.is_read ? (
              <span
                className="bg-[#50cd89] text-[#fff] px-1 rounded-md cursor-pointer "
                onClick={() => {
                  setModelStatusRead(true)
                  setStepsId(info.row.original.id)
                }}
              >
                تم القراة
              </span>
            ) : (
              <span
                className="bg-[#f1416c] text-[#fff] px-1 rounded-md  cursor-pointer"
                onClick={() => {
                  setModelStatusRead(true)
                  setStepsId(info.row.original.id)
                }}
              >
                غير مقروء
              </span>
            )}
          </div>
        ),
        accessorKey: "is_read",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div></div>
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
    ],
    []
  )

  const [word, setWord] = useState()

  const queryClient = useQueryClient()

  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    data: ContactUs,
    isRefetching,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useFetch<ContactUs[]>({
    endpoint: `dashboard/site-contacts?search=${
      word ? word : ""
    }&page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&date_range=${dateFilterAll ? dateFilterAll : dateFilter}`,
    queryKey: [`dashboard/site-contacts`, word, pagePagination],
    onSuccess(data) {
      setDataSource(data)
    },
  })

  //Delete
  const { mutate: deleteSteps, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/site-contacts`, stepsId],
    endpoint: `dashboard/site-contacts/${stepsId}`,

    onSuccess: (data: any) => {
      notify("success")
      setOpenModal(false)
      refetch()
    },
    onError: (err) => {
      notify("error", err?.response?.data.message)
      setOpenModal(false)
    },
    method: "delete",
    formData: true,
  })

  const { mutate: changeStatus, isLoading: loadingStatus } = useMutate({
    mutationKey: [`dashboard/contacts/view`, stepsId],
    endpoint: `dashboard/contacts/view/${stepsId}`,
    onSuccess: (data: any) => {
      notify("success")
      setModelStatusRead(false)
      refetch()
    },
    onError: (err) => {
      notify("error", err?.response?.data.message)
      setModelStatusRead(false)
    },
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
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Table
              data={ContactUs?.data?.contacts ? ContactUs?.data?.contacts : []}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              setDateFilterAll={setDateFilterAll}
            />
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <h2 className="text-start mt-5">هل أنت متأكد من حذف هذه </h2>
              <div className="flex justify-between px-5 mt-5">
                <Button
                  action={() => deleteSteps(stepsId)}
                  loading={loadingDelete}
                >
                  {t("Delete")}
                </Button>
                <Button onClick={() => setOpenModal(false)} variant="danger">
                  إلغاء
                </Button>
              </div>
            </Modal>
            <Modal
              isOpen={modelStatusRead}
              onClose={() => setModelStatusRead(false)}
            >
              <h2 className="text-start mt-5">
                هل أنت متأكد من تغيير هذه الحالة{" "}
              </h2>
              <div className="flex justify-between px-5 mt-5">
                <Button
                  action={() => changeStatus(stepsId)}
                  loading={loadingStatus}
                >
                  تغيير
                </Button>
                <Button onClick={() => setOpenModal(false)} variant="danger">
                  إلغاء
                </Button>
              </div>
            </Modal>

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
    </>
  )
}
export default ContactUs
