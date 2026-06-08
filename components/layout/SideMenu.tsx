"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Curve from "./Curve"
import MenuItem, { menuSlide } from "./MenuItem"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "#work",
  },
  {
    title: "Photography",
    href: "#photography",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Contact",
    href: "#contact",
  },
]

interface SideMenuProps {
  onClose?: () => void
}

const SideMenu = ({ onClose }: SideMenuProps) => {
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const socialLinks = [
    portfolioData.contact.instagramUrl
      ? { title: "Instagram", href: portfolioData.contact.instagramUrl }
      : null,
    portfolioData.contact.facebookUrl
      ? { title: "Facebook", href: portfolioData.contact.facebookUrl }
      : null,
  ].filter(Boolean) as { title: string; href: string }[]

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="top-0 right-0 z-30 fixed bg-black w-full md:w-auto h-screen text-white"
    >
      <div className="box-border flex flex-col justify-between p-[100px_40px_50px] h-full">
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname)
          }}
          className="flex flex-col gap-[12px] text-[56px]"
        >
          <div className="mb-[40px] border-gray-300 border-b text-[11px] text-gray-300 uppercase">
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            <MenuItem
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>
        <div className="flex gap-[40px] text-sm">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <Curve />
    </motion.div>
  )
}

export default SideMenu
