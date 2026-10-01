import { Link } from 'react-router-dom'
import useDocumentTitle from '../utils/useDocumentTitle'

export default function NotFound({ message }) {
  useDocumentTitle('Page not found')
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-[120px] leading-none text-sand sm:text-[180px]" aria-hidden="true">404</p>
      <h1 className="-mt-4 font-sans text-[15px] font-medium uppercase tracking-[0.24em] sm:-mt-8">Page not found</h1>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">{message || "The page you're looking for doesn't exist or has moved. Try searching, or head back to the homepage."}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-dark">Return home</Link>
        <Link to="/collections/new-arrivals" className="btn-outline">Shop new arrivals</Link>
      </div>
    </div>
  )
}
