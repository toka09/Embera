import { useCart } from '../cart'

export function CommerceNav({ light = false }: { light?: boolean }) {
  const { count } = useCart()
  return <header className={`commerce-nav${light ? ' is-light' : ''}`}>
    <a className="commerce-brand" href="/">Embera <span>Candle Atelier</span></a>
    <nav><a href="/#collection">Collection</a><a href="/about">About</a><a href="/contact">Contact</a><a className="commerce-bag" href="/cart">Bag / {count}</a></nav>
  </header>
}
