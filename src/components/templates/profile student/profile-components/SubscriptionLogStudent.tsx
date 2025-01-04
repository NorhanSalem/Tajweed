import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router";
import { useFetch, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { Button } from "../../../atoms";
import { EditIcon } from "../../../atoms/icons";
import { AddButton } from "../../../molecules/AddButton";
import { ModalTemplate } from "../../../molecules/ModalTemplate";
import MainCard from "../../../organisms/card/MainCard";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import { AddTeacher } from "../../Teacher/AddTeacher";
import { Modal, TextAreaField } from "../../../molecules";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Prevpagination from "../../../atoms/icons/prevpagination";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import { useDebouncedState } from "@mantine/hooks";
import Actions from "../../../molecules/Actions/Actions";
import { Link } from "react-router-dom";
function SubscriptionLogStudent({
  SubscriptionsData,
  studentId,
  hideHeader,
}: any) {
  type SubscriptionLogStudent = {
    id: number;
    name: string;
    Phone: string;
    whatsapp: string;
    specialization: string;
    is_azher: boolean;
    is_mogaz: boolean;
    interview_status: string;
    join: string;
    required_hours: string;
    created_at: string;
    total_subscriptions: string;
    state_name: string;
    activation_status: string;
    zoom_status: string;
  };
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [page, setPage] = useState(0);
  const [word, setWord] = useDebouncedState("", 300);
  const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");

  const cols = useMemo<ColumnDef<SubscriptionLogStudent>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Created At")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "created_at",
      },
      {
        header: `${t("Teacher Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/teacher/teachers/profile/${info.row.original.teacher_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.teacher_name}
            </Link>
          </div>
        ),
        accessorKey: "teacher_name",
      },
      // {
      //   header: `${t('State')}`,
      //   cell: (info) => info.renderValue(),
      //   accessorKey: 'state_title',
      // },

      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },
      {
        header: `${t("Package Price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price",
      },

      {
        header: `${t("Paid")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "subscription_price",
      },
      {
        header: `${t("Booked classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "booked_sessions",
      },
      {
        header: `${t("Finished classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "finished_sessions",
      },
      {
        header: `${t("Remaining classes")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "remain_sessions",
      },
      {
        header: `${t("price")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_price",
      },
      // {
      //   header: `${t('Returned Classes Price')}`,
      //   cell: (info) => info.renderValue(),
      //   accessorKey: 'returned_sessions_price',
      // },
      {
        header: `${t("Package Duration")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_duration",
      },
      {
        header: `${t("Status")}`,
        cell: (info) => (
          <div
            style={{
              backgroundColor: `${info.row.original?.status_bg_color}`,
              color: `${info.row.original?.status_text_color}`,
            }}
          >
            {info.row.original?.status_text}
          </div>
        ),
        accessorKey: "status_text",
      },

      {
        header: `${t("action")}`,
        cell: (info) => (
          <div>
            <Actions refetch={refetch} deleteSubscription info={info} />
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [i18n.language, page]
  );

  const queryParams = {
    page: page,
    pagenate: pagePagination,
    search: word ? word : "",
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/students/subscription/${studentId}?${searchParams.toString()}`;

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: SubscriptionLogStudentData,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12 ">
            <Table
              data={
                SubscriptionLogStudentData?.data?.subscriptions
                  ? SubscriptionLogStudentData?.data?.subscriptions
                  : []
              }
              totalItemsData={SubscriptionLogStudentData?.data.paginate.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
              setDateFilter={setDateFilter}
            />

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={
                  SubscriptionLogStudentData?.data?.paginate.total_pages
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
    </div>
  );
}

export default SubscriptionLogStudent;
