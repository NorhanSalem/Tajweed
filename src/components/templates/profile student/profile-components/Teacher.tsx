import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useFetch, useMutate } from "../../../../hooks"
import { notify } from "../../../../utils/toast"
import { Button } from "../../../atoms"
import { Modal } from "../../../molecules"
import Paginate from "../../../molecules/table/Paginate"
import { Table } from "../../../organisms/tantable/Table"
import Prevpagination from "../../../atoms/icons/prevpagination"
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc"
import { useDebouncedState } from "@mantine/hooks"
import { indexTable, pagePaginate } from "../../../../utils/helpers"
function Teacher({ studentId }: any) {
  type Teacher = {
    id: number
    name: string
    Phone: string
    whatsapp: string
    specialization: string
    is_azher: boolean
    is_mogaz: boolean
    interview_status: string
    join: string
    required_hours: string
    created_at: string
    total_subscriptions: string
    state_name: string
    activation_status: string
    zoom_status: string
  }
  // state
  const [dataSource, setDataSource] = useState<Teacher[]>([])
  const [open, setOpen] = useState(false)
  const [check, setCheck] = useState(false)
  const [status, setStatus] = useState<Teacher[]>(0)

  const [dataTeacherID, setDataTeacherID] = useState("")
  const [dataTeacherValue, setDataTeacherValue] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState(false)
  const [resetForm, setResetForm] = useState(false)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [page, setPage] = useState(0)
  const [word, setWord] = useDebouncedState("", 300)
  const total = dataSource?.data?.paginate?.total
  const navigate = useNavigate()

  // column table
  const cols = useMemo<ColumnDef<Teacher>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "name",
      },
      {
        header: `${t("Country")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "country_title",
      },

      {
        header: `${t("Last Subscription")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_subscription",
      },
    ],
    []
  )

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: TeacherData,
    isFetching,
    error,
  } = useFetch<Teacher[]>({
    endpoint: `dashboard/students/teachers/${studentId}`,
    queryKey: [
      `dashboard/students/teachers/${studentId}`,
      pagePagination,
      word,
    ],
    onSuccess(data) {
      setDataSource(data)
    },
    onError(err) {
      console.log(err)
    },
  })

  //update status interview teacher
  const { mutate } = useMutate({
    mutationKey: ["teachers/id"],
    endpoint: `dashboard/teachers/${dataTeacherID}/update-interview-status`,
    onSuccess: (data: any) => {
      notify("success")
    },
    onError: (err: any) => {
      notify("error", err)
    },
    formData: true,
  })

  //Delete Teacher
  const { mutate: deleteTeacher, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/teachers/${dataTeacherID}`],
    endpoint: `dashboard/teachers/${dataTeacherID}`,
    onSuccess: (data: any) => {
      notify("success")
      setOpenModal(false)
      refetch()
    },
    onError: (err: any) => {
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
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <Table
              data={
                TeacherData?.data?.students ? TeacherData?.data?.students : []
              }
              totalItemsData={TeacherData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
            />
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <h2 className="text-start mt-5">
                هل انت متاكد من استرداد الجلسه
              </h2>
              <div className="flex justify-between px-5 mt-5">
                <Button action={() => setCheck(true)}>موافق</Button>
                <Button action={() => setOpen(false)} variant="danger">
                  إلغاء
                </Button>
              </div>
            </Modal>

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <h2 className="text-start mt-5">
                هل أنت متأكد من حذف هذا المعلم؟
              </h2>
              <div className="flex justify-between px-5 mt-5">
                <Button
                  action={() => deleteTeacher(dataTeacherID)}
                  loading={loadingDelete}
                >
                  حذف
                </Button>
                <Button action={() => setOpenModal(false)} variant="danger">
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
    </div>
  )
}

export default Teacher
