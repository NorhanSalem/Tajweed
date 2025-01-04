import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import RefundIcon from "../../../atoms/icons/RefundIcon";
import showAlert from "../../ShowAlert";
type RefoundSession_Tp = {
  refetch: () => void;
  info: any;
};
function RefoundSession({ refetch, info }: RefoundSession_Tp) {
  const [refundDataId, setRefundDataId] = useState("");
  const { mutate } = useMutate({
    mutationKey: [`refundData/${refundDataId}`],
    endpoint: `dashboard/sessions/refund/${refundDataId}`,
    onSuccess: () => {
      notify("success", `${t("session refound successfully")}`);
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    formData: true,
  });
  return (
    <div>
      {" "}
      <RefundIcon
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
              mutate({});
            }
          );
          setRefundDataId(info?.row?.original?.id);
        }}
      />
    </div>
  );
}

export default RefoundSession;
