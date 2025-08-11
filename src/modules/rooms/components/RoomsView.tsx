'use client'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useAppContext } from '@/shared/hooks/useAppContext'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'
import { formatTime } from '@/shared/utils/formatTime'
import { Plus } from 'lucide-react'

export const RoomsView = () => {
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

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'waiting':
        return 'Espera'
      default:
        return 'Saída'
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/50 text-green-300'
      case 'waiting':
        return 'bg-yellow-900/50 text-yellow-300'
      default:
        return 'bg-gray-700 text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="lg:text-3xl text-lg font-bold text-white">
            Controle de Salas e Visitantes
          </h1>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Sala
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Visitante
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  CPF
                </th>

                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Entrada
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Saida
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {visitors.map(visitor => {
                return (
                  <tr
                    key={visitor.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-300">
                      Sala {visitor.destination}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={visitor.photo}
                          alt={visitor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {visitor.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {visitor.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{visitor.cpf}</td>
                    <td className="py-4 px-4 text-gray-300">
                      {visitor.entryTime ? formatTime(visitor.entryTime) : '-'}
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {visitor.entryTime ? formatTime(visitor.entryTime) : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
