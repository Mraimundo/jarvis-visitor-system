import { z } from 'zod'

import { isValidCPF } from '@/shared/utils/validateCPF'

export const addVisitorSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().superRefine((cpf, ctx) => {
    const cleanCPF = cpf.replace(/\D/g, '')

    if (!cpf || cpf.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'CPF é obrigatório',
      })
      return
    }

    if (cleanCPF.length !== 11) {
      ctx.addIssue({
        code: 'custom',
        message: 'CPF deve conter 11 dígitos',
      })
      return
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      ctx.addIssue({
        code: 'custom',
        message: 'CPF não pode ter todos os dígitos iguais',
      })
      return
    }

    if (!isValidCPF(cleanCPF)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Dígitos verificadores inválidos',
      })
    }
  }),
  email: z.string().email({ message: 'E-mail inválido' }),
  birthDate: z.string(),
  destination: z.string().min(0, 'Sala de destino é obrigatória'),
})
