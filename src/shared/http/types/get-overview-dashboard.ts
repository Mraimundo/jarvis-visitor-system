export type Room = {
  id: string
  name: string
  active_visitors: number
  visitors: number
  is_available: boolean
  created_at: string
}

export type VisitorInfo = {
  id: string
  name: string
  cpf: string
  email: string
  birthdate: string
  is_active: boolean
  room_id: string
  created_at: string
}

export type ActiveVisitor = {
  id: string
  visitor_id: string
  room_id: string
  is_active: boolean
  entry_date: string
  exit_date: string | null
  room: Room
  visitor: VisitorInfo
}

export type OnHoldVisitor = {
  id: string
  visitor_id: string
  room_id: string
  created_at: string
  exit_date: string | null
  room: Room
  visitor: VisitorInfo
}

export type GetOverviewDashboardResponse = Array<{
  active_visitors: ActiveVisitor[]
  on_hold_list: OnHoldVisitor[]
  total_visitors_active: number
  total_visitors_on_hold: number
}>
