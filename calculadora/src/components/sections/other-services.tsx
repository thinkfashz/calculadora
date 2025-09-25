"use client";

import { Wrench, Package, Gem, Home } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const otherServices = [
  {
    title: "Reparaciones",
    description: "Soluciones expertas para cualquier tipo de reparación en tu hogar, garantizando calidad y durabilidad.",
    icon: Wrench,
  },
  {
    title: "Kits Prefabricados",
    description: "Ofrecemos kits de construcción prefabricados para que puedas gestionar tu propio proyecto con nuestra calidad.",
    icon: Package,
  },
  {
    title: "Muebles en Melamina",
    description: "Diseñamos y fabricamos muebles a medida en melamina de alta calidad, optimizando tus espacios con estilo.",
    icon: Gem,
  },
  {
    title: "Remodelaciones",
    description: "Transformamos y modernizamos tus espacios, desde pequeñas renovaciones hasta remodelaciones completas.",
    icon: Home,
  },
];

export default function OtherServices() {
  return (
    <section id="servicios">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold text-primary">MÁS ALLÁ DE LA CONSTRUCCIÓN</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Explora Nuestros Otros Servicios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Además de construir casas desde cero, ofrecemos una gama de servicios para mejorar y mantener tu hogar.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service, index) => (
            <Card
              key={index}
              className="text-center transition-transform duration-300 hover:-translate-y-1 bg-card shadow-lg hover:shadow-xl"
            >
              <CardHeader className="p-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
