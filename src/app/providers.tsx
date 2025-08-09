'use client'

import { AppProvider } from '@/shared/context/AppProvider'
import { LogProvider } from '@/shared/context/LogProvider'
import { RoomProvider } from '@/shared/context/RoomProvider'
import { VisitorProvider } from '@/shared/context/VisitorProvider'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Login } from '@/modules/auth/components/Login'
import { Register } from '@/modules/auth/components/Register'
import { ManApp } from '@/modules/dashboard/components/MainApp'

export const ClientApp: React.FC = () => {
  const { isAuthenticated, authView } = useAuthContext()

  if (!isAuthenticated) {
    return authView === 'login' ? <Login /> : <Register />
  }

  return (
    <AppProvider>
      <VisitorProvider>
        <RoomProvider>
          <LogProvider>
            <main>
              <ManApp />
            </main>
          </LogProvider>
        </RoomProvider>
      </VisitorProvider>
    </AppProvider>
  )
}
