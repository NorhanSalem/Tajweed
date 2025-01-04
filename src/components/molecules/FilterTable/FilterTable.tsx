import { Form, Formik } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type FilterTable_tp = {
  setStatus: any;
  label?: string;
};
export default function FilterTable({ setStatus, label }: FilterTable_tp) {
  const {
    data: StatusOption,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["StatusSession"],
    endpoint: "dashboard/session/status",
    onSuccess(data) {},
  });

  const dataOptions = StatusOption?.data?.map((state: any) => ({
    value: state.key,
    label: state.value,
  }));

  return (
    <div>
      <Formik
        initialValues={{ dataOption: "" }}
        onSubmit={(values) => {
          setStatus(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              label={label}
              name="dataOption"
              isDisabled={!StatusLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              placeholder={`${t('Choose the status')}`}
              loading={StatusLoading}
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
