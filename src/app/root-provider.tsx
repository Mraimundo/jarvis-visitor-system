'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AuthProvider } from '@/shared/context/AuthProvider'
import { AuthGuard } from './auth-guard'

interface RootProviderProps {
  children: ReactNode
}

export const RootProvider = ({ children }: RootProviderProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-2xl font-bold animate-pulse">
          J.A.R.V.I.S.
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  )
}
