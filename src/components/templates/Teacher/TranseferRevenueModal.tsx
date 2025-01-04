import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { Button } from "../../atoms";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import { FaCcMastercard, FaIdCard } from "react-icons/fa";

function TransferRevenueModal({ isOpen, setIsOpen, data, refetch }: any) {
  console.log("🚀 ~ TransferRevenueModal ~ data:", data);
  const [t] = useTranslation();
  const { mutate, isLoading } = useMutate({
    mutationKey: [`/dashboard/teachers/${data?.id}/transfer-balance`],
    endpoint: `dashboard/teachers/${data?.id}/transfer-balance`,
    onSuccess: (data: any) => {
      refetch();
      setIsOpen(false);
      notify("success");
    },
    onError: (err) => {
      console.log("error", err);
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  return (
    <>
      <ModalTemplate
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            available_balance:
              data?.teacher_profile?.available_balance ||
              data?.available_balance ||
              0,
            amount: 0,
            rest_amount: 0,
          }}
          onSubmit={(values) => {
            mutate({
              amount: +values.amount,
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <>
              <Form className="w-full">
                <InnerFormLayout
                  title={t("Transfer revenue")}
                  showpopuptitle={true}
                >
                  <div className="col-span-4">
                    <div className="flex items-center gap-2 mb-5">
                      <FaIdCard className="text-[25px]" />
                      <h1 className="text-[20px] mb-22">
                        {t("bank information")}
                      </h1>
                    </div>

                    {Array.isArray(data?.payment_methods) &&
                    data?.payment_methods.length > 0 ? (
                      data.payment_methods.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="col-span-4 flex items-center justify-between flex-wrap gap-3 border shadow  p-3 "
                        >
                          <div className="flex gap-2">
                            <p className="font-bold">{t("full name")}:</p>
                            <p>{item?.payment_data?.full_name}</p>
                          </div>
                          <div className="flex gap-2">
                            <p className="font-bold">{t("account number")}:</p>
                            <p>{item?.payment_data?.account_number}</p>
                          </div>
                          <div className="flex gap-2">
                            <p className="font-bold">{t("IBAN")}:</p>
                            <p>{item?.payment_data?.IBAN}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>{t("No payment methods available.")}</p>
                    )}
                  </div>
                  <BaseInputField
                    name="available_balance"
                    id=""
                    type="number"
                    placeholder={`${t("Available amount")}`}
                    label={`${t("Available amount")}`}
                    value={values.available_balance}
                    readOnly
                  />
                  <BaseInputField
                    type="number"
                    id=""
                    name="amount"
                    label={`${t("Transfer amount")}`}
                    placeholder={`${t("Transfer amount")}`}
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value || "0");
                      setFieldValue("amount", amount);
                      setFieldValue(
                        "rest_amount",
                        values.available_balance - amount
                      );
                    }}
                  />
                  <BaseInputField
                    id=""
                    type="number"
                    label={`${t("Rest amount")}`}
                    value={values.rest_amount}
                    placeholder="0"
                    name="rest_amount"
                    readOnly
                  />
                  <div className="flex justify-end w-full col-span-4">
                    <Button
                      className="mx-5 block my-10"
                      type="submit"
                      loading={isLoading}
                    >
                      {t("Submit transfer")}
                    </Button>
                  </div>
                </InnerFormLayout>
              </Form>
            </>
          )}
        </Formik>
      </ModalTemplate>
    </>
  );
}

export default TransferRevenueModal;
