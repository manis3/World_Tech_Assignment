import React, { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardVariants = cva("w-full", {
    variants: {
        padding: {
            "18px": 'p-[18px]',
            "16px": "p-4",
        },
        rounded: {
            "8": "rounded-[8px]",
            "16": "rounded-[16px]",
        },
        colorScheme: {
            "grayscale-ghost-white": "bg-white shadow-mp-shadow",
            "grayscale-milk-white": "ui-bg-milk-white shadow-mp-shadow",
        },
        shadow: {
            "dropshadow-light": "shadow-dropshadow-light",
        },
    },
    defaultVariants: {
        rounded: '8',
        colorScheme: "grayscale-ghost-white",
        padding: '16px',
    }
});

export interface ICardProps
    extends VariantProps<typeof cardVariants>,
    Partial<ComponentProps<"div">> {
    className?: string;
}

export function Card({
    children,
    className,
    rounded,
    padding,
    colorScheme,
    shadow,
    ...props
}: ICardProps) {
    return (
        <div {...props}
            className={cn(cardVariants({ padding, rounded, colorScheme, shadow }), className)
            }
        >
            {children}
        </div>
    );
}
