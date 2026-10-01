import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'

const Ctx = createContext(null)
const KEY = 'AK Fashion_recent_v1'

export function RecentlyViewedProvider({ children }) {
  const [ids, setIds] = useState(() => storage.get(KEY, []))
  useEffect(() => { storage.set(KEY, ids) }, [ids])
  const track = useCallback((id) => setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12)), [])
  const value = useMemo(() => ({ ids, track }), [ids, track])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useRecentlyViewed = () => useContext(Ctx)
