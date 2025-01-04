import { useState } from "react";
import Pin from "../../../assets/pin.svg";
import UnPin from "../../../assets/unpin.svg";
import { useMutate } from "../../../hooks";

const AccountMessage = ({
  trigger,
  image,
  name,
  message,
  date,
  send_at,
  type,
  chat,
  count_unread_message,
  userId,
  refresh,
  pinned_at: initialPinnedAt,
}) => {
  const [isPinned, setIsPinned] = useState(initialPinnedAt);
  const { mutate, isLoading: IsPinLoading } = useMutate<any>({
    endpoint: `core/admin-chat/pin/${userId}`,
    mutationKey: [`core/admin-chat/pin/${userId}`],
  });

  function MutatePin() {
    console.log("Pin button clicked");
    mutate(); // Trigger mutation to pin/unpin
    setIsPinned((prev) => !prev); // Toggle pinned state
    refresh(); // Call refresh function if necessary
  }

  return (
    <div className="bg-transparent flex justify-between">
      <div className="flex gap-5">
        <img
          src={image}
          alt="user"
          width={50}
          height={50}
          className="w-12 h-12 rounded-full"
        />
        <div className="lab-screen:w-full gap-y-1 text-[15px]">
          <h2 className="text-[#11897D] font-[nexaBold,sans-serif] text-lg dark:text-white">
            {name}
          </h2>
          <p
            style={{ wordBreak: "break-word" }}
            className="text-[#114F56] md:w-[147px] sm:w-[162px] w-[162px] line-clamp-2 col-span-5 text-xs capitalize font-[futuraMed,sans-serif] dark:text-white"
          >
            {chat.last_message.message_type == "voice"
              ? `🔊 Voice Message `
              : chat.last_message.message_type == "file" ||
                chat.last_message.message_type == "image"
              ? "📸 Image"
              : chat?.last_message?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-[10px]">
          {chat?.last_message?.send_at}
        </p>
        {count_unread_message > 0 && (
          <div
            style={{ fontSize: "13px" }}
            className="counter w-4 my-2 h-4 flex items-center justify-center bg-[#1ed364] text-white rounded-full text-center"
          >
            {count_unread_message}
          </div>
        )}
        <button onClick={MutatePin}>
          <img
            className="w-4 h-4"
            src={isPinned ? Pin : UnPin}
            alt={isPinned ? "Pin" : "Unpin"}
          />
        </button>
      </div>
    </div>
  );
};

export default AccountMessage;
