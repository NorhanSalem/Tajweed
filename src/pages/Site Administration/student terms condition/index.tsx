/////////// IMPORTS
///
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
import { StudentTermsConditionMain } from "../../../components/templates/Site Administration/student terms condition/StudentTermsConditionMain";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import {
  formatTextWithBreaks,
  indexTable,
  pagePaginate,
} from "../../../utils/helpers";
import { notify } from "../../../utils/toast";

type StudentTermsCondition_props = {
  title: string;
  dataSource?: any;
  StudentTermsConditionData?: any;
  setModel?: any;
  resetForm?: any;
};

export type StudentTermsConditionData = {
  id: number;
  text: string;
  text_ar: string;
  text_en: string;
};

export const StudentTermsCondition = ({
  title,
}: StudentTermsCondition_props) => {
  const [model, setModel] = useState(false);
  const [resetForm, setResetForm] = useState(true);
  const [word, setWord] = useDebouncedState("", 300);
  const [editData, setEditData] = useState(false);
  const [conditionId, setConditionId] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);


  const cols = useMemo<ColumnDef<StudentTermsConditionData>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("The condition is in Arabic")}`,
        cell: (info) => (
          <div
            dangerouslySetInnerHTML={{
              __html: formatTextWithBreaks(info.row.original.text_ar, 25),
            }}
          />
        ),
        accessorKey: "text_ar",
      },
      {
        header: `${t("The condition is in English")}`,
        cell: (info) => (
          <div
            dangerouslySetInnerHTML={{
              __html: formatTextWithBreaks(info.row.original.text_en, 25),
            }}
          />
        ),
        accessorKey: "text_en",
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
                      deleteSteps(conditionId);
                    }
                  );
                  setConditionId(info.row.original.id);
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
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/students-terms-conditions?${searchParams.toString()}`;

  const {
    isSuccess,
    refetch,
    data: StudentTermsConditionData,
    isRefetching,
    isFetching,
    isLoading: loadingData,
  } = useFetch<any>({
    endpoint: endpoint,

    queryKey: [endpoint],
  });
  const deleteEndPoint = `dashboard/students-terms-conditions/${conditionId}`;

  const { mutate: deleteSteps } = useMutate({
    mutationKey: [deleteEndPoint],
    endpoint: deleteEndPoint,

    onSuccess: (data: any) => {
      notify("success");
      setModel(false);
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
      setModel(false);
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
                  className="!w-max"
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("add condition")}`}
                />
              </div>
            </div>
            <Table
              data={
                StudentTermsConditionData?.data?.items
                  ? StudentTermsConditionData?.data?.items
                  : []
              }
              showNavigation
              //@ts-ignore
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={loadingData}
              isFetching={isFetching}
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[3]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <StudentTermsConditionMain
                setModel={setModel}
                resetForm={resetForm}
                refetch={refetch}
                updateData={editData}
              />
            </ModalTemplate>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={
                  StudentTermsConditionData?.data?.paginate.total_pages
                }
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
};
