import { useEffect, useState } from 'react'
import { Room, RoomContext } from '.'
import { mockRooms } from '@/data/data'

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    // Initialize with mock data
    setRooms(mockRooms)
  }, [])

  const updateRoom = (room: Room) => {
    setRooms(prev => prev.map(r => (r.id === room.id ? { ...r, ...room } : r)))
  }

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        updateRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
