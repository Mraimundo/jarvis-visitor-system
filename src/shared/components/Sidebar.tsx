import { useAppContext } from '../hooks/useAppContext'
import { NavButton } from './NavButton'
import { Button } from './ui/button'

export function Sidebar() {
  const { currentView, setCurrentView } = useAppContext()

  return (
    <aside className="w-64 min-h-screen bg-gray-950/90 border-r border-gray-800 p-6">
      <nav className="space-y-2">
        <NavButton
          icon="📊"
          label="Dashboard"
          active={currentView === 'dashboard'}
          onClick={() => setCurrentView('dashboard')}
        />
        <NavButton
          icon="👥"
          label="Visitantes"
          active={currentView === 'visitors'}
          onClick={() => setCurrentView('visitors')}
        />
        <NavButton
          icon="📋"
          label="Logs do Sistema"
          active={currentView === 'logs'}
          onClick={() => setCurrentView('logs')}
        />
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <Button variant="outline" className="w-full">
          Configurações
        </Button>
      </div>
    </aside>
  )
}
