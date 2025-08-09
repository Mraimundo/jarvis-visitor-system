'use client'

import { ReactNode } from 'react'
import { AppProvider } from '@/shared/context/AppProvider'
import { LogProvider } from '@/shared/context/LogProvider'
import { RoomProvider } from '@/shared/context/RoomProvider'
import { VisitorProvider } from '@/shared/context/VisitorProvider'
import { AppLayout } from './app-layout'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AppProvider>
      <VisitorProvider>
        <RoomProvider>
          <LogProvider>
            <AppLayout>{children}</AppLayout>
          </LogProvider>
        </RoomProvider>
      </VisitorProvider>
    </AppProvider>
  )
}
