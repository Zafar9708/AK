import { Link } from 'react-router-dom'
import Accordion from '../components/common/Accordion'
import Breadcrumb from '../components/common/Breadcrumb'
import useDocumentTitle from '../utils/useDocumentTitle'

const FAQS = [
  { q: 'How long does delivery take?', a: 'Orders are packed within 1–2 working days. Standard delivery within India takes 4–7 working days and express takes 2–3 working days. Remote PIN codes may take a little longer.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship to the UAE, Saudi Arabia, Qatar, the UK, the US, Canada, Malaysia and more. International delivery takes 7–14 working days. Customs duties, where applicable, are paid by the recipient.' },
  { q: 'How can I track my order?', a: 'Once your order ships you will receive a tracking link by email and WhatsApp. You can also see the status of every order in My Account → Orders.' },
  { q: 'Can I change my order?', a: 'Message us on WhatsApp or email within 6 hours of placing your order and we will do our best to change colours, sizes or the delivery address before it is packed.' },
  { q: 'What is your return policy?', a: <>We offer exchanges within 7 days of delivery for unused items with tags attached. Please record an unboxing video — it is required for any damage claim. Jewellery and skincare are final sale. Read the full <Link to="/return-policy" className="underline">return policy</Link>.</> },
  { q: 'How should I care for my hijab?', a: 'Most of our hijabs are best hand washed in cold water with a mild detergent and dried flat in the shade. Specific care instructions are listed on every product page. Stone-work and embellished pieces should be dry cleaned.' },
  { q: 'What payment methods are available?', a: 'We accept UPI (GPay, PhonePe, Paytm), all major credit and debit cards, and net banking. We currently accept prepaid orders only — cash on delivery is not available.' },
]

export default function FAQ() {
  useDocumentTitle('FAQ', 'Answers to common questions about delivery, returns, payment and hijab care at AK Fashion.')
  return (
    <div className="container-site py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-center font-serif text-5xl">Frequently asked questions</h1>
        <p className="mt-4 text-center text-[15px] text-muted">Can't find what you're looking for? <Link to="/contact" className="text-ink underline underline-offset-4">Contact us</Link>.</p>
        <div className="mt-12">
          <Accordion items={FAQS.map((f, i) => ({ title: f.q, content: <p>{f.a}</p>, defaultOpen: i === 0 }))} />
        </div>
      </div>
    </div>
  )
}
