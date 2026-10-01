import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'
import { DEMO_USER } from '../data/site'
import { DEMO_ORDERS } from '../data/reviews'

const AuthContext = createContext(null)
const USER_KEY = 'AK Fashion_user_v1'
const ACCOUNTS_KEY = 'AK Fashion_accounts_v1'
const ORDERS_KEY = 'AK Fashion_orders_v1'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(USER_KEY, null) || null)
  const [orders, setOrders] = useState(() => storage.get(ORDERS_KEY, []))

  useEffect(() => {
    if (user) storage.set(USER_KEY, user)
    else storage.remove(USER_KEY)
  }, [user])
  useEffect(() => { storage.set(ORDERS_KEY, orders) }, [orders])

  const login = useCallback(async (email, password) => {
    await wait(700)
    const e = email.trim().toLowerCase()
    if (e === DEMO_USER.email && password === DEMO_USER.password) {
      const { password: _p, ...rest } = DEMO_USER
      setUser({ ...rest, isDemo: true })
      return { ok: true }
    }
    const accounts = storage.get(ACCOUNTS_KEY, [])
    const acc = accounts.find((a) => a.email === e && a.password === password)
    if (acc) {
      const { password: _p, ...rest } = acc
      setUser(rest)
      return { ok: true }
    }
    return { ok: false, error: 'Email or password is incorrect. Use demo@example.com / Demo@123 for the demo account.' }
  }, [])

  const register = useCallback(async (data) => {
    await wait(800)
    const e = data.email.trim().toLowerCase()
    const accounts = storage.get(ACCOUNTS_KEY, [])
    if (e === DEMO_USER.email || accounts.some((a) => a.email === e)) {
      return { ok: false, error: 'An account with this email already exists. Log in instead.' }
    }
    // Demo only: accounts are kept in this browser's localStorage, never sent anywhere.
    const account = { firstName: data.firstName.trim(), lastName: data.lastName.trim(), email: e, phone: data.phone.trim(), password: data.password, address: null }
    storage.set(ACCOUNTS_KEY, [...accounts, account])
    const { password: _p, ...rest } = account
    setUser(rest)
    return { ok: true }
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback((patch) => setUser((u) => (u ? { ...u, ...patch } : u)), [])

  const addOrder = useCallback((order) => setOrders((o) => [order, ...o]), [])

  const myOrders = useMemo(() => {
    const placed = orders.filter((o) => !user || o.email === user.email || !o.email)
    return user?.isDemo ? [...placed, ...DEMO_ORDERS] : placed
  }, [orders, user])

  const value = useMemo(() => ({ user, login, register, logout, updateProfile, orders: myOrders, addOrder }), [user, login, register, logout, updateProfile, myOrders, addOrder])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
