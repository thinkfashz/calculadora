"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, DraftingCompass, Layers, Shrub, Zap, Home } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const constructionStages = [
  {
    title: "1. Diseño y Planificación",
    icon: DraftingCompass,
    content: "Colaboramos contigo para crear un diseño personalizado que se adapte a tus sueños y presupuesto. Gestionamos todos los permisos y planos necesarios para un inicio sin contratiempos.",
  },
  {
    title: "2. Fundaciones y Radier",
    icon: Layers,
    content: "Preparamos el terreno y construimos una base sólida y nivelada. Utilizamos técnicas modernas para garantizar la estabilidad y durabilidad de tu futuro hogar desde los cimientos.",
  },
  {
    title: "3. Estructura Híbrida",
    icon: Home,
    content: "Levantamos la estructura principal combinando la precisión y resistencia del Metalcon con la calidez y flexibilidad de la madera, creando un esqueleto robusto y eficiente.",
  },
  {
    title: "4. Instalaciones",
    icon: Zap,
    content: "Integramos las redes de electricidad, fontanería y climatización. Nuestros especialistas certificados aseguran que todos los sistemas funcionen de manera segura y eficiente.",
  },
  {
    title: "5. Terminaciones y Acabados",
    icon: Check,
    content: "Aquí es donde la magia ocurre. Nuestro 'Ejército de Maestros Fabrick' se encarga de los detalles finos, desde la pintura hasta los revestimientos, con un control de calidad de más de 200 puntos.",
  },
  {
    title: "6. Entrega y Post-Venta",
    icon: Shrub,
    content: "Realizamos una inspección final contigo y te entregamos las llaves de tu nuevo hogar. Pero nuestro compromiso no termina ahí; cuentas con el respaldo y la garantía Fabrick.",
  },
];

const hybridBenefits = [
    "Durabilidad Superior: Resistencia a termitas y deformaciones.",
    "Eficiencia Energética: Mejor aislamiento térmico y acústico.",
    "Sostenibilidad: Menor huella de carbono y uso de materiales reciclables.",
    "Tiempos de Construcción Reducidos: Prefabricación y montaje rápido.",
    "Flexibilidad de Diseño: Permite crear espacios abiertos y diseños modernos.",
    "Seguridad Estructural: Comportamiento sísmico superior.",
];

const methodologyImage = PlaceHolderImages.find(img => img.id === 'methodology-main');
const hybridImage = PlaceHolderImages.find(img => img.id === 'hybrid-construction');

export default function Methodology() {
  return (
    <section id="metodo" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold text-primary">NUESTRA INNOVACIÓN</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              El Arte de Construir con Metalcon y Madera
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Combinamos lo mejor de dos mundos: la precisión y durabilidad del acero galvanizado (Metalcon) con la nobleza y calidez de la madera. Esta fusión nos permite crear hogares más resistentes, eficientes y sostenibles.
            </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-foreground">Etapas de Construcción Fabrick</h3>
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {constructionStages.map((stage, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-semibold hover:no-underline">
                            <div className="flex items-center gap-4">
                                <stage.icon className="h-6 w-6 text-primary" />
                                <span>{stage.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-muted-foreground">
                            {stage.content}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            
            <div className="space-y-8">
                 {methodologyImage && (
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={methodologyImage.imageUrl}
                            alt={methodologyImage.description}
                            width={600}
                            height={400}
                            data-ai-hint={methodologyImage.imageHint}
                            className="w-full object-cover aspect-[3/2] transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                )}
                <Card className="bg-card">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-foreground mb-6">¿Por qué esta Combinación?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            {hybridBenefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
