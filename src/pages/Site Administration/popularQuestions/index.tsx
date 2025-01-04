import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
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
import { useLanguageContext } from "../../../context/language";
import { useFetch, useMutate } from "../../../hooks";
import { pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { AddPopularQuestions } from "../../../components/templates/popularQuestions/AddPopularQuestions";

export type PopularQuestions = {
  [x: string]: string;
};
type PopularQuestions_TP = {
  title: string;
};

function PopularQuestions({ title }: PopularQuestions_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [model, setModel] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [editData, setEditData] = useState<any>(false);
  const { currentLang } = useLanguageContext();
  const [word, setWord] = useDebouncedState("", 300);
  const [stepsId, setStepsId] = useState("");

  const cols = useMemo<ColumnDef<PopularQuestions>[]>(
    () => [
      {
        header: "#",
        cell: (info) => info.renderValue(),
        accessorKey: "id",
      },
      {
        header: `${t("Question")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "question",
      },
      {
        header: `${t("Answer")}`,
        cell: (info) => {
          const words = info.row.original.answer?.split(" ");
          const first50Words = words?.slice(0, 20).join(" ");
          const remainingWords = words?.slice(20, 40).join(" ");
          const remainingWordsTow = words?.slice(40).join(" ");

          return (
            <div>
              {first50Words}
              {remainingWords && (
                <>
                  <br />
                  <span>{remainingWords}</span>
                </>
              )}
              {remainingWordsTow && (
                <>
                  <br />
                  <span>{remainingWordsTow}</span>
                </>
              )}
            </div>
          );
        },
        accessorKey: "answer",
      },
      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div className="flex justify-center">
            {info.row.original.active === 1 ? (
              <p
                className="bg-[#50cd89] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => handleSubmit(info.row.original?.id)}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
                onClick={() => handleSubmit(info.row.original?.id)}
              >
                {t("notactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "is_active",
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
      {
        header: `${t("Latest Update")}`,
        cell: (info) => (
          <div>
            <h2>{info.row.original.latest_update}</h2>
            <h2>{info.row.original.latest_update_date}</h2>
          </div>
        ),
        accessorKey: "latest_update",
      },
    ],
    [currentLang, page]
  );

  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/popular-questions?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: PopularQuestions,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
  });
  const deleteEndPoint = `dashboard/popular-questions/${stepsId}`;

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
  const { mutate: activate} = useMutate({
    endpoint: `dashboard/popular-questions/${stepsId}/activate`,
    mutationKey: [`dashboard/popular-questions/${stepsId}/activate`],
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const handleSubmit = (id: string) => {
    showAlert(
      t("Are you sure?"),
      t("You cannot go back in this process"),
      false,
      t("done"),
      true,
      "warning",
      () => {
        activate({});
      }
    );
    setStepsId(id)
  };

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
                PopularQuestions?.data?.questions
                  ? PopularQuestions?.data?.questions
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
              columnsToRemove={[4]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddPopularQuestions
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={PopularQuestions?.data?.paginate.total_pages}
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
export default PopularQuestions;
