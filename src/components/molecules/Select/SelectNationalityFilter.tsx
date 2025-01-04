import { Form, Formik } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import * as Yup from "yup";
import { requiredTranslation } from "../../../utils/helpers";

type SelectNationalityFilter_tp = {
  setStatus: any;
  updateData?: any;
  resetForm?: any;
};
export default function SelectNationalityFilter({
  setStatus,
  updateData,
  resetForm,
}: SelectNationalityFilter_tp) {
  const {
    data: NationalityOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/nationally"],
    endpoint: `dashboard/countries?show_all=${true}`,

    onSuccess(data) {},
  });
  const NationalityValidatingSchema = () =>
    Yup.object({
      nationality_id: Yup.string().trim().required(requiredTranslation),
    });

  const dataOptions = NationalityOptions?.data?.map((state: any) => ({
    value: state.id,
    label: state.nationality,
  }));

  return (
    <div>
      <Formik
        initialValues={{ nationality_id: "" }}
        validationSchema={NationalityValidatingSchema}
        onSubmit={(values) => {
          setStatus(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder="اختر الجنسية"
              label={t(`${"Nationality"}`).toString()}
              name="nationality_id"
              isDisabled={!NationalityLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={NationalityLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value);
              }}
              defaultValue={{
                value: !resetForm ? updateData?.nationality_id : "",
                label: !resetForm
                  ? dataOptions?.find(
                      (option) => option?.value === updateData?.nationality_id
                    )?.label || t("Choose nationality")
                  : t("Choose nationality"),
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
