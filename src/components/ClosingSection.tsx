import { motion, useReducedMotion } from 'motion/react'

export function ClosingSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="journal" className="home-ending" aria-labelledby="closing-title">
      <div className="home-journal">
        <motion.div
          className="home-journal-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="home-journal-mark" aria-hidden="true"><i /></div>
          <div>
            <p className="home-journal-kicker">The Embera journal</p>
            <h2 id="closing-title">Notes for slower evenings.</h2>
          </div>
        </motion.div>

        <motion.div
          className="home-journal-signup"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Occasional stories about scent, rooms, and the rituals that make them feel like home.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="closing-a11y" htmlFor="journal-email">Email address</label>
            <input id="journal-email" type="email" placeholder="Email address" />
            <button type="submit">Subscribe <span>→</span></button>
          </form>
        </motion.div>
      </div>

      <footer className="home-footer">
        <p className="home-footer-brand">Embera</p>
        <nav aria-label="Footer navigation">
          <a href="#">Instagram</a>
          <a href="#">Journal</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <p className="home-footer-copy">© 2026 Toqa ElQersh. All rights reserved.</p>
      </footer>
    </section>
  )
}
