'use client';

import { FileSignature, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ProjectionSection } from '@/components/contract/projection-section';

export default function CalculatorPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-background">
        <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <FileSignature className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl font-bold">
              Calculadora y Proyecciones
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Contrato
              </Link>
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <ProjectionSection />
          </div>
        </main>
      </div>
    </>
  );
}
