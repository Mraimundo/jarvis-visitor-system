import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/shared/components/ui/button'

describe('Button component', () => {
  it('renderiza o texto passado via children', () => {
    render(<Button>Meu Botão</Button>)
    expect(screen.getByText('Meu Botão')).toBeInTheDocument()
  })

  it('chama a função onClick quando clicado', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByText('Clique'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('aplica classes corretas para variant e size', () => {
    render(
      <Button variant="success" size="lg">
        OK
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'OK' })
    expect(btn.className).toContain('bg-green-600') // variant success
    expect(btn.className).toContain('px-6 py-3') // size lg
  })

  it('desabilita o botão e não chama onClick', () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Desabilitado
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'Desabilitado' })
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('permite adicionar classes extras via className', () => {
    render(<Button className="custom-class">Classe extra</Button>)
    const btn = screen.getByRole('button', { name: 'Classe extra' })
    expect(btn.className).toContain('custom-class')
  })
})
