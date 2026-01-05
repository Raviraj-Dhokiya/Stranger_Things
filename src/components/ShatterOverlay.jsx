import React, { useEffect } from 'react'
import './ShatterOverlay.css'

export default function ShatterOverlay({ rows = 6, cols = 10, duration = 800, onComplete, sourceSelector = '.hero, .hero-2' }) {
  useEffect(() => {
    const overlay = document.querySelector('.shatter-overlay')
    if (!overlay) return

    const source = document.querySelector(sourceSelector)
    if (!source) {
      const tFallback = setTimeout(() => onComplete && onComplete(), 120)
      return () => clearTimeout(tFallback)
    }

    const rect = source.getBoundingClientRect()
    const bw = Math.ceil(rect.width / cols)
    const bh = Math.ceil(rect.height / rows)

    const shards = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const el = document.createElement('div')
        el.className = 'shard'
        el.style.width = `${bw}px`
        el.style.height = `${bh}px`
        el.style.left = `${rect.left + c * bw}px`
        el.style.top = `${rect.top + r * bh}px`

        const clone = source.cloneNode(true)
        clone.style.position = 'absolute'
        clone.style.left = `${-c * bw}px`
        clone.style.top = `${-r * bh}px`
        clone.style.width = `${rect.width}px`
        clone.style.height = `${rect.height}px`
        clone.style.pointerEvents = 'none'

        el.style.overflow = 'hidden'
        el.appendChild(clone)

        overlay.appendChild(el)
        shards.push(el)
      }
    }

    let timeoutId

    requestAnimationFrame(() => {
      shards.forEach((s, i) => {
        const delay = (i % cols) * 20 + Math.floor(i / cols) * 10
        s.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity ${duration}ms ${delay}ms`
        const rx = (Math.random() - 0.5) * 600
        const ry = (Math.random() - 0.5) * 600
        const rz = (Math.random() - 0.5) * 360
        s.style.transform = `translate3d(${rx}px, ${ry}px, ${rz}px) rotate(${(Math.random()-0.5)*30}deg) scale(${1 + Math.random()*0.08})`
        s.style.opacity = '0'
      })

      const total = duration + cols * 20 + rows * 10 + 80
      timeoutId = setTimeout(() => {
        shards.forEach(s => s.remove())
        onComplete && onComplete()
      }, total)
    })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      const existing = Array.from(document.querySelectorAll('.shatter-overlay .shard'))
      existing.forEach(s => s.remove())
    }
  }, [sourceSelector, rows, cols, duration, onComplete])

  return <div className="shatter-overlay" aria-hidden="true"></div>
}
