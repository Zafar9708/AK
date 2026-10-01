import Breadcrumb from '../components/common/Breadcrumb'
import useDocumentTitle from '../utils/useDocumentTitle'
import { POLICIES } from '../data/policies'
import NotFound from './NotFound'

export default function Policy({ type }) {
  const p = POLICIES[type]
  useDocumentTitle(p?.title)
  if (!p) return <NotFound />
  return (
    <div className="container-site py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: p.title }]} />
      <article className="mx-auto mt-6 max-w-3xl">
        <h1 className="font-serif text-5xl">{p.title}</h1>
        <p className="mt-3 text-[13px] text-muted">Last updated: 1 September 2026 · Sample policy text for demonstration — have the final version reviewed before launch.</p>
        <div className="prose-policy mt-6">
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, i) => (Array.isArray(para) ? <ul key={i}>{para.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={i}>{para}</p>))}
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
