import { Globe2, ShieldCheck, Gem, Headphones, MousePointerClick } from 'lucide-react'

const ITEMS = [
  { icon: Globe2, title: 'Worldwide shipping', text: 'Pan-India delivery and international shipping to 30+ countries.' },
  { icon: ShieldCheck, title: 'Secure payments', text: 'UPI, cards and net banking through encrypted checkout.' },
  { icon: Gem, title: 'Premium quality', text: 'Every fabric is checked by hand before it is packed.' },
  { icon: Headphones, title: 'Customer support', text: 'Real people on WhatsApp and email, six days a week.' },
  { icon: MousePointerClick, title: 'Easy shopping', text: 'Simple sizing, saved wishlists and quick reorders.' },
]

export default function Benefits() {
  return (
    <section className="border-y border-line">
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center last:col-span-2 md:last:col-span-1">
            <Icon size={26} strokeWidth={1.1} className="text-cocoa" aria-hidden="true" />
            <h3 className="mt-4 font-sans text-[13px] font-medium uppercase tracking-[0.14em]">{title}</h3>
            <p className="mt-2 max-w-[220px] text-[13px] leading-5 text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
