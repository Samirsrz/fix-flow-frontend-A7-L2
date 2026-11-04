import type { Metadata } from "next";
import { HeroSection } from "@/features/home/hero-section";
import { FeaturesSection } from "@/features/home/features-section";
import { RolesSection } from "@/features/home/roles-section";
import { GallerySection } from "@/features/home/gallery-section";
import { FaqSection } from "@/features/home/faq-section";
import { CtaSection } from "@/features/home/cta-section";

export const metadata: Metadata = {
  title: { absolute: "FixFlow | Community Maintenance, Simplified" },
  description:
    "Report issues, track repairs, and pay community maintenance fees in one place.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <RolesSection />
      <GallerySection />
      <FaqSection />
      <CtaSection />
    </>
  );
}