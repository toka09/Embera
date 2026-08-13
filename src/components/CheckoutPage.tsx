import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { useCart } from '../cart'
import { CommerceNav } from './CommerceNav'

export function CheckoutPage() {
  const { items, count, subtotal, clearCart } = useCart()
  const [complete, setComplete] = useState(false)
  const [payment, setPayment] = useState<'card' | 'cash'>('card')
  const submit = (event: FormEvent) => { event.preventDefault(); setComplete(true); clearCart(); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  if (complete) return <main className="checkout-page checkout-complete"><CommerceNav /><motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><span>ORDER RECEIVED / 01</span><h1>A new light<br /><i>is on its way.</i></h1><p>Your composition will be poured, finished by hand, and prepared for its journey.</p><a href="/">Return home <b>→</b></a></motion.section></main>

  return <main className="checkout-page">
    <CommerceNav />
    <form className="checkout-layout" onSubmit={submit}>
      <section className="checkout-form">
        <header><p>SECURE CHECKOUT / {String(count).padStart(2, '0')}</p><h1>Where should<br /><i>the light go?</i></h1></header>
        <fieldset><legend><span>01</span> Contact</legend><label className="full"><span>Email address</span><input required type="email" placeholder="you@example.com" /></label></fieldset>
        <fieldset><legend><span>02</span> Delivery</legend><div className="form-grid"><label><span>First name</span><input required /></label><label><span>Last name</span><input required /></label><label className="full"><span>Address</span><input required /></label><label><span>City</span><input required /></label><label><span>Governorate</span><input required /></label><label><span>Postal code</span><input required inputMode="numeric" /></label><label><span>Phone</span><input required type="tel" /></label></div></fieldset>
        <fieldset><legend><span>03</span> Payment</legend><div className="payment-options"><button type="button" className={payment === 'card' ? 'is-active' : ''} onClick={() => setPayment('card')}><i /> Card <small>Visa · Mastercard</small></button><button type="button" className={payment === 'cash' ? 'is-active' : ''} onClick={() => setPayment('cash')}><i /> Cash on delivery <small>Cairo & Giza</small></button></div>{payment === 'card' && <motion.div className="card-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><label className="full"><span>Card number</span><input required inputMode="numeric" placeholder="0000 0000 0000 0000" /></label><label><span>Expiry</span><input required placeholder="MM / YY" /></label><label><span>Security code</span><input required inputMode="numeric" placeholder="CVC" /></label></motion.div>}</fieldset>
      </section>
      <aside className="checkout-order"><p>YOUR ORDER</p><div className="checkout-items">{items.map((item) => <article key={item.id}><img src={item.image} alt="" /><div><h2>{item.name}</h2><span>{item.vessel} · {item.scent} · {item.size}g</span><small>Quantity {item.quantity}</small></div><strong>${item.price * item.quantity}</strong></article>)}</div><dl><div><dt>Subtotal</dt><dd>${subtotal}</dd></div><div><dt>Delivery</dt><dd>Complimentary</dd></div><div><dt>Total</dt><dd>${subtotal}</dd></div></dl><button disabled={!items.length} type="submit">Place order <span>→</span></button><small>By placing your order, you agree to our terms and privacy policy.</small></aside>
    </form>
  </main>
}
