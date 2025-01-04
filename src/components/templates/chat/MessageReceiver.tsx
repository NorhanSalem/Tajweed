import { t } from "i18next";
import { useEffect } from "react";
// import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox,} from "lightbox.js-react";

const MessageReceiver = ({
  image,
  message,
  time,
  type,
  is_read,
  send_at_mop,
}: any) => {
  // console.log("🚀 ~ MessageReceiver ~ message:", message);
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <>
      <div className="flex flex-row-reverse rtl:flex-row col-span-12 gap-2 ps-2 rounded-lg rtl:justify-end justify-end">
        <div className="bg-[#F8F5FF] relative p-3 rounded-lg w-40 break-words">
          <div
            style={{
              overflowY: "hidden",
              whiteSpace: "pre-line",
            }}
            className={`${
              type === "voice" ? " " : type === "file" ? "" : "bg-mainColorLand"
            } text-[14px] font-[futuraReg,sans-serif] `}
          >
            {type === "voice" ? (
              <audio controls src={message} className="w-full">
                <a href={message}> {t("common:Download_audio")} </a>
              </audio>
            ) : type === "image" ? (
              <SlideshowLightbox showThumbnails={true}>
                <img
                  src={message}
                  alt="user"
                  width={50}
                  height={50}
                  className={`rounded-[13px] w-[200px] h-[200px] xl:block object-cover`}
                />
              </SlideshowLightbox>
            ) : (
              <p>{message}</p>
            )}
          </div>

          {/* <div className="dark:text-white block rtl:text-left text-right text-sm">
            {is_read === 1 ? t("Seen") : t("Havent watched yet")}
          </div> */}
        </div>
        <img
          src={image}
          alt="user"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className="col-span-12 text-right flex items-center text-[#0A2E36] text-[12px] font-[futuraReg,sans-serif]">
        <h3 className="w-full text-left ml-[3rem] -mt-[40px]">
          {time} {send_at_mop}
        </h3>
      </div>
    </>
  );
};

export default MessageReceiver;
