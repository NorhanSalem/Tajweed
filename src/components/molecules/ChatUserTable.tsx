import React from "react";
import { BiSolidChat } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ChatUserTable({ id }: any) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/all/${id}`)}
      className="cursor-pointer  flex justify-center"
    >
      <BiSolidChat className="!w-[20px] h-[20px]" />
    </div>
  );
}

export default ChatUserTable;
