import { useEffect, useState } from 'react'

const music = new Audio('/audio/embera-piano-web.mp3')
music.loop = true
music.preload = 'auto'
music.volume = 0
music.load()

let isPlaying = false
let fadeFrame = 0
const listeners = new Set<(playing: boolean) => void>()

const publish = (playing: boolean) => {
  isPlaying = playing
  listeners.forEach((listener) => listener(playing))
}

const fadeTo = (target: number, duration: number, done?: () => void) => {
  cancelAnimationFrame(fadeFrame)
  const initialVolume = music.volume
  const startedAt = performance.now()
  const update = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    music.volume = initialVolume + (target - initialVolume) * eased
    if (progress < 1) fadeFrame = requestAnimationFrame(update)
    else done?.()
  }
  fadeFrame = requestAnimationFrame(update)
}

const play = async () => {
  await music.play()
  fadeTo(.14, 500)
  publish(true)
}

const pause = () => {
  fadeTo(0, 300, () => music.pause())
  publish(false)
}

export function AmbientSound() {
  const [playing, setPlaying] = useState(isPlaying)

  useEffect(() => {
    listeners.add(setPlaying)
    return () => { listeners.delete(setPlaying) }
  }, [])

  return (
    <button className="group flex items-center gap-2 text-[8px] uppercase tracking-[.22em] text-[#d8ccc1a8] transition-colors hover:text-[#f8f1e9]" type="button" onClick={() => void (playing ? pause() : play())} aria-pressed={playing}>
      <span className={`sound-mark flex h-3 items-end gap-px ${playing ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /></span>
      {playing ? 'Music on' : 'Music off'}
    </button>
  )
}

export function FloatingMusicControl() {
  const [playing, setPlaying] = useState(isPlaying)

  useEffect(() => {
    listeners.add(setPlaying)
    return () => { listeners.delete(setPlaying) }
  }, [])

  if (!playing) return null

  return (
    <button className="floating-music-control" type="button" onClick={pause} aria-label="Mute music">
      <span className="sound-mark is-playing" aria-hidden="true"><i /><i /><i /></span>
      <span>Mute music</span>
    </button>
  )
}
