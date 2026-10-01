import { CheckCircle2, Info, X } from 'lucide-react'
import { useUI } from '../../context/UIContext'

export default function Toasts() {
  const { toasts, dismissToast } = useUI()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex w-full max-w-sm animate-toastIn items-center gap-3 bg-ink px-4 py-3 text-[13px] text-white shadow-xl">
          {t.type === 'info' ? <Info size={17} strokeWidth={1.5} className="shrink-0 text-rose-soft" /> : <CheckCircle2 size={17} strokeWidth={1.5} className="shrink-0 text-rose-soft" />}
          <span className="flex-1 leading-5">{t.message}</span>
          <button onClick={() => dismissToast(t.id)} className="shrink-0 p-1 text-white/70 hover:text-white" aria-label="Dismiss notification">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
