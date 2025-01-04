import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
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
import { AddLearningSteps } from "../../../components/templates/learningSteps/AddLearningSteps";
import { useLanguageContext } from "../../../context/language";
import { useFetch, useMutate } from "../../../hooks";
import { pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";

export type LearningSteps = {
  [x:string]:string
};
type LearningSteps_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

function LearningSteps({ title }: LearningSteps_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [stepsId, setStepsId] = useState("");
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [model, setModel] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const { currentLang } = useLanguageContext();

  const cols = useMemo<ColumnDef<LearningSteps>[]>(
    () => [
      {
        header: `${t("Statement")}`,
        cell: (info) => <span>{info?.row?.index + 1}</span>,
        accessorKey: "id",
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
        header: `${t("Description in Arabic")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "description_ar",
      },
      {
        header: `${t("Description in English")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "description_en",
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
                      deleteSteps(stepsId);
                    }
                  );
                  setStepsId(info.row.original.id);
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
    status: status.length ? status : 0,
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/learning-steps?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: LearningSteps,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const deleteEndPoint = `dashboard/learning-steps/${stepsId}`;
  const { mutate: deleteSteps, isLoading: loadingDelete } = useMutate({
    endpoint: deleteEndPoint,
    mutationKey: [deleteEndPoint],

    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
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
            <div className=" flex justify-end ">
              <div className="">
                <AddButton
                  className="!w-max"
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
                LearningSteps?.data?.items

                  ? LearningSteps?.data?.items
                  : []
              }
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
              columnsToRemove={[5, 6]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddLearningSteps
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={LearningSteps?.data?.paginate?.total_pages}
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
export default LearningSteps;
