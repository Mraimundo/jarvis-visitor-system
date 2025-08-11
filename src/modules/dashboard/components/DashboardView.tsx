'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useAppContext } from '@/shared/hooks/useAppContext'

import { useOverviewDashboard } from '@/shared/http/use-overview-dashboard'
import { RoomStatus } from './RoomStatus'
import { WaitingList } from './WaitingList'
import { ActiveVisitors } from './ActiveVisitors'
import { StatsGrid } from './StatsGrid'

export const DashboardView = () => {
  // const { data } = useOverviewDashboard()

  const { setShowAddVisitor } = useAppContext()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard de Visitantes
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoramento em tempo real da Stark Tower
          </p>
        </div>
        <Button
          onClick={() => setShowAddVisitor(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="size-8" />
          <span>Novo Visitante</span>
        </Button>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveVisitors />

        <WaitingList />
      </div>

      <RoomStatus />
    </div>
  )
}
