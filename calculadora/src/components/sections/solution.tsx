"use client";

import { CheckSquare, Users, LineChart } from "lucide-react";

const features = [
  {
    name: "Maestros Especialistas",
    description: "Formamos nuestro propio talento en 'La Escuela Fabrick' para garantizar un nivel de maestría técnica inigualable en cada detalle.",
    icon: Users,
  },
  {
    name: "Control de Calidad Total",
    description: "Implementamos un riguroso checklist de más de 200 puntos en cada etapa, asegurando terminaciones perfectas y duraderas.",
    icon: CheckSquare,
  },
  {
    name: "Transparencia Absoluta",
    description: "Accede a un dashboard de seguimiento en tiempo real. Revisa avances, fotos y comunicados, sintiendo el control total de tu inversión.",
    icon: LineChart,
  },
];

export default function Solution() {
  return (
    <section id="solucion" >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
           <p className="font-semibold text-primary">NUESTRO MÉTODO</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            La Solución: El Compromiso Fabrick
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No vendemos metros cuadrados, entregamos tranquilidad. Nuestro modelo se basa en tres pilares que nos distinguen.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold leading-7 text-foreground">{feature.name}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
