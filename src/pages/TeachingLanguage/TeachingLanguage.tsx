import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import EditTable from "../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddTeachingLanguage } from "../../components/templates/TeachingLanguage/AddTeachingLanguage";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";

export type TeachingLanguage = {
  id: string;
  active:number
};
type TeachingLanguage_TP = {
  title: string;
};

function TeachingLanguage({ title }: TeachingLanguage_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [LangID, setLangID] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);

  const cols = useMemo<ColumnDef<TeachingLanguage>[]>(
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
        header: `${t("active")}`,
        cell: (info) => <span>{info.row.original?.active == 1 ?  t("active") : t("notactive")}</span>,
        accessorKey: "active",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  setEditData(info.row.original);
                  setResetForm(false);
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
                      deleteLanguage(LangID);
                    }
                  );
                  setLangID(info.row.original.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [i18n.language, page]
  );

  const queryParams: any = {
    status: status.length ? status : 0,
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `dashboard/teachingLanguage?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: TeachingLanguage,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled:!!page
  });

  const { mutate: deleteLanguage, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/teachingLanguage/${LangID}`],
    endpoint: `dashboard/teachingLanguage/${LangID}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err);
    },
    method: "delete",
    formData: true,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

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
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add")}`}
                />
              </div>
            </div>
            <Table
              data={TeachingLanguage?.data ? TeachingLanguage?.data : []}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[3]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddTeachingLanguage
                setModel={setModel}
                resetForm={resetForm}
                refetch={refetch}
                updateData={editData}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={TeachingLanguage?.data?.paginate?.total_pages}
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
  );
}
export default TeachingLanguage;
