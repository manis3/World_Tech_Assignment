import { IRouteDataType } from '@/types/routesType'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import React from 'react'

export default function RouteMap({ routes, pathname }: { routes: IRouteDataType[], pathname: string }) {
    return (
        <>
            {routes.map(({ name, path }) => (
                <Link
                    key={path}
                    href={path}
                    className={cn("text-[14px] font-medium text-text-grayscaleGhostWhite active:text-blue-500", {
                        'text-blue-500': pathname === path
                    })}
                >
                    {name}
                </Link>
            ))}
        </>
    )
}
