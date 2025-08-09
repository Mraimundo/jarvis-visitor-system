import { useContext } from 'react'
import { VisitorContext, VisitorContextType } from '../context'

export const useVisitorContext = (): VisitorContextType => {
  const context = useContext(VisitorContext)
  if (!context) {
    throw new Error('useVisitorContext must be used within a VisitorProvider')
  }
  return context
}
