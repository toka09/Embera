import { RefObject, useEffect, useState } from 'react'

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let target = 0
    let rendered = 0
    let frame = 0

    const measure = () => {
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const range = Math.max(element.offsetHeight - window.innerHeight, 1)
      target = Math.min(Math.max(-rect.top / range, 0), 1)
    }

    const render = () => {
      const distance = target - rendered
      rendered = Math.abs(distance) < 0.0005 ? target : rendered + distance * 0.32
      setProgress(rendered)
      frame = requestAnimationFrame(render)
    }

    measure()
    frame = requestAnimationFrame(render)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [ref])

  return progress
}
