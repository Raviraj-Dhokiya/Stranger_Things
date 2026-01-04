
import './App.css'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Hero2 from './components/Hero2'

function App() {
  const [showFirst, setShowFirst] = useState(true)

  const variants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }

  return (
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
  )
}

export default App
