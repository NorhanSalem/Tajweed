import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { useFetch } from "../../../hooks"
import { indexTable, pagePaginate } from "../../../utils/helpers"
import DeleteTable from "../../atoms/icons/DeleteTable"
import EditTable from "../../atoms/icons/EditTable"
import NextPaginationIc from "../../atoms/icons/NextPaginationIc"
import Prevpagination from "../../atoms/icons/prevpagination"
import { AddButton } from "../../molecules/AddButton"
import showAlert from "../../molecules/ShowAlert"
import Paginate from "../../molecules/table/Paginate"
import { Table } from "../../organisms/tantable/Table"

type dataSource_TP = {
  data: {
    paginate: {
      total: number
      total_pages: number
    }
    items: AllCoupon[]
  }
  length: number
  AllCoupon: []
}

export type AllCoupon = {
  id: number
  name: string
  name_ar: string
  name_en: string
}
type AllCoupon_TP = {
  title: string
}

function AllCoupon({ title }: AllCoupon_TP) {
  // const [dataSource, setDataSource] = useState<AllCoupon[]>([])
  const [dataSource, setDataSource] = useState<dataSource_TP>({
    data: {
      paginate: {
        total: 0,
        total_pages: 0,
      },
      items: [],
    },
    length: 0,
    AllCoupon: [],
  })

  const cols = useMemo<ColumnDef<AllCoupon>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Coupon Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon",
      },
      {
        header: `${t("Type")}`,
        cell: (info) => (
          <div>{info.row.original.is_percentage === 0 ? "رقم" : "نسبة "}</div>
        ),
        accessorKey: "is_percentage",
      },
      {
        header: `${t("Discount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "discount",
      },
      {
        header: `${t("Max Used")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "max_used",
      },
      {
        header: `${t("Remainder")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "remainder",
      },
      {
        header: `${t("Start Date")}`,
        cell: (info) => (
          <div>
            {info.row.original.start_date ? info.row.original.start_date : "--"}
          </div>
        ),
        accessorKey: "start_date",
      },
      {
        header: `${t("End Date")}`,
        cell: (info) => (
          <div>
            {info.row.original.end_date ? info.row.original.end_date : "--"}
          </div>
        ),
        accessorKey: "end_date",
      },
      {
        header: `${t("Coupon Type")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon_type",
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
                      deleteSponsor(sponsorId)
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
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(0)

  const [sponsorId, setSponsorId] = useState("")

  const [word, setWord] = useState()
  const [pagePagination, setPagePagination] = useState(pagePaginate)

  //all data
  const {
    isLoading,
    isSuccess,
    data: AllCoupon,
    isRefetching,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useFetch<AllCoupon[]>({
    endpoint: `dashboard/advertisement/coupons?search=${
      word ? word : ""
    }&page=${page}&pagenate=${pagePagination ? pagePagination : 20}`,
    queryKey: [`All-Coupons ${word} ${pagePagination}`],
    onSuccess(data) {
      setDataSource(data)
    },
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
        <div className="col-span-12">
          <div className=" flex justify-end">
            <div className="">
              <AddButton addLabel={`${t("Add Coupons")}`} />
            </div>
          </div>
          <Table
            data={AllCoupon?.data?.coupons ? AllCoupon?.data?.coupons : []}
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            isRefetching={isRefetching}
            setPagePagination={setPagePagination}
            setWord={setWord}
            columnsToRemove={[9]}

            // Status
          />

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
export default AllCoupon
