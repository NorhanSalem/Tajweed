import { Dispatch, SetStateAction } from "react";
import JoinSession from "./JoinSession/JoinSession";
import RefoundSession from "./RefoundSession/RefoundSession";
import DeleteSubscription from "./DeleteSubscription/DeleteSubscription";
import DeleteTeacher from "../../templates/Teacher/DeleteTeacher";
import EditTable from "./EditTable/EditTable";

type Actions_TP = {
  info: any;
  refundDataId?: string;
  refetch: () => void;
  setRefundDataId?: Dispatch<SetStateAction<string>>;
  joinSession?: boolean;
  refoundSession?: boolean;
  deleteSubscription?: boolean;
  deleteTeacher?: boolean;
  Id_teacher?: string;
  setDataTeacherID?: Dispatch<SetStateAction<string>>;
  setModel?: any;
  setEditData?: any;
  setResetForm?: any;
  Edit?: boolean;
};
function Actions({
  info,
  refundDataId,
  refetch,
  setRefundDataId,
  joinSession,
  refoundSession,
  deleteSubscription,
  deleteTeacher,
  Id_teacher,
  setDataTeacherID,
  setModel,
  setEditData,
  setResetForm,
  Edit,
}: Actions_TP) {
  return (
    <div className="flex justify-center gap-2 w-full">
      {joinSession && <JoinSession info={info} />}
      {refoundSession && (
        <RefoundSession
          refetch={refetch}
          info={info}
        />
      )}
      {deleteSubscription && (
        <DeleteSubscription refetch={refetch} info={info} />
      )}
      {Edit && (
        <EditTable
          setEditData={setEditData}
          setModel={setModel}
          setResetForm={setResetForm}
          info={info}
        />
      )}
      {deleteTeacher && (
        <DeleteTeacher
          Id_teacher={Id_teacher}
          info={info}
          refetch={refetch}
          setDataTeacherID={setDataTeacherID}
          setModel={setModel}
        />
      )}
    </div>
  );
}

export default Actions;
