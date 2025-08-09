'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AuthContext, AuthContextType, User } from '.'

interface AuthProviderProps {
  children: ReactNode
}

const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@stark.com',
    password: '123456',
    user: {
      id: 1,
      name: 'Tony Stark',
      email: 'admin@stark.com',
      password: '',
      role: 'admin',
    },
  },
  user: {
    email: 'user@stark.com',
    password: '123456',
    user: {
      id: 2,
      name: 'Pepper Potts',
      email: 'user@stark.com',
      password: '',
      role: 'user',
    },
  },
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedAuth = localStorage.getItem('jarvis_auth')
        const storedUser = localStorage.getItem('jarvis_user')

        if (storedAuth === 'true' && storedUser) {
          const user = JSON.parse(storedUser)
          setCurrentUser(user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error loading auth state:', error)
        localStorage.removeItem('jarvis_auth')
        localStorage.removeItem('jarvis_user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const testUser = Object.values(TEST_CREDENTIALS).find(
        cred => cred.email === email && cred.password === password
      )

      if (testUser) {
        const user = testUser.user

        setCurrentUser(user)
        setIsAuthenticated(true)

        localStorage.setItem('jarvis_auth', 'true')
        localStorage.setItem('jarvis_user', JSON.stringify(user))

        return { success: true }
      }

      return {
        success: false,
        message: 'Email ou senha incorretos. Verifique suas credenciais.',
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Erro no servidor. Tente novamente em alguns instantes.',
      }
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (userData.name && userData.email && userData.password) {
        const emailExists = Object.values(TEST_CREDENTIALS).some(
          cred => cred.email === userData.email
        )

        if (emailExists) {
          return {
            success: false,
            message:
              'Este email já está em uso. Tente fazer login ou use outro email.',
          }
        }

        const user: User = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          password: '',
          role: 'user',
        }

        setCurrentUser(user)
        setIsAuthenticated(true)

        localStorage.setItem('jarvis_auth', 'true')
        localStorage.setItem('jarvis_user', JSON.stringify(user))

        return { success: true }
      }

      return {
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios.',
      }
    } catch (error) {
      console.error('Register error:', error)
      return {
        success: false,
        message: 'Erro no servidor. Tente novamente em alguns instantes.',
      }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setAuthView('login')

    localStorage.removeItem('jarvis_auth')
    localStorage.removeItem('jarvis_user')

    console.log('Usuário deslogado com sucesso')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-4xl font-bold mb-4 animate-pulse">
            J.A.R.V.I.S.
          </div>
          <div className="text-gray-400 text-sm">Inicializando sistema...</div>
        </div>
      </div>
    )
  }

  const contextValue: AuthContextType = {
    isAuthenticated,
    currentUser,
    authView,
    setAuthView,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
