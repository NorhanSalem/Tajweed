import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { GiCancel } from "react-icons/gi";
import * as Yup from "yup";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { Button } from "../../atoms";
import { EditIcon } from "../../atoms/icons";
import { WhatsAppIcon } from "../../atoms/icons/WhatsAppIcon";
import { Modal } from "../../molecules";
import { AddButton } from "../../molecules/AddButton";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import { Table } from "../../organisms/tantable/Table";
import Paginate from "../../molecules/table/Paginate";
import { useNavigate } from "react-router-dom";
import { AddSponsor } from "./AddSponsor";
import DeleteTable from "../../atoms/icons/DeleteTable";
import showAlert from "../../molecules/ShowAlert";
import EditTable from "../../atoms/icons/EditTable";
import Prevpagination from "../../atoms/icons/prevpagination";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import { indexTable, pagePaginate } from "../../../utils/helpers";

export type AllSponsor = {
    id: number;
    name: string;
    name_ar: string;
    name_en: string;
};
type AllSponsor_TP = {
    title: string;
};

type Search_TP = {
    search: string;
};

function AllSponsor({ title }: AllSponsor_TP) {
    const [dataSource, setDataSource] = useState<AllSponsor[]>([]);
    const [resetForm, setResetForm] = useState(true);

    const cols = useMemo<ColumnDef<AllSponsor>[]>(
        () => [
            {
                header: "ID",
                cell: (info) => (
                    <span>{indexTable(info?.row?.index, page)}</span>
                ),
                accessorKey: "id",
            },

            {
                header: `${t("Title")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "title",
            },
            {
                header: `${t("Responsible Name")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "responsable_name",
            },
            {
                header: `${t("Responsible phone")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "phone",
            },
            {
                header: `${t("Coupon Code")}`,
                cell: (info) => info.renderValue(),
                accessorKey: "coupon_code",
            },

            {
                header: `${t("action")}`,
                cell: (info) => (
                    <div className="flex justify-center gap-2">
                        <div>
                            <div>
                                <EditTable
                                    action={() => {
                                        setModel(true);
                                        setEditData(info.row.original);
                                        setResetForm(false);
                                    }}
                                />
                            </div>
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
                                            deleteSponsor(sponsorId);
                                            console.log("deleted");
                                        }
                                    );
                                    setSponsorId(info?.row?.original?.id);
                                }}
                            />
                        </div>
                    </div>
                ),

                accessorKey: "join",
            },
        ],
        []
    );

    // state
    const [status, setStatus] = useState<AllSponsor[]>(0);
    const [page, setPage] = useState(0);
    const [pagePagination, setPagePagination] = useState(pagePaginate);

    const [sponsorId, setSponsorId] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [model, setModel] = useState(false);
    const [editData, setEditData] = useState(false);

    const [word, setWord] = useState();

    //all data
    const {
        isLoading,
        isSuccess,
        data: AllSponsor,
        isRefetching,
        error,
        refetch,
        isFetching,
        isFetched,
    } = useFetch<AllSponsor[]>({
        endpoint: `dashboard/advertisement/sponsors?search=${
            word ? word : ""
        }&page=${page}&pagenate=${pagePagination ? pagePagination : 20}`,
        queryKey: [`All-Sponsors`, word, pagePagination],
        onSuccess(data) {
            setDataSource(data);
        },
    });

    //Delete Student
    const { mutate: deleteSponsor, isLoading: loadingDelete } = useMutate({
        mutationKey: [`dashboard/advertisement/sponsors/${sponsorId}`],
        endpoint: `dashboard/advertisement/sponsors/${sponsorId}`,

        onSuccess: (data: any) => {
            notify("success");
            setOpenModal(false);
            refetch();
        },
        onError: (err) => {
            notify("error", err);
            setOpenModal(false);
        },
        method: "delete",
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

    return (
        <div className="bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <div className=" flex justify-end">
                        <div className="">
                            <AddButton
                                className="!w-max"
                                action={() => {
                                    //setEditData(undefined)
                                    setModel(true);
                                    // setOpen(true)
                                    setResetForm(true);
                                }}
                                addLabel={`${t("Add Sponsor")}`}
                            />
                        </div>
                    </div>
                    <Table
                        data={
                            AllSponsor?.data?.sponsors
                                ? AllSponsor?.data?.sponsors
                                : []
                        }
                        showNavigation
                        columns={cols ? cols : []}
                        setStatus={setStatus}
                        isSuccess={isSuccess}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        isRefetching={isRefetching}
                        setWord={setWord}
                        setPagePagination={setPagePagination}
                        columnsToRemove={[5]}
                        // Status
                    />

                    <Modal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <h2 className="text-start mt-5">
                            هل أنت متأكد من حذف هذا الممول
                        </h2>
                        <div className="flex justify-between px-5 mt-5">
                            <Button
                                action={() => deleteSponsor(sponsorId)}
                                loading={loadingDelete}
                            >
                                حذف
                            </Button>
                            <Button
                                onClick={() => setOpenModal(false)}
                                variant="danger"
                            >
                                إلغاء
                            </Button>
                        </div>
                    </Modal>

                    <ModalTemplate
                        isOpen={model}
                        onClose={() => setModel(false)}
                    >
                        <AddSponsor
                            setModel={setModel}
                            // value={editData?.name}
                            resetForm={resetForm}
                            updateData={editData}
                            setDataSource={setDataSource}
                            //setShow={setOpen}
                        />
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
export default AllSponsor;
