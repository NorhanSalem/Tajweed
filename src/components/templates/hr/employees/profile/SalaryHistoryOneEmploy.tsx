import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch, useMutate } from "../../../../../hooks";
import { notify } from "../../../../../utils/toast";
import DeleteTable from "../../../../../components/atoms/icons/DeleteTable";
import EditTable from "../../../../../components/atoms/icons/EditTable";

import NextPaginationIc from "../../../../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../../../../components/atoms/icons/prevpagination";
// import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../../molecules/ModalTemplate";
import showAlert from "../../../../../components/molecules/ShowAlert";
import Paginate from "../../../../../components/molecules/table/Paginate";
// import { Table } from "../../../components/templates/reusableComponants/tantable/Table";
import Paysalary from "../../../../../components/atoms/icons/Paysalary";
import { Table } from "../../../../organisms/tantable/Table";
import { pagePaginate } from "../../../../../utils/helpers";

type dataSource_TP = {
  data: {
    paginate: {
      total: number;
      total_pages: number;
    };
    items: AllSalaries[];
  };
  length: number;
  compensations: [];
};
export type AllSalaries = {
  date:Date;
  name: string;
  type:string;
  value:string;
  note: string;
};
type AllSalaries_TP = {
  title: string;
  employeId:number,
  EditingData:{}

};

function SalaryHistoryOneEmploy({EditingData,title, }: AllSalaries_TP) {
  const employeId = useParams().employeeId;
  console.log("AllSalaries",employeId)

  const [dataSource, setDataSource] = useState<dataSource_TP>({
    data: {
      paginate: {
        total: 0,
        total_pages: 0,
      },
      items: [],
    },
    length: 0,
    compensations: [],
  });
  const [resetForm, setResetForm] = useState(true);
  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<AllSalaries>[]>(
    () => [
      {
        header: t("Month / Year"),
        cell: (info) => info.renderValue(),
        accessorKey: "for_month",
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
        cell: (info) => info?.row?.original?.status=="Unpaid" ?<div className="bg-[#e3342f] text-white rounded-md p-2">{t("Unpaid")}</div>:
        <div className="bg-[#14A44D] text-white rounded-md p-2">{t("Paid")}</div>,
        accessorKey: "status",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          info?.row?.original?.status=="Unpaid" ? 
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
                      paySalary(salarieId);
                    }
                  );
                  setSalariesId(info?.row?.original?.id);
                }}
                > {t("Pay Salary")} </button>
          
          :<div className="my-2"> <span className="bg-[#14A44D] text-white rounded-md py-[4px] px-10 "> {t("Succsess")} </span></div>
        ),
        accessorKey: "status",
      },
      
    ],
    []
  );
  
  // state  last_action
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
  const [dateFilterAll, setDateFilterAll] =
    useState<SetStateAction<string>>("");
  const [typeFilter, setTypeFilter] = useState("");
  const [salarieId, setSalariesId] = useState({});
  const [model, setModel] = useState(false);
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [word, setWord] = useState("");

  const queryClient = useQueryClient();

  const total = dataSource.data?.paginate?.total;
  //all data
  const {
    isLoading,
    isSuccess,
    data: AllSalaries,
    refetch,
    isFetching,
  } = useFetch<AllSalaries[]>({
    endpoint: `dashboard/hr/salaries?employee_id=${employeId}?date_range=${
      dateFilterAll ? dateFilterAll : dateFilter
    }&page=${page}&pagenate=${pagePagination ? pagePagination : 20}`,
    queryKey: [
  `All-Salaries
  ${dateFilterAll}  
  ${dateFilter}  
  ${typeFilter}  
  ${pagePagination}    
  ${word}   
  ${total}   `,
    ],
    onSuccess(data) {
      // console.log(data)
      setDataSource(data);
    },
  });
// console.log(AllCompensations)
  //Pay salary

  const { mutate: paySalary, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/hr/salaries/${salarieId}/pay`],
    endpoint: `dashboard/hr/salaries/${salarieId}/pay`,
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
 
  useEffect(() => {
    if (page > 0) {
      refetch();
    }
  }, [page, status]);
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  // console.log(AllCompensations)

  return (
    <div className="bg-white p-3 md:p-8 rounded-xl dark:bg-dark-tertiary">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className=" flex justify-end ">
            <div className="">
              {/* <AddButton
                action={() => {
                  setModel(true);
                  setResetForm(true);
                }}
                addLabel={`${t("Add compensations")}`}
              /> */}
            </div>
          </div>
          <Table
            data={AllSalaries?.data?.salaries? AllSalaries?.data?.salaries : []}
            // data={0 ? AllStudent?.data?.students : []}
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            setPagePagination={setPagePagination}
            setDateFilter={setDateFilter}
            // setDateFilterAll={setDateFilterAll}
            setWord={setWord}
            setTypeFilter={setTypeFilter}
            type
            // Status
          />

          <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
            
          </ModalTemplate> 

          <div className="flex justify-end mt-3">
          <Paginate
              pagesCount={dataSource?.data?.paginate.total_pages}
              previousLabel={<Prevpagination />}
              nextLabel={<NextPaginationIc />}
              onPageChange={handlePageChange}
              initialPage={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SalaryHistoryOneEmploy;