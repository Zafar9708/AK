import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
import { EDITORIAL } from '../../data/images'

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <SmartImage src={EDITORIAL.promo} alt="Woman in a navy abaya over a beige dress" className="h-[70svh] max-h-[640px] min-h-[420px] w-full" imgClassName="object-[center_25%]" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
        <div className="max-w-2xl">
          <h2 className="font-serif text-5xl leading-none sm:text-7xl">The Modest Edit</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-6 text-white/90">Discover effortless elegance for every day — layered neutrals, fluid abayas and hijabs in quiet, considered tones.</p>
          <Link to="/collections/abayas" className="btn-light mt-8">Shop collection</Link>
        </div>
      </div>
    </section>
  )
}
