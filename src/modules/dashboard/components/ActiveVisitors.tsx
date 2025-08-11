import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'
import { formatTime } from '@/shared/utils/formatTime'
import { getStayDuration } from '@/shared/utils/getStayDuration'

export function ActiveVisitors() {
  const { visitors, updateVisitor } = useVisitorContext()
  const { rooms, updateRoom } = useRoomContext()
  const { addLog } = useLogContext()
  const { currentUser } = useAuthContext()

  const handleExit = (visitorId: number) => {
    const visitor = visitors.find(v => v.id === visitorId)
    if (!visitor) return

    updateVisitor({
      ...visitor,
      status: 'exited',
      exitTime: new Date().toISOString(),
    })

    const room = rooms.find(r => r.id === visitor.destination)
    if (room && room.current > 0) {
      updateRoom({
        ...room,
        current: room.current - 1,
      })
    }

    addLog({
      id: Date.now(),
      action: 'visitor_exited',
      user: currentUser?.name || 'Unknown',
      timestamp: new Date().toISOString(),
      details: `${visitor.name} exited room ${visitor.destination}`,
    })
  }

  const activeVisitors = visitors.filter(v => v.status === 'active')

  return (
    <Card className="lg:col-span-2">
      <h3 className="text-xl font-semibold text-white mb-4">
        Visitantes Ativos
      </h3>
      <div className="space-y-3">
        {activeVisitors.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum visitante ativo no momento
          </p>
        ) : (
          activeVisitors.map(visitor => (
            <div
              key={visitor.id}
              className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg"
            >
              <img
                src={visitor.photo}
                alt={visitor.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="text-white font-medium">{visitor.name}</h4>
                <p className="text-gray-400 text-sm">
                  Sala {visitor.destination} • {formatTime(visitor.entryTime)}
                </p>
                <p className="text-green-400 text-sm">
                  Permanência: {getStayDuration(visitor.entryTime)}
                </p>
              </div>
              <div className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExit(visitor.id)}
                >
                  Registrar Saída
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
