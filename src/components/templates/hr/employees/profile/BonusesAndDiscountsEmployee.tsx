import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { SetStateAction, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DeleteTable from "../../../../../components/atoms/icons/DeleteTable"
import EditTable from "../../../../../components/atoms/icons/EditTable"
import { useFetch, useMutate } from "../../../../../hooks"
import { notify } from "../../../../../utils/toast"

import NextPaginationIc from "../../../../../components/atoms/icons/NextPaginationIc"
import Prevpagination from "../../../../../components/atoms/icons/prevpagination"
import showAlert from "../../../../../components/molecules/ShowAlert"
import Paginate from "../../../../../components/molecules/table/Paginate"
import { ModalTemplate } from "../../../../molecules/ModalTemplate"
import { Table } from "../../../../organisms/tantable/Table"
import { AddCompensations } from "../../compensations/AddCompensations"
import { useDebouncedState } from "@mantine/hooks"
import { indexTable, pagePaginate } from "../../../../../utils/helpers"
// import { Table } from "../../../components/templates/reusableComponants/tantable/Table";
type dataSource_TP = {
  data: {
    paginate: {
      total: number
      total_pages: number
    }
    items: AllBonusesAndDiscountsEmployee[]
  }
  length: number
  compensations: []
}
export type AllBonusesAndDiscountsEmployee = {
  date: Date
  name: string
  type: string
  value: string
  note: string
}
type AllBonusesAndDiscountsEmployee_TP = {
  title: string
  employeId: number
  EditingData: {}
}

function BonusesAndDiscountsEmployee({
  EditingData,
  title,
}: AllBonusesAndDiscountsEmployee_TP) {
  const employeId = useParams().employeeId

  const [dataSource, setDataSource] = useState<dataSource_TP>({
    data: {
      paginate: {
        total: 0,
        total_pages: 0,
      },
      items: [],
    },
    length: 0,
    compensations: [],
  })
  const [resetForm, setResetForm] = useState(true)

  const cols = useMemo<ColumnDef<AllBonusesAndDiscountsEmployee>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "date",
      },
      {
        header: `${t("Tybe")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "type",
      },

      {
        header: `${t("value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "value",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true)
                  setEditData(info?.row?.original)
                  setResetForm(false)
                }}
              />
            </div>
            <div>
              <DeleteTable
                className="cursor-pointer"
                action={() => {
                  showAlert(
                    ` ${t("Are you sure?")}`,
                    `  ${t("You cannot go back in this process")}`,
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      deleteCompensations(compensationsId)
                    }
                  )
                  setCompensationsId(info?.row?.original?.id)
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
      {
        header: `${t("last action")}`,
        cell: (info) => (
          <div>
            <h2>{info?.row?.original?.last_action_user}</h2>
            <h2>{info?.row?.original?.last_action_date}</h2>
          </div>
        ),
        accessorKey: "join",
      },
    ],
    []
  )

  // state  last_action
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(0)
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("")
  const [dateFilterAll, setDateFilterAll] = useState<SetStateAction<string>>("")
  const [typeFilter, setTypeFilter] = useState("")
  const [compensationsId, setCompensationsId] = useState({})
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState({})
  const [country, setCountry] = useState("")
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [word, setWord] = useDebouncedState("", 300)
  const total = dataSource.data?.paginate?.total
  //all data
  const {
    isLoading,
    isSuccess,
    data: AllBonusesAndDiscountsEmployee,
    refetch,
    isFetching,
  } = useFetch<AllBonusesAndDiscountsEmployee[]>({
    endpoint: `dashboard/hr/compensations?employee_id=${employeId}?date_range=${
      dateFilterAll ? dateFilterAll : dateFilter
    }&page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&search=${word}`,
    queryKey: [
      `All-BonusesAndDiscountsEmployee
  ${dateFilterAll}  
  ${dateFilter}  
  ${typeFilter}  
  ${country}    
  ${pagePagination}    
  ${word}   
  ${total}   `,
    ],
    onSuccess(data) {
      setDataSource(data)
    },
  })

  const { mutate: deleteCompensations, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/hr/compensations/${compensationsId}`],
    endpoint: `dashboard/hr/compensations/${compensationsId}`,
    onSuccess: (data: any) => {
      notify("success")
      refetch()
    },
    onError: (err) => {
      notify("error", err.response?.data?.error)
    },
    method: "delete",
    // formData: true,
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
    <div className="bg-white p-3 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          {/* <div className=" flex justify-end ">
            <div className="">
              <AddButton
                action={() => {
                  setModel(true);
                  setResetForm(true);
                }}
                addLabel={`${t("Add compensations")}`}
              />
            </div>
          </div> */}
          <Table
            data={
              AllBonusesAndDiscountsEmployee?.data?.compensations
                ? AllBonusesAndDiscountsEmployee?.data?.compensations
                : []
            }
            // data={0 ? AllStudent?.data?.students : []}
            showNavigation
            columns={cols ? cols : []}
            // setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            setPagePagination={setPagePagination}
            setDateFilter={setDateFilter}
            setDateFilterAll={setDateFilterAll}
            setWord={setWord}
            // setTypeFilter={setTypeFilter}
            // setCountry={setCountry}
            // country
            // type
            // Status
          />

          <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
            <AddCompensations
              setModel={setModel}
              resetForm={resetForm}
              updateData={editData}
              refetch={refetch}
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
export default BonusesAndDiscountsEmployee
