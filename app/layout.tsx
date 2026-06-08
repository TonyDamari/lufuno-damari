import JsonLd from "@/components/JsonLd"
import type { Metadata } from "next"
import { Allura, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
})

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
})

export const metadata: Metadata = {
  title: "Lufuno Damari — Videographer, Cinematographer & Photographer | Johannesburg",
  description:
    "Award-worthy portfolio of Lufuno Damari, a videographer, cinematographer, and photographer based in Johannesburg, South Africa. Available for freelance and production work.",
  keywords: [
    "videographer Johannesburg",
    "cinematographer South Africa",
    "photographer Johannesburg",
    "video editor Johannesburg",
    "camera assistant South Africa",
    "production Johannesburg",
    "freelance videographer",
    "cinematic portfolio",
  ],
  authors: [{ name: "Lufuno Damari" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Lufuno Damari — Videographer, Cinematographer & Photographer",
    description:
      "Crafting story-driven visuals for brands, events, and digital content in Johannesburg, South Africa.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lufuno Damari portfolio hero",
      },
    ],
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lufuno Damari — Videographer, Cinematographer & Photographer",
    description:
      "Crafting story-driven visuals for brands, events, and digital content in Johannesburg.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} ${allura.variable} dark scroll-smooth`}>
      <body className="bg-[#0a0a0a] min-h-screen overflow-x-hidden text-[#ededed] antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Lufuno Damari",
            jobTitle: ["Videographer", "Cinematographer", "Photographer"],
            url: "https://lufunodamari.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Johannesburg",
              addressCountry: "South Africa",
            },
            sameAs: [
              "https://instagram.com/lufuno_damari",
              "https://www.facebook.com/lufuno.damari",
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Lufuno Damari Portfolio",
            creator: {
              "@type": "Person",
              name: "Lufuno Damari",
            },
            genre: ["Videography", "Cinematography", "Photography"],
            keywords:
              "videographer Johannesburg, cinematographer South Africa, photographer Johannesburg, video editor, camera assistant, production Johannesburg",
          }}
        />
        {children}
      </body>
    </html>
  )
}
