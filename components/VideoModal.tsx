"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [videoUrl, onClose]);

  useEffect(() => {
    if (!videoUrl) return;

    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!videoUrl) return;

    modalRef.current?.focus();
  }, [videoUrl]);

  if (!videoUrl) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/90"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-4xl"
        tabIndex={-1}
      >
        <button
          type="button"
          onClick={onClose}
          className="-top-10 right-0 absolute text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="rounded-lg w-full aspect-video overflow-hidden">
          <iframe
            src={videoUrl}
            title="Project video"
            className="border-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
