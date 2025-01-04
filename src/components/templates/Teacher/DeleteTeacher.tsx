import { t } from "i18next";
import { useMutate } from "../../../hooks";
import { notify } from "../../../utils/toast";
import DeleteTable from "../../atoms/icons/DeleteTable";
import showAlert from "../../molecules/ShowAlert";

type DeleteTeacher_Tp = {
  setModel: any;
  refetch: () => void;
  Id_teacher?: string;
  setDataTeacherID?: any;
  info: any;
};
function DeleteTeacher({
  setModel,
  refetch,
  Id_teacher,
  setDataTeacherID,
  info,
}: DeleteTeacher_Tp) {
  const { mutate: deleteTeacher, isLoading: loadingDelete } = useMutate({
    mutationKey: [`dashboard/teachers/${Id_teacher}`],
    endpoint: `dashboard/teachers/${Id_teacher}`,
    onSuccess: (data: any) => {
      notify("success");
      setModel(false);
      refetch();
    },
    onError: (err: any) => {
      notify("error",  err.response?.data?.message);
      setModel(false);
    },
    method: "delete",
    formData: true,
  });

  return (
    <div>
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
              deleteTeacher(Id_teacher);
              console.log("deleted");
            }
          );
          setDataTeacherID(info?.row?.original?.id);
        }}
      />
    </div>
  );
}

export default DeleteTeacher;
