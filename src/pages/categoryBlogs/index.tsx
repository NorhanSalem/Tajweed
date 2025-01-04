import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import Actions from "../../components/molecules/Actions/Actions";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddBlog } from "../../components/templates/blogs/AddBlog";
import { useLanguageContext } from "../../context/language";
import { useFetch, useMutate } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { AddCategory } from "../../components/templates/Category/AddCategory";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import { notify } from "../../utils/toast";
import showAlert from "../../components/molecules/ShowAlert";

export type AllCategory = {
  id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
};
type AllCategory_TP = {
  title: string;
};

function AllCategory({ title }: AllCategory_TP) {
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [model, setModel] = useState(false);
  const [resetForm, setResetForm] = useState(true);
  const [updateData, setUpdateData] = useState();
  const [idItems, setIdItems] = useState();

  const cols = useMemo<ColumnDef<AllCategory>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "",
      },
      {
        header: `${t("title")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "name",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <Actions
                info={info}
                refetch={refetch}
                Edit
                setEditData={setUpdateData}
                setResetForm={setResetForm}
                setModel={setModel}
              />
            </div>
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
                    DeleteFun(idItems);
                    console.log("deleted");
                  }
                );
                //@ts-ignore
                setIdItems(info?.row?.original?.id);
              }}
            />
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/categories?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    refetch,
    data: AllCategory,
    isRefetching,
  } = useFetch<AllCategory[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  const { mutate: DeleteFun, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/categories/${idItems}`],
    endpoint: `dashboard/categories/${idItems}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    method: "delete",
    formData: true,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <div className=" flex justify-end items mb-4">
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
              data={
                //@ts-ignore
                AllCategory?.data
                  ? //@ts-ignore

                    AllCategory?.data
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              //@ts-ignore
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setPage={setPage}
              setWord={setWord}
              columnsToRemove={[10]}
            />
            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddCategory
                refetch={refetch}
                resetForm={resetForm}
                updateData={updateData}
                setModel={setModel}
              />
            </ModalTemplate>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Paginate
            //@ts-ignore
            pagesCount={AllCategory?.data?.paginate?.total_pages}
            previousLabel={<Prevpagination />}
            nextLabel={<NextPaginationIc />}
            onPageChange={handlePageChange}
            initialPage={page}
          />
        </div>
      </div>
    </>
  );
}
export default AllCategory;
