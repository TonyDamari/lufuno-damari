"use client"

import { Lightbox } from "@/components/Lightbox"
import MasonGallery from "@/components/MasonGallery"
import { portfolioData } from "@/data/portfolio"
import Link from "next/link"
import { useState } from "react"

export function PhotographySection() {
  const { photographyItems } = portfolioData
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Show only featured items on the homepage (up to 7 for the grid)
  const previewItems = photographyItems.filter((item) => item.featured).slice(0, 12)

  return (
    <section id="photography" className="py-16 lg:py-[120px]">
      <div className="mx-auto px-4 w-full max-w-7xl">
        <h2 className="mb-12 lg:mb-16 font-bold text-[8vw] lg:text-[4vw]">Photography</h2>

        <MasonGallery images={previewItems} />

        <div className="flex justify-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 hover:bg-white/5 px-8 py-3 border-2 border-purple-900/60 rounded-[3em] text-[#ededed] transition-colors duration-300"
          >
            View More
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={previewItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </section>
  )
}
