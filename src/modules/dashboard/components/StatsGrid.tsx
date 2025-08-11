import { Card } from '@/shared/components/ui/card'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'

export function StatsGrid() {
  const { visitors, updateVisitor } = useVisitorContext()
  const { rooms, updateRoom } = useRoomContext()
  const { addLog } = useLogContext()
  const activeVisitors = visitors.filter(v => v.status === 'active')
  const waitingVisitors = visitors.filter(v => v.status === 'waiting')
  const occupiedRooms = rooms.filter(r => r.current > 0)
  const fullRooms = rooms.filter(r => r.current >= r.capacity)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Visitantes Ativos</p>
            <p className="text-3xl font-bold text-white">
              {activeVisitors.length}
            </p>
          </div>
          <div className="text-green-400 text-4xl">👥</div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Em Espera</p>
            <p className="text-3xl font-bold text-white">
              {waitingVisitors.length}
            </p>
          </div>
          <div className="text-yellow-400 text-4xl">⏳</div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Salas Ocupadas</p>
            <p className="text-3xl font-bold text-white">
              {occupiedRooms.length}
            </p>
          </div>
          <div className="text-blue-400 text-4xl">🏢</div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Alertas</p>
            <p className="text-3xl font-bold text-white">{fullRooms.length}</p>
          </div>
          <div className="text-red-400 text-4xl">⚠️</div>
        </div>
      </Card>
    </div>
  )
}
