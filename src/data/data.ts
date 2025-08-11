import { Log, Room, User, Visitor } from '@/shared/context'

export const mockVisitors: Visitor[] = [
  {
    id: 1,
    name: 'Tony Stark',
    cpf: '123.456.789-00',
    email: 'tony@starkindustries.com',
    destination: '4201',
    birthDate: '1970-05-29',
    photo: 'https://placehold.co/100x100/1a1a1a/e63946?text=TS',
    status: 'active',
    entryTime: '2025-08-11T08:30:00',
    floor: 42,
  },
  {
    id: 2,
    name: 'Pepper Potts',
    cpf: '987.654.321-00',
    email: 'pepper@starkindustries.com',
    destination: '4202',
    birthDate: '1978-02-15',
    photo: 'https://placehold.co/100x100/1a1a1a/4d96ff?text=PP',
    status: 'active',
    entryTime: '2025-08-10T09:15:00',
    floor: 42,
  },
  {
    id: 3,
    name: 'Bruce Banner',
    cpf: '456.789.123-00',
    email: 'bruce@starkindustries.com',
    destination: '4501',
    birthDate: '1969-12-18',
    photo: 'https://placehold.co/100x100/1a1a1a/2a9d8f?text=BB',
    status: 'waiting',
    entryTime: null,
    floor: 45,
  },
]

export const mockRooms: Room[] = [
  { id: '4201', floor: 42, capacity: 3, current: 1, name: 'CEO Office' },
  { id: '4202', floor: 42, capacity: 3, current: 1, name: 'Executive Suite' },
  { id: '4501', floor: 45, capacity: 3, current: 1, name: 'R&D Lab' },
  { id: '5001', floor: 50, capacity: 3, current: 0, name: 'Observation Deck' },
]

export const mockLogs: Log[] = [
  {
    id: 1,
    action: 'visitor_registered',
    user: 'Jarvis',
    timestamp: '2023-07-15T08:30:00',
    details: 'Tony Stark registered for room 4201',
  },
  {
    id: 2,
    action: 'access_granted',
    user: 'Security System',
    timestamp: '2023-07-15T08:31:00',
    details: 'Access granted to Tony Stark (room 4201)',
  },
  {
    id: 3,
    action: 'visitor_registered',
    user: 'Jarvis',
    timestamp: '2023-07-15T09:15:00',
    details: 'Pepper Potts registered for room 4202',
  },
]

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'J.A.R.V.I.S.',
    email: 'admin@stark.com',
    password: 'admin123',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Security Officer',
    email: 'security@stark.com',
    password: 'security123',
    role: 'Security',
  },
]
