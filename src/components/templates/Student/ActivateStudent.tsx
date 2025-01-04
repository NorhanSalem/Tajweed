import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import showAlert from "../../molecules/ShowAlert";

type RefoundSession_Tp = {
  refetch: () => void;
  info: any;
};
function ActivateStudent({ refetch, info }: RefoundSession_Tp) {
  const [studentId, setStudentId] = useState("");
  const { mutate } = useMutate({
    mutationKey: [`dashboard/students/13/activate/`],
    endpoint: `dashboard/students/${studentId}/activate/`,
    onSuccess: () => {
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response?.data?.error);
    },
    formData: true,
  });
  const handleSubmit = () => {
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
    setStudentId(info.row.original?.id)
  };
  return (
    <div className="flex justify-center">
      {info.row.original.activation_status === 1 ? (
        <p
          className="bg-[#50cd89] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
          onClick={() => handleSubmit()}
        >
          {t("active")}
        </p>
      ) : (
        <p
          className="bg-[#f1416c] text-white w-max py-[0.150rem] px-2 rounded-[.325rem] text-[12px] cursor-pointer"
          onClick={() => handleSubmit()}
        >
          {t("notactive")}
        </p>
      )}
    </div>
  );
}

export default ActivateStudent;
