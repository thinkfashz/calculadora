"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";

const stats = [
    { title: "Insatisfacción por Calidad de Terminaciones", value: 48, suffix: "%" },
    { title: "Incumplimiento de Plazos de Entrega", value: 25, suffix: "%" },
    { title: "Garantía Post-Venta Efectiva", value: 0, suffix: "NULA" },
];


export default function Problem() {
    return (
        <section id="problema" className="bg-secondary">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        El Desafío de Construir en Chile
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        La construcción tradicional enfrenta una crisis de confianza. Estas son las cifras que nos impulsan a redefinir el estándar.
                    </p>
                </div>
                <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center bg-card">
                            <CardHeader className="pt-8">
                                <CardTitle className="text-base font-semibold text-muted-foreground h-12">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-8">
                                {stat.suffix === 'NULA' ? (
                                    <p className="text-6xl font-extrabold text-primary">NULA</p>
                                ) : (
                                    <p className="text-6xl font-extrabold text-primary">
                                        <AnimatedCounter target={stat.value} as="span" />
                                        <span className="text-5xl">{stat.suffix}</span>
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
