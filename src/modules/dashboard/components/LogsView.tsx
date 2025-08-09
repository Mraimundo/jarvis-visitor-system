'use client'

import { Card } from '@/shared/components/ui/card'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { formatTime } from '@/shared/utils/formatTime'

export const LogsView = () => {
  const { logs } = useLogContext()

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Sistema de Logs</h1>
        <p className="text-gray-400 mt-1">
          Registro completo de todas as ações do sistema
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {logs.map(log => (
            <div
              key={log.id}
              className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg"
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 ${
                  log.action === 'visitor_registered'
                    ? 'bg-blue-500'
                    : log.action === 'access_granted'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                }`}
              ></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white">{log.user}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(log.timestamp)} {formatTime(log.timestamp)}
                  </span>
                </div>
                <p className="text-gray-300">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
