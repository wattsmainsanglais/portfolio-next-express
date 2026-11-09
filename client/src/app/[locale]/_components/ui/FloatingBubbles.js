// Floating icon bubbles (floating-icon-bubbles skill): icons drift up from the
// bottom of the hero with their own position, size, speed and travel.
// The skill's reference is a Vite app using Math.random(); this is server
// rendered, so a seeded generator keeps the server and client markup identical
// (Math.random would cause a hydration mismatch).
import { FaLaptop, FaWifi, FaEnvelope, FaCode, FaPrint, FaMobileAlt, FaGlobeEurope, FaTools } from 'react-icons/fa'

const ICONS = [FaLaptop, FaWifi, FaEnvelope, FaCode, FaPrint, FaMobileAlt, FaGlobeEurope, FaTools]

// mulberry32: tiny deterministic PRNG
function seeded(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = seeded(86400)
const randomInRange = (min, max) => Math.floor(rand() * (max - min + 1)) + min

const bubbles = Array.from({ length: 28 }, () => ({
  Icon:     ICONS[randomInRange(0, ICONS.length - 1)],
  x:        randomInRange(2, 98),
  size:     randomInRange(22, 56),
  speed:    randomInRange(12, 26),
  delay:    randomInRange(1, 26),
  distance: randomInRange(70, 120),
  scale:    randomInRange(100, 150) / 100,
}))

export default function FloatingBubbles() {
  return (
    <div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {bubbles.map(({ Icon, ...b }, i) => (
        <Icon
          key={i}
          className="bubble text-brand-700 dark:text-brand-300"
          style={{
            '--x': b.x,
            '--size': b.size,
            '--speed': b.speed,
            '--delay': b.delay,
            '--distance': b.distance,
            '--scale': b.scale,
          }}
        />
      ))}
    </div>
  )
}
