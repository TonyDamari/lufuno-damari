"use client"

import { AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Magnetic from "../Magnetic"
import RoundedButton from "../RoundedButton"
import SideMenu from "./SideMenu"

const links = [
  { title: "Work", href: "#work" },
  { title: "Photography", href: "#photography" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
]

const Navbar = () => {
  const header = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname()
  const button = useRef(null)

  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      setIsActive(false)
    }
  }, [pathname])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" })
        },
        onEnterBack: () => {
          gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" })
          setIsActive(false)
        },
      },
    })
  }, [])

  return (
    <>
      <div
        ref={header}
        className="top-0 z-20 box-border absolute flex justify-end items-center p-[35px] w-full text-white"
      >
        {/* <div className="flex cursor-pointer">
          <p className="font-medium text-lg">© Lufuno Damari</p>
        </div> */}
        <div className="flex items-center">
          {links.map((link, index) => (
            <Magnetic key={index}>
              <div className="z-50 relative flex flex-col p-[15px] cursor-pointer">
                <a href={link.href} className="cursor-pointer">
                  {link.title}
                </a>
                <div className="top-[45px] left-1/2 absolute bg-white rounded-full w-[5px] h-[5px] scale-0 hover:scale-100 transition-transform -translate-x-1/2 duration-300"></div>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
      <div ref={button} className="right-0 z-40 fixed scale-0">
        <RoundedButton
          onClick={() => {
            setIsActive(!isActive)
          }}
          aria-label="Toggle menu"
          tabIndex={0}
          className="relative flex justify-center items-center bg-[#1C1D20] m-[20px] rounded-full w-[80px] h-[80px] cursor-pointer"
        >
          <div
            className={`w-full relative z-10 before:block before:h-1 before:w-[40%] before:m-auto before:bg-white before:relative before:transition-transform before:duration-300 before:content-[''] before:top-[5px] after:block after:h-1 after:w-[40%] after:m-auto after:bg-white after:relative after:transition-transform after:duration-300 after:content-[''] after:top-[-5px] ${isActive ? "after:rotate-45 after:-top-px before:-rotate-45 before:top-0" : ""}`}
          ></div>
        </RoundedButton>
      </div>
      <AnimatePresence mode="wait">{isActive && <SideMenu onClose={() => setIsActive(false)} />}</AnimatePresence>
    </>
  )
}

export default Navbar
