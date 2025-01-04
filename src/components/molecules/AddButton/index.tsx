import { Add } from "../../atoms/icons/Add";

type AddButton_TP = {
  addLabel?: string;
  action?: () => void;
  className?: string;
};

export const AddButton = ({ addLabel, action, className }: AddButton_TP) => {
  return (
    <>
      {addLabel && (
        <div
          className={`relative active:top-[1px]  cutsom-button-sub hover:cursor-pointer py-2 px-5 font-bold rounded-md w-full bg-mainBlue dark:bg-dark-tertiary dark:!border-dark-borderDark text-white border border-lightBlack   flex items-center justify-center gap-2 ${className}`}
          onClick={action}
        >
          <Add className="w-5 h-5 text-white dark:text-mainBlue" />
          <p className=" text-sm text-white">{addLabel}</p>
        </div>
      )}
    </>
  );
};
