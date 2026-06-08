"use client";

import { Project } from "@/data/portfolio";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectItemProps {
  project: Project;
  index: number;
  onPlay: (videoUrl: string) => void;
}

export function ProjectItem({ project, index, onPlay }: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(0);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) return;

    function lerpLoop() {
      const dx = targetPosition.current.x - currentPosition.current.x;
      const dy = targetPosition.current.y - currentPosition.current.y;

      currentPosition.current.x += dx * 0.1;
      currentPosition.current.y += dy * 0.1;

      if (thumbnailRef.current) {
        thumbnailRef.current.style.left = `${currentPosition.current.x}px`;
        thumbnailRef.current.style.top = `${currentPosition.current.y}px`;
      }

      if (isHoveredRef.current) {
        animationFrameId.current = requestAnimationFrame(lerpLoop);
      }
    }

    animationFrameId.current = requestAnimationFrame(lerpLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovered]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    targetPosition.current = {
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top + 20,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 20;
    const y = e.clientY - rect.top + 20;

    // Set both current and target to cursor position on enter to avoid jumping
    currentPosition.current = { x, y };
    targetPosition.current = { x, y };

    // Update thumbnail position immediately
    if (thumbnailRef.current) {
      thumbnailRef.current.style.left = `${x}px`;
      thumbnailRef.current.style.top = `${y}px`;
    }

    setIsVisible(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // After scale-out animation completes (300ms), set display to hidden
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleClick = () => {
    onPlay(project.videoUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(project.videoUrl);
    }
  };

  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="group relative border-white/20 border-b border-solid cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* Mobile layout: image, title, role stacked */}
      <div className="md:hidden py-6">
        <div className="relative mb-3 rounded-md w-full aspect-video overflow-hidden">
          <Image
            src={project.thumbnailSrc}
            alt={project.thumbnailAlt}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <h3 className="font-medium text-white text-lg">{project.title}</h3>
        <span className="text-white/60 text-sm">{project.role}</span>
      </div>

      {/* Desktop layout: horizontal row with hover thumbnail */}
      <div className="hidden md:flex items-center gap-6 group-hover:opacity-60 py-8 md:py-10 transition-opacity duration-300">
        <span className="w-8 font-mono text-white/40 text-sm shrink-0">
          {displayIndex}
        </span>
        <h3 className="flex-1 font-medium text-white text-lg md:text-2xl lg:text-3xl">
          {project.title}
        </h3>
        <span className="text-white/60 text-sm md:text-base">
          {project.role}
        </span>
      </div>

      {/* Floating thumbnail - hidden on touch devices via @media (pointer: coarse) */}
      <div
        ref={thumbnailRef}
        className={`absolute z-10 pointer-events-none overflow-hidden rounded-md w-[300px] aspect-video touch-hidden transition-transform duration-300 ${
          isHovered ? "scale-100 ease-out" : "scale-0 ease-in"
        }`}
        style={{
          left: 0,
          top: 0,
          display: isVisible ? "block" : "none",
        }}
      >
        <Image
          src={project.thumbnailSrc}
          alt={project.thumbnailAlt}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
    </div>
  );
}
