import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type SelectSpecializationFilter_tp = {
  setStatus: any;
  updateData?: any;
  resetForm?: any;
};
export default function SelectSpecializationFilter({
  setStatus,
}: SelectSpecializationFilter_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["specializations_filter"],
    endpoint: "dashboard/teachers/specializations",
    onSuccess(data) {},
  })

  const mapStatusOptions = (options: any) => {
    return (
      options?.data?.specializations?.map((state: any) => ({
        value: state.id,
        label: state.name,
      })) || []
    );
  };
  const dataOptions = [
    {
      value: "",
      label: `${t("All")}`,
    },
    ...mapStatusOptions(StatusOptions),
  ];

  return (
    <div>
      <Formik
        initialValues={{ specialization: "" }}
        onSubmit={(values) => {
          setStatus(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("Choose Specialization")}`}
              // label={t(`${"Specialization"}`).toString()}
              name="specialization"
              isDisabled={!StatusLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={StatusLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setStatus(option?.value);
              }}
              // defaultValue={{
              //   value: !resetForm
              //     ? updateData?.specialization
              //     : t("Choose Specialization"),
              //   label: !resetForm
              //     ? updateData?.specialization
              //     : t("Choose Specialization"),
              // }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
