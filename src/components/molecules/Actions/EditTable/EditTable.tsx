import EditTableICon from "../../../atoms/icons/EditTable";

type EditTable_TP = {
  setModel?: any;
  setResetForm?: any;
  setEditData?: any;
  info?:any
};
function EditTable({ setModel, setResetForm, setEditData , info }:EditTable_TP) {
  return (
    <div>
      <EditTableICon
        action={() => {
          setModel(true);
          setEditData(info?.row?.original);
          setResetForm(false);
        }}
      />
    </div>
  );
}

export default EditTable;
