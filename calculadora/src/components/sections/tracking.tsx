"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProgressSteps } from "../progress-steps";

const trackingImage = PlaceHolderImages.find(img => img.id === "tracking-bg");

const projectSteps = [
  "Planificación",
  "Fundaciones",
  "Estructura",
  "Instalaciones",
  "Terminaciones",
  "Entrega Final",
];

export default function Tracking() {
  return (
    <section id="seguimiento" className="relative">
      <div className="absolute inset-0 opacity-5">
        {trackingImage && (
            <Image
                src={trackingImage.imageUrl}
                alt={trackingImage.description}
                fill
                className="object-cover"
                data-ai-hint={trackingImage.imageHint}
            />
        )}
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold text-primary">TRANSPARENCIA TOTAL</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Tu Proyecto, a tu Ritmo
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Con nuestro sistema de seguimiento online, tienes el control total. Accede a un panel personalizado para visualizar avances, reportes fotográficos, hitos completados y comunicarte directamente con nuestro equipo. Es la tranquilidad de saber que tu inversión está en las mejores manos, 24/7.
            </p>
            <div className="mt-16 max-w-2xl mx-auto px-4 sm:px-0">
              <ProgressSteps steps={projectSteps} currentStep={4} />
            </div>
          </div>
      </div>
    </section>
  );
}
