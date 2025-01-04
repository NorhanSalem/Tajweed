import { Form, Formik } from "formik";
import { t } from "i18next";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { Button } from "../../atoms";
import {
  BaseInputField,
  InnerFormLayout,
  OuterFormLayout,
} from "../../molecules";

function ChangeOrder({ setChangeOrderModal, refetch , data }: any) {
  console.log("🚀 ~ ChangeOrder ~ data:", data)
  const { mutate: changeOrder, isLoading } = useMutate({
    mutationKey: [`dashboard/teacher/order/${data?.id}`],
    endpoint: `dashboard/teacher/order/${data?.id}`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
      setChangeOrderModal(false)
    },
    onError: (err: any) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });
  return (
    <div>
      <Formik
        initialValues={{ order: data?.order }}
        onSubmit={(values: any) => {
          changeOrder(values);
        }}
      >
        <Form>
          <OuterFormLayout
            submitComponent={
              <Button
                type="submit"
                className="mr-auto mt-8"
                loading={isLoading}
              >
                {t("submit")}
              </Button>
            }
          >
            <InnerFormLayout
              title={`${t("change order")}`}
              showpopuptitle={true}
            >
              <div className="col-span-12">
                <BaseInputField id="" name="order" type="text" />
              </div>
            </InnerFormLayout>
          </OuterFormLayout>
        </Form>
      </Formik>
    </div>
  );
}

export default ChangeOrder;
