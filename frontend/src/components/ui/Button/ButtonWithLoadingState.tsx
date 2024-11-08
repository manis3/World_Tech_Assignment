import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";
import { BaseButton, ButtonProps } from './button';
import { ReactNode } from "react";


interface IProps extends ButtonProps {
    loading?: boolean;
    loadingWrapperClassName?: string;
    loadingIconClassName?: string;
    disabled?: boolean;
    children?: ReactNode
}

export default function Button({
    children,
    loading,
    loadingWrapperClassName,
    loadingIconClassName,
    disabled,
    ...rest
}: IProps) {
    return (
        <BaseButton {...rest} disabled={disabled || loading}>
            <div
                className={cn(
                    "flex items-center gap-2 relative",
                    loadingWrapperClassName,
                )}
            >
                <div
                    className={cn(
                        "absolute left-[50%] -translate-x-[50%]",
                        loading ? "visible" : "invisible",
                    )}
                >
                    <Loader2 className={cn("animate-spin", loadingIconClassName)} />
                </div>
                <div className={cn(loading && "invisible")}>{children}</div>
            </div>
        </BaseButton>
    );
}
