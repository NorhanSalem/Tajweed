import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import { DeleteIcon } from "../../atoms/icons";
import showAlert from "../../molecules/ShowAlert";
import DeleteTable from "../../atoms/icons/DeleteTable";
import { Modal, TextAreaField } from "../../molecules";
import { Form, Formik } from "formik";
import { Button } from "../../atoms";

type RefoundSession_Tp = {
  refetch: () => void;
  info: any;
};
function DeleteSession({ refetch, info }: RefoundSession_Tp) {
  const [SessionId, setSessionId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { mutate , isLoading } = useMutate({
    mutationKey: [`dashboard/sessions/${SessionId}`],
    endpoint: `dashboard/cancel-session/${SessionId}`,
    onSuccess: () => {
      notify("success", `${t("Class deleted successfully")}`);
      refetch();
      setOpenModal(false)
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    formData: true,
    // method:"delete"
  });
  return (
    <div>
      {" "}
      <DeleteTable
        className="!w-[22px]  !min-w-[22px] !h-[22px] m-auto cursor-pointer  "
        action={() => {
          showAlert(
            t("Are you sure?"),
            t("You cannot go back in this process"),
            false,
            t("done"),
            true,
            "warning",
            () => {
              setOpenModal(true)
            }
          );
          setSessionId(info?.row?.original?.id);
        }}
      />
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-center mt-5">
          {t("Are you sure you can delete the session?")}
        </h2>
        <Formik
          initialValues={{ reason: "" }}
          onSubmit={(values) => {
            mutate({...values });
          }}
        >
          <Form>
            <div className="p-5 test-start">
              <TextAreaField
                label={t(`${""}`)}
                name="reason"
                id="reason"
                placeholder={t("Reason for delete sessions")}
                className="text-start"
              />
              <div className="flex justify-between px-5 mt-5">
                <Button
                  //  teacherId
                  loading={isLoading}
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

export default DeleteSession;
