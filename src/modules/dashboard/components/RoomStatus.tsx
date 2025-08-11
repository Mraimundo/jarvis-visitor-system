import { Card } from '@/shared/components/ui/card'
import { Room } from '@/shared/context'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'
import { useContext, useState } from 'react'

export function RoomStatus() {
  const { visitors, updateVisitor } = useVisitorContext()
  const { rooms, updateRoom } = useRoomContext()
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room)
  }

  return (
    <Card>
      <h3 className="text-xl font-semibold text-white mb-4">
        Status das Salas
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rooms.map(room => {
          const isFull = room.current >= room.capacity
          const isOccupied = room.current > 0

          return (
            <div
              key={room.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isFull
                  ? 'bg-red-900/20 border-red-500'
                  : isOccupied
                    ? 'bg-yellow-900/20 border-yellow-500'
                    : 'bg-green-900/20 border-green-500'
              }`}
            >
              <h4 className="font-semibold text-white">Sala {room.id}</h4>
              <p className="text-gray-300 text-sm">{room.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-sm font-medium ${
                    isFull
                      ? 'text-red-400'
                      : isOccupied
                        ? 'text-yellow-400'
                        : 'text-green-400'
                  }`}
                >
                  {room.current}/{room.capacity}
                </span>
                <div
                  className={`w-3 h-3 rounded-full ${
                    isFull
                      ? 'bg-red-500'
                      : isOccupied
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
