"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search } from "lucide-react";

const galleryImages = PlaceHolderImages.filter(img => img.imageHint.includes('gallery'));

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setActiveImage(imageUrl);
    setOpen(true);
  };

  return (
    <section id="proyectos" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Nuestras Historias Construidas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada proyecto es un testimonio de nuestro compromiso. Explora la calidad y el diseño que nos definen.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto mt-20 w-full max-w-6xl"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div
                    className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-lg bg-card"
                    onClick={() => handleImageClick(image.imageUrl)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image.imageUrl)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={600}
                      data-ai-hint={image.imageHint}
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/80 backdrop-blur-sm">
                          <Search className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-ml-4 sm:ml-0" />
          <CarouselNext className="-mr-4 sm:mr-0" />
        </Carousel>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0">
            {activeImage && (
              <div className="aspect-video w-full">
                <Image
                  src={activeImage}
                  alt="Vista ampliada del proyecto"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
