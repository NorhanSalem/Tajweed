import { TimeInput } from "@mantine/dates";
import { useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { InnerFormLayout } from "./InnerFormLayout";
import { Modal } from "./Modal";
import { t } from "i18next";
import { Button } from "../atoms";
import { useState } from "react";

function EditJoinedTeacherSession({
  sessionId,
  refetch,
  setEditJoinedTeacherSession,
  editJoinedTeacherSession,
  setTimeSession,
  sessionTeacher,
  timeSession
}: any) {
  const { mutate, isLoading: submitFormLoading } = useMutate({
    mutationKey: [`update-dalay/${sessionId}`],
    endpoint: `dashboard/sessions/update-dalay/${sessionId}`,
    onSuccess: (data) => {
      refetch();
      notify("success");
      setEditJoinedTeacherSession(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  return (
    <div>
      <Modal
        //@ts-ignore
        isOpen={editJoinedTeacherSession}
        onClose={() => setEditJoinedTeacherSession(false)}
      >
        <InnerFormLayout
          customStyle="p-8"
          title={t("Edit the teacher entry time")}
          showpopuptitle={true}
        >
          <div>
            <TimeInput
              styles={{
                input: {
                  textAlign: "center",
                },
              }}
              withSeconds
              dir="ltr"
              id="time"
              className="w-auto text-center bg-[green]"
              placeholder={`${t("Select time")}`}
              onChange={(e) => setTimeSession(e.target.value)}
              value={timeSession}
            />

            <Button
              type="submit"
              className="mx-auto mt-5 block"
              action={() =>
                mutate({ time: timeSession, date: sessionTeacher?.date })
              }
              loading={submitFormLoading}
            >
              {t("Confirm")}
            </Button>
          </div>
        </InnerFormLayout>
      </Modal>
    </div>
  );
}

export default EditJoinedTeacherSession;
