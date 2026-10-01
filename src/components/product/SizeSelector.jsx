export default function SizeSelector({ sizes, value, onChange, label = 'Size' }) {
  if (!sizes.length) return null
  return (
    <fieldset>
      <legend className="mb-2.5 text-[13px]">{label}: <span className="text-muted">{value}</span></legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const active = s === value
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              aria-pressed={active}
              className={`min-w-[52px] border px-3 py-2.5 text-[13px] transition ${active ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}
            >
              {s}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
