import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "./reveal";

const slides = [
  {
    src: "/hero-technician-1.png",
    alt: "Technician repairing a pipe",
    caption: "Plumbing",
  },
  {
    src: "/hero-technician-2.png",
    alt: "Maintenance worker on site",
    caption: "Electrical",
  },
  {
    src: "/hero-technician-3.png",
    alt: "Worker completing a repair",
    caption: "General repair",
  },
];

export function GallerySection() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-muted/40 px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-semibold text-primary">Real work, real proof</p>
          <h2
            id="gallery-heading"
            className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Repairs documented end to end
          </h2>
        </Reveal>

        <Carousel
          opts={{ loop: true }}
          className="mt-10"
          aria-label="Repair photo gallery"
        >
          <CarouselContent className="-ml-4">
            {slides.map(({ src, alt, caption }, index) => (
              <CarouselItem
                key={src}
                className="basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/3"
                aria-label={`Slide ${index + 1} of ${slides.length}: ${caption}`}
              >
                <div className="overflow-hidden rounded-2xl border shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
                      <span className="text-sm font-semibold text-white">{caption}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Swipe to explore
        </p>
      </div>
    </section>
  );
}