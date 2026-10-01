import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MapPin, UserRound, Heart, LogOut } from 'lucide-react'
import EmptyState from '../components/common/EmptyState'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { useUI } from '../context/UIContext'
import { formatPrice } from '../utils/currency'
import useDocumentTitle from '../utils/useDocumentTitle'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

function StatusPill({ s }) {
  const c = s === 'Delivered' ? 'bg-[#e7efe6] text-[#3f6a45]' : s === 'Shipped' ? 'bg-[#e8ecf3] text-[#3d4f73]' : 'bg-sand text-cocoa'
  return <span className={`inline-block px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] ${c}`}>{s}</span>
}

function OrdersTable({ orders, limit }) {
  const list = limit ? orders.slice(0, limit) : orders
  if (!orders.length) return <EmptyState icon={Package} compact title="No orders yet" text="When you place an order it will appear here." cta="Start shopping" to="/collections/new-arrivals" />
  return (
    <ul className="divide-y divide-line border-y border-line">
      {list.map((o) => (
        <li key={o.id} className="grid grid-cols-2 gap-3 py-4 text-[14px] sm:grid-cols-[1.3fr_1fr_1fr_auto] sm:items-center">
          <div><p className="font-medium">{o.id}</p><p className="text-[12px] text-muted">{(() => { const n = o.items.reduce((t, i) => t + i.qty, 0); return `${n} ${n === 1 ? 'item' : 'items'}` })()}</p></div>
          <p className="text-right text-muted sm:text-left">{fmtDate(o.date)}</p>
          <div><StatusPill s={o.status} /></div>
          <p className="text-right font-medium">{formatPrice(o.total)}</p>
        </li>
      ))}
    </ul>
  )
}

