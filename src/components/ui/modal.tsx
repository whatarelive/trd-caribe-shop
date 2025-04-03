"use client";

import { type FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

interface Props {
    children: React.ReactNode;
    rootID: string;
    onDismiss: () => void;
}

export const Modal: FC<Props> = ({ rootID, children, onDismiss }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return createPortal(
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 flex justify-center items-center z-50">
            <dialog 
                ref={dialogRef} 
                onClose={onDismiss}
                className="w-4/5 h-fit max-w-[500px] m-auto max-h-[500px] border-none rounded-md 
                bg-white p-5 relative flex flex-col justify-center items-center" 
            >
                { children }

                <MdClose 
                    onClick={onDismiss} 
                    size={24} 
                    className="absolute top-4 right-4 cursor-pointer hover:text-red-500 transition-colors"
                />
            </dialog>
        </div>,
        document.getElementById(rootID)!
    );
}