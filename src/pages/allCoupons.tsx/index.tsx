import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import DeleteTable from "../../components/atoms/icons/DeleteTable";
import EditTable from "../../components/atoms/icons/EditTable";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddCoupon } from "../../components/templates/coupons/AddCoupon";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { indexTable, pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { Helmet } from "react-helmet-async";

export type AllCoupon = {
  id: string;
  is_percentage: number;
  start_date: string;
  end_date: string;
};
type AllCoupon_TP = {
  title: string;
};

function AllCoupon({ title }: AllCoupon_TP) {
  const [resetForm, setResetForm] = useState(true);
  const [page, setPage] = useState(0);
  const [CouponId, setCouponId] = useState("");
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [dateFilter, setDateFilter] = useState<any>("");
  const [is_percentage, setPercentage] = useState("");
  const [couponType, setCouponType] = useState("");
  const cols = useMemo<ColumnDef<AllCoupon>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },

      {
        header: `${t("Coupon Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon",
      },
      {
        header: `${t("Type")}`,
        cell: (info) => (
          <div>
            {info.row.original.is_percentage === 0 ? t("Num") : t("Percentage")}
          </div>
        ),
        accessorKey: "is_percentage",
      },
      {
        header: `${t("Discount")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "discount",
      },
      {
        header: `${t("Max Used")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "max_used",
      },
      {
        header: `${t("Remainder")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "remainder",
      },
      {
        header: `${t("Start Date")}`,
        cell: (info) => (
          <div>
            {info.row.original.start_date ? info.row.original.start_date : "--"}
          </div>
        ),
        accessorKey: "start_date",
      },
      {
        header: `${t("End Date")}`,
        cell: (info) => (
          <div>
            {info.row.original.end_date ? info.row.original.end_date : "--"}
          </div>
        ),
        accessorKey: "end_date",
      },
      {
        header: `${t("Coupon Type")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "coupon_type_text",
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
                      deleteCoupon(CouponId);
                      console.log("deleted");
                    }
                  );
                  setCouponId(info.row.original.id);
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
    pagenate: pagePagination,
    search: word ? word : "",
    page: page,
    date_range: dateFilter,
    is_percentage: is_percentage,
    coupon_type: couponType,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/advertisement/coupons?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    data: AllCoupon,
    isRefetching,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const { mutate: deleteCoupon } = useMutate({
    mutationKey: [`dashboard/advertisement/coupons/${CouponId}`],
    endpoint: `dashboard/advertisement/coupons/${CouponId}`,
    onSuccess: () => {
      refetch();
      notify("success");
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
                  addLabel={`${t("Add Coupons")}`}
                />
              </div>
            </div>
            <Table
              data={AllCoupon?.data?.items ? AllCoupon?.data?.items : []}
              showNavigation
              //@ts-ignore
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPercentage={setPercentage}
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setDateFilter={setDateFilter}
              setCouponType={setCouponType}

              // Status
            />

            <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
              <AddCoupon
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
              />
            </ModalTemplate>
            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllCoupon?.data?.paginate.total_pages}
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
export default AllCoupon;
