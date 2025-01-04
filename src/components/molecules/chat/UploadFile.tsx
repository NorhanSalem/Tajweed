import { Image } from "@mantine/core";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import SendMessage from "../../atoms/icons/sendMessage";
import { notify } from "../../../utils/toast";
import { t } from "i18next";

function UploadFile({
  setFiles,
  files,
  ButtonIcon,
  setTextValue,
  sendImageSubmut,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputFileChange = (event: any) => {
    setIsOpen(true);
    const inputFiles = event.target.files;
    const validFiles: File[] = [];
    const newErrorMessages: string[] = [];

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
      } else {
        newErrorMessages.push(`${file.name} ${t("image_error")}`);
      }
    }

    if (newErrorMessages.length > 0) {
      notify("error", newErrorMessages.join(" "));
    } else {
      setErrorMessage("");
    }

    setFiles([...validFiles]);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <img
        className="w-full h-full"
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleInputFileChange}
        className="hidden"
        id="file-input"
        multiple
      />
      <label htmlFor="file-input">{ButtonIcon}</label>

      {files.length > 0 && (
        <div className="absolute top-[-37rem] right-[50%] translate-x-[50%] translate-y-[10%]">
          <div className="w-[500px] h-[500px] image-container">{previews}</div>

          <div className="flex items-center justify-between px-4 py-2 bg-[#eee]">
            <button onClick={() => setFiles([])}>
              <AiOutlineDelete className="w-[30px] h-[30px] fill-[red]" />
            </button>

            <div className="col-span-1 w-[40px] h-[40px] bg-mainColorLand flex justify-center items-center rounded-[5px] hover:cursor-pointer">
              <SendMessage onClick={sendImageSubmut} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
