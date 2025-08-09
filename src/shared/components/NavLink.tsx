'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  icon: string
  label: string
}

export const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
        isActive
          ? 'bg-red-900/30 text-red-300 border border-red-800/50'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
      suppressHydrationWarning={true}
    >
      <div className="text-xl">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  )
}
