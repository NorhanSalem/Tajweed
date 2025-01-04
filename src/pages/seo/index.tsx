import { useDebouncedState } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { BiSolidChat } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NextPaginationIc from "../../components/atoms/icons/NextPaginationIc";
import Prevpagination from "../../components/atoms/icons/prevpagination";
import { Modal } from "../../components/molecules";
import Actions from "../../components/molecules/Actions/Actions";
import { AddButton } from "../../components/molecules/AddButton";
import { ModalTemplate } from "../../components/molecules/ModalTemplate";
import showAlert from "../../components/molecules/ShowAlert";
import Paginate from "../../components/molecules/table/Paginate";
import { Table } from "../../components/organisms/tantable/Table";
import { AddTeacher } from "../../components/templates/Teacher/AddTeacher";
import ChangeOrder from "../../components/templates/Teacher/ChangeOrder";
import TransferRevenueModal from "../../components/templates/Teacher/TranseferRevenueModal";
import UpdateHourlyTeacher from "../../components/templates/Teacher/UpdateHourlyTeacher";
import { useFetch, useMutate } from "../../hooks";
import i18n from "../../i18n";
import { pagePaginate } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { Helmet } from "react-helmet-async";
import { SeoModal } from "../../components/templates/SEO/SeoModal";
export type SEO_TP = {
  id: number;
  meta_description: string;
  meta_description_ar: string;
  meta_description_en: string;
  meta_title: string;
  meta_title_ar: string;
  meta_title_en: string;
  section: string;
  section_ar: string;
  section_en: string;
};
type SEO_TP_TP = {
  title: string;
};
interface ISEO_TB {
  title: string;
}
export default function Seo({ title }: ISEO_TB) {
  const [dateFilter, setDateFilter] = useState<any>("");
  const [SpecializationFilter, setSpecializationFilter] = useState("");
  const [pagePagination, setPagePagination] = useState(pagePaginate);
  const [changeOrderModal, setChangeOrderModal] = useState(false);
  const [isOpenHourlyDate, setIsOpenHourlyDate] = useState(false);
  const [dataTeacherID, setDataTeacherID] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [word, setWord] = useDebouncedState("", 300);
  const [resetForm, setResetForm] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [editData, setEditData] = useState(false);
  const [model, setModel] = useState(false);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeoData, setSelectedSeoData] = useState<SEO_TP | null>(null);

  const [data, setData] = useState({});
  const navigate = useNavigate();

  const queryParams = {
    page: page,
    // date_range: dateFilter,
    // specialization: SpecializationFilter ? SpecializationFilter : "",
    // is_active: statusFilter ? statusFilter : "",
    // gender: typeFilter ? typeFilter : "",
    // pagenate: pagePagination ? pagePagination : 20,
    // search: word ? word : "",
  };
  // const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/seo-data`;

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: SEO,
    isFetching,
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    // enabled: !!dateFilter,
  });
  // const { mutate: changeActivation } = useMutate({
  //   mutationKey: [`dashboard/teachers/${dataTeacherID}/activate`],
  //   endpoint: `dashboard/teachers/${dataTeacherID}/activate`,
  //   onSuccess: (data: any) => {
  //     notify("success");
  //     refetch();
  //   },
  //   onError: (err: any) => {
  //     notify("error", err.response?.data?.message);
  //   },
  //   formData: true,
  // });

  const transformData = (data: SEO_TP[]) => {
    return data.map((seo, index) => ({
      id: index + 1,
      meta_description: seo.meta_description,
      meta_description_ar: seo.meta_description_ar,
      meta_description_en: seo.meta_description_en,
      meta_title: seo.meta_title,
      meta_title_ar: seo.meta_title_ar,
      meta_title_en: seo.meta_title_en,
      section: seo.section,
      section_ar: seo.section_ar,
      section_en: seo.section_en,
    }));
  };

  const cols = useMemo<ColumnDef<SEO_TP>[]>(
    () => [
      {
        header: "#",
        cell: (info: any) => <span>{info?.row?.index + 1}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Section")}`,
        cell: (info: any) => (
          <div>
            <span
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.section}
            </span>
          </div>
        ),
        accessorKey: "section",
      },
      {
        header: `${t("Meta title in arabic")}`,
        cell: (info: any) => (
          <div>
            <span
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.meta_title_ar}
            </span>
          </div>
        ),
        accessorKey: "meta_title_ar",
      },
      {
        header: `${t("Meta title in english")}`,
        cell: (info: any) => (
          <div>
            <span
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.meta_title_en}
            </span>
          </div>
        ),
        accessorKey: "meta_title_en",
      },
      {
        header: `${t("Meta description in arabic")}`,
        cell: (info: any) => (
          <div>
            <span
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.meta_description_ar}
            </span>
          </div>
        ),
        accessorKey: "meta_description_ar",
      },
      {
        header: `${t("Meta description in english")}`,
        cell: (info: any) => (
          <div>
            <span
              style={{ fontSize: "14px" }}
              className="cursor-pointer text-blue-700"
            >
              {info.row.original.meta_description_en}
            </span>
          </div>
        ),
        accessorKey: "meta_description_en",
      },
      {
        header: `${t("action")}`,
        cell: (info) => (
          <div className="flex justify-center gap-2">
            <Actions
              info={info}
              Id_teacher={info?.row?.original?.id}
              refetch={refetch}
              setDataTeacherID={setDataTeacherID}
              Edit
              setResetForm={setResetForm}
              setEditData={setEditData}
              setModel={setModel}
              onEdit={() => {
                setSelectedSeoData(info.row.original);
                setEditData(true);
                setModel(true);
              }}
            />
          </div>
        ),

        accessorKey: "join",
      },
    ],
    [i18n.language, page]
  );
  const allTeachers = useMemo(() => {
    console.log("SSS", SEO?.data?.items?.length);

    if (isSuccess && SEO?.data?.items?.length) {
      return transformData(SEO?.data?.items);
    }
    return [];
  }, [isSuccess, SEO]);

  const customColumnExcell = useMemo<ColumnDef<SEO_TP>[]>(
    () => [
      {
        header: "#",
        cell: (info: any) => <span>{info?.row?.index + 1}</span>,
        accessorKey: "id",
      },
      {
        header: `${t("Name")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "name",
      },
      {
        header: `${t("Email")}`,
        cell: (info: any) => info.renderValue(),
        accessorKey: "email",
      },
    ],
    [i18n.language, page]
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
            {/* <div className=" flex justify-end items mb-4">
              <div className="">
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t("Add")}`}
                />
              </div>
            </div> */}

            <Table
              data={SEO?.data?.items ? SEO?.data?.items : []}
              // totalItemsData={SEO?.data?.paginate?.total}
              // showNavigation
              columns={cols ? cols : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isFetching={isFetching}
              // setPagePagination={setPagePagination}
              // setDateFilter={setDateFilter}
              // setWord={setWord}
              // setTypeFilter={setTypeFilter}
              // dataExcell={allTeachers}
              customColumnExcell={customColumnExcell}
              // setStatusFilter={setStatusFilter}
              // Specialization
              // setSpecializationFilter={setSpecializationFilter}
              columnsToRemove={[4, 5, 13, 14]}
            />

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <SeoModal
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
                refetch={refetch}
                seoData={selectedSeoData}
              />
            </ModalTemplate>
            <Modal
              isOpen={changeOrderModal}
              onClose={() => {
                setChangeOrderModal(false);
              }}
            >
              {/* <ChangeOrder
                data={dataTeacherID}
                refetch={refetch}
                setChangeOrderModal={setChangeOrderModal}
              /> */}
            </Modal>

            <div className="flex justify-end mt-3">
              <Paginate
                pagesCount={SEO?.data?.paginate?.total_pages}
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
