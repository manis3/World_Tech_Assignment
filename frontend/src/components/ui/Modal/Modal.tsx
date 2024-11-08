import React, { ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal } from '../Dialog/dialog'
import { cn } from '@/utils/cn'

export default function Modal({
    show,
    closeModal,
    title,
    children,
    showCloseIcon = true,
    className,
    titleClassName
}: {
    show: boolean;
    closeModal: () => void;
    children: ReactNode;
    title: string;
    showCloseIcon?: boolean;
    className?: string
    titleClassName?: string;
}) {
    return (
        <Dialog open={show} onOpenChange={closeModal}>
            <DialogPortal>
                <DialogContent
                    overlay={
                        <DialogOverlay className="bg-opacity-[0.40] bg-black backdrop-blur-[2px]" />
                    }
                    className={cn(
                        "bg-grayscale-milk-white max-w-[unset] gap-[0px] w-[620px] p-5 sm:p-8 overflow-hidden rounded-[20px]",
                        className,
                    )}
                >
                    <div className="flex items-center gap-[6px]">
                        <h3 className={cn("text-bold-heading-3 text-[24px] mb-4 ", titleClassName)}>
                            {title}
                        </h3>
                    </div>
                    {children}
                    {showCloseIcon ? (
                        <DialogClose className="absolute top-[10px] right-[10px] text-fill-white w-[40px] h-[40px] flex items-center justify-center" />
                    ) : null}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
