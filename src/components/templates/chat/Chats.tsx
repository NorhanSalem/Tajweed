import { NavLink, useLocation } from "react-router-dom";
import AccountMessage from "./AccountMessage";

interface IChats {
  chats: any;
  show: boolean;
  trigger: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileView: boolean;
  refresh: any;
  resetCountMessage: any;
}

function Chats({
  chats,
  trigger,
  show,
  isMobileView,
  refresh,
  resetCountMessage,
}: IChats) {
  const location = useLocation();
  const AllChats = location.pathname.includes("/all");
  const StudentsChats = location.pathname.includes("/students");

  const handleClick = (chatId: number) => {
    if (isMobileView) {
      trigger(!show);
    }

    const updatedChats = chats.map((chat: any) =>
      chat?.user?.id === chatId ? { ...chat, count_unread_message: 0 } : chat
    );
    resetCountMessage(updatedChats);
    console.log("updatedChats", updatedChats);
  };

  return (
    <div className="lg:max-h-[71vh]  md:max-h-[75vh] sm:max-h-[67vh] max-h-[67vh] overflow-auto sm:overflow-auto  dark:bg-dark-tertiary">
      {chats.map((chat: any) => (
        <NavLink
          key={chat?.user?.id}
          onClick={() => handleClick(chat?.user?.id)} // Make sure the click handler is correct
          to={`${
            AllChats
              ? "/chat/all"
              : StudentsChats
              ? "/chat/students"
              : "/chat/Teachers"
          }/${chat?.user?.id}`} // Ensure this is correct JSX syntax
          className={({ isActive, isPending }) =>
            `block p-2 rounded-lg border-b-[#ebecee] border-b-[2px] pb-5 ${
              isPending
                ? "pending"
                : isActive
                ? "bg-[#F8F5FF] dark:bg-[#607d8b7d]"
                : ""
            }`
          }
        >
          <AccountMessage
            image={chat?.user?.image}
            name={`${chat?.user?.name}`}
            message={chat?.latest_message?.message}
            type={chat?.type}
            send_at={chat?.latest_message?.send_at}
            chat={chat}
            number="1"
            userId={chat?.user?.id}
            count_unread_message={chat?.count_unread_message}
            refresh={refresh}
            pinned_at={chat?.pinned_at}
          />
        </NavLink>
      ))}
    </div>
  );
}
export default Chats;