export default function Account() {
  useDocumentTitle('My account')
  const { user, logout, orders, updateProfile } = useAuth()
  const { count: wishCount } = useWishlist()
  const { toast } = useUI()
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const [profile, setProfile] = useState(() => ({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '' }))
  const [addr, setAddr] = useState(() => user?.address || { line1: '', line2: '', city: '', state: '', pin: '', country: 'India' })
  const [editingAddr, setEditingAddr] = useState(false)

  if (!user) return <Navigate to="/login" replace state={{ from: '/account' }} />

  const doLogout = () => { logout(); toast('You have been logged out', { type: 'info' }); navigate('/') }

  const saveProfile = (e) => {
    e.preventDefault()
    if (!profile.firstName.trim()) return
    updateProfile(profile)
    toast('Profile updated')
  }
  const saveAddr = (e) => {
    e.preventDefault()
    updateProfile({ address: addr })
    setEditingAddr(false)
    toast('Address saved')
  }

  const a = user.address

  return (
    <div className="container-site py-10 sm:py-14">
      <h1 className="font-serif text-4xl sm:text-5xl">My account</h1>
      <p className="mt-2 text-[14px] text-muted">Welcome back, {user.firstName}.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[230px_1fr]">
        <nav aria-label="Account" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} aria-current={tab === id} className={`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-[14px] transition ${tab === id ? 'bg-ink text-white' : 'hover:bg-cream'}`}>
              <Icon size={17} strokeWidth={1.4} />{label}
            </button>
          ))}
          <Link to="/wishlist" className="flex shrink-0 items-center gap-3 px-4 py-3 text-[14px] hover:bg-cream"><Heart size={17} strokeWidth={1.4} />Wishlist ({wishCount})</Link>
          <button onClick={doLogout} className="flex shrink-0 items-center gap-3 px-4 py-3 text-left text-[14px] hover:bg-cream"><LogOut size={17} strokeWidth={1.4} />Log out</button>
        </nav>

        <div className="min-w-0">
          {tab === 'dashboard' && (
            <div className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-cream p-5"><p className="text-[12px] uppercase tracking-[0.14em] text-muted">Orders</p><p className="mt-2 font-serif text-3xl">{orders.length}</p></div>
                <div className="bg-cream p-5"><p className="text-[12px] uppercase tracking-[0.14em] text-muted">Wishlist</p><p className="mt-2 font-serif text-3xl">{wishCount}</p></div>
                <div className="bg-cream p-5"><p className="text-[12px] uppercase tracking-[0.14em] text-muted">Member since</p><p className="mt-2 font-serif text-3xl">2026</p></div>
              </div>
              <section>
                <div className="mb-4 flex items-baseline justify-between"><h2 className="font-serif text-2xl">Recent orders</h2>{orders.length > 3 && <button onClick={() => setTab('orders')} className="text-[13px] underline underline-offset-4">View all</button>}</div>
                <OrdersTable orders={orders} limit={3} />
              </section>
              <div className="grid gap-6 sm:grid-cols-2">
                <section className="border border-line p-6">
                  <h2 className="font-serif text-2xl">Saved address</h2>
                  {a ? <address className="mt-3 text-[14px] not-italic leading-6 text-muted">{user.firstName} {user.lastName}<br />{a.line1}{a.line2 && `, ${a.line2}`}<br />{a.city}, {a.state} {a.pin}<br />{a.country}</address> : <p className="mt-3 text-[14px] text-muted">No address saved yet.</p>}
                  <button onClick={() => { setTab('addresses'); setEditingAddr(true) }} className="mt-4 text-[13px] underline underline-offset-4">{a ? 'Edit address' : 'Add address'}</button>
                </section>
                <section className="border border-line p-6">
                  <h2 className="font-serif text-2xl">Account information</h2>
                  <p className="mt-3 text-[14px] leading-6 text-muted">{user.firstName} {user.lastName}<br />{user.email}<br />{user.phone}</p>
                  <button onClick={() => setTab('profile')} className="mt-4 text-[13px] underline underline-offset-4">Edit profile</button>
                </section>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <section><h2 className="mb-5 font-serif text-2xl">Order history</h2><OrdersTable orders={orders} /></section>
          )}

          {tab === 'addresses' && (
            <section>
              <h2 className="mb-5 font-serif text-2xl">Addresses</h2>
              {!editingAddr ? (
                <div className="max-w-md border border-line p-6">
                  {a ? <address className="text-[14px] not-italic leading-6 text-muted">{user.firstName} {user.lastName}<br />{a.line1}{a.line2 && `, ${a.line2}`}<br />{a.city}, {a.state} {a.pin}<br />{a.country}</address> : <p className="text-[14px] text-muted">No address saved yet.</p>}
                  <button onClick={() => setEditingAddr(true)} className="btn-outline mt-5">{a ? 'Edit' : 'Add address'}</button>
                </div>
              ) : (
                <form onSubmit={saveAddr} className="grid max-w-xl gap-4 sm:grid-cols-2">
                  {[['line1', 'Address', 2], ['line2', 'Apartment (optional)', 2], ['city', 'City', 1], ['state', 'State', 1], ['pin', 'PIN code', 1], ['country', 'Country', 1]].map(([k, l, span]) => (
                    <div key={k} className={span === 2 ? 'sm:col-span-2' : ''}>
                      <label htmlFor={`addr-${k}`} className="label">{l}</label>
                      <input id={`addr-${k}`} required={k !== 'line2'} value={addr[k] || ''} onChange={(e) => setAddr({ ...addr, [k]: e.target.value })} className="input" />
                    </div>
                  ))}
                  <div className="flex gap-2 sm:col-span-2"><button type="submit" className="btn-dark">Save address</button><button type="button" onClick={() => setEditingAddr(false)} className="btn-outline">Cancel</button></div>
                </form>
              )}
            </section>
          )}

          {tab === 'profile' && (
            <section>
              <h2 className="mb-5 font-serif text-2xl">Profile</h2>
              <form onSubmit={saveProfile} className="grid max-w-xl gap-4 sm:grid-cols-2">
                <div><label htmlFor="pf-first" className="label">First name</label><input id="pf-first" required value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="input" /></div>
                <div><label htmlFor="pf-last" className="label">Last name</label><input id="pf-last" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="input" /></div>
                <div className="sm:col-span-2"><label htmlFor="pf-email" className="label">Email</label><input id="pf-email" value={user.email} disabled className="input cursor-not-allowed bg-cream text-muted" /></div>
                <div className="sm:col-span-2"><label htmlFor="pf-phone" className="label">Phone</label><input id="pf-phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input" /></div>
                <div className="sm:col-span-2"><button type="submit" className="btn-dark">Save changes</button></div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
