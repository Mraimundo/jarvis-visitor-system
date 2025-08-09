import { useState } from 'react'
import { AuthContext, User } from '.'
import { mockUsers } from '@/data/data'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authView, setAuthView] = useState<'login' | 'register'>('login')

  const login = (
    email: string,
    password: string
  ): { success: boolean; message?: string } => {
    // Mock user validation
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    )
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, message: 'Email ou senha inválidos' }
  }

  const register = (
    userData: Omit<User, 'id' | 'role'>
  ): { success: boolean; message?: string } => {
    // Check if user already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      return { success: false, message: 'Usuário com este email já existe' }
    }

    // Add new user
    const newUser: User = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'User',
    }

    // Em um aplicativo real, você salvaria no banco de dados
    // Por enquanto, vamos apenas atualizar nossos dados simulados

    mockUsers.push(newUser)

    setCurrentUser(newUser)
    setIsAuthenticated(true)
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
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
