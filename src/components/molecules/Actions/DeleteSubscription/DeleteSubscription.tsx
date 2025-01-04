import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import DeleteTable from "../../../atoms/icons/DeleteTable";
import showAlert from "../../ShowAlert";
import { Modal } from "../../Modal";
import { Form, Formik } from "formik";
import { TextAreaField } from "../../formik-fields";
import { Button } from "../../../atoms";

type DeleteSubscription_TP = {
  refetch: () => void;
  info: any;
};
function DeleteSubscription({ refetch, info }: DeleteSubscription_TP) {
  const [subscriptionId, setSubscriptionId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const { mutate: deleteSubscription, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/subscriptions/${subscriptionId}/cancel`],
    endpoint: `dashboard/subscriptions/${subscriptionId}/cancel`,
    onSuccess: (data: any) => {
      notify("success");
      refetch();
      setOpenModal(false)
    },
    onError: (err) => {
      notify("error", err.response?.data?.message);
    },
    method: "post",
    formData: true,
  });
  return (
    <div>
      {info?.row?.original?.can_cancel && (
        // <GiCancel className='!w-[20px] !h-[20px] m-auto cursor-pointer text-red-700' />
        <DeleteTable
          className="cursor-pointer"
          action={() => {
            showAlert(
              t("Are you sure?"),
              t("You cannot go back in this process"),
              false,
              t("done"),
              true,
              "warning",
              () => {
                setOpenModal(true);
              }
            );
            setSubscriptionId(info?.row?.original?.id);
          }}
        />
      )}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-center mt-5">
          {t("Are you sure you can cancel the subscription?")}
        </h2>
        <Formik
          initialValues={{ reason: "" }}
          onSubmit={(values) => {
            deleteSubscription({ ...values, subscriptionId });
          }}
        >
          <Form>
            <div className="p-5 test-start">
              <TextAreaField
                label={t(`${""}`)}
                name="reason"
                id="reason"
                placeholder={t("Reason for cancellation")}
                className="text-start"
              />
              <div className="flex justify-between px-5 mt-5">
                <Button
                  //  teacherId
                  loading={loadingDelete}
                  type="submit"
                >
                  {t("Agree")}
                </Button>
                <Button action={() => setOpenModal(false)} variant="danger">
                  {t("cancel")}
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default DeleteSubscription;
