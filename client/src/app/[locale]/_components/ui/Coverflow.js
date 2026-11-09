'use client'

// Coverflow gallery (coverflow-gallery skill, landscape variant): 5 site
// screenshots fanned out, centre one on top. The rotate button (or clicking a
// side photo) shifts every photo one place. The skill uses `motion`; this site
// already has framer-motion, which is the same API.
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowsRotate } from 'react-icons/fa6'

const IMAGE_WIDTH = 'min(760px, 86vw)'
const positions = ['center', 'left1', 'left', 'right', 'right1']

// x offsets are a % of the photo's own width
const imageVariants = {
  center: { x: '0%', scale: 1, zIndex: 5, opacity: 1 },
  left1: { x: '-58%', scale: 0.8, zIndex: 3, opacity: 0.85 },
  left: { x: '-104%', scale: 0.64, zIndex: 2, opacity: 0.6 },
  right: { x: '104%', scale: 0.64, zIndex: 1, opacity: 0.6 },
  right1: { x: '58%', scale: 0.8, zIndex: 3, opacity: 0.85 },
}

export default function Coverflow({ items, rotateLabel }) {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4])

  const handleNext = () => setPositionIndexes(prev => prev.map(i => (i + 1) % 5))
  const handlePrev = () => setPositionIndexes(prev => prev.map(i => (i + 4) % 5))

  const current = items[positionIndexes.indexOf(0)]

  return (
    <div className="w-full overflow-x-clip py-6">
      <div className="relative mx-auto aspect-[16/9]" style={{ width: IMAGE_WIDTH }}>
        {items.map((item, index) => {
          const pos = positions[positionIndexes[index]]
          const onClick = pos.startsWith('left') ? handlePrev : pos.startsWith('right') ? handleNext : undefined
          return (
            <motion.div
              key={index}
              initial="center"
              animate={pos}
              variants={imageVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={`absolute inset-0 ${onClick ? 'cursor-pointer' : ''}`}
              onClick={onClick}
              aria-hidden={pos !== 'center'}
            >
              <Image
                src={item.src}
                alt={item.alt}
                placeholder="blur"
                sizes="(max-width: 768px) 86vw, 760px"
                className="h-full w-full object-cover object-top rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
              />
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href={current.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl md:text-3xl font-light text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
        >
          {current.name} <span aria-hidden="true">↗</span>
        </a>
        <p className="text-lg text-slate-600 dark:text-slate-300 text-center max-w-xl px-4 min-h-[3.5rem]">{current.tag}</p>
        <motion.button
          type="button"
          aria-label={rotateLabel}
          title={rotateLabel}
          onClick={handleNext}
          whileTap={{ rotateZ: 90 }}
          className="rounded-full p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-md hover:border-brand-400 transition-colors"
        >
          <FaArrowsRotate fontSize={22} />
        </motion.button>
      </div>
    </div>
  )
}
