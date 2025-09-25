"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PRICE_PER_M2 = 780000;
const WHATSAPP_NUMBER = "56966960729";

export default function Calculator() {
  const [sqMeters, setSqMeters] = useState<string>("100");

  const estimatedPrice = useMemo(() => {
    const meters = parseFloat(sqMeters);
    if (isNaN(meters) || meters < 0) return 0;
    return meters * PRICE_PER_M2;
  }, [sqMeters]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(estimatedPrice);
  }, [estimatedPrice]);
  
  const handleQuoteRequest = () => {
    const meters = parseFloat(sqMeters);
    if (isNaN(meters) || meters <= 0) {
      // Maybe show an error to the user
      return;
    }

    const message = `¡Hola! Me gustaría solicitar una cotización formal para un proyecto de ${sqMeters} m². El precio estimado es de ${formattedPrice}. ¡Gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="calculadora" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Estima el Costo de tu Futuro Hogar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Usa nuestra calculadora para obtener una estimación instantánea. El precio es referencial y puede variar según tus requerimientos.
            </p>
        </div>

        <Card className="mx-auto mt-16 max-w-lg bg-card shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Calculadora de Costos</CardTitle>
                <CardDescription>Precio base: $780.000 por m²</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="sqMeters" className="text-sm font-medium">Metros cuadrados (m²)</Label>
                        <Input
                            id="sqMeters"
                            type="number"
                            placeholder="Ej: 120"
                            value={sqMeters}
                            onChange={(e) => setSqMeters(e.target.value)}
                            className="py-6 text-lg"
                        />
                    </div>
                    <div className="space-y-4 rounded-lg border bg-background/50 p-6 text-center">
                         <p className="text-sm font-medium text-muted-foreground">Precio Final Estimado del Proyecto</p>
                        <p className="text-4xl font-bold text-primary sm:text-5xl">
                            {formattedPrice}
                        </p>
                    </div>
                     <Button onClick={handleQuoteRequest} size="lg" className="w-full py-6 text-base">
                        Solicitar Cotización Formal
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
