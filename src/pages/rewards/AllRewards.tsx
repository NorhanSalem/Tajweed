import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import EditTable from "../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddRewards } from "../../components/templates/AllRewards/AddRewards";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import ChatUserTable from "../../components/molecules/ChatUserTable";
import { Helmet } from "react-helmet-async";
import { useLanguageContext } from "../../context/language";

export type AllRewards = {
  id: string;
  name: string;
  teacher_name: string;
  name_en: string;
  teacher_id: string;
};
type AllRewards_TP = {
  title: string;
};

function AllRewards({ title }: AllRewards_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [rewardID, setRewardID] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [typeCompensationsFilter, setTypeCompensationsFilter] = useState("");
  const { currentLang } = useLanguageContext();
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<AllRewards>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Teacher name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row.original.teacher_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.teacher_name}
            </Link>
          </div>
        ),
        accessorKey: "teacher_name",
      },
      {
        header: `${t("Teacher Chat")}`,
        cell: (info) => <ChatUserTable id={info.row.original?.teacher_id} />,
        accessorKey: "chat",
      },

      {
        header: `${t("type")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "type_text",
      },
      {
        header: `${t("value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "amount",
      },
      {
        header: `${t("Date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <div>
              <EditTable
                action={() => {
                  setModel(true);
                  //@ts-ignore
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
    [currentLang, page]
  );

  const queryParams: any = {
    status: status.length ? status : 0,
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
    date_range: dateFilter,
    type: typeCompensationsFilter,
  };
  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `dashboard/teachers/rewards?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    data: AllRewards,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
  console.log("🚀 ~ AllRewards ~ AllRewards:", AllRewards);
  const { mutate: deleteReward } = useMutate({
    mutationKey: [`dashboard/teachers/rewards/${rewardID}`],
    endpoint: `dashboard/teachers/rewards/${rewardID}`,
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
                  className="md:w-[230px]"
                  addLabel={`${t("Add Rewards / Discount")}`}
                />
              </div>
            </div>
            <Table
              data={
                AllRewards?.data?.balances ? AllRewards?.data?.balances : []
              }
              showNavigation
              //@ts-ignore
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setDateFilter={setDateFilter}
              setPagePagination={setPagePagination}
              columnsToRemove={[3]}
              typeCompensations={setTypeCompensationsFilter}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddRewards
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllRewards?.data?.paginate.total_pages}
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
export default AllRewards;
