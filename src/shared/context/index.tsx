import { createContext } from 'react'

export interface User {
  id?: number
  name: string
  email: string
  password: string
  role: string
}

export interface Visitor {
  id: number
  name: string
  cpf: string
  email: string
  destination: string
  birthDate: string
  photo: string
  status: 'active' | 'waiting' | 'exited'
  entryTime: string | null
  exitTime?: string
  floor: number
}

export interface Room {
  id: string
  floor: number
  capacity: number
  current: number
  name: string
}

export interface Log {
  id: number
  action: 'visitor_registered' | 'access_granted' | 'visitor_exited'
  user: string
  timestamp: string
  details: string
}

export interface AppContextType {
  currentView: string
  setCurrentView: (view: string) => void
  user: User
  setUser: (user: User) => void
  showAddVisitor: boolean
  setShowAddVisitor: (show: boolean) => void
  newVisitor: Partial<Visitor>
  setNewVisitor: (visitor: Partial<Visitor>) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export interface VisitorContextType {
  visitors: Visitor[]
  setVisitors: (visitors: Visitor[]) => void
  addVisitor: (visitor: Visitor) => void
  updateVisitor: (visitor: Visitor) => void
}

export interface RoomContextType {
  rooms: Room[]
  setRooms: (rooms: Room[]) => void
  updateRoom: (room: Room) => void
}

export interface LogContextType {
  logs: Log[]
  setLogs: (logs: Log[]) => void
  addLog: (log: Log) => void
}

export interface AuthContextType {
  isAuthenticated: boolean
  currentUser: User | null
  authView: 'login' | 'register'
  setAuthView: (view: 'login' | 'register') => void
  login: (
    email: string,
    password: string
  ) => { success: boolean; message?: string }
  register: (userData: Omit<User, 'id' | 'role'>) => {
    success: boolean
    message?: string
  }
  logout: () => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)
export const VisitorContext = createContext<VisitorContextType | undefined>(
  undefined
)
export const RoomContext = createContext<RoomContextType | undefined>(undefined)
export const LogContext = createContext<LogContextType | undefined>(undefined)
export const AuthContext = createContext<AuthContextType | undefined>(undefined)
