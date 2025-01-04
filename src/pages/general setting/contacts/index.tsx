import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { useFetch, useMutate } from "../../../hooks";
import i18n from "../../../i18n";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";

export type Contacts = {
  id: string;
  message: string;
  is_read: number;
};
type Contacts_TP = {
  title: string;
};

function Contacts({ title }: Contacts_TP) {
  const [page, setPage] = useState(0);
  const [dataId, setDataId] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<Contacts>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Message")}`,
        cell: (info) => {
          const words = info.row.original.message?.split(" ");
          const first50Words = words?.slice(0, 10).join(" ");
          const remainingWords = words?.slice(10).join(" ");

          return (
            <div>
              {first50Words}
              {remainingWords && (
                <>
                  <br />
                  <span>{remainingWords}</span>
                </>
              )}
            </div>
          );
        },
        accessorKey: "message",
      },

      {
        header: `${t("Gender")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_type",
      },
      {
        header: `${t("User Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_name",
      },

      {
        header: `${t("User Email")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_email",
      },
      {
        header: `${t("Read")}`,
        cell: (info) => (
          <div>
            {info.row.original.is_read === 1 ? (
              <span className="bg-[#50cd89] text-[#fff] px-1 rounded-sm">
                {t("Readed")}
              </span>
            ) : (
              <span
                className="bg-[#f1416c] text-[#fff] px-1 rounded-sm cursor-pointer"
                onClick={() => {
                  changeStatusRead();
                  setDataId(info.row.original.id);
                }}
              >
                {t("Unread")}
              </span>
            )}
          </div>
        ),
        accessorKey: "is_read",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
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
                    //@ts-ignore
                    t("warning"),
                    () => {
                      deletePackage(dataId);
                      //  not action found in this component => metwally
                    }
                  );
                  setDataId(info.row.original.id);
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
  const changeStatusRead = () => {
    showAlert(
      t("Are you sure?"),
      t("You cannot go back in this process"),
      false,
      t("done"),
      true,
      //@ts-ignore
      t("warning"),
      () => {
        changeUnread(dataId);
      }
    );
  };

  // state

  const queryParams = {
    page: page,
    pagenate: pagePagination ? pagePagination : 20,
    search: word ? word : "",
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/contacts?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: Contacts,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  const endPointChangeUnread = `dashboard/contacts/mark_read/${dataId}`;
  const { mutate: changeUnread } = useMutate({
    endpoint: endPointChangeUnread,
    mutationKey: [endPointChangeUnread],
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const endPontDeletePackage = `dashboard/contacts/${dataId}/destroy`;
  const { mutate: deletePackage, isLoading: loadingDelete } = useMutate({
    mutationKey: [endPontDeletePackage],
    endpoint: endPontDeletePackage,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
    method: "delete",
  });

  const transformData = (Contacts: any) => {
    return Contacts?.map((item, index) => ({
      id: index + 1,
      message: item?.message,
      user_type: item?.user_type,
      user_name: item?.user_name,
      user_email: item?.user_email,
      is_read: item?.is_read,
      created_at: item?.created_at,
    }));
  };
  const ContactsExcellData = useMemo(() => {
    if (isSuccess && Contacts) {
      return transformData(Contacts?.data?.contacts);
    }
    return [];
  }, [isSuccess, Contacts]);
  const customColumnExcell = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Message")}`,
        cell: (info) => info.renderValue(),

        accessorKey: "message",
      },

      {
        header: `${t("Gender")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_type",
      },
      {
        header: `${t("User Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_name",
      },

      {
        header: `${t("User Email")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "user_email",
      },
      {
        header: `${t("Read")}`,
        cell: (info) => info.renderValue(),

        accessorKey: "is_read",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
    ],
    [page]
  );

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
            <Table
              data={Contacts?.data?.contacts ? Contacts?.data?.contacts : []}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              //@ts-ignore
              isRefetching={isRefetching}
              dataExcell={ContactsExcellData}
              customColumnExcell={customColumnExcell}
              setWord={setWord}
              setPagePagination={setPagePagination}
              setDateFilter={setDateFilter}
              columnsToRemove={[6]}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={Contacts?.data?.paginate.total_pages}
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
export default Contacts;
