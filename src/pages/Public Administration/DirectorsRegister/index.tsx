import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { AddUser } from "../../../components/templates/Public Administration/DirectorsRegister/AddUser";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";

export type DirectorsRegister = {
  id: string;
  active: number;
};
type DirectorsRegister_TP = {
  title: string;
};

function DirectorsRegister({ title }: DirectorsRegister_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);

  const cols = useMemo<ColumnDef<DirectorsRegister>[]>(
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
        header: `${t("Phone")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "phone",
      },
      {
        header: `${t("Email")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "email",
      },
      {
        header: `${t("Roles")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "roles",
      },

      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div className="flex justify-center">
            {info.row.original.active === 1 ? (
              <p
                className="bg-[#50cd89] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => handleSubmit(info)}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => handleSubmit(info)}
              >
                {t("notactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "active",
      },
      {
        header: `${t("last update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_updated_name",
      },
      {
        header: `${t("last update Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "last_update_at",
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
                      deletePackage(userId);
                      console.log("deleted");
                    }
                  );
                  setUserId(info.row.original.id);
                }}
              />
            </div>
            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  setEditData(info.row.original);
                  setResetForm(false);
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
  const handleSubmit = (info) => {
    showAlert(
      t("Are you sure?"),
      t("You cannot go back in this process"),
      false,
      t("done"),
      true,
      "warning",
      () => {
        mutate({});
      }
    );
    setUserId(info.row.original?.id);
  };
  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/users?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: DirectorsRegister,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
  const { mutate } = useMutate({
    mutationKey: [`dashboard/users/${userId}/activate`],
    endpoint: `dashboard/users/${userId}/activate`,
    onSuccess: () => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    formData: true,
  });

  const deleteEndPoint = `dashboard/users/${userId}`;
  const { mutate: deletePackage, isLoading: loadingDelete } = useMutate({
    mutationKey: [deleteEndPoint],
    endpoint: deleteEndPoint,

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
            <div className=" flex justify-end">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add Manger")}`}
                />
              </div>
            </div>
            <Table
              data={
                DirectorsRegister?.data?.users
                  ? DirectorsRegister?.data?.users
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              columnsToRemove={[6]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddUser
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={DirectorsRegister?.data?.paginate.total_pages}
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
export default DirectorsRegister;
