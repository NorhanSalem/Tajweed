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
import { AddPackage } from "../../../components/templates/general setting/packages/AddPackage";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";

export type AllPackages = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type AllPackages_TP = {
  title: string;
};

function AllPackages({ title }: AllPackages_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [packageId, setPackageId] = useState<any>("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState<any>(false);
  const [word, setWord] = useDebouncedState("", 300);
  const cols = useMemo<ColumnDef<AllPackages>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "title",
      },
      {
        header: `${t("Classes Number")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "sessions",
      },

      {
        header: `${t("Class Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "session_duration",
      },
      {
        header: `${t("Package Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_duration",
      },
      {
        header: `${t("Old price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "old_price",
      },
      {
        header: `${t("Price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "price",
      },

      {
        header: `${t("Most Popular")}`,
        cell: (info) => (
          <div>
            {info?.row?.original?.popular == 1 ? (
              <p
                className="bg-[#50cd89] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You will deactivate"),
                    false,
                    t("done"),
                    true,
                    //@ts-ignore
                    t("warning"),
                    () => {
                      changeActivation({ popular: 0 });
                    }
                  );
                  setPackageId(info?.row?.original?.id);
                }}
              >
                {t("popular")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You will activate"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeActivation({ popular: 1 });
                    }
                  );

                  setPackageId(info?.row?.original?.id);
                }}
              >
                {t("not popular")}
              </p>
            )}
          </div>
        ),
        accessorKey: "active",
      },
      {
        header: `${t("active")}`,
        cell: (info) => (
          <div>
            {info?.row?.original?.active == 1 ? (
              <p
                className="bg-[#50cd89] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You will deactivate"),
                    false,
                    t("done"),
                    true,
                    //@ts-ignore
                    t("warning"),
                    () => {
                      changeStatus({});
                    }
                  );
                  setPackageId(info?.row?.original?.id);
                }}
              >
                {t("active")}
              </p>
            ) : (
              <p
                className="bg-[#f1416c] text-white rounded-md cursor-pointer"
                onClick={() => {
                  showAlert(
                    t("Are you sure?"),
                    t("You will activate"),
                    false,
                    t("done"),
                    true,
                    "warning",
                    () => {
                      changeStatus({});
                    }
                  );

                  setPackageId(info?.row?.original?.id);
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
                  setPackageId(info.row.original.id);
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
  const endpoint = `dashboard/packages?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AllPackages,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });
  const { mutate: changeActivation, isLoading: loadingActivation } = useMutate({
    mutationKey: [`dashboard/packages/${packageId}/most-popular`],
    endpoint: `dashboard/packages/${packageId}/most-popular`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });
  const { mutate: changeStatus } = useMutate({
    mutationKey: [`packages/${packageId}/activate`],
    endpoint: `dashboard/packages/${packageId}/activate`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err: any) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });
  const deleteEndPoint = `dashboard/packages/${packageId}`;
  const { mutate: deletePackage } = useMutate({
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
                  addLabel={`${t("Add Package")}`}
                />
              </div>
            </div>
            <Table
              data={AllPackages?.data?.items ? AllPackages?.data?.items : []}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              setWord={setWord}
              setPagePagination={setPagePagination}
              columnsToRemove={[8]}
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddPackage
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllPackages?.data?.paginate.total_pages}
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
export default AllPackages;
