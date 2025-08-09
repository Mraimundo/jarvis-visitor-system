import { useEffect, useState } from 'react'
import { Log, LogContext } from '.'
import { mockLogs } from '@/data/data'

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    // Initialize with mock data
    setLogs(mockLogs)
  }, [])

  const addLog = (log: Log) => {
    setLogs(prev => [log, ...prev])
  }

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        addLog,
      }}
    >
      {children}
    </LogContext.Provider>
  )
}
