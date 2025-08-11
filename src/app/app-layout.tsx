'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Collapsible } from '@/shared/components/ui/collapsible'
import { Sidebar } from '@/shared/components/Sidebar'
import { Header } from '@/shared/components/Header'
import { AddVisitorModalForm } from '@/modules/dashboard/components/AddVisitorModalForm'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Collapsible open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <Header />
          <div className="p-6">{children}</div>
          <AddVisitorModalForm />
        </main>
      </div>
    </Collapsible>
  )
}
