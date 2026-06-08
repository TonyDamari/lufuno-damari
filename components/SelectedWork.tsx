"use client"

import { ProjectItem } from "@/components/ProjectItem"
import { VideoModal } from "@/components/VideoModal"
import { portfolioData } from "@/data/portfolio"
import { useState } from "react"

export function SelectedWork() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)

  return (
    <section id="work" className="flex items-center py-16 lg:py-[120px] lg:min-h-screen">
      <div className="mx-auto px-4 w-full max-w-7xl">
        <h2 className="mb-12 font-bold text-[8vw] lg:text-[4vw]">
          Selected <span className="font-allura font-light"> Work</span>
        </h2>
        <div>
          {portfolioData.projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onPlay={(videoUrl) => setActiveVideoUrl(videoUrl)}
            />
          ))}
        </div>
      </div>
      <VideoModal videoUrl={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />
    </section>
  )
}
