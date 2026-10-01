import { NewsletterForm } from '../layout/Footer'

export default function Newsletter() {
  return (
    <section className="container-site">
      <div className="bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <h2 className="font-serif text-4xl sm:text-5xl">Join our community</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-6 text-white/80">Sign up for new arrivals, exclusive collections and special offers.</p>
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm dark id="home-newsletter" />
        </div>
      </div>
    </section>
  )
}
