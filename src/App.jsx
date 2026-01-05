import './App.css'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Hero2 from './components/Hero2'

function App() {
  const [showFirst, setShowFirst] = useState(true)

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div
            key="hero1"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Hero onSwitch={() => setShowFirst(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="hero2"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Hero2 onSwitch={() => setShowFirst(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
