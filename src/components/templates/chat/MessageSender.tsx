import { t } from "i18next";
import Seen from "../../../assets/DoubleTick.svg";
import Unseen from "../../../assets/unseen.svg";
// import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox,} from "lightbox.js-react";
const MessageSender = ({
  image,
  message,
  time,
  type,
  is_read,
  send_at_mop,
}: any) => {
  // console.log("type", type);
  return (
    <>
      <div className="flex col-span-12 flex-row-reverse gap-2 ps-2 rounded-lg rtl:justify-start rtl:flex-row justify-start">
        <img
          src={image}
          alt="user"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="bg-[#F1FAFF] p-3 rounded-lg dark:bg-[#607d8b7d] dark:text-white ">
          <div
            style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
            className={`${
              type === "voice"
                ? " "
                : type === "file"
                ? ""
                : "bg-mainColorLand "
            } text-[14px] font-[futuraReg,sans-serif]   `}
          >
            {type == "voice" ? (
              <audio controls src={message} className=" w-[250px]">
                <a href={message}> {t("common:Download_audio")} </a>
              </audio>
            ) : type == "file" ? (
              <SlideshowLightbox showThumbnails={true}>
                <img
                  src={message}
                  alt="user"
                  width={50}
                  height={50}
                  className={`rounded-[13px] w-[200px] h-[200px] xl:block`}
                />
              </SlideshowLightbox>
            ) : (
              <p className="dark:text-white">{message}</p>
            )}
          </div>
          {/* <div className="col-span-2 flex items-center text-[#0A2E36] text-[12px] font-[futuraReg,sans-serif]">
            <span className="dark:text-white">{time} {send_at_mop} </span>
          </div> */}
        </div>
      </div>
      {/* <div className="col-span-12 mr-[54px] -mt-[28px] !text-[11px] text-right dark:text-white block rtl:text-left  text-sm">
        {is_read === 1 ? t("Seen") : t("Not seen")}
      </div> */}
      <div className="col-span-12 text-right flex items-center text-[#0A2E36] text-[12px] font-[futuraReg,sans-serif]">
        <h3 className="w-full text-right mr-[3rem] -mt-[40px]">
          {time} {send_at_mop}
        </h3>
      </div>
    </>
  );
};

export default MessageSender;
