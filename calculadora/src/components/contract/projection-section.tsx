'use client';

import { useState, useEffect } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { ProfitabilityCalculator } from './profitability-calculator';
import { ProjectionChart } from './projection-chart';
import { InvestmentRecovery } from './investment-recovery';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { explainProjections } from '@/ai/flows/explain-projections-flow';
import type { ExplainProjectionsInput } from '@/lib/schemas';
import { useDebounce } from '@/hooks/use-debounce';

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
  
  const debouncedProjectionData = useDebounce(projectionData, 1000);
  const debouncedInvestmentData = useDebounce(investmentData, 1000);

  useEffect(() => {
    const generateExplanation = async () => {
      if (!debouncedProjectionData || !debouncedInvestmentData || debouncedProjectionData.grossProfit <= 0) {
        setExplanation('');
        return;
      }

      setIsAiLoading(true);
      try {
        const result = await explainProjections({
          ...debouncedProjectionData,
          ...debouncedInvestmentData
        } as ExplainProjectionsInput);
        setExplanation(result.explanation);
      } catch (error) {
        console.error('AI call failed:', error);
        setExplanation('No se pudo generar la explicación. Intente ajustar los valores.');
      } finally {
        setIsAiLoading(false);
      }
    };

    generateExplanation();
  }, [debouncedProjectionData, debouncedInvestmentData]);

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
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                Explicación con IA
              </CardTitle>
              <CardDescription>Gemini analiza y explica tus proyecciones en tiempo real.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="min-h-[150px]">
            {isAiLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Analizando números...</p>
              </div>
            ) : explanation ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90">
                {explanation.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground p-8">Ajuste los valores en la calculadora para generar una explicación.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
