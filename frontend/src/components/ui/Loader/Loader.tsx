import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loader({ wrapperClassName, loaderClassName }: { wrapperClassName?: string, loaderClassName?: string }) {
    return (
        <div className={cn('flex items-center justify-center w-full h-screen bg-foreground', wrapperClassName)}>
            <Loader2 className={cn('animate-spin w-12 h-12 text-gray-700', loaderClassName)} />
        </div>
    );
}
