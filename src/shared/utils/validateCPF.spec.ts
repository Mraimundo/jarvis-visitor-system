import { validateCPF } from './validateCPF'

describe('validateCPF', () => {
  it('returns true for a valid CPF format', () => {
    expect(validateCPF('123.456.789-00')).toBe(true)
    expect(validateCPF('000.000.000-00')).toBe(true)
  })

  it('returns false when CPF does not match the pattern', () => {
    expect(validateCPF('12345678900')).toBe(false)
    expect(validateCPF('123.456.78900')).toBe(false)
    expect(validateCPF('123-456-789.00')).toBe(false)
  })

  it('returns false for CPFs with letters or symbols', () => {
    expect(validateCPF('123.456.789-0a')).toBe(false)
    expect(validateCPF('abc.def.ghi-jk')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(validateCPF('')).toBe(false)
  })

  it('returns false for string with correct length but wrong format', () => {
    expect(validateCPF('111.111.111.11')).toBe(false)
  })
})
