type NavButtonProps = {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

export const NavButton = ({ icon, label, active, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
      active
        ? 'bg-red-900/30 text-red-300 border border-red-800/50'
        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
    }`}
  >
    <div className="text-xl">{icon}</div>
    <span className="font-medium">{label}</span>
  </button>
)
