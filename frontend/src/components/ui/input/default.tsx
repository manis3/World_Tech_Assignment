import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean | string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
};

const inputVarient = cva(
    'min-h-2 w-5 rounded-md font-bold',
    {
        variants: {
            variant: {
                primary: "bg-white border border-black-500 rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none",
                secondary: "bg-foreground border-black rounded-md  focus:outline-none"
            },
            size: {
                small: "min-h-[30px] min-w-[30px] text-sm",
                medium: "min-h-[40px] min-w-[40px] text-md",
                large: "min-h-[50px] min-w-[50px] text-lg"
            }
        },
        defaultVariants: {

            variant: 'primary',
            size: 'small'
        }
    }
)


export default function Input({ className, size, error, variant, ...props }: InputProps) {
    return (
        <input {...props} className={cn(inputVarient({ variant, size }), error && "outline outline-2 outline-red-600", className)} />
    )
}
