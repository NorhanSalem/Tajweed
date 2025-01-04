import { useDebouncedState } from "@mantine/hooks"
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import DeleteTable from "../../../components/atoms/icons/DeleteTable"
import EditTable from "../../../components/atoms/icons/EditTable"
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc"
import Prevpagination from "../../../components/atoms/icons/prevpagination"
import { AddButton } from "../../../components/molecules/AddButton"
import { ModalTemplate } from "../../../components/molecules/ModalTemplate"
import showAlert from "../../../components/molecules/ShowAlert"
import Paginate from "../../../components/molecules/table/Paginate"
import { Table } from "../../../components/organisms/tantable/Table"
import { AddFeatureTartil } from "../../../components/templates/Site Administration/feature Tartile/AddFeatureTartil"
import { useFetch, useMutate } from "../../../hooks"
import { indexTable, pagePaginate } from "../../../utils/helpers"
import { notify } from "../../../utils/toast"
import i18n from "../../../i18n"

export type FeatureQuran = {
  id: number
  description: string
}
type FeatureQuran_TP = {
  title: string
}

function FeatureQuran({ title }: FeatureQuran_TP) {
  const [resetForm, setResetForm] = useState(true)
  const [stepsId, setStepsId] = useState("")
  const [page, setPage] = useState(0)
  const [model, setModel] = useState(false)
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [editData, setEditData] = useState(false)

  const cols = useMemo<ColumnDef<FeatureQuran>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("description")}`,
        cell: (info) => <div> {info.row.original.description} </div>,
        accessorKey: "description",
      },
      {
        header: `${t("Title Arabic")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title_ar",
      },
      {
        header: `${t("Title English")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title_en",
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
                      console.log(stepsId)
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
      {
        header: `${t("Latest Update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update.update_at",
      },
    ],
    [i18n.language, page]
  )

  const [word, setWord] = useDebouncedState("", 300)
  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  }
  const searchParams = new URLSearchParams(queryParams as any)
  const endpoint = `dashboard/features-qurans?${searchParams.toString()}`

  //all data
  const {
    isLoading,
    isSuccess,
    data: FeatureQuran,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled:!!page
  })
  const deleteEndPont =  `dashboard/features-qurans/${stepsId}`

  const { mutate: deleteSteps } = useMutate({
    endpoint:deleteEndPont,
    mutationKey: [deleteEndPont],
    onSuccess: (data: any) => {
      notify("success")
      refetch()
    },
    onError: (err) => {
      notify("error", err?.response?.data.message)
    },
    method: "delete",
    formData: true,
  })

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
                  className="!w-max"
                  action={() => {
                    setModel(true)
                    setResetForm(true)
                  }}
                  addLabel={`${t("Add")}`}
                />
              </div>
            </div>
            <Table
              data={
                FeatureQuran?.data?.quran_features
                  ? FeatureQuran?.data?.quran_features
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              //@ts-ignore
              columnsToRemove={[4]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false)
              }}
            >
              <AddFeatureTartil
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={FeatureQuran?.data?.paginate.total_pages}
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
export default FeatureQuran
