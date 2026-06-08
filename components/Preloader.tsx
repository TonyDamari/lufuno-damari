"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { opacity, slideUp } from "./anim"

const words = ["I", "want", "to", "challenge", "my", "cinematography", "and", "my", "editing."]

const Preloader = () => {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set dimensions on mount (client-only)
    setDimension({ width: window.innerWidth, height: window.innerHeight }) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  useEffect(() => {
    if (index == words.length - 1) return
    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index == 0 ? 1000 : 150
    )
  }, [index])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="z-50 fixed flex justify-center items-center bg-[#141516] w-screen h-screen"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="z-10 absolute flex items-center text-white text-4xl"
          >
            <span className="block bg-white mr-2.5 rounded-[50%] w-2.5 h-2.5"></span>
            {words[index]}
          </motion.p>
          <svg className="top-0 absolute w-full h-[calc(100vh+300px)]">
            <motion.path variants={curve} initial="initial" exit="exit" className="fill-[#141516]"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  )
}

export default Preloader
