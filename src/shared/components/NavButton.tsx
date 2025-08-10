'use client'

import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  icon: string | ReactNode
  label: string
  onClick?: () => void
}

export function NavLink({ href, icon, label, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      variant={isActive ? 'primary' : 'outline'}
      className="w-full justify-start gap-4"
    >
      <a className="flex items-center" href={href} onClick={onClick}>
        <span>{icon}</span>
        {label}
      </a>
    </Button>
  )
}

// type NavButtonProps = {
//   icon: React.ReactNode
//   label: string
//   active: boolean
//   onClick: () => void
// }

// export const NavButton = ({ icon, label, active, onClick }: NavButtonProps) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
//       active
//         ? 'bg-red-900/30 text-red-300 border border-red-800/50'
//         : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
//     }`}
//   >
//     <div className="text-xl">{icon}</div>
//     <span className="font-medium">{label}</span>
//   </button>
// )
