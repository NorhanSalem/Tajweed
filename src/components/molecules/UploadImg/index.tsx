import React from "react";

import { IconUpload } from "@tabler/icons-react";
import { useFormikContext } from "formik";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { SvgDeleteIcon, UploadSvgIcon } from "../../atoms/icons";

const UploadImg = ({ name, hidden }: any) => {
  const { setFieldValue, values } = useFormikContext(); /////////// STATES

  const [images, setImages] = React.useState(values[name]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setFieldValue(name, imageList[0]?.file);
    setImages(imageList as never[]);
  };
  return (
    <ImageUploading
      multiple
      value={images || values[name]}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper  relative w-1/4 m-auto border rounded-md ">
          <div className=" flex  items-center justify-center relative w-[100%] h-[200px]">
            {imageList.length === 0 ? (
              <div className="absolute right-0 w-[100%] h-[100%] flex justify-center z-[1000]">
                <button
                  type="button"
                  className="px-[0] py-[0] w-[100%]"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {<UploadSvgIcon stroke={"#A0A0A0"} />}
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="absolute w-full h-full ">
              {imageList?.map((image, index) => (
                <div key={index} className="image-item w-full h-full">
                  <div className="h-full">
                    <img
                      src={image.dataURL || image.path}
                      className="w-full h-full rounded-md object-contain"
                      alt=""
                    />
                  </div>
                  <div className="absolute top-0 left-0 bg-gray-200 p-1 rounded-md m-2 flex ">
                    <button type="button" onClick={() => onImageUpdate(index)}>
                      <IconUpload />
                    </button>
                  </div>
                  {!hidden ? (
                    <div className="  image-item__btn-wrapper ">
                      <div className="absolute top-0 right-0 bg-gray-200 p-1 rounded-md m-2 flex">
                        <button
                          type="button"
                          onClick={() => onImageRemove(image.path)}
                        >
                          <SvgDeleteIcon stroke={"#ff0000"} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

export default UploadImg;
