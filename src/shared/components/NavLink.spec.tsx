import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { NavLink } from './NavLink'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('next/link', () => {
  return function MockedLink({
    children,
    href,
    className,
    suppressHydrationWarning,
    ...props
  }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
})

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

const defaultProps = {
  href: '/dashboard',
  icon: '📊',
  label: 'Dashboard',
}

describe('NavLink Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render NavLink with all props', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      expect(screen.getByRole('link')).toBeInTheDocument()
      expect(screen.getByText('📊')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should render with correct href attribute', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/dashboard')
    })

    it('should render icon and label correctly', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink href="/users" icon="👥" label="Users" />)

      expect(screen.getByText('👥')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
    })
  })

  describe('Active State', () => {
    it('should apply active styles when pathname matches href', () => {
      mockUsePathname.mockReturnValue('/dashboard')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'bg-red-900/30',
        'text-red-300',
        'border',
        'border-red-800/50'
      )
    })

    it('should not apply active styles when pathname does not match href', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).not.toHaveClass(
        'bg-red-900/30',
        'text-red-300',
        'border',
        'border-red-800/50'
      )
      expect(link).toHaveClass(
        'text-gray-400',
        'hover:text-white',
        'hover:bg-gray-800/50'
      )
    })

    it('should apply inactive styles when pathname does not match href', () => {
      mockUsePathname.mockReturnValue('/settings')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'text-gray-400',
        'hover:text-white',
        'hover:bg-gray-800/50'
      )
    })
  })

  describe('Pathname Matching', () => {
    it('should be active when pathname exactly matches href', () => {
      mockUsePathname.mockReturnValue('/dashboard')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-red-900/30')
    })

    it('should not be active when pathname is similar but not exact match', () => {
      mockUsePathname.mockReturnValue('/dashboard/analytics')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).not.toHaveClass('bg-red-900/30')
      expect(link).toHaveClass('text-gray-400')
    })

    it('should handle root path correctly', () => {
      mockUsePathname.mockReturnValue('/')

      render(<NavLink href="/" icon="🏠" label="Home" />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-red-900/30')
    })

    it('should handle nested paths correctly', () => {
      mockUsePathname.mockReturnValue('/settings/profile')

      render(
        <NavLink href="/settings/profile" icon="⚙️" label="Profile Settings" />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-red-900/30')
    })
  })

  describe('CSS Classes', () => {
    it('should always include base classes', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'flex',
        'items-center',
        'space-x-3',
        'px-4',
        'py-3',
        'rounded-lg',
        'transition-all',
        'duration-200',
        'w-full',
        'text-left'
      )
    })

    it('should have correct icon styling', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const iconElement = screen.getByText('📊')
      expect(iconElement).toHaveClass('text-xl')
    })

    it('should have correct label styling', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const labelElement = screen.getByText('Dashboard')
      expect(labelElement).toHaveClass('font-medium')
    })
  })

  describe('Different NavLink Variants', () => {
    it('should handle different icons and labels', () => {
      const testCases = [
        { href: '/profile', icon: '👤', label: 'Profile' },
        { href: '/settings', icon: '⚙️', label: 'Settings' },
        { href: '/analytics', icon: '📈', label: 'Analytics' },
        { href: '/messages', icon: '💬', label: 'Messages' },
      ]

      testCases.forEach(({ href, icon, label }) => {
        mockUsePathname.mockReturnValue('/home')

        render(<NavLink href={href} icon={icon} label={label} />)

        expect(screen.getByText(icon)).toBeInTheDocument()
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('should handle special characters in labels', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink href="/reports" icon="📋" label="Reports & Analytics" />)

      expect(screen.getByText('Reports & Analytics')).toBeInTheDocument()
    })

    it('should handle empty string pathname', () => {
      mockUsePathname.mockReturnValue('')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('text-gray-400')
      expect(link).not.toHaveClass('bg-red-900/30')
    })
  })

  describe('usePathname Hook Integration', () => {
    it('should call usePathname hook', () => {
      mockUsePathname.mockReturnValue('/dashboard')

      render(<NavLink {...defaultProps} />)

      expect(mockUsePathname).toHaveBeenCalledTimes(1)
    })

    it('should handle pathname changes', () => {
      const { rerender } = render(<NavLink {...defaultProps} />)

      mockUsePathname.mockReturnValue('/home')
      rerender(<NavLink {...defaultProps} />)

      let link = screen.getByRole('link')
      expect(link).toHaveClass('text-gray-400')

      mockUsePathname.mockReturnValue('/dashboard')
      rerender(<NavLink {...defaultProps} />)

      link = screen.getByRole('link')
      expect(link).toHaveClass('bg-red-900/30')
    })
  })

  describe('Accessibility', () => {
    it('should be accessible as a link', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link', { name: /dashboard/i })
      expect(link).toBeInTheDocument()
    })

    it('should have proper link semantics', () => {
      mockUsePathname.mockReturnValue('/home')

      render(<NavLink {...defaultProps} />)

      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href')
    })
  })
})
