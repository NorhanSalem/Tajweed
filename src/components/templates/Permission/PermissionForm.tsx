/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';
import { useFetch, useMutate } from '../../../hooks';
import {
  PermissionGroup_TP
} from '../../../pages/permission/types-and-schemas';
import { notify } from '../../../utils/toast';
import { HandleBackErrors } from '../../../utils/utils-components/HandleBackErrors';
import { Button } from '../../atoms';
import { OuterFormLayout } from '../../molecules';
import { Loading } from '../../organisms/Loading/Loading';
import { PermissionMainData } from './PermissionMainData';
import { useNavigate, useParams } from 'react-router-dom';
///
/////////// Types
///
type PermissionFormProps_TP = {
  title: string;
  value?: string;
  onAdd?: (value: string) => void;
  editData?: PermissionGroup_TP;
  Id?: string;
};
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PermissionForm = ({
  title,
  value,
  onAdd,
  editData,
}: PermissionFormProps_TP) => {
  /////////// VARIABLES
  ///
  const { Id } = useParams();
  const navigate = useNavigate()



  const {
    data: showPermissions,
    isError: showPermissionsError,
    isLoading: showPermissionsLoading,
    isSuccess: showPermissionsSuccess,
  } = useFetch<any>({
    endpoint: `dashboard/roles/${Id}`,
    queryKey: [`showPermissions`, Id],
    enabled: !!Id,
  });

  ///
  /////////// CUSTOM HOOKS
  ///

  const {
    data: permissions,
    isError: permissionsError,
    isLoading: permissionsLoading,
    isSuccess: permissionsSuccess,
    failureReason,
    error,
  } = useFetch<any>({
    endpoint: `dashboard/permissions`,
    queryKey: [`dashboard/permissions`],
    onSuccess(data) {
      //   setDataSource(data)
    },
  });

  const queryClient = useQueryClient();
  function arrayToObject(arr: any[]) {
    return arr?.reduce((obj, value, index) => {
      obj[index] = value;
      return obj;
    }, {});
  }

  const FilterShowArray = showPermissions?.data?.permissions?.map((item: { value: any[]; }) =>
    item?.value.filter((spItem) => spItem.active === true)
  );
  const isDataUpdated = FilterShowArray?.filter((arr: string | any[]) => arr.length > 0); // Check if any item has a length greater than 0

  const dataUpdatedValues = isDataUpdated?.reduce((result: { [x: string]: any; }, arr: any[]) => {
    arr.forEach((item: { value: string | number; active: any; }) => {
      result[item.value] = item.active;
    });
    return result;
  }, {});


  const initialValues = {
    name: showPermissions?.data?.name || '',
    ...dataUpdatedValues,
  };

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  // mutate data
  const { mutate, isLoading } = useMutate({
    mutationKey: [`dashboard/roles`],
    endpoint: `dashboard/roles`,

    onSuccess: (data: any) => {
      notify('success');
      queryClient.refetchQueries(['allPermission']);
      navigate('/administration/permission')

    },
    onError: (err: any) => {
      notify('error', err?.response?.data?.message);
      // setModel(false)
    },
    formData: true,
  });
  ///

  //
  // update data
  const { mutate: update, isLoading: LoadingUpdate } = useMutate({
    mutationKey: [`dashboard/roles/${Id}`],
    endpoint: `dashboard/roles/${Id}`,

    onSuccess: (data: any) => {
      notify('success');
      queryClient.refetchQueries(['allPermission']);
    },
    onError: (err:any) => {
      notify('error', err);
    },

    formData: true,
  });
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {(Id
        ? !!(showPermissionsLoading || permissionsLoading)
        : permissionsLoading) && (
        <Loading mainTitle='تحميل' subTitle='الصلاحيات' />
      )}
      {permissionsError && <p>{error.message}</p>}
      <Button
        type='button'
        variant='primary'
        className='mr-auto mt-8'
        action={() => navigate(-1)}
      >
        {t('back')}
      </Button>

      {(Id
        ? !!(showPermissionsSuccess && permissionsSuccess)
        : permissionsSuccess) && (
        <Formik
          onSubmit={(values) => {
            const valuesCopy = { ...values };
            delete valuesCopy.name;

            const permissionsWithoutName = Object.keys(valuesCopy);

            const permissionFilter = Object.entries(valuesCopy).filter(
              (item) => item[1] === true
            );
            const updatedPermissions = permissionFilter.map((item) => item[0]);
          

            if (!Id) {
              mutate({
                permissions: permissionsWithoutName,
                name: values.name,
              });
            } else {
              update({
                permissions: updatedPermissions,
                name: values.name,
                _method: 'put',
              });
            }
          }}
          initialValues={initialValues}
          // validationSchema={addAdministrativeSchema()}
        >
          {({ values, touched }) => (
            <HandleBackErrors>
              <Form>
                <OuterFormLayout
                  submitComponent={
                    <Button
                      type='submit'
                      variant='primary'
                      className='mr-auto mt-8'
                      loading={LoadingUpdate || isLoading}
                    >
                      {t('confirm')}
                    </Button>
                  }
                >
                  <PermissionMainData
                    permissions={permissions.data}
                    showPermissions={showPermissions}
                    editData={editData}
                  />
                </OuterFormLayout>
              </Form>
            </HandleBackErrors>
          )}
        </Formik>
      )}
    </>
  );
};
