"use client"
import Preloader from "@/components/Preloader"
import { SelectedWork } from "@/components/SelectedWork"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import { AboutSection } from "@/sections/AboutSection"
import { AnimatedSection } from "@/sections/AnimatedSection"
import { CTASection } from "@/sections/CTASection"
import { ContactSection } from "@/sections/ContactSection"
import { ExperienceSection } from "@/sections/ExperienceSection"
import { HeroSection } from "@/sections/HeroSection"
import { PhotographySection } from "@/sections/PhotographySection"
import { SkillsSection } from "@/sections/SkillsSection"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = await Promise.race([
          import("locomotive-scroll").then((m) => m.default),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Locomotive Scroll initialization timeout")), 3000)
          ),
        ])
        new LocomotiveScroll()
      } catch (error) {
        // Fallback to native scrolling - no action needed
        // CSS scroll-smooth on <html> ensures anchors and buttons still work
        console.warn("Locomotive Scroll failed to initialize, using native scrolling:", error)
      }
    }

    initLocomotiveScroll()

    setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = "default"
      window.scrollTo(0, 0)
    }, 2000)
  }, [])
  return (
    <main>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      <Navbar />
      <HeroSection />
      {/* <AnimatedSection>
        <QuickInfoBar />
      </AnimatedSection> */}
      <AnimatedSection>
        <SelectedWork />
      </AnimatedSection>
      <AnimatedSection>
        <PhotographySection />
      </AnimatedSection>
      <AnimatedSection>
        <SkillsSection />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>
      <Footer />
    </main>
  )
}
