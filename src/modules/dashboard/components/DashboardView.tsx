'use client'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useAppContext } from '@/shared/hooks/useAppContext'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'
import { formatTime } from '@/shared/utils/formatTime'
import { getStayDuration } from '@/shared/utils/getStayDuration'

export const DashboardView: React.FC = () => {
  const { visitors, updateVisitor } = useVisitorContext()
  const { rooms, updateRoom } = useRoomContext()
  const { addLog } = useLogContext()
  const { setShowAddVisitor } = useAppContext()
  const { currentUser } = useAuthContext()

  const handleEntry = (visitorId: number) => {
    const visitor = visitors.find(v => v.id === visitorId)
    if (!visitor) return

    const room = rooms.find(r => r.id === visitor.destination)
    if (!room) return

    if (room.current >= room.capacity) {
      alert('Sala lotada! Visitante colocado na fila de espera.')
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
  const waitingVisitors = visitors.filter(v => v.status === 'waiting')
  const occupiedRooms = rooms.filter(r => r.current > 0)
  const fullRooms = rooms.filter(r => r.current >= r.capacity)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard de Visitantes
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoramento em tempo real da Stark Tower
          </p>
        </div>
        <Button
          onClick={() => setShowAddVisitor(true)}
          className="flex items-center space-x-2"
        >
          <span>+</span>
          <span>Novo Visitante</span>
        </Button>
      </div>

      {/* Stats Grid */}
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
              <p className="text-3xl font-bold text-white">
                {fullRooms.length}
              </p>
            </div>
            <div className="text-red-400 text-4xl">⚠️</div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Visitors */}
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
                      Sala {visitor.destination} •{' '}
                      {formatTime(visitor.entryTime)}
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

        {/* Waiting List */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">
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
                  <div
                    key={visitor.id}
                    className="p-4 bg-gray-800/30 rounded-lg"
                  >
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
      </div>

      {/* Room Status */}
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
    </div>
  )
}
