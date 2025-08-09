import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title: string
  description?: string
  icon?: ReactNode
  primaryButton: {
    label: string
    onClick: () => void
    className?: string
  }
  showCloseButton?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  primaryButton,
  showCloseButton = true,
}: ModalProps) => {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300 shadow-2xl">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}

        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

        {description && (
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            {description}
          </p>
        )}

        <button
          type="button"
          onClick={primaryButton.onClick}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            primaryButton.className ||
            'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
          }`}
        >
          {primaryButton.label}
        </button>

        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  )
}
