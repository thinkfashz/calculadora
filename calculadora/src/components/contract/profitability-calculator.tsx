'use client';

import { useState, useEffect }
from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface ProfitabilityCalculatorProps {
  onCalculate: (results: {
    grossProfit: number;
    founderShare: number;
    investorShare: number;
    reinvestmentFund: number;
    salePrice: number;
    constructionCost: number;
  }) => void;
}

export function ProfitabilityCalculator({
  onCalculate,
}: ProfitabilityCalculatorProps) {
  const [sqMeters, setSqMeters] = useState(120);
  const [pricePerSqMeter, setPricePerSqMeter] = useState(780000);

  const [salePrice, setSalePrice] = useState(0);
  const [constructionCost, setConstructionCost] = useState(0);

  const [results, setResults] = useState({
    grossProfit: 0,
    materialCost: 0,
    founderShare: 0,
    investorShare: 0,
    reinvestmentFund: 0,
  });
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (value: number) => {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = () => {
    const calculatedSalePrice = sqMeters * pricePerSqMeter;
    const calculatedConstructionCost = calculatedSalePrice * 0.7;

    setSalePrice(calculatedSalePrice);
    setConstructionCost(calculatedConstructionCost);

    const grossProfit = calculatedSalePrice - calculatedConstructionCost;
    if (
      grossProfit <= 0 ||
      calculatedSalePrice <= 0 ||
      calculatedConstructionCost <= 0
    ) {
      // Reset if values are not valid for calculation
      setResults({
        grossProfit: 0,
        materialCost: 0,
        founderShare: 0,
        investorShare: 0,
        reinvestmentFund: 0,
      });
      setIsCalculated(false);
      onCalculate({
        grossProfit: 0,
        founderShare: 0,
        investorShare: 0,
        reinvestmentFund: 0,
        salePrice: 0,
        constructionCost: 0,
      });
      return;
    }

    const materialCost = calculatedConstructionCost * 0.8;
    const founderShare = grossProfit * 0.3;
    const investorShare = grossProfit * 0.3;
    const reinvestmentFund = grossProfit * 0.4;

    const newResults = {
      grossProfit,
      materialCost,
      founderShare,
      investorShare,
      reinvestmentFund,
    };

    setResults(newResults);
    setIsCalculated(true);
    onCalculate({
      ...newResults,
      salePrice: calculatedSalePrice,
      constructionCost: calculatedConstructionCost,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Rentabilidad</CardTitle>
        <CardDescription>
          Ingrese los metros cuadrados y el valor por M² para calcular las
          utilidades.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="sq-meters">Metros Cuadrados (M²)</Label>
            <Input
              id="sq-meters"
              type="number"
              placeholder="120"
              value={sqMeters || ''}
              onChange={(e) => setSqMeters(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price-per-sq-meter">Valor por M² (CLP)</Label>
            <Input
              id="price-per-sq-meter"
              type="number"
              placeholder="780000"
              value={pricePerSqMeter || ''}
              onChange={(e) => setPricePerSqMeter(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={handleCalculate}>
            Calcular Rentabilidad
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {isCalculated && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Precio Venta</p>
                <p className="text-lg font-bold">
                  {formatCurrency(salePrice)}
                </p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Costo (70%)</p>
                <p className="text-lg font-bold">
                  {formatCurrency(constructionCost)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center text-foreground mt-6 mb-4">
              Resultados del Proyecto
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Utilidad Bruta</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(results.grossProfit)}
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Costo Materiales (80%)
                </p>
                <p className="text-xl font-bold">
                  {formatCurrency(results.materialCost)}
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg col-span-2 lg:col-span-1">
                <p className="text-sm text-muted-foreground">
                  Otros Gastos (20%)
                </p>
                <p className="text-xl font-bold">
                  {formatCurrency(constructionCost - results.materialCost)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Parte Fundador (30%)
                </p>
                <p className="text-lg font-semibold">
                  {formatCurrency(results.founderShare)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                <p className="text-sm text-yellow-600 dark:text-yellow-300">
                  Parte Inversionista (30%)
                </p>
                <p className="text-lg font-semibold">
                  {formatCurrency(results.investorShare)}
                </p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Fondo Reinversión (40%)
                </p>
                <p className="text-lg font-semibold">
                  {formatCurrency(results.reinvestmentFund)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
