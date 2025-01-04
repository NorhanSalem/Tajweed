import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import EditTable from "../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddSpecialization } from "../../components/templates/specializations/AddSpecialization";
import { useFetch, useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { indexTable, pagePaginate } from "../../utils/helpers";
import i18n from "../../i18n";
import { Helmet } from "react-helmet-async";
import { AddTeach } from "../../components/templates/CanTech/AddTeach";

export type CanTech = {
  [x: string]: string;
};
type CanTech_TP = {
  title: string;
};

function CanTech({ title }: CanTech_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [status, setStatus] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [specializationID, setSpecializationID] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);

  const cols = useMemo<ColumnDef<CanTech>[]>(
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
        header: `${t("active")}`,
        cell: (info) => (
          <div className="flex justify-center">
            {info.row.original.active == 1 ? (
              <p
                className="bg-[#50cd89] cursor-pointer text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px]"
                onClick={() => handleActive(info.row.original?.id)}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] cursor-pointer text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px]"
                onClick={() => handleActive(info.row.original?.id)}
              >
                {t("notactive")}
              </p>
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
                      deleteSponsor(specializationID);
                    }
                  );
                  setSpecializationID(info.row.original.id);
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
  const endpoint = `dashboard/teachers/teaching-fields?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    data: CanTech,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const { mutate: deleteSponsor } = useMutate({
    mutationKey: [`dashboard/teachers/teaching-fields/${specializationID}`],
    endpoint: `dashboard/teachers/teaching-fields/${specializationID}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err.response.data?.message);
    },
    method: "delete",
    formData: true,
  });
  const { mutate: activate } = useMutate({
    mutationKey: [
      `dashboard/teachers/teaching-fields/${specializationID}/activate`,
    ],
    endpoint: `dashboard/teachers/teaching-fields/${specializationID}/activate`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err);
    },
    formData: true,
  });
  const handleActive = (id) => {
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
    setSpecializationID(id);
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
                CanTech?.data?.teachingFields
                  ? CanTech?.data?.teachingFields
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
              columnsToRemove={[3]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddTeach
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={CanTech?.data?.paginate.total_pages}
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
export default CanTech;
