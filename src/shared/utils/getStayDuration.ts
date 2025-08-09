export const getStayDuration = (entryTime: string | null): string => {
  if (!entryTime) return '0 min'

  const start = new Date(entryTime)
  const end = new Date()

  const diffMs = end.getTime() - start.getTime()

  if (diffMs < 0) return '0 min'

  const diffMins = Math.floor(diffMs / 60000)
  const hours = Math.floor(diffMins / 60)
  const minutes = diffMins % 60

  if (hours === 0) {
    return `${minutes}min`
  }

  return `${hours}h ${minutes}min`
}
