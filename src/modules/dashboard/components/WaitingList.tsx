import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'

export function WaitingList() {
  const { visitors, updateVisitor } = useVisitorContext()
  const { rooms, updateRoom } = useRoomContext()
  const { addLog } = useLogContext()
  const { currentUser } = useAuthContext()

  const handleEntry = (visitorId: number) => {
    const visitor = visitors.find(v => v.id === visitorId)
    if (!visitor) return

    const room = rooms.find(r => r.id === visitor.destination)
    if (!room) return

    if (room.current >= room.capacity) {
      return
    }

    updateVisitor({
      ...visitor,
      status: 'active',
      entryTime: new Date().toISOString(),
    })

    updateRoom({
      ...room,
      current: room.current + 1,
    })

    addLog({
      id: Date.now(),
      action: 'access_granted',
      user: currentUser?.name || 'Unknown',
      timestamp: new Date().toISOString(),
      details: `Access granted to ${visitor.name} (room ${visitor.destination})`,
    })
  }

  const waitingVisitors = visitors.filter(v => v.status === 'waiting')

  return (
    <Card>
      <h3 className="lg:text-xl text-lg font-semibold text-white mb-4">
        Fila de Espera
      </h3>
      <div className="space-y-3">
        {waitingVisitors.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum visitante na fila
          </p>
        ) : (
          waitingVisitors.map(visitor => {
            const room = rooms.find(r => r.id === visitor.destination)
            const isFull = room && room.current >= room.capacity

            return (
              <div key={visitor.id} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={visitor.photo}
                    alt={visitor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {visitor.name}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Sala {visitor.destination}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isFull ? 'outline' : 'success'}
                  size="sm"
                  className="w-full"
                  onClick={() => !isFull && handleEntry(visitor.id)}
                  disabled={isFull}
                >
                  {isFull ? 'Sala Lotada' : 'Liberar Acesso'}
                </Button>
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}
