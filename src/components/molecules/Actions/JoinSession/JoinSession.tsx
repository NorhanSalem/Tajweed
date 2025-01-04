import { FaEye } from "react-icons/fa";

function JoinSession(info: any) {
  return (
    <div>
      {info?.info?.row?.original?.join == "" ? (
        <FaEye className="!w-[22px] !h-[22px] m-auto  text-[#bcbcbc] cursor-not-allowed" />
      ) : (
        <FaEye
          className="!w-[22px] !h-[22px] m-auto cursor-pointer text-[#43916d] "
          onClick={() => {
            const linkJoin = info?.info?.row?.original?.join;
            if (linkJoin) {
              const link = linkJoin;
              window.open(link, "_blank");
            }
          }}
        />
      )}
    </div>
  );
}

export default JoinSession;
