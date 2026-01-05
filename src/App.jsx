import './App.css'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Hero2 from './components/Hero2'
import ShatterOverlay from './components/ShatterOverlay'

function App() {
  const [showFirst, setShowFirst] = useState(true)
  const [isShattering, setIsShattering] = useState(false)

  // 🔧 FIX 1: audioRef was missing (this caused white screen)
  const audioRef = useRef(null)

  // used only to disable entry animation on very first mount
  const firstLoad = useRef(true)

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const handleSwitch = () => {
    if (isShattering) return

    // 🔧 FIX 2: shatter FIRST, component switch AFTER
    setIsShattering(true)

    setTimeout(() => {
      setShowFirst(prev => !prev)
    }, 100) // small delay so correct DOM exists
  }

  const variants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  return (
    <>
      {/* 🎵 Background Music */}
      <audio
        ref={audioRef}
        src="/music/Stranger_Things.mp3"
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-label="background-music"
      />

      <div style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          {showFirst ? (
            <motion.div
              key="hero"
              style={{ transformStyle: 'preserve-3d' }}
              variants={variants}
              initial={firstLoad.current ? 'center' : 'enter'}
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Hero onSwitch={handleSwitch} />
            </motion.div>
          ) : (
            <motion.div
              key="hero2"
              style={{ transformStyle: 'preserve-3d' }}
              variants={variants}
              initial={firstLoad.current ? 'center' : 'enter'}
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Hero2 onSwitch={handleSwitch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 💥 Shatter Effect */}
      {isShattering && (
        <ShatterOverlay
          rows={2}
          cols={2}
          duration={1100}
          sourceSelector={showFirst ? '.hero' : '.hero-2'}
          onComplete={() => setIsShattering(false)}
        />
      )}
    </>
  )
}

export default App
