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
import { AddReviews } from "../../../components/templates/reviews/AddReviews"
import { useFetch, useMutate } from "../../../hooks"
import { notify } from "../../../utils/toast"
import { Helmet } from "react-helmet-async"
import { indexTable, pagePaginate } from "../../../utils/helpers"

export type Reviews = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type Reviews_TP = {
  title: string
}

type Search_TP = {
  search: string
}

function Reviews({ title }: Reviews_TP) {
  const [dataSource, setDataSource] = useState<Reviews[]>([])
  const [resetForm, setResetForm] = useState(true)
  const [stepsId, setStepsId] = useState("")
  const [status, setStatus] = useState<Reviews[]>(0)
  const [page, setPage] = useState(0)
  const [packageId, setSponsorId] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [model, setModel] = useState(false)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [dateFilterAll, setDateFilterAll] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [editData, setEditData] = useState(false)

  const cols = useMemo<ColumnDef<Reviews>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name Studen")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "student_name",
      },

      {
        header: `${t("Job")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "job",
      },
      {
        header: `${t("Rate")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "rate",
      },
      {
        header: `${t("Image")}`,
        cell: (info) => <div>{info.row.original?.image}</div>,
        accessorKey: "image",
      },
      {
        header: `${t("Comment")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "comment",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
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
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      deleteSteps(stepsId)
                    }
                  )
                  setStepsId(info.row.original.id)
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

  const [word, setWord] = useState()

  const queryClient = useQueryClient()

  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    data: Reviews,
    isRefetching,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useFetch<Reviews[]>({
    endpoint: `dashboard/site-reviews?search=${
      word ? word : ""
    }&page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&date_range=${dateFilterAll ? dateFilterAll : dateFilter}`,
    queryKey: [`dashboard/site-reviews`, word, pagePagination],
    onSuccess(data) {
      setDataSource(data)
    },
  })

  //Delete Student
  const { mutate: deleteSteps, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/site-reviews`, stepsId],
    endpoint: `dashboard/site-reviews/${stepsId}`,

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
          <div className="col-span-12 ">
            <div className=" flex justify-end items-">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true)
                    setResetForm(true)
                  }}
                  addLabel={`${t("Add your opinion")}`}
                />
              </div>
            </div>
            <Table
              data={Reviews?.data?.reviews ? Reviews?.data?.reviews : []}
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
            {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h2 className='text-start mt-5'>هل أنت متأكد من حذف هذا الراي</h2>
            <div className='flex justify-between px-5 mt-5'>
              <Button
                action={() => deleteSteps(stepsId)}
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
                setModel(false)
              }}
            >
              <AddReviews
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
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
    </>
  )
}
export default Reviews
