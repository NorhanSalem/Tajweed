/////////// IMPORTS
///
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';
import { requiredTranslation } from '../../../../utils/helpers';
import { useMutate } from '../../../../hooks';
import { notify } from '../../../../utils/toast';
import { HandleBackErrors } from '../../../../utils/utils-components/HandleBackErrors';
import { OuterFormLayout } from '../../../molecules';
import { FeatureTartilMainData } from './FeatureTartilMainData';
import { Button } from '../../../atoms';

///
/////////// Types
///
type AddFeatureQuran_props = {
  title?: string
  dataSource?: any
  updateData?: any
  setModel?: any
  resetForm?: any
  refetch?:any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddFeatureTartil = ({
  title,
  refetch,
  setModel,
  resetForm,
  updateData,
}: AddFeatureQuran_props) => {
  /////////// VARIABLES
  ///
  type InitialValues_TP = {
    [x: string]: string
  }

  const FeatureValidatingSchema = () =>
    Yup.object({
      title_ar: Yup.string().trim().required(requiredTranslation),
      title_en: Yup.string().trim().required(requiredTranslation),
      description_ar: Yup.string().trim().required(requiredTranslation),
      description_en: Yup.string().trim().required(requiredTranslation),
    })

  const initialValues: InitialValues_TP = {
    title_ar: !resetForm ? updateData?.title_ar : "",
    title_en: !resetForm ? updateData?.title_en : "",
    description_ar: !resetForm ? updateData?.description_ar : "",
    description_en: !resetForm ? updateData?.description_en : "",
    order: !resetForm ? updateData?.order : "",
    //@ts-ignore
    image: !resetForm
      ? !!updateData?.image
        ? [
            {
              path: updateData?.image,
              type: "image",
            },
          ]
        : []
      : [],
  }

  const { mutate, isLoading } = useMutate({
    mutationKey: ["dashboard/features-qurans"],
    endpoint: `dashboard/features-qurans`,
    onSuccess: (data: InitialValues_TP) => {
      setModel(false)
      notify("success")
      refetch()
    },
    onError: (err) => {
      notify("error", err.response.data.message)
    },
    formData: true,
  })


  const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
    mutationKey: ["dashboard/features-qurans"],
    endpoint: `dashboard/features-qurans/${updateData?.id}`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success")
      setModel(false)
      refetch()
    },
    onError: (err) => {
      notify("error", err?.response?.data.message)
    },

    formData: true,
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={FeatureValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          let imgFuture =
            !resetForm &&
            //@ts-ignore
            values?.image?.length > 0 &&
            //@ts-ignore
            values?.image[0]?.path !== updateData?.image
              ? //@ts-ignore
                values.image[0]
              : undefined
          if (!resetForm) {
            if (!imgFuture) {
              //@ts-ignore
              delete values?.image
            }
          }

          resetForm
            ? mutate({
                ...values,
                image: values.image[0],
              })
            : update({
                ...values,
                image: values?.image && values?.image[0],
                // avatar_remove: true,
                // image: values.image[0],
                // avatar_remove:true,
                _method: "put",
              })
        }}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading || LoadingUpdateSponsor}
                >
                  {t("Save")}
                </Button>
              }
            >
              <FeatureTartilMainData
                updateData={updateData}
                resetForm={resetForm}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  )
}
