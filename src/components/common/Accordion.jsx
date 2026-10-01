import { useId, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-b border-line">
      <button
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[14px] font-medium tracking-wide"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        {open ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
      </button>
      <div id={id} className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden text-[14px] leading-7 text-[#555]">{children}</div>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  return (
    <div className="border-t border-line">
      {items.map((it, i) => (
        <AccordionItem key={it.title} title={it.title} defaultOpen={it.defaultOpen ?? i === -1}>{it.content}</AccordionItem>
      ))}
    </div>
  )
}
