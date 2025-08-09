'use client'

import React, { useState } from 'react'
import { AppContext, User, Visitor } from '.'

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentView, setCurrentView] = useState<string>('dashboard')
  const [user, setUser] = useState<User>({
    name: 'J.A.R.V.I.S.',
    email: 'admin@stark.com',
    password: 'admin123',
    role: 'Admin',
  })
  const [showAddVisitor, setShowAddVisitor] = useState<boolean>(false)
  const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({
    name: '',
    cpf: '',
    email: '',
    destination: '',
    birthDate: '',
    photo: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        showAddVisitor,
        setShowAddVisitor,
        newVisitor,
        setNewVisitor,
        errors,
        setErrors,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
