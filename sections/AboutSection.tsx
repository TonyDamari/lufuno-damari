import { portfolioData } from "@/data/portfolio"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const description = useRef(null)
  const isInView = useInView(description)

  const slideUp = {
    initial: {
      y: "100%",
    },
    open: (i: number) => ({
      y: "0%",
      transition: { duration: 0.5, delay: 0.01 * i },
    }),
    closed: {
      y: "100%",
      transition: { duration: 0.5 },
    },
  }
  return (
    <section id="about" className="flex items-center py-16 lg:py-[120px] lg:min-h-screen">
      <div className="flex justify-center px-4 lg:px-[200px] w-full">
        <div className="relative flex lg:flex-row flex-col gap-[50px] w-full max-w-[1400px]">
          <h2 className="font-bold text-[8vw] lg:text-[4vw]">About</h2>
          <p ref={description} className="gap-2 m-0 text-[#ededed] text-[clamp(20px,3vw,36px)] leading-[1.3]">
            {portfolioData.bio.split(" ").map((word, index) => {
              return (
                <span key={index} className="inline-flex relative mr-[3px] overflow-hidden">
                  <motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>
                    {word}
                  </motion.span>
                </span>
              )
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
