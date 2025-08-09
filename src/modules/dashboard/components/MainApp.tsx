import { Button } from '@/shared/components/ui/button'
import { AddVisitorModal } from './AddVisitorModal'
import { NavButton } from '@/shared/components/NavButton'
import { Header } from '@/shared/components/Header'
import { DashboardView } from './DashboardView'
import { VisitorsView } from './VisitorsView'
import { LogsView } from './LogsView'
import { useAppContext } from '@/shared/hooks/useAppContext'

export const ManApp: React.FC = () => {
  const { currentView, setCurrentView } = useAppContext()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />

      <div className="flex">
        {/* Sidebar */}

        <main className="flex-1 p-6">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'visitors' && <VisitorsView />}
          {currentView === 'logs' && <LogsView />}
        </main>
      </div>

      <AddVisitorModal />
    </div>
  )
}
