"use client";

import { useCallback, useEffect, useState } from "react";

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");

    if (!hero || !contact) {
      setIsVisible(false);
      return;
    }

    const heroBottom = hero.getBoundingClientRect().bottom;
    const contactTop = contact.getBoundingClientRect().top;

    setIsVisible(heroBottom < 0 && contactTop > window.innerHeight * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll(); // eslint-disable-line react-hooks/set-state-in-effect

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      aria-label="Sticky navigation"
      className={`fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-4 py-3 max-w-6xl">
        <span className="font-medium text-white/60 text-sm">Portfolio</span>
        <a
          href="#contact"
          className="font-medium text-accent text-sm hover:underline"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
