import { CTAButton } from "@/components/CTAButton"
import { portfolioData } from "@/data/portfolio"
import Image from "next/image"

export function CTASection() {
  const { ctaText, ctaEmailSubject, cvFilePath, contact } = portfolioData

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(ctaEmailSubject)}`

  return (
    <section className="z-0 relative flex items-center py-16 lg:py-[120px] lg:min-h-screen">
      <div className="z-0 absolute inset-0 bg-black/50" />
      <Image fill src="/images/71.jpg" alt="" className="-z-10 absolute inset-0 object-cover" />

      <div className="z-10 mx-auto px-4 w-full max-w-3xl text-center">
        <h2 className="mb-8 font-bold text-[#ededed] text-[8vw] lg:text-[4vw]">{ctaText}</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <CTAButton label="Email me" href={mailtoHref} variant="primary" />
          <CTAButton label="Download CV" href={cvFilePath} variant="secondary" download />
        </div>
      </div>
    </section>
  )
}
