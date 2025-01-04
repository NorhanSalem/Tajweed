import { useFetch, useMutate } from "../../../../hooks";
import { Form, Formik } from "formik";
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors";
import { OuterFormLayout } from "../../../molecules";
import { t } from "i18next";
import { Button } from "../../../atoms";
import PaymentSettingMainData from "./PaymentSettingMainData";
import { Loading } from "../../../organisms/Loading/Loading";
import { notify } from "../../../../utils/toast";

type PaymentSettings_TP = {
  teacherId: string;
};
function PaymentSettings({ teacherId }: PaymentSettings_TP) {
  const { data: EditingData, isLoading: loadingData } = useFetch<any>({
    endpoint: `dashboard/teachers/${teacherId}/get-payment-method`,
    queryKey: [`dashboard/teachers/${teacherId}/get-payment-method`],
  });
  const initialValues = {
    full_name: EditingData?.data?.payment_data?.full_name,
    bank_name: EditingData?.data?.payment_data?.bank_name,
    bank_branch: EditingData?.data?.payment_data?.bank_branch,
    account_number: EditingData?.data?.payment_data?.account_number,
    IBAN: EditingData?.data?.payment_data?.IBAN,
  };
  const { mutate: update, isLoading } = useMutate({
    mutationKey: [`dashboard/teachers/${teacherId}/save-payment-method`],
    endpoint: `dashboard/teachers/${teacherId}/save-payment-method`,
    onSuccess: () => {
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },

    formData: true,
  
  });

  if (loadingData) return <Loading />;

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={(values) => update({...values  })}>
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              // header="
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
              <PaymentSettingMainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </div>
  );
}

export default PaymentSettings;
