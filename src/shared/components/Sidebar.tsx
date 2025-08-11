'use client'

import { Button } from './ui/button'
import { NavLink } from './NavLink'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { CollapsibleContent } from './ui/collapsible'

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const { logout, currentUser } = useAuthContext()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <CollapsibleContent
        forceMount
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gray-950/90 border-r border-gray-800 p-6 transform transition-transform duration-300 z-50
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="mb-8">
          <div className="text-red-400 text-2xl font-bold mb-2">
            J.A.R.V.I.S.
          </div>
          {currentUser && (
            <div className="text-sm text-gray-400">Olá, {currentUser.name}</div>
          )}
        </div>

        <nav className="space-y-2">
          <NavLink href="/dashboard" icon="📊" label="Dashboard" />
          <NavLink href="/visitors" icon="👥" label="Visitantes" />
          <NavLink href="/logs" icon="📋" label="Logs do Sistema" />
          <NavLink href="/rooms" icon="🏢" label="Salas" />
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <Button variant="secondary" className="w-full" onClick={logout}>
            Sair
          </Button>
        </div>
      </CollapsibleContent>
    </>
  )
}
