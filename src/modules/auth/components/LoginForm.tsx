'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { toast } from 'sonner'
import { LogIn, XCircle, CheckCircle2, AlertCircle } from 'lucide-react'
import { loginSchema } from '../utils/loginSchema'
import { COMPONENT_CONSTANTS } from '../utils/loginConstants'

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { login } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password)
      if (!result.success) {
        toast.error('Erro ao fazer login', {
          description:
            result.message || COMPONENT_CONSTANTS.MESSAGES.genericError,
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        })
      } else {
        toast.success(COMPONENT_CONSTANTS.MESSAGES.loginSuccess, {
          description: COMPONENT_CONSTANTS.MESSAGES.loginSuccessDescription,
          icon: <CheckCircle2 className="w-4 h-4" />,
          duration: 3000,
        })
        reset()
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Erro inesperado', {
        description: COMPONENT_CONSTANTS.MESSAGES.genericError,
        icon: <XCircle className="w-4 h-4" />,
        duration: 5000,
      })
    }
  }

  const handleForgotPassword = () => {
    toast.info(COMPONENT_CONSTANTS.MESSAGES.forgotPasswordInfo, {
      description: COMPONENT_CONSTANTS.MESSAGES.forgotPasswordDescription,
      icon: <AlertCircle className="w-4 h-4" />,
      duration: 4000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-md w-full">
        <header className="text-center mb-8">
          <div className="text-red-400 text-4xl font-bold mb-2">
            {COMPONENT_CONSTANTS.TITLES.brand}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {COMPONENT_CONSTANTS.TITLES.main}
          </h1>
          <p className="text-gray-400 mt-2">
            {COMPONENT_CONSTANTS.TITLES.company}
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            {COMPONENT_CONSTANTS.TITLES.form}
          </h2>

          <div className="space-y-4">
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
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {COMPONENT_CONSTANTS.MESSAGES.loading}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Entrar
              </div>
            )}
          </Button>
        </form>

        <footer className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {COMPONENT_CONSTANTS.MESSAGES.noAccount}{' '}
            <Link
              href="/register"
              className="text-red-400 hover:text-red-300 font-medium transition-colors focus:outline-none focus:underline"
            >
              {COMPONENT_CONSTANTS.MESSAGES.registerLink}
            </Link>
          </p>
        </footer>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-gray-500 hover:text-gray-400 text-xs transition-colors focus:outline-none focus:underline"
          >
            {COMPONENT_CONSTANTS.MESSAGES.forgotPassword}
          </button>
        </div>
      </div>
    </div>
  )
}
