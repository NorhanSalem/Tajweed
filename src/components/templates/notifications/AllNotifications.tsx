import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import DeleteTable from "../../atoms/icons/DeleteTable";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../atoms/icons/prevpagination";
import { AddButton } from "../../molecules/AddButton";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import showAlert from "../../molecules/ShowAlert";
import Paginate from "../../molecules/table/Paginate";
import { Table } from "../../organisms/tantable/Table";
import { AddNotification } from "./AddNotification";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export type AllNotifications = {
  id: string;
  user_name: string;
};
type AllNotifications_TP = {
  title: string;
};

function AllNotifications({ title }: AllNotifications_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [sponsorId, setSponsorId] = useState("");
  const [model, setModel] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<AllNotifications>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
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
        header: `${t("User Name")}`,
        cell: (info) => (
          <div>
            {info.row.original?.user_type == "Teacher" ? (
              <Link
                to={`/teacher/teachers/profile/${info.row.original.user_id}`}
                style={{ fontSize: "14px" }}
                className="cursor-pointer text-blue-700"
              >
                {info.row.original.user_name}
              </Link>
            ) : (
              <Link
                to={`/student/students/profile/${info.row.original.user_id}`}
                style={{ fontSize: "14px" }}
                className="cursor-pointer text-blue-700"
              >
                {info.row.original.user_name}
              </Link>
            )}
          </div>
        ),
        accessorKey: "user_name",
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
                      deleteSponsor(sponsorId);
                      console.log("deleted");
                    }
                  );
                  setSponsorId(info.row.original.id);
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
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/advertisement/notifications?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AllNotifications,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  console.log("🚀 ~ AllNotifications ~ AllNotifications:", AllNotifications);

  const { mutate: deleteSponsor } = useMutate({
    mutationKey: [`dashboard/advertisement/notifications/${sponsorId}`],
    endpoint: `dashboard/advertisement/notifications/${sponsorId}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
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
          <div className="col-span-12">
            <div className=" flex justify-end">
              <div className="">
                <AddButton
                  action={() => {
                    //setEditData(undefined)
                    setModel(true);
                    // setOpen(true)
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add Notification")}`}
                />
              </div>
            </div>
            <Table
              data={
                AllNotifications?.data?.notifications
                  ? AllNotifications?.data?.notifications
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              setDateFilter={setDateFilter}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[5]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddNotification
                setModel={setModel}
                refetch={refetch}
                resetForm={resetForm}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllNotifications?.data?.paginate.total_pages}
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
export default AllNotifications;
