import { useState } from 'react'
import { Mail, Clock, MapPin, Headphones } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { WhatsAppIcon } from '../components/common/SocialIcons'
import { useUI } from '../context/UIContext'
import { SITE } from '../data/site'
import useDocumentTitle from '../utils/useDocumentTitle'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  useDocumentTitle('Contact us', 'Get in touch with AK Fashion customer support by email, WhatsApp or the contact form.')
  const { toast } = useUI()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (!form.name.trim()) er.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = 'Enter a valid email address.'
    if (form.phone && !/^[+\d][\d\s-]{9,15}$/.test(form.phone.trim())) er.phone = 'Enter a valid phone number or leave it blank.'
    if (!form.subject) er.subject = 'Choose a subject.'
    if (form.message.trim().length < 10) er.message = 'Write a message of at least 10 characters.'
    setErrors(er)
    if (Object.keys(er).length) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    setSent(true)
    setForm(EMPTY)
    toast('Message sent — we\u2019ll reply within one working day')
  }

  const f = (k) => ({
    id: `ct-${k}`, value: form[k],
    onChange: (e) => { setForm({ ...form, [k]: e.target.value }); setErrors((x) => ({ ...x, [k]: undefined })) },
    className: `input ${errors[k] ? 'input-error' : ''}`,
    'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `ct-${k}-err` : undefined,
  })
  const Err = ({ k }) => (errors[k] ? <p id={`ct-${k}-err`} className="field-error">{errors[k]}</p> : null)

  return (
    <div className="container-site py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <h1 className="mt-5 font-serif text-5xl">Contact us</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted">Questions about sizing, an order or a bulk enquiry? Send us a message and our team will reply within one working day.</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
        <div>
          {sent && <p role="status" className="mb-6 border border-line bg-cream px-4 py-3 text-[14px]">Thank you — your message has been received. We'll be in touch soon.</p>}
          <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="ct-name" className="label">Name</label><input autoComplete="name" {...f('name')} /><Err k="name" /></div>
            <div><label htmlFor="ct-email" className="label">Email</label><input type="email" autoComplete="email" {...f('email')} /><Err k="email" /></div>
            <div><label htmlFor="ct-phone" className="label">Phone (optional)</label><input type="tel" autoComplete="tel" {...f('phone')} /><Err k="phone" /></div>
            <div>
              <label htmlFor="ct-subject" className="label">Subject</label>
              <select {...f('subject')}>
                <option value="">Choose a subject</option>
                <option>Order status</option>
                <option>Returns & exchanges</option>
                <option>Product & sizing question</option>
                <option>Bulk / wholesale enquiry</option>
                <option>Something else</option>
              </select>
              <Err k="subject" />
            </div>
            <div className="sm:col-span-2"><label htmlFor="ct-message" className="label">Message</label><textarea rows={6} {...f('message')} className={`${f('message').className} resize-none`} /><Err k="message" /></div>
            <div className="sm:col-span-2"><button type="submit" disabled={sending} className="btn-dark">{sending ? <><LoadingSpinner size={15} /> Sending…</> : 'Send message'}</button></div>
          </form>
        </div>

        <aside className="space-y-7 bg-cream p-7 sm:p-9" aria-label="Contact details">
          <div className="flex gap-4"><Headphones size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-cocoa" /><div><h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.14em]">Customer support</h2><p className="mt-1 text-[14px] text-muted">Orders, sizing, returns and product advice.</p></div></div>
          <div className="flex gap-4"><Mail size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-cocoa" /><div><h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.14em]">Email</h2><a href={`mailto:${SITE.email}`} className="mt-1 block text-[14px] text-muted hover:text-ink">{SITE.email}</a></div></div>
          <div className="flex gap-4"><WhatsAppIcon className="mt-0.5 shrink-0 text-cocoa" width={20} height={20} /><div><h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.14em]">WhatsApp</h2><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="mt-1 block text-[14px] text-muted hover:text-ink">{SITE.whatsappDisplay}</a></div></div>
          <div className="flex gap-4"><Clock size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-cocoa" /><div><h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.14em]">Business hours</h2><p className="mt-1 text-[14px] text-muted">{SITE.hours}</p></div></div>
          <div className="flex gap-4"><MapPin size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-cocoa" /><div><h2 className="font-sans text-[13px] font-medium uppercase tracking-[0.14em]">Studio</h2><p className="mt-1 text-[14px] text-muted">{SITE.address}</p></div></div>
        </aside>
      </div>
    </div>
  )
}
