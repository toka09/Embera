import { useRef, useState } from 'react'
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import { AmbientSound } from './AmbientSound'

const scenes = [
  {
    eyebrow: 'The beginning',
    title: <>A quiet<br /><em>vessel.</em></>,
    subtitle: 'Amber glass and a centered cotton wick await the first pour.',
  },
  {
    eyebrow: 'The first glow',
    title: <>Wax becomes<br /><em>light.</em></>,
    subtitle: 'Warm molten wax gathers slowly around the wick.',
  },
  {
    eyebrow: 'The ritual',
    title: <>Botanicals<br /><em>descend.</em></>,
    subtitle: 'Rose, citrus, cinnamon and amber find their place.',
  },
  {
    eyebrow: 'Embera No. 01',
    title: <>Scent, held<br /><em>in light.</em></>,
    subtitle: 'A warm botanical fragrance composed to linger after the flame.',
  },
]

// Extra in-between frames keep the sequence reading as continuous motion
// instead of a set of independent slides.
const frameStages = [1, 2, 3, 8, 4, 9, 5, 10, 7]
const frameCenters = [0, 0.12, 0.24, 0.34, 0.44, 0.54, 0.64, 0.76, 0.88]

function StageFrame({
  index,
  stage,
  progress,
}: {
  index: number
  stage: number
  progress: MotionValue<number>
}) {
  const lastIndex = frameCenters.length - 1
  const input = index === 0
    ? [0, frameCenters[1]]
    : index === lastIndex
      ? [frameCenters[index - 1], frameCenters[index], 1]
      : [frameCenters[index - 1], frameCenters[index], frameCenters[index + 1]]
  const output = index === 0 ? [1, 0] : index === lastIndex ? [0, 1, 1] : [0, 1, 0]
  const opacity = useTransform(progress, input, output)

  return (
    <motion.img
      className="stage-frame"
      style={{ opacity }}
      src={`/assets/candle-stage-${String(stage).padStart(2, '0')}.png`}
      alt=""
      decoding="async"
      draggable={false}
    />
  )
}

export function CandleHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeScene, setActiveScene] = useState(0)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.72, 0.9], [1, 1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveScene(latest < 0.2 ? 0 : latest < 0.38 ? 1 : latest < 0.74 ? 2 : 3)
  })

  return (
    <section id="story" ref={heroRef} className="relative h-[315vh] bg-[#0c0806] max-[800px]:h-[290vh]" aria-label="The interactive story of Embera candle">
      <div className="hero-sticky sticky top-0 isolate h-screen overflow-hidden bg-[#090504]">
        <header className="hero-header absolute inset-x-0 top-0 z-30 flex items-start justify-between px-[clamp(24px,5vw,72px)] py-8 [direction:ltr]">
          <a className="hero-brand group flex items-center gap-4 text-[#f5eee7] no-underline" href="#" aria-label="Embera home">
            <span className="font-serif text-[26px] leading-none tracking-[.22em]">EMBERA</span>
            <span className="border-l border-[#c58c5666] pl-4 text-[8px] uppercase leading-[1.5] tracking-[.24em] text-[#c7a98e]">
              Candle<br />Atelier
            </span>
          </a>
          <div className="site-actions">
            <nav className="site-nav" aria-label="Main navigation">
              <a href="#collection">Collection</a>
              <a href="#atmosphere">Atmosphere</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
            <AmbientSound />
          </div>
        </header>


        <motion.div
          className="absolute inset-0 -z-30 overflow-hidden"
          aria-hidden="true"
        >
          {frameStages.map((stage, index) => (
            <StageFrame key={stage} index={index} stage={stage} progress={scrollYProgress} />
          ))}
        </motion.div>

        <div className="hero-overlay absolute inset-0 -z-10" />

        <div className="hero-copy absolute left-[clamp(24px,7vw,108px)] top-1/2 w-[min(440px,calc(100%_-_48px))] -translate-y-1/2 text-left [direction:ltr]">
          <div>
            {scenes.map((scene, index) => (
              <article key={scene.eyebrow} className={`story-scene ${index === activeScene ? 'is-active' : ''}`}>
                <p className="scene-kicker mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.34em] text-[#c58c56]">
                  <i className="h-px w-8 bg-[#c58c5680]" />{scene.eyebrow}
                </p>
                <h1 className="font-serif text-[clamp(52px,5.4vw,82px)] font-normal leading-[.9] tracking-[-.045em] text-[#f8f1e9] max-[800px]:text-[clamp(46px,13vw,68px)] [&_em]:font-normal [&_em]:text-[#c98a50]">{scene.title}</h1>
                <p className="mt-8 max-w-[290px] border-l border-[#c58c564d] pl-5 text-left text-[12px] leading-[1.85] tracking-[.02em] text-[#d8ccc1a8] max-[800px]:mt-5">{scene.subtitle}</p>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          className="hero-scroll-hint absolute bottom-[76px] left-[clamp(24px,5vw,72px)] flex items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#f5eee794]"
          style={{ opacity: scrollHintOpacity }}
          aria-hidden="true"
        >
          <span>Scroll to ignite</span><i className="scroll-line relative block h-11 w-px overflow-hidden bg-white/20" />
        </motion.div>
      </div>
    </section>
  )
}
