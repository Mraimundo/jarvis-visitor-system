import { DashboardView } from '@/modules/dashboard/components/DashboardView'
import { AddVisitorModal } from '@/modules/dashboard/components/AddVisitorModal'

export default function Home() {
  return (
    <>
      <DashboardView />
      <AddVisitorModal />
    </>
  )
}
