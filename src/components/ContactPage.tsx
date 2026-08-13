import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CommerceNav } from './CommerceNav'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true) }
  return <main className="contact-cinema">
    <CommerceNav light />
    <motion.img className="contact-cinema-bg" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} src="/assets/contact-correspondence.png" alt="The Embera correspondence desk at blue hour" />
    <div className="contact-cinema-shade" />
    <section className="contact-cinema-intro"><span>THE ATELIER / CAIRO</span><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>Leave us<br /><i>a note.</i></motion.h1><p>For candle guidance, orders, collaborations, or simply something you would like to share.</p><div><a href="mailto:hello@embera.studio">hello@embera.studio</a><span>Replies within one studio day</span></div></section>
    <aside className="contact-letter"><AnimatePresence mode="wait">{sent ? <motion.div className="contact-letter-sent" key="sent" initial={{ opacity: 0, scale: .96, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}><span>RECEIVED / 01</span><h2>Your note is<br /><i>with us.</i></h2><p>We will write back within one studio day.</p><button onClick={() => setSent(false)}>Write another note</button></motion.div> : <motion.form key="form" onSubmit={submit} initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}><header><span>NEW CORRESPONDENCE</span><small>All fields required</small></header><label><span>Name</span><input required /></label><label><span>Email address</span><input required type="email" /></label><label><span>Subject</span><select required defaultValue=""><option value="" disabled>Choose a subject</option><option>Choosing a candle</option><option>Existing order</option><option>Trade and hospitality</option><option>Press or collaboration</option><option>Something else</option></select></label><label><span>Your note</span><textarea required rows={5} /></label><button type="submit">Send to the atelier <b>→</b></button></motion.form>}</AnimatePresence><footer><span>ZAMALEK, CAIRO</span><span>SUN—THU</span></footer></aside>
  </main>
}
