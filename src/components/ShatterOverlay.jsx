import { useEffect } from 'react'
import './ShatterOverlay.css'

export default function ShatterOverlay({
  rows = 2,
  cols = 2,
  duration = 1100,
  onComplete,
  sourceSelector = '.hero, .hero-2'
}) {
  useEffect(() => {
    const overlay = document.querySelector('.shatter-overlay')
    if (!overlay) return

    const source = document.querySelector(sourceSelector)

    // fallback safety
    if (!source) {
      const t = setTimeout(() => onComplete && onComplete(), 100)
      return () => clearTimeout(t)
    }

    const rect = source.getBoundingClientRect()
    const bw = Math.ceil(rect.width / cols)
    const bh = Math.ceil(rect.height / rows)

    const shards = []

    // 🔒 lock overlay size (no reflow later)
    overlay.style.position = 'fixed'
    overlay.style.inset = '0'
    overlay.style.pointerEvents = 'none'

    // 🧩 CREATE SHARDS
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const shard = document.createElement('div')
        shard.className = 'shard'

        shard.style.position = 'absolute'
        shard.style.width = `${bw}px`
        shard.style.height = `${bh}px`
        shard.style.left = `${rect.left + c * bw}px`
        shard.style.top = `${rect.top + r * bh}px`
        shard.style.overflow = 'hidden'
        shard.style.willChange = 'transform, opacity'

        // 🔴 CRITICAL: set initial transform explicitly
        shard.style.transform = 'translate3d(0,0,0)'
        shard.style.opacity = '1'

        const clone = source.cloneNode(true)
        clone.style.position = 'absolute'
        clone.style.left = `${-c * bw}px`
        clone.style.top = `${-r * bh}px`
        clone.style.width = `${rect.width}px`
        clone.style.height = `${rect.height}px`
        clone.style.pointerEvents = 'none'

        shard.appendChild(clone)
        overlay.appendChild(shard)
        shards.push({ shard, r, c })
      }
    }

    let timeoutId

    // 🧠 FORCE BROWSER PAINT (THIS FIXES DELAY)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shards.forEach(({ shard, r, c }) => {
          const dx = (c - (cols - 1) / 2) * 420
          const dy = (r - (rows - 1) / 2) * 420
          const rot = (Math.random() - 0.5) * 40

          shard.style.transition = `
            transform ${duration}ms cubic-bezier(.2,.8,.2,1),
            opacity ${duration}ms ease-out
          `
          shard.style.transform = `
            translate3d(${dx}px, ${dy}px, 0)
            rotate(${rot}deg)
            scale(1.05)
          `
          shard.style.opacity = '0'
        })

        timeoutId = setTimeout(() => {
          shards.forEach(({ shard }) => shard.remove())
          onComplete && onComplete()
        }, duration + 60)
      })
    })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      overlay.innerHTML = ''
    }
  }, [rows, cols, duration, onComplete, sourceSelector])

  return <div className="shatter-overlay" aria-hidden="true" />
}
