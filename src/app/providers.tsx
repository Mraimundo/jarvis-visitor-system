'use client'

import { AppProvider } from '@/shared/context/AppProvider'
import { LogProvider } from '@/shared/context/LogProvider'
import { RoomProvider } from '@/shared/context/RoomProvider'
import { VisitorProvider } from '@/shared/context/VisitorProvider'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Login } from '@/modules/auth/components/Login'
import { Register } from '@/modules/auth/components/Register'
import { ReactNode } from 'react'
import { AuthProvider } from '@/shared/context/AuthProvider'

export const ClientAppProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, authView } = useAuthContext()

  if (!isAuthenticated) {
    return authView === 'login' ? <Login /> : <Register />
  }

  return (
    <AuthProvider>
      <AppProvider>
        <VisitorProvider>
          <RoomProvider>
            <LogProvider>{children}</LogProvider>
          </RoomProvider>
        </VisitorProvider>
      </AppProvider>
    </AuthProvider>
  )
}
