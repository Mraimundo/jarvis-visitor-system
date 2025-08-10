import type { ReactNode } from 'react'
import { Sidebar } from '@/shared/components/Sidebar'
import { Header } from '@/shared/components/Header'
import { AddVisitorModal } from '@/modules/dashboard/components/AddVisitorModal'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0 ml-0 transition-all duration-300">
        <Header />
        <div className="p-6">{children}</div>
        <AddVisitorModal />
      </main>
    </div>
  )
}

// 'use client'

// import type { ReactNode } from 'react'
// import { Sidebar } from '@/shared/components/Sidebar'
// import { Header } from '@/shared/components/Header'
// import { AddVisitorModal } from '@/modules/dashboard/components/AddVisitorModal'

// interface AppLayoutProps {
//   children: ReactNode
// }

// export const AppLayout = ({ children }: AppLayoutProps) => {
//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar />
//       <main className="flex-1 overflow-auto lg:ml-0 ml-0 transition-all duration-300">
//         <Header />
//         <div className="p-6">{children}</div>
//         <AddVisitorModal />
//       </main>
//     </div>
//   )
// }

// 'use client'

// import type { ReactNode } from 'react'
// import { Sidebar } from '@/shared/components/Sidebar'
// import { Header } from '@/shared/components/Header'
// import { AddVisitorModal } from '@/modules/dashboard/components/AddVisitorModal'

// interface AppLayoutProps {
//   children: ReactNode
// }

// export const AppLayout = ({ children }: AppLayoutProps) => {
//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar />
//       <main className="flex-1 overflow-auto">
//         <Header />
//         <div className="p-6">{children}</div>
//         <AddVisitorModal />
//       </main>
//     </div>
//   )
// }
