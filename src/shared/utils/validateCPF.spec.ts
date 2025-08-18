import { isValidCPF } from './validateCPF' // ajuste o caminho conforme seu projeto

describe('isValidCPF', () => {
  it('should return true for a valid CPF', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true) // valid CPF
    expect(isValidCPF('11144477735')).toBe(true) // valid CPF without mask
  })

  it('should return false for an invalid CPF', () => {
    expect(isValidCPF('529.982.247-24')).toBe(false) // wrong check digits
    expect(isValidCPF('11144477736')).toBe(false)
  })

  it('should return false for CPF with repeated digits', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false)
    expect(isValidCPF('00000000000')).toBe(false)
  })

  it('should return false for CPF with less than 11 digits', () => {
    expect(isValidCPF('1234567890')).toBe(false) // only 10 digits
  })

  it('should return false for CPF with more than 11 digits', () => {
    expect(isValidCPF('123456789012')).toBe(false) // 12 digits
  })

  it('should handle formatted and unformatted CPF the same way', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true)
    expect(isValidCPF('52998224725')).toBe(true)
  })
})
