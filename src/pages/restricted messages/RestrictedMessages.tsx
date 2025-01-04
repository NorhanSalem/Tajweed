import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import EditTable from "../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { useFetch, useMutate } from "../../hooks";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { AddRestrict } from "../../components/templates/restricted messages/AddRestrict";
import i18n from "../../i18n";
import { Helmet } from "react-helmet-async";

export type RestrictedMessages = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type RestrictedMessages_TP = {
  title: string;
};

function RestrictedMessages({ title }: RestrictedMessages_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [rewardID, setRewardID] = useState<any>("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [messageId, setMessageId] = useState("");

  const cols = useMemo<ColumnDef<RestrictedMessages>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("word")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "restrict",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => (
          <div>
            {info.row.original.active == 1 ? (
              <span
                className="bg-emerald-500 px-2 rounded-md  text-white cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeStatus(messageId);
                    }
                  );
                  setMessageId(info.row.original.id);
                }}
              >
                {t("active")}
              </span>
            ) : (
              <span
                className="bg-red-500 px-2 rounded-md  text-white cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You cannot go back in this process"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeStatus(messageId);
                    }
                  );
                  setMessageId(info.row.original.id);
                }}
              >
                {t("notactive")}
              </span>
            )}
          </div>
        ),
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
                      deleteReward(rewardID);
                      console.log("deleted");
                    }
                  );
                  setRewardID(info.row.original.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [page, i18n.language]
  );

  // state

  const queryParams: any = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `dashboard/restricted-messages?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: RestrictedMessages,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
  });

  const { mutate: deleteReward, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/restricted-messages/${rewardID}`],
    endpoint: `dashboard/restricted-messages/${rewardID}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    method: "delete",
    formData: true,
  });
  const { mutate: changeStatus } = useMutate({
    mutationKey: [`dashboard/restricted-messages/${messageId}`],
    endpoint: `dashboard/restricted-messages/${messageId}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
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
              data={
                RestrictedMessages?.data?.items
                  ? RestrictedMessages?.data?.items
                  : []
              }
              showNavigation
              columns={cols ? cols : []}
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
              <AddRestrict
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={RestrictedMessages?.data?.paginate?.total_pages}
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
export default RestrictedMessages;
