import { motion, useReducedMotion } from 'motion/react'
import { CommerceNav } from './CommerceNav'

const values = [
  { number: '01', title: 'Made slowly', copy: 'Every candle is poured in small batches and finished by hand in our Cairo atelier.' },
  { number: '02', title: 'Composed quietly', copy: 'Our fragrances are designed to live with a room—not overpower the people inside it.' },
  { number: '03', title: 'Kept longer', copy: 'Each vessel is considered as an object worth keeping after the final burn.' },
]

export function AboutPage() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion ? false : { opacity: 0, y: 24 }
  return <main className="about-classic">
    <CommerceNav />
    <section className="about-classic-hero">
      <motion.div className="about-classic-copy" initial={reveal} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><p>ABOUT EMBERA / CAIRO</p><h1>Candles made<br />for <i>lived-in rooms.</i></h1><span>Embera is an independent candle atelier creating intimate fragrance, warm light, and objects designed to remain.</span></motion.div>
      <motion.figure initial={reduceMotion ? false : { opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}><img src="/assets/about-atelier-pour.png" alt="Candles being poured by hand in the Embera atelier" /><figcaption>POURING DAY / THE EMBERA ATELIER</figcaption></motion.figure>
    </section>

    <section className="about-classic-story"><motion.div initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}><p>OUR STORY</p><h2>It started with<br /><i>the evening light.</i></h2></motion.div><motion.div className="about-story-body" initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: .12 }}><p>Embera began with a fascination for the moment a familiar room starts to feel different. The day becomes quieter. The light lowers. A scent moves gently through the space.</p><p>We wanted to make candles for that exact transition—compositions with depth but without noise, held in vessels that feel at home among the objects people already love.</p><p>Today, every Embera candle is developed and poured in Cairo, with materials selected for clarity, texture, and a clean, steady burn.</p></motion.div></section>

    <section className="about-classic-values"><header><p>WHAT MATTERS TO US</p><h2>Our way<br /><i>of making.</i></h2></header><div>{values.map((value, index) => <motion.article key={value.number} initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: index * .12 }}><span>{value.number}</span><h3>{value.title}</h3><p>{value.copy}</p></motion.article>)}</div></section>

    <section className="about-classic-note"><motion.div initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }}><span>OUR PROMISE</span><blockquote>“We make each candle as if it will become part of someone’s favorite room.”</blockquote><p>Small batches · Coconut-soy wax · Lead-free cotton wicks · Reusable vessels</p></motion.div></section>

    <section className="about-classic-cta"><div><p>THE COLLECTION</p><h2>Four candles.<br /><i>Four moments.</i></h2></div><a href="/#collection">Discover Embera <span>→</span></a></section>
    <footer className="commerce-footer"><span>POURED IN CAIRO</span><p>Objects for rooms that remember.</p><span>© 2026 EMBERA</span></footer>
  </main>
}                                    