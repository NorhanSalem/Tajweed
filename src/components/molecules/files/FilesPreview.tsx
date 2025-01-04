/////////// IMPORTS
///

import { useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { CFile_TP, CImageFile_TP } from "../../../types";
import { CLightbox } from "./CLightbox";

type FilesPreviewProps_TP = {
  images: CImageFile_TP[];
  formikFieldName?: string;
  preview?: boolean;
};

export const FilesPreview = ({
  images,
  formikFieldName,
  preview,
}: FilesPreviewProps_TP) => {
  console.log("🚀 ~ images:", images);
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: any;
  }>();

  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setLightboxOpen(false);
    }
  }, [images.length]);

  const deleteFileHandler = (id: string) => {
    if (formikFieldName) {
      const currFilesState: CFile_TP[] = values[formikFieldName];
      setFieldValue(
        formikFieldName,
        currFilesState.filter((file) => file.id !== id)
      );
    }
  };

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  ///
  return (
    <>
      <div className="overflow-hidden h-[200px] ">
        {!!images.length && (
          <>
            <div className="w-full h-full">
              {!!images.length && (
                <div className="rounded-mde object-cover h-full">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`cursor-pointer  w-full  h-full ${
                        image.id === selectedImageId
                          ? "ring-4 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedImageId(image.id);
                        setLightboxOpen(true);
                      }}
                    >
                      <img
                        src={images[0]?.preview || image?.path}
                        alt="Uploaded Image"
                        className=" h-full  object-cover w-full rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* images*/}
      {!!images.length && lightboxOpen && (
        <CLightbox
          preview={preview}
          deleteFileHandler={deleteFileHandler}
          open={lightboxOpen}
          closeHandler={() => setLightboxOpen(false)}
          images={images}
        />
      )}
    </>
  );
};
