import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type SelectSubscriptionFilter_tp = {
  setSubscriptionValue: any;
  updateData?: any;
  resetForm?: any;
};
export default function SelectSubscriptionFilter({
  setSubscriptionValue,
}: SelectSubscriptionFilter_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/subscription/status"],
    endpoint: "dashboard/subscription/status",
    onSuccess(data) {},
  });

  const mapStatusOptions = (options: any) => {
    return (
      options?.data?.map((state: any) => ({
        value: state.key,
        label: state.value,
      })) || []
    );
  };
  const dataOptions = [
    {
      value: "",
      label: "الكل",
    },
    ...mapStatusOptions(StatusOptions),
  ];

  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
            setSubscriptionValue(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("choose")}`}
              // label={t(`${"Status"}`).toString()}
              name="specialization"
              isDisabled={!StatusLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={StatusLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setSubscriptionValue(option?.value);
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
