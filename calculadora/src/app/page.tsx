'use client';

import type { z } from 'zod';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Calculator,
  FileSignature,
  Loader2,
  Download,
} from 'lucide-react';
import Link from 'next/link';

import { contractSchema, type FullContractData } from '@/lib/schemas';
import { useDebounce } from '@/hooks/use-debounce';
import { investmentAmountToWords } from '@/ai/flows/investment-amount-spell-out';
import { refineContractContent } from '@/ai/flows/refine-contract-flow';
import { ContractForm } from '@/components/contract/contract-form';
import { ContractPreview } from '@/components/contract/contract-preview';
import { Button } from '@/components/ui/button';

type ContractData = z.infer<typeof contractSchema>;

const FORM_STORAGE_KEY = 'fabrick-contract-form-data';

const getInitialFormValues = () => {
    const today = new Date();
    return {
      founderName: 'Juan Pérez González',
      founderRut: '12.345.678-9',
      founderDomicile: 'Avenida Siempreviva 742, Linares',
      investorName: 'Inversiones Capital SpA',
      investorRut: '76.543.210-K',
      investorDomicile: 'Calle Falsa 123, Santiago',
      agreementDay: String(today.getDate()),
      agreementMonth: today.toLocaleString('es-ES', { month: 'long' }),
      agreementYear: String(today.getFullYear()),
      companyRut: '77.888.999-0',
      investmentAmount: 51400000,
    };
};

export default function HomePage() {
  const [amountInWords, setAmountInWords] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [fullContractData, setFullContractData] = useState<FullContractData | null>(null);

  const form = useForm<ContractData>({
    resolver: zodResolver(contractSchema),
    defaultValues: getInitialFormValues(),
    mode: 'onChange',
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (e) {
        console.error('Failed to parse saved form data', e);
        form.reset(getInitialFormValues());
      }
    }
  }, [form]);

  const watchedForm = form.watch();
  const watchedFormString = JSON.stringify(watchedForm);

  useEffect(() => {
    try {
        localStorage.setItem(FORM_STORAGE_KEY, watchedFormString);
    } catch (e) {
        console.error('Failed to save form data to local storage', e);
    }
  }, [watchedFormString]);


  const debouncedAmount = useDebounce(watchedForm.investmentAmount, 500);

  useEffect(() => {
    if (debouncedAmount && debouncedAmount > 0) {
      const getAmountInWords = async () => {
        setIsAiLoading(true);
        try {
          const result = await investmentAmountToWords({
            amount: debouncedAmount,
          });
          setAmountInWords(result.amountInWords);
        } catch (error) {
          console.error('AI call failed:', error);
          setAmountInWords('Error al generar texto');
        } finally {
          setIsAiLoading(false);
        }
      };
      getAmountInWords();
    } else {
      setAmountInWords('');
    }
  }, [debouncedAmount]);

  useEffect(() => {
    const currentFormData = form.getValues();
    const data: FullContractData = {
      ...currentFormData,
      investmentAmount: currentFormData.investmentAmount || 0,
      investmentAmountInWords: amountInWords,
    };
    setFullContractData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFormString, amountInWords]);


  const handlePrintAndDownload = async () => {
    setIsPdfLoading(true);
    
    if (!fullContractData) {
      console.error('No hay datos del contrato para generar el PDF.');
      setIsPdfLoading(false);
      return;
    }

    try {
      // 1. Get the current HTML content from the preview
      const previewElement = document.getElementById('contract-preview-content');
      if (!previewElement) {
        throw new Error('No se pudo encontrar el contenido del contrato.');
      }
      const currentHtml = previewElement.innerHTML;
      
      // 2. Ask AI to refine the content
      const refinedResult = await refineContractContent({
          contractHtml: currentHtml,
          ...fullContractData,
      });

      // 3. Create a temporary element to render the refined HTML for PDF generation
      const pdfRenderElement = document.createElement('div');
      pdfRenderElement.className = 'p-8 md:p-12 text-sm text-gray-700'; // Match preview styles
      pdfRenderElement.innerHTML = refinedResult.refinedHtml;
      
      // We must append it to the body to ensure styles are applied, but we can make it invisible
      pdfRenderElement.style.position = 'absolute';
      pdfRenderElement.style.left = '-9999px';
      pdfRenderElement.style.width = '800px'; // A reasonable width for PDF rendering
      document.body.appendChild(pdfRenderElement);
      
      // 4. Generate PDF from the refined content
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0.5,
        filename: 'contrato-inversion-fabrick.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      await html2pdf().from(pdfRenderElement).set(opt).save();

      // 5. Clean up the temporary element
      document.body.removeChild(pdfRenderElement);

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setIsPdfLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <FileSignature className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl font-bold">
              Casas Fabrick
            </h1>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" asChild>
              <Link href="/calculator">
                <Calculator className="mr-2 h-4 w-4" />
                Calculadora y Proyecciones
              </Link>
            </Button>
            <Button onClick={handlePrintAndDownload} disabled={isPdfLoading}>
              {isPdfLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Generar y Descargar PDF
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="no-print space-y-6 lg:col-span-2">
              <ContractForm
                form={form}
                isAiLoading={isAiLoading}
                amountInWords={amountInWords}
              />
            </div>
            <div className="lg:col-span-3">
              {fullContractData && <ContractPreview data={fullContractData} />}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
