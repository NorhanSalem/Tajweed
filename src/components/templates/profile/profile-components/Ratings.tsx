import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { BiSolidChat } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks";
import i18n from "../../../../i18n";
import { indexTable, pagePaginate } from "../../../../utils/helpers";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import Paginate from "../../../molecules/table/Paginate";
import { Table } from "../../../organisms/tantable/Table";
import ReportModal from "../../../molecules/ReportModal";
import RatingTeacher from "../../../molecules/RatingTeacher";
import { EditIcon } from "../../../atoms/icons";
function Ratings({ teacherId }: any) {
  type Ratings = {
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
  const navigate = useNavigate();
  const [modal, setOpenModal] = useState(false);
  const [dateRating, setDateRating] = useState();

  const cols = useMemo<ColumnDef<Ratings>[]>(
    () => [
      {
        header: "#",
        cell: (info) => <span>{indexTable(info?.row?.index, page)}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Student Name")}`,
        cell: (info) => (
          <div>
            <Link
              to={`/student/students/profile/${info.row.original.student_id}`}
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.student_name.length > 50
                ? info.row.original.student_name.slice(0, 30) + "..."
                : info.row.original.student_name}
            </Link>
          </div>
        ),
        accessorKey: "student_name",
      },
      {
        header: `${t("chat")}`,
        cell: (info) => (
          <div
            onClick={() => navigate(`/chat/students/${info.row.original.student_id}`)}
            className="cursor-pointer  flex justify-center"
          >
            <BiSolidChat className="!w-[20px] h-[20px]" />
          </div>
        ),
        accessorKey: "chat",
      },
      // {
      //   header: `${t("Class Code")}`,
      //   cell: (info) => info.renderValue(),
      //   accessorKey: "session_number",
      // },
      {
        header: `${t("Package Name")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "package_title",
      },

      {
        header: `${t("Rating")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "rating",
      },
      {
        header: `${t("Rating Comment")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "rating_comment",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <EditIcon
              action={() => {
                setOpenModal(true);
                setDateRating(info.row.original);
              }}
            />
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
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/teachers/${teacherId}/ratings?${searchParams.toString()}`;
  const {
    isLoading,
    isSuccess,
    refetch,
    data: RatingsData,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!page,
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
  return (
    <div>
      <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Table
              data={
                RatingsData?.data?.ratings ? RatingsData?.data?.ratings : []
              }
              totalItemsData={RatingsData?.data?.paginate?.total}
              showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              setPagePagination={setPagePagination}
              setWord={setWord}
            />
            <ReportModal isOpen={modal} onClose={() => setOpenModal(false)}>
              <RatingTeacher
                setOpenModal={setOpenModal}
                refetch={refetch}
                data={dateRating}
              />
            </ReportModal>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={RatingsData?.data?.paginate.total_pages}
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

export default Ratings;
