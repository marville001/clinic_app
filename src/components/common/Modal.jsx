import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
    isOpen,
    closeModal,
    size,
    children,
    center = true,
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-y-auto bg-slate-900 z-[120] bg-opacity-30"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}

                    {center && (
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                    )}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={`
                inline-block w-full 
                ${
                    size && size === "sm"
                        ? "max-w-sm"
                        : size === "md"
                        ? "max-w-md"
                        : size === "lg"
                        ? "max-w-lg"
                        : size === "xl"
                        ? "max-w-xl"
                        : size === "2xl"
                        ? "max-w-2xl"
                        : size === "3xl"
                        ? "max-w-3xl"
                        : size === "4xl"
                        ? "max-w-4xl"
                        : "max-w-2xl"
                }
                my-8 overflow-hidden 
                text-left align-middle transition-all transform                
                `}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
