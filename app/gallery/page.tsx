"use client"

import { Lightbox } from "@/components/Lightbox"
import { portfolioData } from "@/data/portfolio"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function GalleryPage() {
  const { photographyItems } = portfolioData
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#ededed]">
      {/* Header */}
      <div className="px-4 pt-12 lg:pt-20 pb-8 lg:pb-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:bg-white/5 mb-8 px-8 py-3 border-2 border-purple-900/60 rounded-[3em] text-[#ededed] transition-colors duration-300"
          >
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
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back
          </Link>
          <h1 className="font-bold text-[8vw] lg:text-[4vw]">Gallery</h1>
          <p className="mt-4 text-white/60 text-lg">
            A collection of photography work spanning portraits, events, editorial, and street photography.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="gap-3 lg:gap-4 columns-2 lg:columns-3">
            {photographyItems.map((item, index) => (
              <div
                key={item.id}
                className="group mb-3 lg:mb-4 rounded-sm overflow-hidden break-inside-avoid cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={index < 4 ? undefined : "lazy"}
                  priority={index < 4}
                  sizes="(max-width: 767px) 50vw, 33vw"
                  className="group-hover:brightness-110 w-full h-auto group-hover:scale-[1.03] transition duration-300 ease-out"
                />
                <div className="opacity-0 group-hover:opacity-100 mt-2 transition-opacity duration-300">
                  <p className="text-white/80 text-sm">{item.title}</p>
                  <p className="text-white/40 text-xs capitalize">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back button at end of gallery */}
      <div className="flex justify-center px-4 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:bg-white/5 px-8 py-3 border-2 border-purple-900/60 rounded-[3em] text-[#ededed] transition-colors duration-300"
        >
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
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={photographyItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </main>
  )
}
