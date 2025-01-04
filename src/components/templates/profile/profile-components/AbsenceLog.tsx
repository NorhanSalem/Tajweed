import {useDebouncedState} from "@mantine/hooks";
import {ColumnDef} from "@tanstack/react-table";
import {t} from "i18next";
import {SetStateAction, useMemo, useState} from "react";
import {BiSolidChat} from "react-icons/bi";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useFetch} from "../../../../hooks";
import i18n from "../../../../i18n";
import {pagePaginate} from "../../../../utils/helpers";
import NextPaginationIc from "../../../atoms/icons/NextPaginationIc";
import Prevpagination from "../../../atoms/icons/prevpagination";
import Paginate from "../../../molecules/table/Paginate";
import {Table} from "../../../organisms/tantable/Table";

function AbsenceLog({teacherId}: any) {
    type Absence = {
        [x: string]: string;
    };

    const [pagePagination, setPagePagination] = useState(pagePaginate);
    const [page, setPage] = useState(0);
    const [word, setWord] = useDebouncedState("", 300);
    const [dateFilter, setDateFilter] = useState<SetStateAction<string>>("");
    const navigate = useNavigate();
    const cols = useMemo<ColumnDef<Absence>[]>(
        () => [
            {
                header: `${t("Student Name")}`,
                cell: (info) => (
                    <div>
                        <Link
                            to={`/student/students/profile/${info.row.original.student_id}`}
                            style={{fontSize: "14px"}}
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
                        onClick={() => navigate(`/chat/all/${info.row.original.student_id}`)}
                        className="cursor-pointer  flex justify-center"
                    >
                        <BiSolidChat className="!w-[20px] h-[20px]"/>
                    </div>
                ),
                accessorKey: "chat",
            },
            {
                header: `${t("Session Date")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "date",
            },
            {
                header: `${t("Session Time")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "time",
            },
        ],
        [i18n.language, page]
    );
    const queryParams = {
        date_range: dateFilter,
        page: page,
        pagenate: pagePagination ? pagePagination : 20,
        search: word ? word : "",
    };

    const searchParams = new URLSearchParams(queryParams as any);
    // const endpoint = `dashboard/sessions?status=Unjoined Teacher&${searchParams.toString()}`;
    const endpoint = `dashboard/teachers/${teacherId}/absences?${searchParams.toString()}`;
    const {
        isLoading,
        isSuccess,
        data: AllData,
        isFetching,
    } = useFetch<any>({
        endpoint: endpoint,
        queryKey: [endpoint],
        enabled: !!dateFilter

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
                                AllData?.data.items
                                    ? AllData?.data.items
                                    : []
                            }
                            totalItemsData={AllData?.data?.paginate?.total}
                            showNavigation
                            columns={cols ? cols : []}
                            isSuccess={isSuccess}
                            isLoading={isLoading}
                            setDateFilter={setDateFilter}
                            isFetching={isFetching}
                            setPagePagination={setPagePagination}
                            setWord={setWord}
                        />

                        <div className="flex justify-end mt-3">
                            <Paginate
                                pagesCount={AllData?.data?.paginate?.total_pages}
                                previousLabel={<Prevpagination/>}
                                nextLabel={<NextPaginationIc/>}
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

export default AbsenceLog;
