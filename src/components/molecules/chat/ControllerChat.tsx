import { t } from "i18next";
import Cookies from "js-cookie";
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { FileWithPath } from "react-dropzone";
import io from "socket.io-client";
import { useFetch, useIsRTL, useMutate } from "../../../hooks";
import AttachmentIcon from "../../atoms/icons/AttachmentIcon";
import SendMessage from "../../atoms/icons/sendMessage";
import Record from "./Record";
import UploadFile from "./UploadFile";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { useLocalStorage } from "@mantine/hooks";
import "../../../assets/styles.css";
import moment from "moment";

const ControllerChat = ({
  onNewMessage,
  typeUser,
  userId,
  openSideChat,
}: any) => {
  const [socket, setSocket] = useState("");
  const data: any = useLocalStorage({ key: "user", defaultValue: "" });
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [inputStr, setInputStr] = useState("");
  const [textValue, setTextValue] = useState("");
  const { user } = useAuth();
  const [file, setFile] = useState<FileWithPath[]>([]);
  const [localFile, setLocalFile] = useState<FileWithPath[]>([]);
  const isRTL = useIsRTL();
  const [voiceAudioRecord, setVoiceAudioRecord] = useState<boolean>(false);
  const messageContent = `${textValue} ${selectedEmoji}`;
  const [showPicker, setShowPicker] = useState(false);
  const [visible, setvisible] = useState(true);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // Reference for the emoji picker

  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    let formatedTime = isToday
      ? `Today ${new Intl.DateTimeFormat("en-US", options).format(date)}`
      : new Intl.DateTimeFormat("en-US", {
          ...options,
          month: "short",
          day: "numeric",
        }).format(date);

    formatedTime = isRTL
      ? formatedTime
          .replace("Today", "اليوم")
          .replace("PM", "م")
          .replace("AM", "ص")
      : formatedTime;
    return formatedTime;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);
  const formattedTime = formatTime(new Date());
  const dataMessageLocal = {
    message: file.length ? file : messageContent,
    type: file.length ? "file" : "text",
    time: new Date(),
    from_admin: true,
    user: {
      profile: user?.profile,
      user_type: user?.user_type,
      id: user?.id,
    },
  };

  const { mutate } = useMutate({
    mutationKey: [`core/admin-chat/send`],
    endpoint: `core/admin-chat/send`,
    onSuccess: (data: any) => {
      const { message_type } = data?.data?.data.message_type;

      let type;
      if (message_type === "file") {
        type = "file";
      } else if (message_type === "voice") {
        type = "voice";
      }

      sendMessage({
        message: data?.data?.data?.messages,
        type,
        time: new Date(),
        from_admin: true,
        message_type: data?.data?.data?.message_type,
        send_at_mop: moment().format("DD-MM-YYYY HH:mm"),
        user: {
          profile: user?.profile,
          user_type: user?.user_type,
          id: user?.id,
        },
      });
    },
    onError: (err) => {
      //@ts-ignore
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const {
    isLoading,
    isSuccess,
    refetch,
    data: settingData,
  } = useFetch<any>({
    endpoint: `dashboard/settings`,
    queryKey: [`dashboard/settings`],
  });

  const logoAdmin = settingData?.data.find(
    (item: { key: string }) => item?.key == "logo_ar"
  ).value;

  useEffect(() => {
    const user_token = Cookies.get("token");
    const socketInstance = io(
      `http://ec2-51-20-135-115.eu-north-1.compute.amazonaws.com:3001?user_id=${userId}&token=${user_token}`
    );
    //@ts-ignore
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("receiveAdminMessage", (data) => {
      console.log("🚀 ~ socketInstance.on ~ data:", data);
      onNewMessage({
        message: data.message,
        profile: data.profile,
        from_admin: data?.from_admin,
        time: formatTime(new Date()),
        id: data?.user_id,
        message_type: data?.message_type,
        send_at_mop: moment().format("DD-MM-YYYY HH:mm"),
      });
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [userId]);

  const sendMessage = (data: any) => {
    const formattedTime = formatTime(new Date());
    console.log("sendAdminMessage", data);

    //@ts-ignore
    if (data?.message_type !== "text") {
      socket.emit("sendAdminMessage", {
        user_id: userId,
        message: data?.message,
        profile: logoAdmin,
        time: formattedTime,
        admin_id: data?.[0]?.data?.data?.id,
        admin_name: data?.[0]?.data?.data?.name,
        from_admin: data?.from_admin,
        type: typeUser?.data?.type,
        message_type: data?.message_type ?? "text",
        send_at_mop: moment().format("DD-MM-YYYY HH:mm"),
      });
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    console.log(emojiObject.emoji);
    setTextValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleKeyUp = (evt: any) => {
    const formattedTime = formatTime(new Date());
    const messageContent = `${textValue} ${selectedEmoji}`;

    if (evt.keyCode === 13 && !evt.shiftKey) {
      if (messageContent.trim().length)
        socket.emit("sendAdminMessage", {
          user_id: userId,
          message: messageContent,
          profile: logoAdmin,
          time: formattedTime,
          admin_id: data?.[0]?.data?.data?.id,
          admin_name: data?.[0]?.data?.data?.name,
          from_admin: true,
          message_type: "text",
          type: file.length
            ? "file"
            : //@ts-ignore
            textValue?.type == "voice"
            ? "voice"
            : "text",
          file: file.length
            ? file[0]
            : //@ts-ignore
            textValue?.type === "voice"
            ? textValue
            : file,
        });
      mutate(
        file.length
          ? {
              timestamp: +new Date(),
              user_id: userId,
              file: file[0],
              message_type: "file",
              type: "student",
              admin_id: data?.[0]?.data?.data?.id,
              admin_name: data?.[0]?.data?.data?.name,
              from_admin: true,
            }
          : //@ts-ignore
          textValue?.type === "voice"
          ? {
              timestamp: +new Date(),
              user_id: userId,
              file: textValue,
              message_type: "voice",
              type: "student",
              admin_id: data?.[0]?.data?.data?.id,
              admin_name: data?.[0]?.data?.data?.name,
              from_admin: true,
            }
          : {
              message: messageContent,
              timestamp: +new Date(),
              user_id: userId,
              file: file,
              message_type: "text",
              type: "student",
              admin_id: data?.[0]?.data?.data?.id,
              admin_name: data?.[0]?.data?.data?.name,
              from_admin: true,
            }
      );

      evt.target.value = "";
      setTextValue("");
      setFile([]);
      setSelectedEmoji("");
    }
  };
  const handleEmojiClick = (emojiObject: any) => {
    const emoji = emojiObject.emoji;
    setTextValue((prevText) => {
      const newText = prevText?.replace(/:[^:\s]*:/g, "");
      return newText + emoji;
    });
  };
  const getMessageType = (file: FileWithPath[]): string => {
    if (file.length === 0) return "text"; // No file, default to text

    const fileType = file[0].type;
    return "file";
  };
  const handleSendMessage = (res: any) => {
    if (messageContent?.trim().length) {
      sendMessage(dataMessageLocal);
    }
    mutate(
      file.length
        ? {
            timestamp: +new Date(),
            user_id: userId,
            file: file[0],
            message_type: getMessageType(file),
            type: "student",
            from_admin: true,
            admin_id: data?.[0]?.data?.data?.id,
            admin_name: data?.[0]?.data?.data?.name,
          }
        : //@ts-ignore
        res.type == "voice"
        ? {
            timestamp: +new Date(),
            user_id: userId,
            file: res,
            message_type: "voice",
            type: "student",
            from_admin: true,
            admin_id: data?.[0]?.data?.data?.id,
            admin_name: data?.[0]?.data?.data?.name,
          }
        : !!messageContent?.trim().length
        ? {
            message: messageContent,
            timestamp: +new Date(),
            user_id: userId,
            message_type: "text",
            type: "student",
            from_admin: true,
            admin_id: data?.[0]?.data?.data?.id,
            admin_name: data?.[0]?.data?.data?.name,
          }
        : ""
    );

    setTextValue("");
    setFile([]);
    setSelectedEmoji("");
    document.body.removeAttribute("record-send");
    document.body.removeAttribute("recordHasCompleted");
  };

  const handleResetRecord = () => {
    setVoiceAudioRecord(false);
  };
  const handleTextChange = (e) => {
    setTextValue(e.target.value); // Set the text value as before

    // Dynamically adjust the height of the textarea
    e.target.style.height = "inherit"; // Reset the field height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height equal to the scroll height
  };

  return (
    <div className=" bg-white relative">
      <div
        ref={emojiPickerRef}
        className="flex z-[9999999]  h-1 w-full justify-end items-end"
      >
        {showPicker && (
          <Picker
            className="z-[9999999]"
            pickerStyle={{ width: "100%" }}
            onEmojiClick={onEmojiClick}
          />
        )}
      </div>
      <div
        className={`  ${
          !openSideChat && "rounded-none"
        } md:rounded-b-[45px] absolute  bg-white bottom-0  px-0 md:w-[100%]  sm:w-[100%] w-[100%] left-0  xl-m:!px-2 py-4 pt-0 shadow-style-x2 flex   grid-cols-12  items-center min-s-1000:gap-4 `}
      >
        {!voiceAudioRecord && (
          <>
            <div className="col-span-10 w-full flex">
              <textarea
                className={
                  !visible
                    ? "w-full h-auto resize-none p-[0.50rem] whitespace-pre-line m-2 border rounded-xl sm-m:text-[14px]"
                    : "w-full h-auto resize-none p-[0.50rem] whitespace-pre-line m-2 border rounded-xl sm-m:text-[14px]"
                }
                onKeyUp={handleKeyUp}
                placeholder={`${t("Type a message")}`}
                value={textValue}
                onChange={handleTextChange} // Update this line
                style={{
                  overflowY: "hidden",
                  whiteSpace: "pre-line",
                  maxHeight: "96px",
                }} // Ensure whitespace and line breaks are preserved
              ></textarea>
            </div>
            {textValue.trim() && (
              <div className="col-span-1 w-[50px] h-[50px]  bg-mainColorLand flex justify-center items-center rounded-[15px] hover:cursor-pointer">
                <SendMessage
                  onClick={handleSendMessage}
                  className="rtl:rotate-[-90deg]"
                />
              </div>
            )}
            <div className="col-span-2 flex items-center gap-5">
              {!visible && (
                <UploadFile
                  class="flex-grow"
                  setFiles={setFile}
                  files={file}
                  ButtonIcon={<AttachmentIcon className={"cursor-pointer"} />}
                  setTextValue={setTextValue}
                  localFile={localFile}
                  setLocalFile={setLocalFile}
                  sendImageSubmut={handleSendMessage}
                />
              )}

              <>
                <div className="grow col-span-3 voice-audio-record">
                  <Record
                    toggle={() => setvisible(() => !visible)}
                    sendMessageRecord={handleSendMessage}
                  />
                </div>
              </>
              {!visible && (
                <div
                  onClick={() => setShowPicker((val) => !val)}
                  className="grow emoji-icon  cursor-pointer"
                >
                  😊
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ControllerChat;
