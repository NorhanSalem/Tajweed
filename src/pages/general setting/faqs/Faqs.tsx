import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { Button } from "../../../components/atoms";
import { EditIcon } from "../../../components/atoms/icons";
import { Modal } from "../../../components/molecules";
import { AddButton } from "../../../components/molecules/AddButton";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import Paginate from "../../../components/molecules/table/Paginate";
import { Table } from "../../../components/organisms/tantable/Table";
import { useFetch, useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { AddFaqs } from "../../../components/templates/general setting/faqs/AddFaqs";
import DeleteTable from "../../../components/atoms/icons/DeleteTable";
import showAlert from "../../../components/molecules/ShowAlert";
import EditTable from "../../../components/atoms/icons/EditTable";
import Prevpagination from "../../../components/atoms/icons/prevpagination";
import NextPaginationIc from "../../../components/atoms/icons/NextPaginationIc";
import { useDebouncedState } from "@mantine/hooks";
import { pagePaginate } from "../../../utils/helpers";

export type Faqs = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type Faqs_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

function Faqs({ title }: Faqs_TP) {
  const [dataSource, setDataSource] = useState<Faqs[]>([]);
  const [resetForm, setResetForm] = useState(true);

  const cols = useMemo<ColumnDef<Faqs>[]>(
    () => [
      {
        header: "#",
        cell: (info) => info.renderValue(),
        accessorKey: "id",
      },

      {
        header: `${t("Question")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "question",
      },
      {
        header: `${t("Answer")}`,
        cell: (info) => {
          const words = info.row.original.answer?.split(" ");
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
        accessorKey: "answer",
      },
      {
        header: `${t("Active")}`,
        cell: (info) => (
          <div>
            {info.row.original.active === 1 ? t("active") : t("notactive")}
          </div>
        ),
        accessorKey: "active",
      },
      {
        header: `${t("Type")}`,
        cell: (info) => t(info.renderValue()),
        accessorKey: "type",
      },

      {
        header: `${t("Latest Update")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "latest_update",
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
    []
  );

  // state
  const [status, setStatus] = useState<Faqs[]>(0);
  const [page, setPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(pagePaginate)

  const [packageId, setSponsorId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);

  const [word, setWord] = useDebouncedState("", 300);

  const total = dataSource.data?.paginate?.total;
  //all data
  const {
    isLoading,
    isSuccess,
    data: Faqs,
    isRefetching,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useFetch<Faqs[]>({
    endpoint: `dashboard/faq-popular-questions?search=${
      word ? word : ""
    }&page=${page}&pagenate=${pagePagination ? pagePagination : 20}`,
    queryKey: [`dashboard/faq-popular-questions`, word, page, pagePagination],
    onSuccess(data) {
      setDataSource(data);
    },
  });
  console.log("🚀 ~ file: Faqs.tsx:157 ~ Faqs ~ Faqs:", Faqs);

  //Delete Student
  const { mutate: deletePackage, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/faq-popular-questions`, packageId],
    endpoint: `dashboard/faq-popular-questions/${packageId}`,

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
        <div className="col-span-12 ">
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
                addLabel={`${t("Add Faqs")}`}
              />
            </div>
          </div>
          <Table
            data={Faqs?.data?.questions ? Faqs?.data?.questions : []}
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            isRefetching={isRefetching}
            setPagePagination={setPagePagination}
            setWord={setWord}
            columnsToRemove={[6]}
          />

          <ModalTemplate isOpen={model} onClose={() => setModel(false)}>
            <AddFaqs
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
export default Faqs;
