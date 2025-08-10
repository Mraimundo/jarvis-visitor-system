'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserRoundCheck, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Modal } from '@/shared/components/ui/Modal'
import { registerSchema } from '../utils/registerSchema'
import { COMPONENT_CONSTANTS } from '../utils/registerConstants'

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const { register: registerUser } = useAuthContext()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: RegisterFormData) => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const { confirmPassword, ...userData } = data

      const result = await registerUser(userData)

      if (!result.success) {
        toast.error('Erro ao criar conta', {
          description:
            result.message || COMPONENT_CONSTANTS.MESSAGES.genericError,
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        })
      } else {
        reset()
        toast.success('Conta criada com sucesso!', {
          description:
            'Sua conta foi criada. Você será redirecionado para o login.',
          icon: <CheckCircle2 className="w-4 h-4" />,
          duration: 3000,
        })
        setShowSuccessModal(true)
      }
    } catch (error) {
      console.error('Register error:', error)
      toast.error('Erro inesperado', {
        description: COMPONENT_CONSTANTS.MESSAGES.genericError,
        icon: <XCircle className="w-4 h-4" />,
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoToLogin = () => {
    setShowSuccessModal(false)
    router.push('/')
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
  }

  const handleNavigateToLogin = () => {
    router.push('/')
  }

  const RegisterForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-md w-full">
        <header className="text-center mb-8">
          <div className="text-red-400 text-4xl font-bold mb-2">
            J.A.R.V.I.S.
          </div>
          <h1 className="text-2xl font-bold text-white">
            {COMPONENT_CONSTANTS.TITLES.main}
          </h1>
          <p className="text-gray-400 mt-2">Stark Industries</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            {COMPONENT_CONSTANTS.TITLES.form}
          </h2>

          <Input
            label="Nome Completo"
            placeholder={COMPONENT_CONSTANTS.PLACEHOLDERS.name}
            error={errors.name?.message}
            required
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder={COMPONENT_CONSTANTS.PLACEHOLDERS.email}
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <Input
            label="Senha"
            type="password"
            placeholder={COMPONENT_CONSTANTS.PLACEHOLDERS.password}
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <Input
            label="Confirmar Senha"
            type="password"
            placeholder={COMPONENT_CONSTANTS.PLACEHOLDERS.confirmPassword}
            error={errors.confirmPassword?.message}
            required
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading || !isValid || !isDirty}
          >
            {isLoading ? COMPONENT_CONSTANTS.MESSAGES.loading : 'Criar Conta'}
          </Button>
        </form>

        <footer className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {COMPONENT_CONSTANTS.MESSAGES.hasAccount}{' '}
            <button
              type="button"
              onClick={handleNavigateToLogin}
              className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer focus:outline-none focus:underline"
            >
              {COMPONENT_CONSTANTS.MESSAGES.loginLink}
            </button>
          </p>
        </footer>
      </div>
    </div>
  )

  const SuccessModal = () => (
    <Modal
      isOpen={showSuccessModal}
      onClose={handleCloseModal}
      title={COMPONENT_CONSTANTS.TITLES.success}
      description={COMPONENT_CONSTANTS.MESSAGES.success}
      icon={<UserRoundCheck className="text-green-400 text-6xl" />}
      primaryButton={{
        label: COMPONENT_CONSTANTS.MESSAGES.goToLogin,
        onClick: handleGoToLogin,
        className:
          'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      }}
      showCloseButton={true}
    />
  )

  return showSuccessModal ? <SuccessModal /> : <RegisterForm />
}
