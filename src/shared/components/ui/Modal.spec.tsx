import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

const mockOnClose = jest.fn()
const mockPrimaryButtonClick = jest.fn()

const defaultProps = {
  isOpen: true,
  title: 'Test Modal',
  primaryButton: {
    label: 'Confirm',
    onClick: mockPrimaryButtonClick,
  },
  onClose: mockOnClose,
}

describe('Modal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />)

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    })

    it('should render modal when isOpen is true', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should render modal with title', () => {
      render(<Modal {...defaultProps} title="Custom Title" />)

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Custom Title'
      )
    })

    it('should render modal with description when provided', () => {
      const description = 'This is a test description'
      render(<Modal {...defaultProps} description={description} />)

      expect(screen.getByText(description)).toBeInTheDocument()
    })

    it('should not render description when not provided', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
    })

    it('should render icon when provided', () => {
      const TestIcon = () => <span data-testid="test-icon">🔥</span>
      render(<Modal {...defaultProps} icon={<TestIcon />} />)

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('should not render icon when not provided', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
    })

    it('should render primary button with correct label', () => {
      render(<Modal {...defaultProps} />)

      const primaryButton = screen.getByRole('button', { name: 'Confirm' })
      expect(primaryButton).toBeInTheDocument()
    })

    it('should render close button by default', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.getByText('Fechar')).toBeInTheDocument()
    })

    it('should not render close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />)

      expect(screen.queryByText('Fechar')).not.toBeInTheDocument()
    })

    it('should not render close button when onClose is not provided', () => {
      render(<Modal {...defaultProps} onClose={undefined} />)

      expect(screen.queryByText('Fechar')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA structure', () => {
      render(<Modal {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Test Modal')
    })

    it('should have proper button types', () => {
      render(<Modal {...defaultProps} />)

      const primaryButton = screen.getByRole('button', { name: 'Confirm' })
      const closeButton = screen.getByRole('button', { name: 'Fechar' })

      expect(primaryButton).toHaveAttribute('type', 'button')
      expect(closeButton).toHaveAttribute('type', 'button')
    })

    it('should have focus ring classes on primary button', () => {
      render(<Modal {...defaultProps} />)

      const primaryButton = screen.getByRole('button', { name: 'Confirm' })
      expect(primaryButton).toHaveClass('focus:outline-none', 'focus:ring-2')
    })
  })

  describe('Complex scenarios', () => {
    it('should render complete modal with all props', () => {
      const TestIcon = () => <span data-testid="warning-icon">⚠️</span>
      const props = {
        isOpen: true,
        title: 'Delete Item',
        description:
          'This action cannot be undone. Are you sure you want to delete this item?',
        icon: <TestIcon />,
        primaryButton: {
          label: 'Delete',
          onClick: mockPrimaryButtonClick,
          className: 'bg-red-500 hover:bg-red-600',
        },
        onClose: mockOnClose,
        showCloseButton: true,
      }

      render(<Modal {...props} />)

      expect(screen.getByText('Delete Item')).toBeInTheDocument()
      expect(
        screen.getByText(
          'This action cannot be undone. Are you sure you want to delete this item?'
        )
      ).toBeInTheDocument()
      expect(screen.getByTestId('warning-icon')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
      expect(screen.getByText('Fechar')).toBeInTheDocument()
    })

    it('should handle multiple button clicks correctly', () => {
      render(<Modal {...defaultProps} />)

      const primaryButton = screen.getByRole('button', { name: 'Confirm' })
      const closeButton = screen.getByRole('button', { name: 'Fechar' })

      fireEvent.click(primaryButton)
      fireEvent.click(closeButton)
      fireEvent.click(primaryButton)

      expect(mockPrimaryButtonClick).toHaveBeenCalledTimes(2)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should handle modal state changes', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />)

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()

      rerender(<Modal {...defaultProps} isOpen={true} />)

      expect(screen.getByText('Test Modal')).toBeInTheDocument()
    })
  })
})
