import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Lufuno Damari Photography",
  description:
    "Photography portfolio of Lufuno Damari featuring portraits, events, editorial, street, and landscape photography in Johannesburg, South Africa.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
