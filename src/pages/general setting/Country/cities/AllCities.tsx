import { useDebouncedState } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import DeleteTable from "../../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../../components/molecules/ModalTemplate";
import showAlert from "../../../../components/molecules/ShowAlert";
import Paginate from "../../../../components/molecules/table/Paginate";
import { Table } from "../../../../components/organisms/tantable/Table";
import { AddCity } from "../../../../components/templates/general setting/Country/cities/AddCity";
import { useFetch, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import i18n from "../../../../i18n";
import { Helmet } from "react-helmet-async";

export type AllCities = {
  id: string;
  name: string;
  active: number;
};
type AllCities_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

function AllCities({ title }: AllCities_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [cityId, setCityID] = useState<string>("");
  const [page, setPage] = useState(0);
  const [packageId, setSponsorId] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);

  const cols = useMemo<ColumnDef<AllCities>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Code")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "country.code",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title",
      },
      {
        header: `${t("Country")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "country.title",
      },
      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div>
            {info.row.original.active === 1 ? (
              <p
                className="bg-emerald-600 text-white rounded-md  m-auto cursor-pointer w-1/2"
                onClick={() => {
                  setCityID(info.row.original.id);
                  changeStatus({ active: 0 });
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-red-600 text-white rounded-md  m-auto cursor-pointer w-1/2"
                onClick={() => {
                  setCityID(info.row.original.id);
                  changeStatus({ active: 1 });
                }}
              >
                {t("notactive")}
              </p>
            )}
          </div>
        ),
        accessorKey: "country.active",
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
                      deletePackage(packageId);
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
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/states?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AllCities,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
   enabled:!!page

  });

  const deleteEndPont = `dashboard/states/${packageId}`;

  const { mutate: deletePackage } = useMutate({
    mutationKey: [deleteEndPont],
    endpoint: deleteEndPont,

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

  const { mutate: changeStatus } = useMutate({
    mutationKey: [`states/${cityId}`],
    endpoint: `dashboard/states/${cityId}/activate`,
    onSuccess: (data: any) => {
      refetch();
      notify("success");
    },
    onError: (err: any) => {
      notify("error", err);
    },
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
                    //setEditData(undefined)
                    setModel(true);
                    // setOpen(true)
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add City")}`}
                />
              </div>
            </div>
            <Table
              data={AllCities?.data?.states ? AllCities?.data?.states : []}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[5]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddCity
                setModel={setModel}
                resetForm={resetForm}
                refetch={refetch}
                updateData={editData}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllCities?.data?.paginate.total_pages}
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
export default AllCities;
