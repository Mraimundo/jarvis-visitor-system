import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '@/shared/components/ui/input'
import { createRef } from 'react'

describe('Input component', () => {
  it('renderiza o label corretamente', () => {
    render(<Input label="Nome" />)
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('mostra o asterisco quando required é true', () => {
    render(<Input label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('permite digitar no campo', () => {
    render(<Input label="Usuário" placeholder="Digite seu usuário" />)
    const input = screen.getByPlaceholderText(
      'Digite seu usuário'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'mouzinho' } })
    expect(input.value).toBe('mouzinho')
  })

  it('passa a ref corretamente para o elemento input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input label="Teste Ref" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
