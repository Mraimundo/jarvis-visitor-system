import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useState } from 'react'

export const Login: React.FC = () => {
  const { login, setAuthView } = useAuthContext()
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: '', password: '' }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = 'Email é obrigatório'
    if (!formData.password) newErrors.password = 'Senha é obrigatória'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const result = await login(formData.email, formData.password)
      if (!result.success) {
        setErrors({ form: result.message || 'Erro ao fazer login' })
      }
    } catch (error) {
      setErrors({ form: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-red-400 text-4xl font-bold mb-2">
            J.A.R.V.I.S.
          </div>
          <h1 className="text-2xl font-bold text-white">
            Sistema de Gerenciamento de Visitantes
          </h1>
          <p className="text-gray-400 mt-2">Stark Industries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-6 text-center">
              Entrar
            </h2>

            {errors.form && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm">
                {errors.form}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              placeholder="seu@email.com"
              required
            />

            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              placeholder="Sua senha"
              required
            />

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Não tem uma conta?{' '}
            <button
              onClick={() => setAuthView('register')}
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
