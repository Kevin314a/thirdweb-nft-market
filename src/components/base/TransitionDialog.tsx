import classNames from "classnames";
import { CloseButton, Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { MdClose } from "react-icons/md";

const effects = {
  ZOOM: {
    enter: "transition duration-400 ease-out",
    enterFrom: "scale-50",
    enterTo: "scale-100",
    leave: "transition duration-200 ease-in",
    leaveFrom: "scale-100",
    leaveTo: "scale-50",
  },
  ROTATE: {
    enter: "transition duration-400",
    enterFrom: "scale-50 rotate-[-120deg] opacity-0",
    enterTo: "scale-100 rotate-0 opacity-100",
    leave: "duration-200 ease-in-out",
    leaveFrom: "scale-100 rotate-0 opacity-100",
    leaveTo: "scale-95 rotate-[0deg] opacity-0",
  },
  FADE: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 translate-y-4",
    enterTo: "opacity-100 translate-y-0",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 translate-y-4",
  }
};

export const TransitionDialog = ({
  open,
  onClose,
  title,
  children,
  effect,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  effect: "ZOOM" | "FADE" | "ROTATE",
  className?: string,
}) => {

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[2500] w-[100vw] overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen text-center">

          {/* Centering container */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            {...effects[effect]}
          >
            <div className={classNames("inline-block p-6 my-0 md:my-8 overflow-hidden text-left align-bottom md:align-middle transition-all transform shadow-xl rounded-2xl", className)}>
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-white w-full flex justify-between items-center">
                {title}
                <CloseButton as="button"><MdClose color="white" /></CloseButton>
              </DialogTitle>
              <div className="mt-8 text-sm text-gray-500">
                {children}
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};