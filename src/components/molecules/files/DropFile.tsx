/////////// IMPORTS
///
import { ErrorMessage, useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { CFile_TP, CImageFile_TP } from "../../../types";
import { pdfOrImage } from "../../../utils/helpers";
import { Button } from "../../atoms/buttons/Button";
import { UploadSvgIcon } from "../../atoms/icons";
import { FilesPreview } from "./FilesPreview";
///
/////////// Types
///
type DropFileProps_TP = {
  name: string;
  setRemoved?: any;
};

export const DropFile = ({ name, setRemoved }: DropFileProps_TP) => {
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: any;
  }>();

  const [images, setImages] = useState<CImageFile_TP[]>([]);

  useEffect(() => {
    const imageFiles: CImageFile_TP[] = values[name];
    const images = imageFiles?.filter((file) => pdfOrImage(file) === "image");
    setImages(images);
  }, [values[name]]);

  return (
    <div className=" grid grid-cols-4 gap-8 rounded-xl bg-white dark:!bg-dark-primary p-3 pr-3 w-full ">
      <div className=" col-span-4">
        <Dropzone
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg", ".jpg"],
            "image/svg": [".svg"],
          }}
          onDrop={(acceptedFiles) => {
            setFieldValue(
              name,
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                  id: crypto.randomUUID(),
                })
              )
            );
            setRemoved(false);
          }}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div className=" relative  h-[300px]">
              {!images?.length && (
                <div
                  className="flex flex-col h-[300px] justify-center items-center rounded-2xl w-full cursor-pointer  p-4 gap-2 shadows dark:!bg-dark-primary dark:border-none dark:!shadow-none dark:!text-white bg-gray-100"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <UploadSvgIcon stroke={"#A0A0A0"} />
                  <p className="text-gray-500 dark:text-white">
                    {t("click to upload")}
                  </p>

                  <ErrorMessage
                    component="p"
                    name={name}
                    className="text-red-500"
                  />
                </div>
              )}
              {!!images?.length && (
                <div className="absolute w-full  border rounded-xl p-1">
                  <>
                    <FilesPreview formikFieldName={name} images={images} />
                    <div
                      className="flex flex-col h-[50px] justify-center items-center rounded-2xl w-full cursor-pointer    "
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />

                      <Button type="button">
                        {t("click to change filed")}
                      </Button>

                      <ErrorMessage
                        component="p"
                        name={name}
                        className="text-red-500"
                      />
                    </div>
                  </>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};
