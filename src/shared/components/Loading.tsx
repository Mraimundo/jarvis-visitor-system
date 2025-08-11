import { IconLoader } from '../icon-components/icon-loader'

export function LoadingSpenner() {
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center z-20">
      <IconLoader className="w-6 h-6 animate-spin" />
    </div>
  )
}
