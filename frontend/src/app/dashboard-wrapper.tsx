import NavBar from '@/components/navbar'
import { usePathname } from 'next/navigation';;
import React from 'react'

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className='flex min-h-screen w-full bg-foreground text-gray-900'>
      <main className='flex w-full flex-col '>
        <NavBar pathname={pathname} />
        {children}
      </main>
    </div >
  )
}
