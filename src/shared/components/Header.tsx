import { useAuthContext } from '../hooks/useAuthContext'

export function Header() {
  const { currentUser } = useAuthContext()

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-red-400 text-4xl font-bold">J.A.R.V.I.S.</div>
            <div>
              <h1 className="text-xl font-semibold">
                Sistema de Gerenciamento de Visitantes
              </h1>
              <p className="text-gray-400 text-sm">Stark Industries</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">{currentUser?.name}</p>
              <p className="text-gray-400 text-sm">{currentUser?.role}</p>
            </div>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              {currentUser?.name
                .split(' ')
                .map(n => n[0])
                .join('') || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
