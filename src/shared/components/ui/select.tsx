import type { ChangeEventHandler } from 'react'

type Option = {
  id: string | number
  name: string
  floor: string | number
  current: number
  capacity: number
}

type SelectProps = {
  label: string
  value: string | number
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: Option[]
  error?: string
  required?: boolean
}

export const Select = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
}: SelectProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
        error ? 'border-red-500' : 'border-gray-600'
      } text-white`}
    >
      <option value="">Selecione...</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name} (Andar {option.floor}) - {option.current}/
          {option.capacity}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
)
