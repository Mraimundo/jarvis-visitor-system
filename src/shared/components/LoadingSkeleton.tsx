export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-4xl font-bold mb-4 animate-pulse">
          J.A.R.V.I.S.
        </div>
        <div className="text-gray-400 text-sm">Inicializando sistema...</div>
      </div>
    </div>
  )
}
