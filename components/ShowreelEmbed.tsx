"use client";

import { useEffect, useRef, useState } from "react";

interface ShowreelEmbedProps {
  videoUrl: string;
  title: string;
}

export function ShowreelEmbed({ videoUrl, title }: ShowreelEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [attemptKey, setAttemptKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || loaded || error) return;

    const timeout = setTimeout(() => {
      if (!loaded) {
        setError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [inView, loaded, error, attemptKey]);

  const handleRetry = () => {
    setError(false);
    setLoaded(false);
    setAttemptKey((prev) => prev + 1);
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center bg-black/50 rounded-lg w-full aspect-video">
        <p className="mb-4 text-white/60 text-lg">Showreel coming soon</p>
        <button
          type="button"
          onClick={handleRetry}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-white text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-black/50 rounded-lg w-full aspect-video overflow-hidden"
    >
      {inView && (
        <iframe
          key={attemptKey}
          src={videoUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      )}
      {inView && !loaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="border-2 border-white/20 border-t-white/60 rounded-full w-8 h-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
