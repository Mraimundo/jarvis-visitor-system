import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div
    className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
)
