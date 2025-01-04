import { Form, Formik } from "formik";
import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";

type SelectCategoryBlogFilter_tp = {
  setCategory_id: any;
  updateData?: any;
  resetForm?: any;
};
export default function SelectCategoryBlogFilter({
  setCategory_id,
}: SelectCategoryBlogFilter_tp) {
  const {
    data: AllCategory,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/categories_filter"],
    endpoint: "dashboard/categories",
    onSuccess(data) {},
  })

  const mapStatusOptions = (options: any) => {
    return (
      AllCategory?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  };
  const dataOptions = [
    {
      value: "",
      label: "الكل",
    },
    ...mapStatusOptions(AllCategory),
  ];

  return (
    <div>
      <Formik
        initialValues={{ specialization: "" }}
        onSubmit={(values) => {
          setCategory_id(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <Select
              id="optionStatus"
              placeholder={`${t("Choose category")}`}
              // label={t(`${"Choose category"}`).toString()}
              name="specialization"
              isDisabled={!StatusLoading && !!failureReason}
              loadingPlaceholder={`${t("loading")}`}
              loading={StatusLoading}
              options={dataOptions}
              onChange={(option) => {
                //@ts-ignore
                setCategory_id(option?.value);
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
