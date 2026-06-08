"use client";

import { PhotoItem } from "@/data/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface LightboxProps {
  images: PhotoItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const activeImage = images[activeIndex];

  const navigatePrev = useCallback(() => {
    const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    onNavigate(prevIndex);
  }, [activeIndex, images.length, onNavigate]);

  const navigateNext = useCallback(() => {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    onNavigate(nextIndex);
  }, [activeIndex, images.length, onNavigate]);

  // Prevent body scrolling while open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Focus the container on mount for keyboard access
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          navigatePrev();
          break;
        case "ArrowRight":
          navigateNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, navigatePrev, navigateNext]);

  // Focus trapping within lightbox controls
  const handleKeyDownTrap = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const focusableElements = [
      closeButtonRef.current,
      prevButtonRef.current,
      nextButtonRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onKeyDown={handleKeyDownTrap}
        className="z-50 fixed inset-0 flex justify-center items-center bg-black/90"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="top-4 right-4 z-10 absolute flex justify-center items-center hover:bg-white/10 rounded-full w-10 h-10 text-white transition-colors"
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

        {/* Previous button */}
        <button
          ref={prevButtonRef}
          onClick={navigatePrev}
          aria-label="Previous image"
          className="left-4 z-10 absolute flex justify-center items-center hover:bg-white/10 rounded-full w-10 h-10 text-white transition-colors"
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image container with animated transitions */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-[85vw] max-h-[85vh]"
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            className="w-auto max-h-[85vh] object-contain"
            sizes="85vw"
            priority
          />
        </motion.div>

        {/* Next button */}
        <button
          ref={nextButtonRef}
          onClick={navigateNext}
          aria-label="Next image"
          className="right-4 z-10 absolute flex justify-center items-center hover:bg-white/10 rounded-full w-10 h-10 text-white transition-colors"
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
