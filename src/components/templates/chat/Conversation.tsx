import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useFetch } from "../../../hooks";
import MessageReceiver from "./MessageReceiver";
import MessageSender from "./MessageSender";
import DayTop from "./dayTop";
import ControllerChat from "../../molecules/chat/ControllerChat";
import { Loading } from "../../organisms/Loading/Loading";
import { FaArrowLeft } from "react-icons/fa";

function Conversation() {
  const { userId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const {
    data: ConversationResponse,
    isLoading: isConversationLoading,
    isRefetching,
    refetch,
  } = useFetch<any>({
    endpoint: `core/get-admin-chat/${userId}`,
    queryKey: [`core/get-admin-chat/${userId}`],
    onSuccess: () => {
      setNewMessages([]);
    },
    enabled: !!userId,
  });

  const chatRef = useRef<HTMLDivElement | null>(null);
  const chatEnd = useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [newMessages, setNewMessages] = useState<any[]>([]);

  const scrollToLastMessage = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [ConversationResponse, newMessages]);
  //
  useEffect(() => {
    console.log("newMessages > ", newMessages);
  }, [newMessages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewMessage = (message: any) => {
    setNewMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendAtDay = (messages: any[]) => {
    if (!messages) return [];

    const groupedMessages = messages
      .map((message) => {
        if (message?.send_at) {
          const send_at = new Date(message.send_at.split("T")[0]);
          const day = send_at.toLocaleDateString();
          const dayMessages = messages.filter(
            (msg) =>
              new Date(msg.send_at.split("T")[0]).toLocaleDateString() === day
          );
          return {
            send_at: message.send_at,
            messages: dayMessages,
          };
        }
      })
      .filter(Boolean);

    const uniqueDays = groupedMessages.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.send_at === item.send_at)
    );

    return uniqueDays;
  };

  return (
    <div>
      {isConversationLoading || isRefetching ? (
        <Loading />
      ) : (
        ConversationResponse && (
          <div className="flex flex-col justify-between h-[84vh]">
            {userId && isMobile && (
              <button
                onClick={() => navigate("/chat/all/")}
                className="absolute -top-5 left-2 text-black dark:text-white"
              >
                <FaArrowLeft size={20} />
              </button>
            )}
            <div className="flex gap-4 py-2 border-b ">
              <img
                src={ConversationResponse?.data?.user?.image}
                alt="user"
                width={50}
                height={50}
                className="rounded-[13px] w-[50px] h-[50px]"
              />
              <div>
                <h2 className="text-[#1A1A27] font-[futuraMed,sans-serif] dark:text-white">
                  {ConversationResponse?.data?.user?.name}
                </h2>
                <p className="text-xs dark:text-white">
                  {ConversationResponse?.data?.user?.email}
                </p>
                <p className="text-xs dark:text-white">
                  {ConversationResponse?.data?.is_online ? (
                    <div className="flex gap-1 items-center">
                      <div className="bg-[#25d366] h-3 w-3 rounded-full"></div>
                      <span className="text-[#25d366]">{t("Online")}</span>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                      <span className="text-red-600">{t("Offline")}</span>
                    </div>
                  )}
                </p>
                {!ConversationResponse?.data?.is_online && (
                  <p className="text-xs dark:text-white">
                    {t("Last seen")}&nbsp;
                    {ConversationResponse?.data?.last_active_at}
                  </p>
                )}
              </div>
            </div>
            <div
              className="bg-[#fefefe] md:h-[64vh] h-[61vh] shadow-style-x2 xl:ps-6 pb-8 overflow-y-scroll xl-m:h-[50vh] dark:bg-dark-tertiary"
              ref={chatRef}
            >
              {handleSendAtDay(ConversationResponse?.data?.messages)
                .slice()
                .reverse()
                .map((item: any) => (
                  <React.Fragment key={item?.send_at}>
                    <DayTop day={item?.send_at} />
                    <div className="grid grid-cols-12 gap-8 sm-m:flex text-black">
                      {item?.messages
                        .slice()
                        .reverse()
                        .map((msg: any, index: number) => (
                          <React.Fragment key={index}>
                            {!msg?.from_admin ? (
                              <MessageReceiver
                                image={ConversationResponse?.data?.user?.image}
                                message={msg?.message}
                                type={msg?.message_type}
                                time={msg?.send_at}
                                send_at_mop={msg?.time}
                                is_read={msg?.is_read}
                              />
                            ) : (
                              <MessageSender
                                image={msg?.admin?.image}
                                message={msg?.message}
                                type={msg?.message_type}
                                time={msg?.send_at}
                                is_read={msg?.is_read}
                                send_at_mop={msg?.time}
                              />
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </React.Fragment>
                ))}
              {newMessages.map((mesg, index) => (
                <div key={index} className="grid grid-cols-12 gap-8 mt-2">
                  {!mesg?.from_admin ? (
                    <MessageReceiver
                      image={mesg?.profile}
                      message={mesg?.message}
                      type={mesg?.message_type}
                      time={mesg?.time}
                    />
                  ) : (
                    <MessageSender
                      image={mesg?.profile}
                      message={mesg?.message}
                      type={mesg?.message_type}
                      time={mesg?.time}
                    />
                  )}
                </div>
              ))}
              <div
                ref={chatEnd}
                tabIndex={-1}
                className="remove-active-color"
              ></div>
            </div>
            <ControllerChat
              chats={chats}
              setValue={setValue}
              value={value}
              typeUser={ConversationResponse}
              setChats={setChats}
              userId={userId}
              onNewMessage={handleNewMessage}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Conversation;
