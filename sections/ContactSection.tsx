import RoundedButton from "@/components/RoundedButton"
import { portfolioData } from "@/data/portfolio"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ContactSection() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
  const { email, phone } = portfolioData.contact

  return (
    <section id="contact" className="flex items-center py-16 lg:py-[120px] lg:min-h-screen overflow-hidden">
      <motion.div style={{ y }} ref={container} className="relative flex flex-col justify-center items-center w-full">
        <div className="pt-[100px] lg:pt-[200px] w-full max-w-[1800px]">
          <div className="relative lg:mx-[200px] px-4 pb-[100px] border-b border-b-white">
            <span className="flex items-center">
              <div className="relative rounded-[50%] w-[100px] h-[100px] overflow-hidden">
                {/* <Image
                  fill={true}
                  alt=""
                  src={`/images/background.jpg`}
                  className="object-cover"
                  loading="lazy"
                  sizes="100px"
                /> */}
                <div className="flex justify-center items-center bg-green-500 hover:bg-green-800 w-full h-full transition-colors duration-300">
                  <h3 className="font-semibold text-[8vw] lg:text-[3vw]">LD</h3>
                </div>
              </div>

              <h2 className="m-0 ml-[0.3em] font-bold text-[8vw] lg:text-[4vw]">Let&apos;s work</h2>
            </span>
            <span className="block m-0 font-bold text-[8vw] lg:text-[4vw]" aria-hidden="true">
              together
            </span>
            <motion.div style={{ x }} className="top-[calc(100%-75px)] left-[calc(50%-75px)] absolute">
              <RoundedButton
                backgroundColor="rgb(88, 28, 135)"
                className="absolute flex justify-center items-center rounded-[50%] w-[180px] h-[180px] text-white cursor-pointer"
              >
                <p className="z-20 relative m-0 font-light text-base">Get in touch</p>
              </RoundedButton>
            </motion.div>
            <motion.svg
              style={{ rotate, scale: 2 }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden lg:block top-[30%] left-full absolute"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </motion.svg>
          </div>
          <div className="flex flex-wrap gap-[20px] lg:mx-[200px] mt-[100px] px-4">
            <RoundedButton>
              <a href={`mailto:${email}`} className="z-50">
                {email}
              </a>
            </RoundedButton>
            {phone && (
              <RoundedButton>
                <a href={`tel:${phone}`} className="z-50">
                  {phone}
                </a>
              </RoundedButton>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
