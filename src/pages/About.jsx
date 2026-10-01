import { Link } from 'react-router-dom'
import SmartImage from '../components/common/SmartImage'
import { EDITORIAL } from '../data/images'
import useDocumentTitle from '../utils/useDocumentTitle'

const PRINCIPLES = [
  { title: 'Fabric first', text: 'We start with how a fabric feels after eight hours of wear, not how it photographs. Every jersey, modal and georgette is wear-tested before it joins the collection.' },
  { title: 'Considered colour', text: 'Our palette is built to mix and match — quiet neutrals, soft rose and deep jewel tones that work with what you already own.' },
  { title: 'Honest pricing', text: 'We buy directly from mills and small workshops, so premium quality stays within everyday reach.' },
]

export default function About() {
  useDocumentTitle('About us', 'The story behind AK Fashion — modest fashion chosen for fabric, fit and everyday ease.')
  return (
    <div>
      <section className="container-site grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] text-muted">Our story</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl">Modesty, worn with ease</h1>
          <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#555]">AK Fashion began with a simple frustration: hijabs that slipped, abayas that looked beautiful on the hanger but felt heavy by noon. We set out to build a store where every piece earns its place by how it feels to wear, day after day.</p>
          <p className="mt-4 max-w-lg text-[16px] leading-8 text-[#555]">Today we work with mills in Surat, Malaysia and Istanbul to bring you fabrics we would wear ourselves — to college, to work, to the masjid and to celebrations.</p>
        </div>
        <SmartImage src={EDITORIAL.about1} alt="Two women in hijabs sitting by the sea" className="aspect-[4/5] w-full" />
      </section>

      <section className="bg-cream">
        <div className="container-site py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl">Our mission</h2>
            <p className="mt-5 text-[16px] leading-8 text-[#555]">To make modest dressing feel effortless — with clothing that respects your values, flatters your shape and fits easily into real life.</p>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-ink pt-6">
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid items-center gap-10 py-16 sm:py-20 md:grid-cols-2 lg:gap-20">
        <div className="grid grid-cols-2 gap-3">
          <SmartImage src={EDITORIAL.about2} alt="Woman in a blue dress seated by a mirror" className="aspect-[3/4] w-full" />
          <SmartImage src={EDITORIAL.about3} alt="Woman in an ivory coat and scarf" className="mt-12 aspect-[3/4] w-full" />
        </div>
        <div>
          <h2 className="font-serif text-4xl">Our quality promise</h2>
          <p className="mt-5 text-[16px] leading-8 text-[#555]">Each order is checked by hand before it leaves our studio — seams, stitching, colour and opacity. If something isn't right, we'll make it right with an exchange or store credit.</p>
          <h2 className="mt-10 font-serif text-4xl">Our philosophy</h2>
          <p className="mt-5 text-[16px] leading-8 text-[#555]">Modest fashion isn't a trend to us. It is a way of dressing that has always been elegant. We simply want to give it the fabrics, finishing and care it deserves.</p>
          <Link to="/collections/hijabs" className="btn-dark mt-8">Explore the collection</Link>
        </div>
      </section>
    </div>
  )
}
