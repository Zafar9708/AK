import { useState } from 'react'

// Lazy image with a fixed-ratio frame, fade-in and a branded fallback if the source fails.
export default function SmartImage({ src, alt, className = '', imgClassName = '', eager = false, fallbackLabel, sizes }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(!src)

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-sand" aria-hidden="true" />}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-[#ede3db] p-4 text-center" role="img" aria-label={alt}>
          <span className="font-serif text-3xl text-cocoa/70">N</span>
          {fallbackLabel && <span className="line-clamp-2 text-[11px] uppercase tracking-[0.18em] text-cocoa/70">{fallbackLabel}</span>}
        </div>
      )}
    </div>
  )
}
