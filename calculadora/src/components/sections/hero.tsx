"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

export default function Hero() {
  return (
    <section id="inicio" className="relative -mt-24 flex h-dvh min-h-[700px] w-full flex-col items-center justify-center bg-background pt-24">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Logo className="h-auto w-auto" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Construimos Casas, <br className="hidden sm:block" />
          <span className="text-primary">Creamos Historias</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
          Llevamos la construcción en Chile al siguiente nivel con excelencia, transparencia y un servicio que te da tranquilidad de principio a fin.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="text-base">
            <Link href="/nuestro-metodo">Descubre Nuestro Método</Link>
          </Button>
           <Button asChild size="lg" variant="outline" className="text-base bg-transparent text-white border-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/#calculadora">Cotiza tu Proyecto</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
