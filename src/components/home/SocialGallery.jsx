import SmartImage from '../common/SmartImage'
import { InstagramIcon } from '../common/SocialIcons'
import { SOCIAL_GRID } from '../../data/images'
import { SITE } from '../../data/site'

export default function SocialGallery() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site mb-8 text-center">
        <h2 className="section-title uppercase">Follow our style</h2>
        <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="link-underline mt-3 inline-block text-[14px] text-muted">@AK Fashion.studio</a>
      </div>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {SOCIAL_GRID.map((src, i) => (
          <a key={src} href={SITE.social.instagram} target="_blank" rel="noreferrer" className="group relative block" aria-label={`Open Instagram post ${i + 1}`}>
            <SmartImage src={src} alt="" className="aspect-square w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition duration-300 group-hover:bg-black/30 group-hover:opacity-100">
              <InstagramIcon width={26} height={26} />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
