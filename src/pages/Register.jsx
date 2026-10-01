import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { AuthShell } from './Login'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import useDocumentTitle from '../utils/useDocumentTitle'

const FIELDS = [
  { k: 'firstName', label: 'First name', auto: 'given-name', half: true },
  { k: 'lastName', label: 'Last name', auto: 'family-name', half: true },
  { k: 'email', label: 'Email', type: 'email', auto: 'email' },
  { k: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
  { k: 'password', label: 'Password', type: 'password', auto: 'new-password', hint: 'At least 8 characters, with a number and an uppercase letter.' },
  { k: 'confirm', label: 'Confirm password', type: 'password', auto: 'new-password' },
]

export default function Register() {
  useDocumentTitle('Create account')
  const { register } = useAuth()
  const { toast } = useUI()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) e.lastName = 'Enter your last name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s-]{9,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number with at least 10 digits.'
    if (form.password.length < 8 || !/\d/.test(form.password) || !/[A-Z]/.test(form.password)) e.password = 'Use at least 8 characters, including a number and an uppercase letter.'
    if (form.confirm !== form.password || !form.confirm) e.confirm = 'Passwords don\u2019t match.'
    if (!form.agree) e.agree = 'Accept the terms and conditions to continue.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) { document.getElementById(`reg-${Object.keys(e)[0]}`)?.focus(); return }
    setLoading(true)
    const res = await register(form)
    setLoading(false)
    if (!res.ok) { setErrors({ form: res.error }); return }
    toast(`Account created — welcome, ${form.firstName.trim()}`)
    navigate('/account', { replace: true })
  }

  return (
    <AuthShell title="Create account" subtitle="Save your wishlist, track orders and check out faster.">
      {errors.form && <p role="alert" className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{errors.form} <Link to="/login" className="underline">Log in</Link></p>}
      <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.k} className={f.half ? '' : 'sm:col-span-2'}>
            <label htmlFor={`reg-${f.k}`} className="label">{f.label}</label>
            <input
              id={`reg-${f.k}`}
              type={f.type || 'text'}
              autoComplete={f.auto}
              value={form[f.k]}
              onChange={(e) => { setForm({ ...form, [f.k]: e.target.value }); setErrors((er) => ({ ...er, [f.k]: undefined })) }}
              className={`input ${errors[f.k] ? 'input-error' : ''}`}
              aria-invalid={!!errors[f.k]}
              aria-describedby={errors[f.k] ? `reg-${f.k}-err` : f.hint ? `reg-${f.k}-hint` : undefined}
            />
            {errors[f.k] ? <p id={`reg-${f.k}-err`} className="field-error">{errors[f.k]}</p> : f.hint && <p id={`reg-${f.k}-hint`} className="mt-1 text-xs text-muted">{f.hint}</p>}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[13px]">
            <input id="reg-agree" type="checkbox" checked={form.agree} onChange={(e) => { setForm({ ...form, agree: e.target.checked }); setErrors((er) => ({ ...er, agree: undefined })) }} className="mt-0.5 h-4 w-4 accent-[#242424]" />
            <span>I agree to the <Link to="/terms" className="underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.</span>
          </label>
          {errors.agree && <p className="field-error">{errors.agree}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-dark w-full py-4 sm:col-span-2">{loading ? <><LoadingSpinner size={15} /> Creating account…</> : 'Create account'}</button>
      </form>
      <p className="mt-8 text-center text-[14px] text-muted">Already have an account? <Link to="/login" className="text-ink underline underline-offset-4">Log in</Link></p>
    </AuthShell>
  )
}
