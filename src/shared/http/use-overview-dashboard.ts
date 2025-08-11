import { useQuery } from '@tanstack/react-query'
import { GetOverviewDashboardResponse } from './types/get-overview-dashboard'

export function useOverviewDashboard() {
  return useQuery({
    queryKey: ['get-overview-dashboard'],
    refetchInterval: 30000,
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/overview/list-all')
      const result: GetOverviewDashboardResponse = await response.json()

      return result
    },
  })
}
