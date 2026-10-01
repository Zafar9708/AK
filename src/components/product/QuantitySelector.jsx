import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, max = 99, small = false, label = 'Quantity' }) {
  const h = small ? 'h-9' : 'h-12'
  const w = small ? 'w-8' : 'w-11'
  return (
    <div className={`inline-flex ${h} items-center border border-line`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} className={`flex ${h} ${w} items-center justify-center text-ink disabled:text-[#ccc]`} aria-label="Decrease quantity">
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className={`min-w-[28px] text-center ${small ? 'text-[13px]' : 'text-[14px]'}`} aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className={`flex ${h} ${w} items-center justify-center text-ink disabled:text-[#ccc]`} aria-label="Increase quantity">
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}
