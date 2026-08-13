import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

export function NotFoundPage() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(.5)
  const pointerY = useMotionValue(.5)
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 20 })
  const imageX = useTransform(smoothX, [0, 1], [-10, 10])
  const imageY = useTransform(smoothY, [0, 1], [-6, 6])
  const numberX = useTransform(smoothX, [0, 1], [12, -12])
  const numberY = useTransform(smoothY, [0, 1], [7, -7])

  return (
    <main className="not-found-page not-found-editorial" onPointerMove={(event) => { pointerX.set(event.clientX / window.innerWidth); pointerY.set(event.clientY / window.innerHeight) }}>
      <header className="not-found-nav">
        <a href="/" aria-label="Embera home">Embera <span>Candle Atelier</span></a>
        <span>PAGE / 404</span>
      </header>

      <motion.figure
        className="not-found-visual"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img style={reduceMotion ? undefined : { x: imageX, y: imageY }} src="/assets/not-found-smoke.png" alt="Smoke curling above an extinguished amber candle" />
      </motion.figure>

      <div className="not-found-shade" aria-hidden="true" />
      <div className="not-found-candle-glow" aria-hidden="true" />
      <div className="not-found-smoke-motion" aria-hidden="true"><i /><i /><i /></div>
      <div className="not-found-embers" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <motion.div className="not-found-number" style={reduceMotion ? undefined : { x: numberX, y: numberY }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} aria-hidden="true"><span>4</span><span>0</span><span>4</span></motion.div>

      <motion.section
        className="not-found-message"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .8, delay: .18 }}
      >
        <p><i /> THE FLAME WENT OUT</p>
        <h1>Nothing<br /><em>burns here.</em></h1>
        <span>This page has faded into smoke. Let’s return to a room with light.</span>
        <a href="/">Return home <b>→</b></a>
      </motion.section>

      <footer className="not-found-footer"><span>POURED IN CAIRO</span><span>OBJECTS FOR ROOMS THAT REMEMBER</span></footer>
    </main>
  )
}
