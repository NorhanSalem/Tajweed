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
import { notify } from "../../utils/toast";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import showAlert from "../../components/molecules/ShowAlert";

export type AllBlogs = {
  id: number;
  title: string;
  description: string;
  category: {
    name: string;
  };
};
type AllBlogs_TP = {
  title: string;
};

function AllBlogs({ title }: AllBlogs_TP) {
  const { currentLang } = useLanguageContext();
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [model, setModel] = useState(false);
  const [resetForm, setResetForm] = useState(true);
  const [updateData, setUpdateData] = useState();
  const [idItems, setIdItems] = useState();
  const [category_id, setCategory_id] = useState("");

  const cols = useMemo<ColumnDef<AllBlogs>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "",
      },
      {
        header: `${t("title")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title",
      },
      {
        header: `${t("category")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "category.name",
      },
      {
        header: `${t("description")}`,
        cell: (info) => {
          const stripHtmlTagsAndEntities = (htmlString: string) => {
            // Strip HTML tags
            const cleanString = htmlString.replace(/<[^>]*>?/gm, "");
            // Replace HTML entities like &nbsp; with spaces
            return cleanString.replace(/&nbsp;/g, " ");
          };

          const description = info?.row?.original?.description;
          const cleanDescription = stripHtmlTagsAndEntities(description);

          return (
            <div className="w-full rtl:text-right text-wrap text-left">
              {cleanDescription}
            </div>
          );
        },
        accessorKey: "description",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center  gap-2">
            <div className="w-1/4 flex">
              <Actions
                info={info}
                refetch={refetch}
                Edit
                setEditData={setUpdateData}
                setResetForm={setResetForm}
                setModel={setModel}
              />
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
    category_id: category_id,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/blogs?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    refetch,
    data: AllBlogs,
    isRefetching,
  } = useFetch<AllBlogs[]>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  const { mutate: DeleteFun, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/blogs/${idItems}`],
    endpoint: `dashboard/blogs/${idItems}`,
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
                AllBlogs?.data?.items
                  ? //@ts-ignore

                    AllBlogs?.data?.items
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
              setCategory_id={setCategory_id}
              columnsToRemove={[10]}
            />
            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddBlog
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
            pagesCount={AllBlogs?.data?.paginate?.total_pages}
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
export default AllBlogs;
