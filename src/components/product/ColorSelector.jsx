export default function ColorSelector({ colors, value, onChange }) {
  if (!colors.length) return null
  return (
    <fieldset>
      <legend className="mb-2.5 text-[13px]">Colour: <span className="text-muted">{value}</span></legend>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c) => {
          const active = c.name === value
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c.name)}
              aria-label={c.name}
              aria-pressed={active}
              title={c.name}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${active ? 'border-ink' : 'border-transparent hover:border-line'}`}
            >
              <span className="h-7 w-7 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
