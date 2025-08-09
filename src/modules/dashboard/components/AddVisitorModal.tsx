'use client'

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
import type { FormEvent } from 'react'

export const AddVisitorModal = () => {
  const {
    showAddVisitor,
    setShowAddVisitor,
    newVisitor,
    setNewVisitor,
    errors,
    setErrors,
  } = useAppContext()

  const { currentUser } = useAuthContext()

  const { visitors, addVisitor } = useVisitorContext()
  const { rooms } = useRoomContext()
  const { addLog } = useLogContext()

  if (!showAddVisitor) return null

  const handleAddVisitor = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!newVisitor.name) newErrors.name = 'Nome é obrigatório'
    if (!newVisitor.cpf || !validateCPF(newVisitor.cpf || ''))
      newErrors.cpf = 'CPF inválido'
    if (!newVisitor.email) newErrors.email = 'E-mail é obrigatório'
    if (!newVisitor.destination)
      newErrors.destination = 'Sala de destino é obrigatória'
    if (!newVisitor.birthDate)
      newErrors.birthDate = 'Data de nascimento é obrigatória'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const visitor: Visitor = {
      id: visitors.length + 1,
      ...(newVisitor as Omit<
        Visitor,
        'id' | 'status' | 'entryTime' | 'exitTime' | 'floor' | 'photo'
      >),
      status: 'waiting',
      entryTime: null,
      floor: parseInt(newVisitor.destination?.substring(0, 2) || '0'),
      photo: `https://placehold.co/100x100/1a1a1a/e63946?text=${newVisitor.name?.charAt(0).toUpperCase() || 'V'}`,
    }

    addVisitor(visitor)
    setNewVisitor({
      name: '',
      cpf: '',
      email: '',
      destination: '',
      birthDate: '',
      photo: '',
    })
    setShowAddVisitor(false)
    setErrors({})

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

        <form onSubmit={handleAddVisitor} className="p-6 space-y-4">
          <Input
            label="Nome Completo"
            value={newVisitor.name || ''}
            onChange={e =>
              setNewVisitor({ ...newVisitor, name: e.target.value })
            }
            error={errors.name}
            placeholder="Ex: Tony Stark"
            required
          />

          <Input
            label="CPF"
            value={newVisitor.cpf || ''}
            onChange={e =>
              setNewVisitor({ ...newVisitor, cpf: e.target.value })
            }
            error={errors.cpf}
            placeholder="000.000.000-00"
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={newVisitor.email || ''}
            onChange={e =>
              setNewVisitor({ ...newVisitor, email: e.target.value })
            }
            error={errors.email}
            placeholder="email@empresa.com"
            required
          />

          <Input
            label="Data de Nascimento"
            type="date"
            value={newVisitor.birthDate || ''}
            onChange={e =>
              setNewVisitor({ ...newVisitor, birthDate: e.target.value })
            }
            error={errors.birthDate}
            required
          />

          <Select
            label="Sala de Destino"
            value={newVisitor.destination || ''}
            onChange={e =>
              setNewVisitor({ ...newVisitor, destination: e.target.value })
            }
            options={rooms}
            error={errors.destination}
            required
          />

          <div className="pt-2">
            <Button type="submit" className="w-full">
              Cadastrar Visitante
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAddVisitor(false)}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  )
}
