"use client";

import Image from "next/image";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  onPlay: (videoUrl: string) => void;
}

export function ProjectCard({ project, onPlay }: ProjectCardProps) {
  const isVideoUnavailable =
    !project.videoUrl || project.videoUrl.includes("unavailable");

  const handleClick = () => {
    if (!isVideoUnavailable) {
      onPlay(project.videoUrl);
    }
  };

  return (
    <div
      className={`group rounded-lg overflow-hidden bg-white/5 transition-transform ${
        isVideoUnavailable
          ? "cursor-default"
          : "cursor-pointer hover:scale-[1.02]"
      }`}
      onClick={handleClick}
      role={isVideoUnavailable ? undefined : "button"}
      tabIndex={isVideoUnavailable ? undefined : 0}
      onKeyDown={(e) => {
        if (!isVideoUnavailable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onPlay(project.videoUrl);
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnailSrc}
          alt={project.thumbnailAlt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
        {isVideoUnavailable && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/60">
            <span className="bg-white/20 px-3 py-1 rounded font-medium text-white text-sm">
              Video unavailable
            </span>
          </div>
        )}
        {!isVideoUnavailable && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/0 group-hover:bg-black/30 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-0 group-hover:opacity-80 transition-opacity"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-semibold text-white text-base truncate">
          {project.title}
        </h3>
        <p className="text-accent text-sm">{project.role}</p>
        <p className="text-white/60 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
