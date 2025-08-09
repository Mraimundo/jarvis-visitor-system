import React, { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }

  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500',
    outline:
      'border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white bg-transparent',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  }

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
