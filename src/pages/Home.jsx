import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import NewArrivals from '../components/home/NewArrivals'
import PromoBanner from '../components/home/PromoBanner'
import BestSellers from '../components/home/BestSellers'
import HijabStyles from '../components/home/HijabStyles'
import FeaturedCollection from '../components/home/FeaturedCollection'
import Benefits from '../components/home/Benefits'
import Testimonials from '../components/home/Testimonials'
import SocialGallery from '../components/home/SocialGallery'
import Newsletter from '../components/home/Newsletter'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <h1 className="sr-only">AK Fashion — hijabs, abayas and modest fashion</h1>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <PromoBanner />
      <BestSellers />
      <HijabStyles />
      <FeaturedCollection />
      <Testimonials />
      <Benefits />
      <SocialGallery />
      <Newsletter />
    </>
  )
}
