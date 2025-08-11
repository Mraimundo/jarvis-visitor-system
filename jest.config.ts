import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@components/(.*)$': '<rootDir>/shared/components/$1',
    '^@contexts/(.*)$': '<rootDir>/shared/contexts/$1',
    '^@hooks/(.*)$': '<rootDir>/shared/hooks/$1',
    '^@interfaces/(.*)$': '<rootDir>/shared/interfaces/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  clearMocks: true,
}

export default createJestConfig(config)
