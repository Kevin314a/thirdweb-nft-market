/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode } from 'react';
import { Dialog, DialogTitle, Transition, TransitionChild, } from '@headlessui/react';
import { MdClose } from "react-icons/md";

interface HeadlessSlideOverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function SlideOver({
  open,
  setOpen,
  title,
  children,
}: HeadlessSlideOverProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden z-[2004]"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
          </TransitionChild>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <MdClose className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="h-full flex flex-col py-6 bg-black-1300 text-white shadow-inner shadow-white/70 focus:outline-none shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-lg font-medium text-gray-900 text-white">
                      {title}
                    </DialogTitle>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    {children}
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
