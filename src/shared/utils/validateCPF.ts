function calculateWeightedSum(digits: string[], startWeight: number): number {
  return digits.reduce(
    (acc, curValue, i) => acc + Number(curValue) * (startWeight - i),
    0
  )
}

function getDigits(cpf: string, count: number): string[] {
  return Array.from(cpf).slice(0, count)
}

function calculateVerificationDigit(sum: number): number {
  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

function hasRepeatedDigits(cpf: string): boolean {
  return /^(\d)\1{10}$/.test(cpf)
}

export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '')

  if (cleanCPF.length !== 11) return false

  if (hasRepeatedDigits(cleanCPF)) return false

  const firstSum = calculateWeightedSum(getDigits(cleanCPF, 9), 10)
  const firstVerificationDigit = calculateVerificationDigit(firstSum)

  const secondSum = calculateWeightedSum(getDigits(cleanCPF, 10), 11)
  const secondVerificationDigit = calculateVerificationDigit(secondSum)

  const providedDigits = cleanCPF.slice(-2)
  const calculatedDigits = `${firstVerificationDigit}${secondVerificationDigit}`

  return calculatedDigits === providedDigits
}
