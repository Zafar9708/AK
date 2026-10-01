import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, text, cta, to, onClick, compact = false }) {
  return (
    <div className={`mx-auto flex max-w-md flex-col items-center text-center ${compact ? 'py-10' : 'py-16 sm:py-24'}`}>
      {Icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-cocoa">
          <Icon size={26} strokeWidth={1.3} />
        </div>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>
      {text && <p className="mt-3 text-[14px] leading-6 text-muted">{text}</p>}
      {cta && to && <Link to={to} onClick={onClick} className="btn-dark mt-7">{cta}</Link>}
      {cta && !to && onClick && <button onClick={onClick} className="btn-dark mt-7">{cta}</button>}
    </div>
  )
}
