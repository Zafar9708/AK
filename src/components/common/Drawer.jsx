import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Drawer({ open, onClose, side = 'right', title, children, footer, widthClass = 'w-full max-w-[420px]', labelledBy }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panelRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [open, onClose])

  const sidePos = side === 'right' ? 'right-0' : 'left-0'
  const hidden = side === 'right' ? 'translate-x-full' : '-translate-x-full'

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
      style={{ visibility: open ? 'visible' : 'hidden', transition: open ? 'visibility 0s' : 'visibility 0s linear 0.3s' }}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : title}
        aria-labelledby={labelledBy}
        className={`absolute top-0 ${sidePos} flex h-full ${widthClass} flex-col bg-white shadow-2xl outline-none transition-transform duration-300 ease-out ${open ? 'translate-x-0' : hidden}`}
      >
        {title !== undefined && (
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.16em]">{title}</h2>
            <button onClick={onClose} className="-mr-2 p-2 text-ink hover:text-cocoa" aria-label="Close">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-line">{footer}</div>}
      </aside>
    </div>
  )
}
