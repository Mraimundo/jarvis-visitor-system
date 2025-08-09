'use client'

import { ReactNode, useState } from 'react'
import { AuthContext } from '.'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'register'>('login')

  const login = async (email: string, password: string) => {
    // Implementar lógica de login aqui
    try {
      // Simular API call
      if (email && password) {
        setIsAuthenticated(true)
        return { success: true }
      }
      return { success: false, message: 'Credenciais inválidas' }
    } catch (error) {
      return { success: false, message: 'Erro no servidor' }
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    // Implementar lógica de registro aqui
    try {
      // Simular API call
      if (userData.name && userData.email && userData.password) {
        setIsAuthenticated(true)
        return { success: true }
      }
      return { success: false, message: 'Dados inválidos' }
    } catch (error) {
      return { success: false, message: 'Erro no servidor' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAuthView('login')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: null, // Implementar lógica para obter usuário atual
        isAuthenticated,
        authView,
        setAuthView,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
