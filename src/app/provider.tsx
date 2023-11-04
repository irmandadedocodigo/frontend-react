'use client'
import {
    UserProvider
} from '@/app/context/UserContext'
import { usePathname } from 'next/navigation'


export default function Provider({ children }: {
    children: React.ReactNode
}) {
    const pathName = usePathname()

    if (pathName === '/auth/login' || pathName === '/auth/register') return (
        <>{children}</>
    )

    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}