import { motion, useReducedMotion } from 'motion/react'
import './PhotoBand.css'

export default function PhotoBand({ src, alt }: { src: string; alt: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="photo-band">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduceMotion ? false : { scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
