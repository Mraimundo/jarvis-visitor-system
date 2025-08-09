import { useContext } from 'react'
import { RoomContext, RoomContextType } from '../context'

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext)
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider')
  }
  return context
}
