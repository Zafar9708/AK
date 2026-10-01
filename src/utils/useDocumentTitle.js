import { useEffect } from 'react'

const DEFAULT_DESC = 'AK Fashion — premium hijabs, abayas, modest clothing, jewellery and accessories. Shipping across India and worldwide.'

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | AK Fashion` : 'AK Fashion | Hijabs, Abayas & Modest Fashion'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description || DEFAULT_DESC)
  }, [title, description])
}
