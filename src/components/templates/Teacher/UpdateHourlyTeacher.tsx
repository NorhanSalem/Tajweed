import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { Button } from "../../atoms";
import { BaseInputField, InnerFormLayout, Modal } from "../../molecules";
import { ModalTemplate } from "../../molecules/ModalTemplate";

function UpdateHourlyTeacher({ isOpen, setIsOpen, data, refetch }: any) {
  const [t] = useTranslation();
  const { mutate, isLoading } = useMutate({
    mutationKey: [`/teachers/${data?.id}/update-hourly-rate`],
    endpoint: `dashboard/teachers/${data?.id}/update-hourly-rate`,
    onSuccess: (data: any) => {
      refetch();
      setIsOpen(false);
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            hourly_rate: data?.hourly_rate,
          }}
          onSubmit={(values) => {
            mutate({
              ...values,
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <>
              <Form className="w-full">
                <InnerFormLayout title={t("Edit")} showpopuptitle={true}>
                  <div className="w-full col-span-4">
                    <BaseInputField
                      name="hourly_rate"
                      id=""
                      type="number"
                      placeholder={`${t("Hour Price")}`}
                      label={`${t("Hour Price")}`}
                    />
                  </div>

                  <div className="flex justify-end w-full col-span-4">
                    <Button
                      className=" mx-5 block my-10"
                      type="submit"
                      loading={isLoading}
                    >
                      {t("Save")}
                    </Button>
                  </div>
                </InnerFormLayout>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default UpdateHourlyTeacher;
