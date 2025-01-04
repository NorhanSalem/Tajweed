import { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import Paginate from '../../../components/molecules/table/Paginate';
import { Table } from '../../../components/organisms/tantable/Table';
import { useFetch } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import Prevpagination from '../../../components/atoms/icons/prevpagination';
import NextPaginationIc from '../../../components/atoms/icons/NextPaginationIc';
import { useDebouncedState } from '@mantine/hooks';

export type TeachersCommissions = {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
};
type TeachersCommissions_TP = {
  title: string;
};

type Search_TP = {
  search: string;
};

const validationSchema = Yup.object({
  search: Yup.string().trim(),
});

function TeachersCommissions({ title }: TeachersCommissions_TP) {
  const [dataSource, setDataSource] = useState<TeachersCommissions[]>([]);

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const cols = useMemo<ColumnDef<TeachersCommissions>[]>(
    () => [
      {
        header: '#',
        cell: (info) => info.renderValue(),
        accessorKey: 'id',
      },
      {
        header: `${t('Date created')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'created_at',
      },
      {
        header: `${t('Name Studen')}`,
        cell: (info) => (
          <div>
            <h2
              onClick={() =>
                navigate(`/teacher/teachers/profile/${info.row.original.id}`)
              }
              style={{ fontSize: '14px' }}
              className='cursor-pointer text-blue-700'
            >
              {info.row.original.student_name}
            </h2>
          </div>
        ),
        accessorKey: 'student_name',
      },
      {
        header: `${t('Package Name')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'package_name',
      },
      {
        header: `${t('Teacher Name')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'teacher_name',
      },
      {
        header: `${t('Price')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'price',
      },
      {
        header: `${t('Price after discount')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'price_after_discount',
      },
      {
        header: `${t('Teacher Commission')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'teacher_commission',
      },
      {
        header: `${t('Status')}`,
        cell: (info) => t(info.renderValue()),
        accessorKey: 'status',
      },
      {
        header: `${t('Booked Classes')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'booked_sessions',
      },
      {
        header: `${t('Remaining Classes')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'remain_sessions',
      },
    ],
    []
  );

  // state
  const [status, setStatus] = useState<AllTeachers[]>(0);
  const [page, setPage] = useState(0);
  const [showPaginate, setShowPaginate] = useState(20);
  const [dateFilter, setDateFilter] = useState('');
  const [dateFilterAll, setDateFilterAll] = useState('');
  const [SpecializationFilter, setSpecializationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [profileCompleteFilter, setProfileCompleteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [statusZoomFilter, setStatusZoomFilter] = useState('');
  const [interViewStatus, setInterViewStatus] = useState('');
  const [interViewStatusUpdate, setInterViewStatusUpdate] = useState('');
  const [generalExpensesID, setTeachersCommissionsID] = useState('');
  const [dataTeacherValue, setDataTeacherValue] = useState('');
  const [refundDataId, setrefundDataId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [model, setModel] = useState(false);
  const [editData, setEditData] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [pagePagination, setPagePagination] = useState(20);
  const [word, setWord] = useDebouncedState('', 300);

  const total = dataSource.data?.paginate?.total;
  //all data
  const {
    isLoading,
    isSuccess,
    refetch,
    data: teachersCommissions,
    isRefetching,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/reports/expenses/teacher-commissions?page=${page}&pagenate=${
      pagePagination ? pagePagination : 20
    }&search=${word ? word : ''}`,
    queryKey: [
      `dashboard/reports/expenses/teacher-commissions`,
      page,
      pagePagination,
      word,
    ],
    onSuccess(data) {
      setDataSource(data);
    },
    onError(err) {
      console.log(err);
      notify('error', err?.response?.data.message);
    },
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
    <div className='bg-white p-2 md:p-8 rounded-xl dark:bg-dark-tertiary'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 '>
          <Table
            data={
              teachersCommissions?.data?.teacher_commissions
                ? teachersCommissions?.data?.teacher_commissions
                : []
            }
            showNavigation
            columns={cols ? cols : []}
            setStatus={setStatus}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isRefetching={isRefetching}
            setDateFilterAll={setDateFilterAll}
            setPagePagination={setPagePagination}
          />

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
  );
}

export default TeachersCommissions;
