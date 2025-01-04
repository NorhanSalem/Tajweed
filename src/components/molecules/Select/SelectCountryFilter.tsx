import { Form, Formik } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import * as Yup from "yup";
import { requiredTranslation } from "../../../utils/helpers";

type SelectCountryFilter_tp = {
  setStatus: any;
  editData?: any;
};
export default function SelectCountryFilter({
  setStatus,
  editData,
}: SelectCountryFilter_tp) {
  const {
    data: NationalityOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/get-countries"],
    endpoint: `dashboard/get-countries?show_all=${true}`,

    onSuccess(data) {},
  });

  const dataOptions = NationalityOptions?.data?.map((state: any) => ({
    value: state.id,
    label: state.title,
  }));

  return (
    <div>
      <Formik
        initialValues={{ nationality_id: "" }}
        onSubmit={(values) => {
          setStatus(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("choose country")}`}
              // label={t(`${"Country"}`).toString()}
              name="nationality_id"
              isDisabled={!NationalityLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={NationalityLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value);
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
