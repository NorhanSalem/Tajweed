import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import showAlert from "../../../components/molecules/ShowAlert";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { indexTable, pagePaginate } from "../../../utils/helpers";
import { useLanguageContext } from "../../../context/language";
import { Helmet } from "react-helmet-async";

export type AllSalaries = {
  employee_id: string;
  employee_name: string;
  status: "Unpaid" | "Paid";
  id: string;
};
type AllSalaries_TP = {
  title: string;
};

function AllSalaries({ title }: AllSalaries_TP) {
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const [salariesId, setSalariesId] = useState({});
  const [Year, setYear] = useState();
  const [Month, setMonth] = useState();
  const [Day, setDay] = useState();
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [word, setWord] = useState("");
  const { currentLang } = useLanguageContext();
  const [status, setStatus] = useState("");

  const cols = useMemo<ColumnDef<AllSalaries>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Month / Year")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "for_month",
      },
      {
        header: `${t("employee id")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "employee_id",
      },
      {
        header: `${t("Employee Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/hr/employees/profile/${info.row.original.employee_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.employee_name}
            </Link>
          </div>
        ),
        accessorKey: "employee_name",
      },
      {
        header: `${t("Salary paid date")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "paid_at",
      },
      {
        header: `${t("Salary value")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "value",
      },
      {
        header: `${t("awards")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "awards",
      },
      {
        header: `${t("deductions")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "deductions",
      },
      {
        header: `${t("Total")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "total",
      },
      {
        header: `${t("Status")}`,
        cell: (info) =>
          info?.row?.original?.status == "Unpaid" ? (
            <div className="bg-[#e3342f] text-white rounded-md p-2">
              {t("Unpaid")}
            </div>
          ) : (
            <div className="bg-[#14A44D] text-white rounded-md p-2">
              {t("Paid")}
            </div>
          ),
        accessorKey: "status",
      },
      {
        header: `${t("action")}`,
        cell: (info) =>
          info?.row?.original?.status == "Unpaid" ? (
            <button
              className="hover:cursor-pointer bg-mainBlue dark:bg-dark-tertiary dark:border-[#3b3b64] text-white border border-lightBlack py-[6px] px-8 font-bold rounded-md"
              onClick={() => {
                showAlert(
                  ` ${t("Are you sure?")}`,
                  `  ${t("")}`,
                  false,
                  t("done"),
                  true,
                  "warning",
                  () => {
                    paySalary(salariesId);
                  }
                );
                setSalariesId(info?.row?.original?.id);
              }}
            >
              {" "}
              {t("Pay Salary")}{" "}
            </button>
          ) : (
            <div className="my-2">
              {" "}
              <span className="bg-[#57625b] text-white rounded-md py-[4px] px-10 ">
                {" "}
                {t("Success")}{" "}
              </span>
            </div>
          ),
        accessorKey: "status",
      },
    ],
    [page, currentLang]
  );

  const queryParams = {
    pagenate: pagePagination,
    // date_range: dateFilter,
    search: word ? word : "",
    page: page,
    status: status,
    ...(Month && { month: Month }),
    ...(Year && { year: Year }),
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/hr/salaries?${searchParams.toString()}`;

  const {
    isLoading,
    isSuccess,
    data: AllSalaries,
    refetch,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });
  console.log("🚀 ~ AllSalaries ~ AllSalaries:", AllSalaries);

  const { mutate: paySalary, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/hr/salaries/${salariesId}/pay`],
    endpoint: `dashboard/hr/salaries/${salariesId}/pay`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    method: "post",
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
      <div className="bg-white p-3 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="home-cards   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0  col-span-4 mb-10">
            <div className="flex  justify-between p-2">
              <p>{t("Total")}</p>

              <p>
                {
                  //@ts-ignore
                  AllSalaries?.total_salaries
                }
              </p>
            </div>
          </div>
          <div className="col-span-12">
            <Table
              data={
                AllSalaries?.data?.salaries ? AllSalaries?.data?.salaries : []
              }
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setDateFilter={setDateFilter}
              setWord={setWord}
              SetSalariesType={setStatus}
              columnsToRemove={[]}
              setYear={setYear}
              setMonth={setMonth}
              setDay={setDay}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={AllSalaries?.data?.paginate.total_pages}
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
export default AllSalaries;
