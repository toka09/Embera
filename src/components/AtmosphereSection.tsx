import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const reveal = useTransform(scrollYProgress, [0.1, 0.82], [0, 100])
  const clipPath = useTransform(reveal, (value) => `inset(0 ${100 - value}% 0 0)`)
  const dividerPosition = useTransform(reveal, (value) => `${value}%`)
  const eveningOpacity = useTransform(scrollYProgress, [0.58, 0.78], [0, 1])
  const eveningY = useTransform(scrollYProgress, [0.58, 0.78], [16, 0])

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      aria-labelledby="atmosphere-title"
      className="relative h-[140vh] bg-[#eadfd3]"
    >
      <div className="atmosphere-layout sticky top-0 overflow-hidden">
        <div className="atmosphere-copy relative z-20 flex flex-col justify-between px-7 py-9 sm:px-12 sm:py-12 lg:px-14 lg:py-14 xl:px-20">
          <div className="flex items-center justify-between border-b border-[#6d4935]/20 pb-5 text-[9px] font-medium uppercase tracking-[0.32em] text-[#9b6544]">
            <span>The atmosphere</span>
            <span>Day into evening</span>
          </div>

          <div className="my-auto py-8 lg:py-12">
            <p className="mb-5 font-serif text-xl italic text-[#b36d3f]">Not a different room.</p>
            <h2
              id="atmosphere-title"
              className="max-w-md font-serif text-[clamp(3rem,5.1vw,6.1rem)] leading-[0.82] tracking-[-0.055em]"
            >
              A different
              <span className="block italic text-[#b56f41]">way to feel it.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-6 text-[#5f4c41] sm:text-base sm:leading-7">
              One flame softens the edges, warms the silence, and gives the familiar somewhere new to go.
            </p>
          </div>

          <div className="flex items-end justify-between border-t border-[#6d4935]/20 pt-5">
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#765747]">
              Scroll to change the light
            </div>
            <motion.div
              className="hidden text-right sm:block"
              style={{ opacity: reduceMotion ? 1 : eveningOpacity, y: reduceMotion ? 0 : eveningY }}
            >
              <p className="font-serif text-lg italic text-[#8c5033]">The afterglow</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#765747]">Warm · Quiet · Held</p>
            </motion.div>
          </div>
        </div>

        <div className="atmosphere-image relative min-h-0 overflow-hidden bg-[#17100c]">
          <img
            src="/assets/room-daylight.png"
            alt="A quiet living room in soft daylight with an unlit Embera candle"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: reduceMotion ? 'inset(0)' : clipPath }}
          >
            <img
              src="/assets/room-candlelit.png"
              alt="The same room transformed by the warm glow of the lit candle"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 top-0 z-10 w-px bg-[#f0c18e]/80 shadow-[0_0_24px_6px_rgba(225,144,66,0.16)]"
              style={{ left: dividerPosition }}
            />
          )}

          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 text-[8px] uppercase tracking-[0.3em] text-white/65 sm:p-7">
            <span>Daylight</span>
            <span>After glow</span>
          </div>

          <motion.div
            className="absolute bottom-6 right-6 z-20 max-w-[15rem] border-r border-[#dda46e]/70 pr-4 text-right text-white sm:bottom-8 sm:right-8"
            style={{ opacity: reduceMotion ? 1 : eveningOpacity, y: reduceMotion ? 0 : eveningY }}
          >
            <p className="font-serif text-2xl italic">Stay a little longer.</p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.26em] text-white/60">The room is ready</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
