import './App.css'
import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Hero2 from './components/Hero2'

function App() {
  const [showFirst, setShowFirst] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const handleUserInteraction = () => {
    if (isPlaying) return

    const audio = audioRef.current
    if (!audio) return

    audio.volume = 1.0
    audio.play()
      .then(() => {
        setIsPlaying(true)
        console.log('Audio playing successfully')
      })
      .catch((error) => {
        console.error('Playback failed:', error)
      })
  }

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Stranger_Things.mp3"
        loop
        preload="auto"
      />

      <div
        style={{ height: '100vh', overflow: 'hidden', cursor: 'pointer' }}
        onClick={handleUserInteraction}
      >
        <AnimatePresence mode="wait">
          {showFirst ? (
            <motion.div
              key="hero1"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <Hero
                onSwitch={() => setShowFirst(false)}
                onPlay={handleUserInteraction} // 👈 Pass audio play function
              />
            </motion.div>
          ) : (
            <motion.div
              key="hero2"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <Hero2
                onSwitch={() => setShowFirst(true)}
                onPlay={handleUserInteraction} // 👈 Pass audio play function
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
