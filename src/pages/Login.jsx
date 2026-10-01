import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import SmartImage from '../components/common/SmartImage'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { EDITORIAL } from '../data/images'
import { DEMO_USER } from '../data/site'
import useDocumentTitle from '../utils/useDocumentTitle'

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-[70vh] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <SmartImage src={EDITORIAL.login} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/20" />
        <p className="absolute bottom-10 left-10 max-w-sm font-serif text-4xl leading-tight text-white">Saved favourites, faster checkout and early access to new drops.</p>
      </div>
      <div className="flex items-center justify-center px-4 py-14 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 text-[14px] text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  useDocumentTitle('Log in')
  const { login } = useAuth()
  const { toast } = useUI()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forgot, setForgot] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = 'Enter a valid email address.'
    if (!form.password) er.password = 'Enter your password.'
    setErrors(er)
    if (Object.keys(er).length) return
    setLoading(true)
    const res = await login(form.email, form.password)
    setLoading(false)
    if (!res.ok) { setErrors({ form: res.error }); return }
    toast('Login successful — welcome back')
    navigate(location.state?.from || '/account', { replace: true })
  }

  const fillDemo = () => { setForm((f) => ({ ...f, email: DEMO_USER.email, password: DEMO_USER.password })); setErrors({}) }

  return (
    <AuthShell title="Log in" subtitle="Welcome back. Log in to see your orders and saved items.">
      <div className="mb-6 flex items-start justify-between gap-3 bg-cream p-4 text-[13px]">
        <p>Demo account: <span className="font-medium">{DEMO_USER.email}</span> / <span className="font-medium">{DEMO_USER.password}</span></p>
        <button type="button" onClick={fillDemo} className="shrink-0 underline underline-offset-4">Fill in</button>
      </div>
      {errors.form && <p role="alert" className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{errors.form}</p>}
      {forgot && <p role="status" className="mb-5 border border-line bg-cream px-4 py-3 text-[13px]">Password reset is not available in this demo. Use the demo account above to log in.</p>}
      <form onSubmit={submit} noValidate className="space-y-5">
        <div>
          <label htmlFor="login-email" className="label">Email</label>
          <input id="login-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`input ${errors.email ? 'input-error' : ''}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'le-err' : undefined} />
          {errors.email && <p id="le-err" className="field-error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="login-pass" className="label">Password</label>
          <div className="relative">
            <input id="login-pass" type={show ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`input pr-12 ${errors.password ? 'input-error' : ''}`} aria-invalid={!!errors.password} aria-describedby={errors.password ? 'lp-err' : undefined} />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-muted hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
              {show ? <EyeOff size={17} strokeWidth={1.4} /> : <Eye size={17} strokeWidth={1.4} />}
            </button>
          </div>
          {errors.password && <p id="lp-err" className="field-error">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="h-4 w-4 accent-[#242424]" />
            Remember me
          </label>
          <button type="button" onClick={() => setForgot(true)} className="underline underline-offset-4">Forgot password?</button>
        </div>
        <button type="submit" disabled={loading} className="btn-dark w-full py-4">{loading ? <><LoadingSpinner size={15} /> Logging in…</> : 'Log in'}</button>
      </form>
      <p className="mt-8 text-center text-[14px] text-muted">New to AK Fashion? <Link to="/register" className="text-ink underline underline-offset-4">Create account</Link></p>
    </AuthShell>
  )
}
