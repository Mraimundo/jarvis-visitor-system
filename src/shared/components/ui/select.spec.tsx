import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Select } from '@/shared/components/ui/select'

describe('Select component', () => {
  const mockOptions = [
    { id: 1, name: 'Room A', floor: 2, current: 5, capacity: 10 },
    { id: 2, name: 'Room B', floor: 3, current: 3, capacity: 8 },
  ]

  it('renders label correctly', () => {
    render(
      <Select label="Choose a room" onChange={() => {}} options={mockOptions} />
    )
    expect(screen.getByText('Choose a room')).toBeInTheDocument()
  })

  it('shows asterisk when required is true', () => {
    render(
      <Select
        label="Choose a room"
        required
        onChange={() => {}}
        options={mockOptions}
      />
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders default "Selecione..." option', () => {
    render(
      <Select label="Choose a room" onChange={() => {}} options={mockOptions} />
    )
    expect(screen.getByText('Selecione...')).toBeInTheDocument()
  })

  it('renders all provided options', () => {
    render(
      <Select label="Choose a room" onChange={() => {}} options={mockOptions} />
    )
    expect(screen.getByText('Room A (Andar 2) - 5/10')).toBeInTheDocument()
    expect(screen.getByText('Room B (Andar 3) - 3/8')).toBeInTheDocument()
  })

  it('calls onChange when a different option is selected', () => {
    const handleChange = jest.fn()
    render(
      <Select
        label="Choose a room"
        onChange={handleChange}
        options={mockOptions}
      />
    )
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('applies error styles and shows error message when error prop is passed', () => {
    render(
      <Select
        label="Choose a room"
        onChange={() => {}}
        options={mockOptions}
        error="This field is required"
      />
    )
    const select = screen.getByRole('combobox')
    expect(select.className).toContain('border-red-500')
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })
})
