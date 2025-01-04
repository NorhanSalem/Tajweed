import { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '../../../components/atoms';
import DeleteTable from '../../../components/atoms/icons/DeleteTable';
import EditTable from '../../../components/atoms/icons/EditTable';
import NextPaginationIc from '../../../components/atoms/icons/NextPaginationIc';
import Prevpagination from '../../../components/atoms/icons/prevpagination';
import { Modal } from '../../../components/molecules';
import { AddButton } from '../../../components/molecules/AddButton';
import { ModalTemplate } from '../../../components/molecules/ModalTemplate';
import showAlert from '../../../components/molecules/ShowAlert';
import Paginate from '../../../components/molecules/table/Paginate';
import { Table } from '../../../components/organisms/tantable/Table';
import { AddSlider } from '../../../components/templates/Site Administration/Slider/AddSlider';
import { useFetch, useMutate } from '../../../hooks';
import { notify } from '../../../utils/toast';
import { Helmet } from 'react-helmet-async';
import { pagePaginate } from '../../../utils/helpers';

export type Slider = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type Slider_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

const initialValues: Search_TP = {
  search: '',
};

const validationSchema = Yup.object({
  search: Yup.string().trim(),
});
function Slider({ title }: Slider_TP) {
  const [dataSource, setDataSource] = useState<Slider[]>([]);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState<Slider[]>(0);
  const [page, setPage] = useState();
  const [showPaginate, setShowPaginate] = useState(20);
  const [dateFilter, setDateFilter] = useState('');
  const [dateFilterAll, setDateFilterAll] = useState('');
  const [pagePagination, setPagePagination] = useState(pagePaginate)
  const [sliderID, setSliderID] = useState('');
  const [editData, setEditData] = useState(false);
  const [resetForm, setResetForm] = useState(true);
  const [model, setModel] = useState(false);

  const cols = useMemo<ColumnDef<Slider>[]>(
    () => [
      {
        header: '#',
        cell: (info) => info.renderValue(),
        accessorKey: 'id',
      },
      {
        header: `${t('colored title')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'colored_title',
      },
      {
        header: `${t('normal address')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'normal_title',
      },
      {
        header: `${t('description')}`,
        cell: (info) => {
          const words = info.row.original.description?.split(' ');
          const first50Words = words?.slice(0, 10).join(' ');
          const remainingWords = words?.slice(10).join(' ');

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
        accessorKey: 'description',
      },
      {
        header: `${t('arrangement')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'priority',
      },
      {
        header: `${t('action')}`,
        cell: (info) => (
          <div className='flex justify-center gap-2'>
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
                className='cursor-pointer'
                action={() => {
                  showAlert(
                    t('Are you sure?'),
                    t('You cannot go back in this process'),
                    false,
                    t('done'),
                    true,
                    'warning',
                    () => {
                      deleteSlider(sliderID);
                    }
                  );
                  setSliderID(info.row.original.id);
                }}
              />
            </div>
          </div>
        ),

        accessorKey: 'join',
      },
    ],
    []
  );

  const total = dataSource.data?.paginate?.total;

  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: sliderData,
    isRefetching,
    error,
  } = useFetch<Slider[]>({
    endpoint: `dashboard/sliders?page=${page}&status=${
      status.length ? status : 0
    }&pagenate=${pagePagination ? pagePagination : 20}&date_range=${
      dateFilterAll ? dateFilterAll : dateFilter
    }`,
    queryKey: [
      `View-all-session/${status}/${setShowPaginate}/${dateFilter}/${dateFilterAll}`,
      page,
      pagePagination,
    ],
    onSuccess(data) {
      setDataSource(data);
    },
  });

  const { mutate: deleteSlider, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/sliders/${sliderID}`],
    endpoint: `dashboard/sliders/${sliderID}`,
    onSuccess: (data: any) => {
      notify('success');
      setOpenModal(false);
      refetch();
    },
    onError: (err: any) => {
      notify('error', err);
      setOpenModal(false);
    },
    method: 'delete',
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
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary'>
        <div className='grid grid-cols-12'>
          <div className='col-span-12 '>
            <div className=' flex justify-end items-'>
              <div className=''>
                <AddButton
                  action={() => {
                    setModel(true);
                    setResetForm(true);
                  }}
                  addLabel={`${t('Add Slider')}`}
                />
              </div>
            </div>
            <Table
              data={sliderData?.data?.sliders ? sliderData?.data?.sliders : []}
              showNavigation
              columns={cols ? cols : []}
              setStatus={setStatus}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isRefetching={isRefetching}
              setPagePagination={setPagePagination}
            />
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <h2 className='text-start mt-5'>
                هل انت متاكد من استرداد الجلسه
              </h2>
              <div className='flex justify-between px-5 mt-5'>
                <Button action={() => setCheck(true)}>موافق</Button>
                <Button onClick={() => setOpen(false)} variant='danger'>
                  إلغاء
                </Button>
              </div>
            </Modal>

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
              <h2 className='text-start mt-5'>
                هل أنت متأكد من حذف هذه الشريحة؟
              </h2>
              <div className='flex justify-between px-5 mt-5'>
                <Button
                  action={() => deleteSlider(sliderID)}
                  loading={loadingDelete}
                >
                  {t('Delete')}
                </Button>
                <Button onClick={() => setOpenModal(false)} variant='danger'>
                  إلغاء
                </Button>
              </div>
            </Modal>

            <ModalTemplate
              isOpen={model}
              onClose={() => {
                setModel(false);
              }}
            >
              <AddSlider
                setModel={setModel}
                resetForm={resetForm}
                updateData={editData}
              />
            </ModalTemplate>
            <div className='flex justify-end mt-3'>
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
    </>
  );
}
export default Slider;
