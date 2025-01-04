/////////// IMPORTS
import { BaseInputField } from "../../molecules";

export const GeneralSettingMainData = ({
  settingData,
  setImgUpload,
}: any) => {
  return (
    <>
      <div className="col-span-4 grid grid-cols-1 gap-10">
        <div className="general-setting-style grid grid-cols-1 sm:grid-cols-2">
          {settingData?.data?.map((item) => (
            <>
              <BaseInputField
                Style="col-span-2 sm:col-span-1 px-[20px]"
                id={item?.key}
                label={item?.label}
                type={item?.type}
                name={item?.key}
                setImgUpload={setImgUpload}
              />
            </>
          ))}
        </div>
      </div>
      {/* </InnerFormLayout> */}
    </>
  );
};
