"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const whatsappMessage = encodeURIComponent(
      `¡Hola! Estoy interesado en un proyecto.\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message}`
    );
    const whatsappUrl = `https://wa.me/56966960729?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };


  return (
    <section id="contacto" >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Construyamos tu Historia
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Listo para dar el primer paso? Contáctanos y juntos haremos realidad la casa de tus sueños.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <h3 className="text-2xl font-bold">Información de Contacto</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Nuestra Ubicación</h4>
                  <a href="https://www.google.com/maps/place/Linares,+Maule,+Chile" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">Linares, Chile</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Whatsapp</h4>
                  <a href="https://wa.me/56966960729" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">+56 9 6696 0729</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:casafabrick@gmail.com" className="text-muted-foreground transition-colors hover:text-primary">casafabrick@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <Card className="bg-card shadow-lg">
              <CardContent className="p-8 sm:p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Nombre</Label>
                      <Input id="name" placeholder="Tu nombre completo" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={handleInputChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Mensaje</Label>
                    <Textarea id="message" placeholder="Cuéntanos sobre tu proyecto..." rows={5} value={formData.message} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <Button type="submit" size="lg" className="w-full py-6 text-base">Enviar Mensaje</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
