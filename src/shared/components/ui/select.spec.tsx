import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Select } from '@/shared/components/ui/select'

const mockOptions = [
  { id: 1, name: 'Room 1', floor: 1, current: 5, capacity: 10 },
  { id: 2, name: 'Room 2', floor: 1, current: 2, capacity: 10 },
]

describe('Select Component', () => {
  it('renders label correctly', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('Select a Room')).toBeInTheDocument()
  })

  it('displays required asterisk when required is true', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        required
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders default "Selecione..." option', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('Selecione...')).toBeInTheDocument()
  })

  it('calls onChange when selecting a new option', () => {
    const handleChange = jest.fn()
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={handleChange}
      />
    )

    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: '1' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect((selectElement as HTMLSelectElement).value).toBe('1')
  })

  it('displays error message when error prop is passed', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={jest.fn()}
        error="This field is required"
      />
    )

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('applies error border when error is present', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={jest.fn()}
        error="Error"
      />
    )

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveClass('border-red-500')
  })

  it('applies normal border when there is no error', () => {
    render(
      <Select
        label="Select a Room"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveClass('border-gray-600')
  })
})
