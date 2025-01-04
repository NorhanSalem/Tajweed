/////////// IMPORTS
///
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
///
/////////// Types
///
type ModalTemplateProps_TP = {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
};
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ModalTemplate = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalTemplateProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0 m-5 md:m-0 lg-b:!relative lg-b:!m-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-1xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all sm:max-w-[70rem] modal-templete-style lg-b:!absolute lg-b:!top-0 lg-b:!left-0 lg-b:!w-full lg-b:!h-full lg-b:!max-w-full lg-b:!m-0 lg-b:!rounded-none ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 relative"
                >
                  {title}

                  <button
                    type="button"
                    className="absolute top-[25px] left-[20px] "
                    onClick={() => onClose(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6 text-white hover:text-white rounded-md hover:border-white hover:border-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
