import gsap from "gsap"
import React, { useEffect, useRef } from "react"

const Magnetic = ({ children }: { children: React.ReactElement<{ ref?: React.Ref<HTMLElement> }> }) => {
  const magnetic = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = magnetic.current
    if (!el) return

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = el.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * 0.35)
      yTo(y * 0.35)
    }
    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return React.cloneElement(children, { ref: magnetic })
}

export default Magnetic
