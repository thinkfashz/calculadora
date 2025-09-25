'use server';
/**
 * @fileOverview AI agent to explain financial projections.
 *
 * - explainProjections - A function that generates an explanation for the financial projections.
 */

import {ai} from '@/ai/genkit';
import {
  ExplainProjectionsInputSchema,
  type ExplainProjectionsInput,
  ExplainProjectionsOutputSchema,
  type ExplainProjectionsOutput,
} from '@/lib/schemas';

export async function explainProjections(
  input: ExplainProjectionsInput
): Promise<ExplainProjectionsOutput> {
  return explainProjectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainProjectionsPrompt',
  input: {schema: ExplainProjectionsInputSchema},
  output: {schema: ExplainProjectionsOutputSchema},
  prompt: `Eres un experto negociador que asesora a un inversor sobre una asociación con una startup de construcción. Tu objetivo es enmarcar la rentabilidad del proyecto de una manera convincente, enfatizando el fuerte retorno de la inversión y los beneficios estratégicos de la estructura del acuerdo. Dirígete directamente al inversor.

Analiza los siguientes datos del proyecto y genera un resumen conciso y persuasivo (2-3 párrafos cortos).

- Comienza dirigiéndote directamente al inversor y presentando la utilidad bruta del proyecto como un claro indicador de su viabilidad.
- Indica claramente la participación del 30% del inversor, enmarcándola como un retorno directo y atractivo de este único proyecto.
- Destaca el valor estratégico del Fondo de Reinversión del 40%. Explica que este fondo es el motor para acelerar la recuperación del capital, beneficiando directamente al inversor al devolverle su inversión inicial más rápido.
- Concluye indicando el número proyectado de proyectos necesarios para recuperar la inversión inicial completa. Enmárcalo como un cronograma claro y alcanzable para un retorno total del capital, después del cual el principal compromiso financiero del inversor se completa, pero ha permitido un emprendimiento exitoso.
- Mantén un tono profesional, seguro y centrado en los beneficios para el inversor. Utiliza Pesos Chilenos (CLP) para todos los valores monetarios.

Datos del Proyecto:
- Precio de Venta: {{{salePrice}}} CLP
- Costo de Construcción: {{{constructionCost}}} CLP
- Utilidad Bruta: {{{grossProfit}}} CLP
- Participación del Inversor (30%): {{{investorShare}}} CLP
- Participación del Fundador (30%): {{{founderShare}}} CLP
- Fondo de Reinversión (40%): {{{reinvestmentFund}}} CLP
- Inversión Inicial Total a Recuperar: {{{totalInvestment}}} CLP
- Proyectos Estimados para Recuperar Capital: {{{projectsToRecover}}}

Genera la explicación para el inversor basada en estos datos.
`,
});

const explainProjectionsFlow = ai.defineFlow(
  {
    name: 'explainProjectionsFlow',
    inputSchema: ExplainProjectionsInputSchema,
    outputSchema: ExplainProjectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
