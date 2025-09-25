'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  founder: {
    label: 'Fundador',
    color: 'hsl(var(--chart-1))', // Green
  },
  investor: {
    label: 'Inversionista',
    color: 'hsl(var(--chart-2))', // Yellow
  },
  fund: {
    label: 'Fondo',
    color: 'hsl(var(--chart-3))', // Red
  },
} satisfies ChartConfig;

interface ProjectionChartProps {
  data?: {
    grossProfit: number;
    founderShare: number;
    investorShare: number;
    reinvestmentFund: number;
    salePrice: number;
    constructionCost: number;
  } | null;
}

export function ProjectionChart({ data }: ProjectionChartProps) {
  const chartData = data
    ? [
        {
          party: 'founder',
          label: 'Fundador',
          amount: data.founderShare,
          fill: 'var(--color-founder)',
        },
        {
          party: 'investor',
          label: 'Inversionista',
          amount: data.investorShare,
          fill: 'var(--color-investor)',
        },
        {
          party: 'fund',
          label: 'Fondo',
          amount: data.reinvestmentFund,
          fill: 'var(--color-fund)',
        },
      ]
    : [];

  const formatCurrency = (value: number) => {
    if (value === undefined || value === null || isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const tickFormatter = (value: number) => {
    const million = value / 1000000;
    return `$${million.toFixed(0)}M`;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Distribución de Utilidad Bruta</CardTitle>
        <CardDescription>
          {data && data.grossProfit > 0
            ? `Proyección para una utilidad de ${formatCurrency(data.grossProfit)}`
            : 'Ingrese datos en la calculadora para ver la proyección.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
       {data && data.grossProfit > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full h-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickFormatter={tickFormatter} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="amount" radius={8} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-center p-8">
            <p>Los valores actuales no generan utilidad.</p>
          </div>
        )}
      </CardContent>
      {data && data.grossProfit > 0 && (
        <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-4">
          <div className="flex items-center gap-2 font-medium leading-none">
            Costo Construcción: {formatCurrency(data.constructionCost)}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Basado en un precio de venta de {formatCurrency(data.salePrice)}.
          </div>
        </CardFooter>
      )}
    </Card>
  );
}