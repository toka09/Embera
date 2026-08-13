import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { CandleHero } from './components/CandleHero'
import { FragranceSection } from './components/FragranceSection'
import { AtmosphereSection } from './components/AtmosphereSection'
import { ClosingSection } from './components/ClosingSection'
import { ProductDetail } from './components/ProductDetail'
import { CartPage } from './components/CartPage'
import { CheckoutPage } from './components/CheckoutPage'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'
import { NotFoundPage } from './components/NotFoundPage'

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')
  const productPaths = ['/products/embera', '/products/solis', '/products/velour', '/products/nocturne']
  const pageTitles: Record<string, string> = { '/': 'Embera — Candle Atelier', '/about': 'Our Atelier — Embera', '/contact': 'Contact — Embera', '/cart': 'Your Bag — Embera', '/checkout': 'Checkout — Embera', '/products/embera': 'Embera No. 01 — Embera', '/products/solis': 'Solis — Embera', '/products/velour': 'Velour — Embera', '/products/nocturne': 'Nocturne — Embera' }
  document.title = pageTitles[path] ?? 'Page Not Found — Embera'

  useEffect(() => {
    const navigate = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest('a')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.hash)) return
      event.preventDefault()
      window.history.pushState({}, '', url)
      navigate()
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', navigate)
    document.addEventListener('click', click)
    return () => { window.removeEventListener('popstate', navigate); document.removeEventListener('click', click) }
  }, [])

  if (productPaths.includes(path)) return <ProductDetail />
  if (path === '/cart') return <CartPage />
  if (path === '/checkout') return <CheckoutPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />
  if (path !== '/') return <NotFoundPage />

  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 }}>
      <main className="site-shell">
        <CandleHero />
        <FragranceSection />
        <AtmosphereSection />
        <ClosingSection />
      </main>
    </ReactLenis>
  )
}
