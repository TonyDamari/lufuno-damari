"use client"

import { CTAButton } from "@/components/CTAButton"
import { portfolioData } from "@/data/portfolio"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function HeroSection() {
  const { name, role, location, tagline } = portfolioData
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Video moves at 50% scroll speed → parallax depth effect
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Priority poster image for SEO and fast LCP */}
      <Image
        src="/images/66.jpg"
        alt="Lufuno Damari cinematic hero background"
        fill
        priority
        className="z-0 object-cover"
        sizes="100vw"
      />

      {/* Background video with parallax */}
      <motion.div className="z-0 absolute inset-0 pointer-none:" style={{ y: videoY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/66.jpg"
        >
          <source src="/videos/concrete-canvas.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80 pointer-none:" />
      </motion.div>

      {/* Hero content with parallax (moves slightly slower than scroll) */}
      <motion.div
        className="z-10 relative flex flex-col justify-center items-center px-4 h-full text-center"
        style={{ y: contentY, opacity }}
      >
        <div className="flex flex-col items-center space-y-6 max-w-4xl">
          <h1 className="font-bold text-[8vw] text-white lg:text-[4vw] tracking-tight">
            {name.split(" ")[0]} <span className="font-allura">{name.split(" ")[1]}</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl tracking-wide">{role}</p>

          <p className="text-white/50 text-sm uppercase tracking-widest">{location}</p>

          <p className="max-w-2xl text-white/70 text-lg md:text-xl leading-relaxed">{tagline}</p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-6">
            <CTAButton label="View Showreel" href="#work" variant="primary" />
            <CTAButton label="Contact" href="#contact" variant="secondary" />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="bottom-8 left-1/2 z-10 absolute -translate-x-1/2 cursor-pointer"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <polyline points="7 13 12 18 17 13" />
          <polyline points="7 6 12 11 17 6" />
        </svg>
      </motion.button>
    </section>
  )
}
