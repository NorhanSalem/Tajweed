import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeleteTable from "../../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../../components/atoms/icons/prevpagination";
import { AddButton } from "../../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../../components/molecules/ModalTemplate";
import showAlert from "../../../../components/molecules/ShowAlert";
import Paginate from "../../../../components/molecules/table/Paginate";
import { Table } from "../../../../components/organisms/tantable/Table";
import { AddCountry } from "../../../../components/templates/general setting/Country/country/AddCountry";
import { useFetch, useMutate } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import { notify } from "../../../../utils/toast";

export type AllCountry = {
  id: string;
  name: string;
  active: number;
};
type AllCountry_TP = {
  title: string;
};

function AllCountry({ title }: AllCountry_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [countryId, setCountryID] = useState<any>("");
  const [page, setPage] = useState(0);
  const [packageId, setSponsorId] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);

  const cols = useMemo<ColumnDef<AllCountry>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Code")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "code",
      },
      {
        header: `${t("Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title",
      },
      {
        header: `${t("Nationality")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "nationality",
      },
      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div>
            {info.row.original.active === 1 ? (
              <p
                className="bg-emerald-600 text-white rounded-md  m-auto cursor-pointer"
                onClick={() => {
                  setCountryID(info.row.original.id);
                  changeStatus({ active: 0 });
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-red-600 text-white rounded-md  m-auto cursor-pointer"
                onClick={() => {
                  setCountryID(info.row.original.id);
                  changeStatus({ active: 1 });
                }}
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
  const endpoint = `dashboard/countries?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AllCountry,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
  });
  const deleteEndPoint = `dashboard/countries/${packageId}`;

  const { mutate: deletePackage } = useMutate({
    endpoint: deleteEndPoint,
    mutationKey: [deleteEndPoint],
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
    mutationKey: [`countries/${countryId}`],
    endpoint: `dashboard/countries/${countryId}/activate`,
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
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add Country")}`}
                />
              </div>
            </div>
            <Table
              data={
                AllCountry?.data?.countries ? AllCountry?.data?.countries : []
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
              columnsToRemove={[5]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddCountry
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllCountry?.data?.paginate.total_pages}
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
export default AllCountry;
