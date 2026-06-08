"use client"

import { portfolioData } from "@/data/portfolio"
import Magnetic from "../Magnetic"

const Footer = () => {
  const year = new Date().getFullYear()
  const { contact } = portfolioData

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Photography", href: "#photography" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { label: "Instagram", url: contact.instagramUrl },
    { label: "Facebook", url: contact.facebookUrl },
    { label: "LinkedIn", url: contact.linkedinUrl },
  ]

  return (
    <footer className="mt-[200px] p-5 md:p-10 pb-10">
      <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-10">
        {/* Copyright column */}
        <div className="flex flex-col gap-2">
          <p className="text-neutral-400 text-sm">&copy; {year} Lufuno Damari</p>
        </div>

        {/* Navigation links column */}
        {/* <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-neutral-500 text-xs uppercase tracking-wider">
            Navigation
          </h3>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-neutral-300 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div> */}

        {/* Social links column */}
        <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-neutral-500 text-xs uppercase tracking-wider">Socials</h3>
          <div className="flex gap-2">
            {socialLinks.map(
              (social) =>
                social.url && (
                  <Magnetic key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-white text-sm transition-colors duration-200"
                    >
                      {social.label}
                    </a>
                  </Magnetic>
                )
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
