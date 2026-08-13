import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const collection = [
  { number: '01', name: 'Embera', moment: 'Golden hour', copy: 'Warm, intimate, and made for rooms that hold a little longer.', image: '/assets/collection-embera.png' },
  { number: '02', name: 'Solis', moment: 'Morning light', copy: 'A clear beginning with the brightness of an open window.', image: '/assets/collection-solis.png' },
  { number: '03', name: 'Velour', moment: 'Slow evening', copy: 'Soft edges, low voices, and the comfort of staying in.', image: '/assets/collection-velour.png' },
  { number: '04', name: 'Nocturne', moment: 'After dark', copy: 'Deep and magnetic—the final light left burning.', image: '/assets/collection-nocturne.png' },
]

export function FragranceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const trackX = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '-54%'])
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="collection" ref={sectionRef} className="relative h-[240vh] bg-[#eadfd3] text-[#211410] max-[760px]:h-auto">
      <svg className="collection-curve pointer-events-none absolute inset-x-0 top-[-20px] z-20 h-5 w-full" viewBox="0 0 1440 20" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#eadfd3" d="M0 0C360 16 1080 16 1440 0V20H0Z" />
      </svg>

      <div className="sticky top-0 h-screen overflow-hidden max-[760px]:relative max-[760px]:h-auto max-[760px]:overflow-visible">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#eadfd3_0%,#f4eae0_48%,#dfcec0_100%)]" />
        <motion.i className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left bg-[#a96942]" style={{ scaleX: progress }} />

        <div className="collection-layout relative z-10 flex h-full items-center max-[760px]:block max-[760px]:px-6 max-[760px]:py-24">
          <header className="collection-header shrink-0 max-[760px]:mb-14 max-[760px]:w-full max-[760px]:p-0">
            <p className="mb-7 flex items-center gap-4 text-[9px] uppercase tracking-[.35em] text-[#9a6035]"><i className="h-px w-10 bg-[#9a603566]" /> The collection</p>
            <h2 className="collection-title font-serif font-normal">A light for<br /><em className="font-normal text-[#b97842]">every hour.</em></h2>
            <p className="mt-8 max-w-[310px] border-l border-[#9a603544] pl-6 text-[13px] leading-[1.9] text-[#614e43]">Four candles designed around the way a room changes from morning to midnight.</p>
            <div className="mt-10 flex items-center gap-3 text-[8px] uppercase tracking-[.24em] text-[#846a5b] max-[760px]:hidden"><span className="block h-px w-14 bg-[#846a5b66]" /> Scroll to explore</div>
          </header>

          <motion.div className="collection-track flex shrink-0 gap-5 pr-[8vw] max-[760px]:grid max-[760px]:transform-none max-[760px]:grid-cols-1 max-[760px]:pr-0" style={{ x: trackX }}>
            {collection.map((candle, index) => (
              <article key={candle.number} className="collection-card group relative shrink-0 overflow-hidden bg-[#1b110e] text-[#f4e8de] max-[760px]:h-[72vh] max-[760px]:w-full">
                <img className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.035]" src={candle.image} alt={`${candle.name} candle`} loading={index === 0 ? 'eager' : 'lazy'} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/85" />
                <span className="absolute left-6 top-6 text-[8px] tracking-[.3em] text-white/75">{candle.number}</span>
                <div className="absolute inset-x-7 bottom-7">
                  <p className="mb-2 text-[8px] uppercase tracking-[.26em] text-[#e2b58f]">{candle.moment}</p>
                  <h3 className="font-serif text-[clamp(40px,4.2vw,62px)] font-normal leading-none tracking-[-.045em]">{candle.name}</h3>
                  <p className="mt-4 max-w-[280px] text-[11px] leading-[1.75] text-white/65">{candle.copy}</p>
                  <a className="mt-6 inline-block border-b border-white/35 pb-2 text-[8px] uppercase tracking-[.24em] text-white no-underline" href={`/products/${candle.name.toLowerCase()}`}>View candle ↗</a>
                </div>
              </article>
            ))}
            <aside className="collection-end-card">
              <p>THE STORY CONTINUES</p>
              <a href="/products/embera" aria-label="Discover Embera No. 01">
                <span>Discover<br /><i>Embera.</i></span>
                <b aria-hidden="true">→</b>
              </a>
              <small>RETURN TO NO. 01</small>
            </aside>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
