'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { AppProviders } from './app-providers'
import { LoadingSkeleton } from '@/shared/components/LoadingSkeleton'

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

    const isPublicRoute = pathname === '/' || pathname === '/register'

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/')
    } else if (isAuthenticated && isPublicRoute) {
      router.replace('/dashboard')
    }

    return () => clearTimeout(timer)
  }, [isAuthenticated, pathname, router])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const isAuthRoute = pathname === '/' || pathname === '/register'

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
