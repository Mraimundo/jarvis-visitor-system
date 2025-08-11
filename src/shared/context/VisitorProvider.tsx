'use client'

import { useEffect, useState } from 'react'

import { Visitor, VisitorContext } from '.'
import { mockVisitors } from '@/data/data'

export const VisitorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visitors, setVisitors] = useState<Visitor[]>([])

  useEffect(() => {
    setVisitors(mockVisitors)

    const interval = setInterval(() => {
      setVisitors(prev => [...prev])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const addVisitor = (visitor: Visitor) => {
    setVisitors(prev => [...prev, visitor])
  }

  const updateVisitor = (visitor: Visitor) => {
    setVisitors(prev =>
      prev.map(v => (v.id === visitor.id ? { ...v, ...visitor } : v))
    )
  }

  return (
    <VisitorContext.Provider
      value={{
        visitors,
        setVisitors,
        addVisitor,
        updateVisitor,
      }}
    >
      {children}
    </VisitorContext.Provider>
  )
}
