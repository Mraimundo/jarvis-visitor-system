'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormEvent, ChangeEvent } from 'react'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Modal } from '@/shared/components/ui/Modal' // Importamos o novo Modal
import { UserRoundCheck } from 'lucide-react'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const { register } = useAuthContext()
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Nome é obrigatório'
    if (!formData.email) newErrors.email = 'Email é obrigatório'
    if (!formData.password) newErrors.password = 'Senha é obrigatória'
    if (formData.password && formData.password.length < 6)
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'As senhas não coincidem'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const { confirmPassword, ...userData } = formData
      const result = await register(userData)
      if (!result.success) {
        setErrors({ form: result.message || 'Erro ao criar conta' })
      } else {
        setShowSuccessModal(true)
      }
    } catch (error) {
      console.error('Register error:', error)
      setErrors({ form: 'Erro ao criar conta. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange =
    (field: keyof RegisterFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    }

  const handleGoToLogin = () => {
    setShowSuccessModal(false)
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {!showSuccessModal ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-md w-full">
            <header className="text-center mb-8">
              <div className="text-red-400 text-4xl font-bold mb-2">
                J.A.R.V.I.S.
              </div>
              <h1 className="text-2xl font-bold text-white">
                Sistema de Gerenciamento de Visitantes
              </h1>
              <p className="text-gray-400 mt-2">Stark Industries</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">
                Criar Conta
              </h2>

              {errors.form && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm">
                  {errors.form}
                </div>
              )}

              <Input
                label="Nome Completo"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                placeholder="Seu nome completo"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                placeholder="seu@email.com"
                required
              />

              <Input
                label="Senha"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                placeholder="Sua senha"
                required
              />

              <Input
                label="Confirmar Senha"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={errors.confirmPassword}
                placeholder="Confirme sua senha"
                required
              />

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>

            <footer className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
                >
                  Entrar
                </button>
              </p>
            </footer>
          </div>
        </div>
      ) : (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Conta Criada com Sucesso!"
          description="Sua conta foi criada com sucesso. Agora você pode fazer login e acessar o sistema."
          icon={<UserRoundCheck className="text-green-400 text-6xl" />}
          primaryButton={{
            label: 'Ir para Login',
            onClick: handleGoToLogin,
            className:
              'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
          }}
          showCloseButton={true}
        />
      )}
    </>
  )
}
