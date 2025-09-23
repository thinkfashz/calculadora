'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Rocket } from 'lucide-react';

interface InvestmentRecoveryProps {
  reinvestmentFundPerProject?: number;
  onUpdate: (data: { totalInvestment: number; projectsToRecover: number; }) => void;
}

export function InvestmentRecovery({ reinvestmentFundPerProject, onUpdate }: InvestmentRecoveryProps) {
  const [totalInvestment, setTotalInvestment] = useState(51400000);

  const formatCurrency = (value: number) => {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const { projectsToRecover, recoveryPercentage, remainingCapital } = useMemo(() => {
    if (!reinvestmentFundPerProject || reinvestmentFundPerProject <= 0 || totalInvestment <= 0) {
      return { projectsToRecover: 0, recoveryPercentage: 0, remainingCapital: totalInvestment };
    }
    const projects = totalInvestment / reinvestmentFundPerProject;
    return {
      projectsToRecover: projects,
      recoveryPercentage: (reinvestmentFundPerProject / totalInvestment) * 100,
      remainingCapital: totalInvestment - reinvestmentFundPerProject
    };
  }, [totalInvestment, reinvestmentFundPerProject]);

  useEffect(() => {
    onUpdate({ totalInvestment, projectsToRecover });
  }, [totalInvestment, projectsToRecover, onUpdate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="text-primary"/>
          Recuperación de Capital
        </CardTitle>
        <CardDescription>
          Proyección de retorno de la inversión.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="total-investment">Inversión Inicial Total (CLP)</Label>
          <Input
            id="total-investment"
            type="number"
            placeholder="51400000"
            value={totalInvestment || ''}
            onChange={(e) => setTotalInvestment(Number(e.target.value))}
          />
        </div>

        {reinvestmentFundPerProject && reinvestmentFundPerProject > 0 ? (
          <div className="space-y-4 pt-4 border-t">
            <div className='text-center'>
              <p className="text-sm text-muted-foreground">Proyectos para recuperar inversión:</p>
              <p className="text-3xl font-bold text-primary">{projectsToRecover > 0 ? projectsToRecover.toFixed(1) : 'N/A'}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Progreso con 1 proyecto</span>
                  <span>{formatCurrency(reinvestmentFundPerProject)} / {formatCurrency(totalInvestment)}</span>
              </div>
              <Progress value={recoveryPercentage} className="h-3" />
              <p className="text-xs text-right text-muted-foreground">
                Quedarían {formatCurrency(remainingCapital)} por recuperar.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            <p>Calcule la rentabilidad para ver la proyección.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
