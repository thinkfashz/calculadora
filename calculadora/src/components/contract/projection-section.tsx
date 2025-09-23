'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { ProfitabilityCalculator } from './profitability-calculator';
import { ProjectionChart } from './projection-chart';
import { InvestmentRecovery } from './investment-recovery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { explainProjections } from '@/ai/flows/explain-projections-flow';
import type { ExplainProjectionsInput } from '@/lib/schemas';

interface ProjectionData {
  grossProfit: number;
  founderShare: number;
  investorShare: number;
  reinvestmentFund: number;
  salePrice: number;
  constructionCost: number;
}

export function ProjectionSection() {
  const [projectionData, setProjectionData] = useState<ProjectionData | null>(
    null
  );
  const [investmentData, setInvestmentData] = useState<{ totalInvestment: number; projectsToRecover: number} | null>(null);
  const [explanation, setExplanation] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleGenerateExplanation = async () => {
    if (!projectionData || !investmentData) {
       console.error("Faltan Datos", "Por favor, calcule la rentabilidad y asegúrese de que haya una inversión inicial para generar la explicación.");
      return;
    }

    setIsAiLoading(true);
    setExplanation('');
    try {
      const result = await explainProjections({
        ...projectionData,
        ...investmentData
      } as ExplainProjectionsInput);
      setExplanation(result.explanation);
    } catch (error) {
      console.error('AI call failed:', error);
       console.error("Error de IA", "No se pudo generar la explicación. Intente de nuevo.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <ProfitabilityCalculator onCalculate={setProjectionData} />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectionChart data={projectionData} />
          <InvestmentRecovery
            reinvestmentFundPerProject={projectionData?.reinvestmentFund}
            onUpdate={setInvestmentData}
          />
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Explicación con IA</CardTitle>
              <CardDescription>Gemini analiza y explica tus proyecciones.</CardDescription>
            </div>
            <Button onClick={handleGenerateExplanation} disabled={isAiLoading || !projectionData}>
              {isAiLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Wand2 />
              )}
              <span className="ml-2 hidden md:inline">Generar Explicación</span>
            </Button>
          </CardHeader>
          <CardContent>
            {isAiLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Analizando números...</p>
              </div>
            )}
            {explanation ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90">
                {explanation.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              !isAiLoading && <p className="text-center text-muted-foreground p-8">Haz clic en "Generar Explicación" para que la IA analice los resultados de la calculadora.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
