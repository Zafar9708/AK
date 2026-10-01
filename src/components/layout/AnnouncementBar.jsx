import { useEffect, useState } from 'react'

const MESSAGES = [
  'Pan-India & worldwide shipping',
  'Free shipping in India on orders over ₹1,499',
  'Prepaid orders only',
  'New autumn collection available now',
]

export default function AnnouncementBar() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      className="bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Store announcements"
    >
      <div className="container-site relative flex h-9 items-center justify-center overflow-hidden">
        {MESSAGES.map((m, n) => (
          <p
            key={m}
            aria-hidden={n !== i}
            className={`absolute inset-x-4 text-center text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${n === i ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
          >
            {m}
          </p>
        ))}
      </div>
    </div>
  )
}
