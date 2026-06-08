import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
}

const RoundedButton = ({ children, backgroundColor, ...attributes }: RoundedButtonProps) => {
  const circle = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")
  }, [])

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeline.current?.tweenFromTo("enter", "exit")
  }

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play()
    }, 300)
  }

  const fillStyle = backgroundColor
    ? { backgroundColor }
    : { background: "linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))" }

  return (
    <Magnetic>
      <div
        className="relative flex justify-center items-center px-[60px] py-[15px] border-2 border-purple-900/60 border-solid rounded-[3em] overflow-hidden cursor-pointer"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter()
        }}
        onMouseLeave={() => {
          manageMouseLeave()
        }}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={fillStyle}
          className="top-full absolute rounded-[50%] w-full h-[150%]"
        ></div>
      </div>
    </Magnetic>
  )
}

export default RoundedButton
