'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { contractSchema } from '@/lib/schemas';

type ContractData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  form: UseFormReturn<ContractData>;
  isAiLoading: boolean;
  amountInWords: string;
}

export function ContractForm({
  form,
  isAiLoading,
  amountInWords,
}: ContractFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Datos del Fundador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="founderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del Fundador" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="founderRut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <Input placeholder="RUT del Fundador" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="founderDomicile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicilio</FormLabel>
                  <FormControl>
                    <Input placeholder="Domicilio del Fundador" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datos del Inversionista</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="investorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del Inversionista" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investorRut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <Input placeholder="RUT del Inversionista" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investorDomicile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicilio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Domicilio del Inversionista"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datos del Acuerdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="agreementDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día</FormLabel>
                    <FormControl>
                      <Input placeholder="Día" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreementMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <FormControl>
                      <Input placeholder="Mes" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="agreementYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input placeholder="Año" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="companyRut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT de la Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="RUT de la Empresa" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investmentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto de Inversión (CLP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="51400000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      value={field.value === undefined || isNaN(field.value) ? '' : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Monto en Palabras</FormLabel>
              <div className="relative">
                <Input
                  readOnly
                  value={amountInWords}
                  placeholder="Generado automáticamente..."
                  className="pr-10"
                />
                {isAiLoading && (
                  <Loader2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
              </div>
            </FormItem>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
