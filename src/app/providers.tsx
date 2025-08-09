'use client'

import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { AppProvider } from '@/shared/context/AppProvider'
import { LogProvider } from '@/shared/context/LogProvider'
import { RoomProvider } from '@/shared/context/RoomProvider'
import { VisitorProvider } from '@/shared/context/VisitorProvider'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Login } from '@/modules/auth/components/Login'
import { AuthProvider } from '@/shared/context/AuthProvider'

const protectedRoutes = ['/dashboard', '/visitors', '/rooms', '/logs']
function AppTree({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <VisitorProvider>
        <RoomProvider>
          <LogProvider>{children}</LogProvider>
        </RoomProvider>
      </VisitorProvider>
    </AppProvider>
  )
}

function RouteValidator({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated && isProtectedRoute(pathname)) {
      console.log(`Acesso negado para rota protegida: ${pathname}`)
      router.push('/')
      return
    }

    if (isAuthenticated && pathname === '/') {
      console.log('Usuário autenticado redirecionado para dashboard')
      router.push('/dashboard')
      return
    }
  }, [isAuthenticated, pathname, router])

  return <>{children}</>
}

function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    if (isProtectedRoute(pathname) || pathname === '/') {
      return <Login />
    }
  }

  return (
    <RouteValidator>
      <AppTree>{children}</AppTree>
    </RouteValidator>
  )
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    route => pathname.startsWith(route) && pathname !== '/'
  )
}

export const ClientAppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  )
}
