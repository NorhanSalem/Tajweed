import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { GiCancel } from "react-icons/gi";
import * as Yup from "yup";
import { useFetch, useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { AddButton } from "../../components/molecules/AddButton";
import { Modal } from "../../components/molecules";
import { Button } from "../../components/atoms";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { EditIcon } from "../../components/atoms/icons";
import { PermissionForm } from "../../components/templates/Permission/PermissionForm";
import { useNavigate } from "react-router-dom";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import showAlert from "../../components/molecules/ShowAlert";
import EditTable from "../../components/atoms/icons/EditTable";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import { indexTable, pagePaginate } from "../../utils/helpers";
import i18n from "../../i18n";

export type PermissionMain = {
  id: string;
};
type PermissionMain_TP = {
  title: string;
};

function PermissionMain({ title }: PermissionMain_TP) {
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [roleId, setRoleId] = useState("");
  const [word, setWord] = useState();
  const [pagePagination, setPagePagination] = useState(pagePaginate);

  const cols = useMemo<ColumnDef<PermissionMain>[]>(
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
        header: `${t("Permissions Count")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "permissions_count",
      },
      {
        header: `${t("Users Count")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "users_count",
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
                      deletePackage(roleId);
                      console.log("deleted");
                    }
                  );
                  setRoleId(info.row.original.id);
                }}
              />
            </div>
            <div>
              <EditTable
                action={() => {
                  setRoleId(info.row.original.id);
                  navigate(
                    `/administration/permission/editPermission/${info.row.original.id}`
                  );
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

  const queryParams = {
    // status: status.length ? status : 0,
    page: page,
    pagenate: pagePagination ,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/roles?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    data: RolesMain,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const deleteEndPoint = `dashboard/roles/${roleId}`;
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
  const navigate = useNavigate();
  const [showPermissionForm, setShowPermissionForm] = useState(false);

  return (
    <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12 ">
          {!showPermissionForm && (
            <>
              <div className=" flex justify-end">
                <div className="">
                  <AddButton
                    action={() => {
                      setShowPermissionForm(true);
                      navigate("/administration/permission/addPermission");
                    }}
                    addLabel={`${t("Add permission")}`}
                  />
                </div>
              </div>
              <Table
                data={RolesMain?.data?.roles ? RolesMain?.data?.roles : []}
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
                setPage={setPage}
                columnsToRemove={[4]}
              />

              <div className="flex justify-end mt-3">
                <Paginate
                  pagesCount={RolesMain?.data?.paginate.total_pages}
                  previousLabel={<Prevpagination />}
                  nextLabel={<NextPaginationIc />}
                  onPageChange={handlePageChange}
                  initialPage={page}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PermissionMain;
