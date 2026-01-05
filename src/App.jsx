
import './App.css'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Hero2 from './components/Hero2'

function App() {
  const [showFirst, setShowFirst] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return

    const tryPlay = () => {
      a.play().catch(() => {
      })
    }

    tryPlay()

    const startOnGesture = () => {
      a.play().catch(() => {})
      document.removeEventListener('click', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
    }

    document.addEventListener('click', startOnGesture, { once: true })
    document.addEventListener('touchstart', startOnGesture, { once: true })

    return () => {
      document.removeEventListener('click', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
    }
  }, [])

  const variants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Stranger_Things.mp3"
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-label="background-music"
      />

      <AnimatePresence mode="wait">
      {showFirst ? (
        <motion.div
          key="hero"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45 }}
        >
          <Hero onSwitch={() => setShowFirst(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="hero2"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45 }}
        >
          <Hero2 onSwitch={() => setShowFirst(true)} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export default App
