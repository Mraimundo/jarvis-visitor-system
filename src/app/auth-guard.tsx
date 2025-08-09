'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { AppProviders } from './app-providers'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    const isAuthRoute = pathname === '/login' || pathname === '/register'

    if (!isAuthenticated && !isAuthRoute) {
      router.replace('/login')
    } else if (isAuthenticated && isAuthRoute) {
      router.replace('/')
    }

    return () => clearTimeout(timer)
  }, [isAuthenticated, pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-4xl font-bold mb-4 animate-pulse">
            J.A.R.V.I.S.
          </div>
          <div className="text-gray-400">Carregando sistema...</div>
        </div>
      </div>
    )
  }

  const isAuthRoute = pathname === '/login' || pathname === '/register'

  if (!isAuthenticated) {
    if (isAuthRoute) {
      return children
    }
    return null
  }

  if (isAuthRoute) {
    return null
  }

  return <AppProviders>{children}</AppProviders>
}
