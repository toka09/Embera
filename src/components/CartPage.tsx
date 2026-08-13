import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useCart } from '../cart'
import { CommerceNav } from './CommerceNav'

export function CartPage() {
  const { items, count, subtotal, updateQuantity, removeItem } = useCart()
  const reduceMotion = useReducedMotion()

  return <main className="cart-page">
    <CommerceNav />
    <section className="cart-heading">
      <p>YOUR COMPOSITIONS / {String(count).padStart(2, '0')}</p>
      <h1>The lights<br /><i>you chose.</i></h1>
      <span>Each candle is poured to your composition.</span>
    </section>

    {items.length === 0 ? <section className="empty-cart"><p>The room is waiting.</p><h2>Your bag is still unlit.</h2><a href="/#collection">Explore the collection <span>→</span></a></section> : <section className="cart-layout">
      <div className="cart-list">
        <AnimatePresence initial={false}>{items.map((item, index) => <motion.article className="cart-item" key={item.id} initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ delay: index * .06 }}>
          <div className="cart-item-visual" style={{ '--item-color': item.color } as CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><img src={item.image} alt={`${item.vessel} vessel`} /></div>
          <div className="cart-item-copy"><p>{item.moment}</p><h2>{item.name}<i>.</i></h2><dl><div><dt>Vessel</dt><dd>{item.vessel}</dd></div><div><dt>Scent</dt><dd>{item.scent}</dd></div><div><dt>Size</dt><dd>{item.size}g</dd></div>{item.ingredients.length > 0 && <div><dt>Added</dt><dd>{item.ingredients.join(', ')}</dd></div>}</dl></div>
          <div className="cart-item-actions"><strong>${item.price * item.quantity}</strong><div className="quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button></div><button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button></div>
        </motion.article>)}</AnimatePresence>
      </div>
      <aside className="cart-summary"><p>ORDER SUMMARY</p><div><span>Subtotal</span><strong>${subtotal}</strong></div><div><span>Delivery</span><em>Complimentary</em></div><div className="cart-total"><span>Total</span><strong>${subtotal}</strong></div><small>Taxes and duties calculated at checkout.</small><a href="/checkout">Continue to checkout <span>→</span></a><a className="continue-shopping" href="/#collection">Continue composing</a></aside>
    </section>}
    <footer className="commerce-footer"><span>POURED IN CAIRO</span><p>Objects for rooms that remember.</p><span>© 2026 EMBERA</span></footer>
  </main>
}
