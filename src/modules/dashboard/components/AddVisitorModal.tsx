'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Select } from '@/shared/components/ui/select'
import { Visitor } from '@/shared/context'
import { useAppContext } from '@/shared/hooks/useAppContext'
import { useAuthContext } from '@/shared/hooks/useAuthContext'
import { useLogContext } from '@/shared/hooks/useLogContext'
import { useRoomContext } from '@/shared/hooks/useRoomContext'
import { useVisitorContext } from '@/shared/hooks/useVisitorContext'
import { validateCPF } from '@/shared/utils/validateCPF'

const addVisitorSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z
    .string()
    .refine(validateCPF, { message: 'CPF inválido' })
    .min(1, 'CPF é obrigatória'),
  email: z.string().email({ message: 'E-mail inválido' }),
  birthDate: z.string(),
  destination: z.string().min(0, 'Sala de destino é obrigatória'),
})

type AddVisitorFormData = z.infer<typeof addVisitorSchema>

export const AddVisitorModal = () => {
  const { showAddVisitor, setShowAddVisitor } = useAppContext()
  const { currentUser } = useAuthContext()
  const { visitors, addVisitor } = useVisitorContext()
  const { rooms } = useRoomContext()
  const { addLog } = useLogContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVisitorFormData>({
    resolver: zodResolver(addVisitorSchema),
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      birthDate: '',
      destination: '',
    },
  })

  if (!showAddVisitor) return null

  const onSubmit = (data: AddVisitorFormData) => {
    const visitor: Visitor = {
      id: visitors.length + 1,
      ...data,
      status: 'waiting',
      entryTime: null,
      floor: parseInt(data.destination.substring(0, 2) || '0'),
      photo: `https://placehold.co/100x100/1a1a1a/e63946?text=${data.name.charAt(0).toUpperCase()}`,
    }

    addVisitor(visitor)

    reset()
    setShowAddVisitor(false)

    addLog({
      id: Date.now(),
      action: 'visitor_registered',
      user: currentUser?.name || 'Unknown',
      timestamp: new Date().toISOString(),
      details: `${visitor.name} registered for room ${visitor.destination}`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            Cadastrar Novo Visitante
          </h2>
          <p className="text-gray-400 mt-1">Preencha os dados do visitante</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Nome Completo"
            placeholder="Ex: Tony Stark"
            error={errors.name?.message}
            required
            {...register('name')}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            error={errors.cpf?.message}
            required
            {...register('cpf')}
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="email@empresa.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <Input
            label="Data de Nascimento"
            type="date"
            error={errors.birthDate?.message}
            required
            {...register('birthDate')}
          />

          <Select
            label="Sala de Destino"
            options={rooms}
            error={errors.destination?.message}
            required
            {...register('destination')}
          />

          <div className="pt-2">
            <Button type="submit" className="w-full">
              Cadastrar Visitante
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              reset()
              setShowAddVisitor(false)
            }}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  )
}
