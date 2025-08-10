'use client'

import { Button } from './ui/button'
import { NavLink } from './NavButton'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Collapsible } from '@radix-ui/react-collapsible'
import { Menu, Users, ClipboardList, ChartColumnBig } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Sidebar() {
  const { logout, currentUser } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="lg:static fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      >
        <aside
          className={`h-full w-64 bg-gray-950/90 border-r border-gray-800 p-6 flex flex-col backdrop-blur-sm 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="mb-8">
            <div className="text-red-400 text-2xl font-bold mb-2">
              J.A.R.V.I.S.
            </div>
            {currentUser && (
              <div className="text-sm text-gray-400">
                Olá, {currentUser.name}
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-2">
            <NavLink
              href="/dashboard"
              icon={<ClipboardList />}
              label="Dashboard"
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href="/visitors"
              icon={<Users />}
              label="Visitantes"
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href="/logs"
              icon={<ChartColumnBig />}
              label="Logs do Sistema"
              onClick={() => setIsOpen(false)}
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
            >
              Sair
            </Button>
          </div>
        </aside>
      </Collapsible>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

// 'use client'

// import { Button } from './ui/button'
// import { NavLink } from './NavLink'
// import { useAuthContext } from '@/shared/hooks/useAuthContext'

// export function Sidebar() {
//   const { logout, currentUser } = useAuthContext()

//   return (
//     <aside className="w-64 min-h-screen bg-gray-950/90 border-r border-gray-800 p-6">
//       <div className="mb-8">
//         <div className="text-red-400 text-2xl font-bold mb-2">J.A.R.V.I.S.</div>
//         {currentUser && (
//           <div className="text-sm text-gray-400">Olá, {currentUser.name}</div>
//         )}
//       </div>

//       <nav className="space-y-2">
//         <NavLink href="/dashboard" icon="📊" label="Dashboard" />
//         <NavLink href="/visitors" icon="👥" label="Visitantes" />
//         <NavLink href="/logs" icon="📋" label="Logs do Sistema" />
//       </nav>

//       <div className="mt-8 pt-6 border-t border-gray-800">
//         <Button variant="secondary" className="w-full" onClick={logout}>
//           Sair
//         </Button>
//       </div>
//     </aside>
//   )
// }
