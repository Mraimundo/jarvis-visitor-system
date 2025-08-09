'use client'

import { Button } from './ui/button'
import { NavLink } from './NavLink'
import { useAuthContext } from '@/shared/hooks/useAuthContext'

export function Sidebar() {
  const { logout, currentUser } = useAuthContext()

  return (
    <aside className="w-64 min-h-screen bg-gray-950/90 border-r border-gray-800 p-6">
      <div className="mb-8">
        <div className="text-red-400 text-2xl font-bold mb-2">J.A.R.V.I.S.</div>
        {currentUser && (
          <div className="text-sm text-gray-400">Olá, {currentUser.name}</div>
        )}
      </div>

      <nav className="space-y-2">
        <NavLink href="/" icon="📊" label="Dashboard" />
        <NavLink href="/visitors" icon="👥" label="Visitantes" />
        <NavLink href="/logs" icon="📋" label="Logs do Sistema" />
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <Button variant="outline" className="w-full mb-2">
          Configurações
        </Button>
        <Button variant="secondary" className="w-full" onClick={logout}>
          Sair
        </Button>
      </div>
    </aside>
  )
}
