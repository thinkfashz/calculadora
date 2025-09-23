'use server';
/**
 * @fileOverview AI agent to spell out the investment amount in words.
 *
 * - investmentAmountToWords - A function that converts an investment amount to words.
 */

import {ai} from '@/ai/genkit';
import {
  InvestmentAmountToWordsInputSchema,
  type InvestmentAmountToWordsInput,
  InvestmentAmountToWordsOutputSchema,
  type InvestmentAmountToWordsOutput,
} from '@/lib/schemas';


export async function investmentAmountToWords(
  input: InvestmentAmountToWordsInput
): Promise<InvestmentAmountToWordsOutput> {
  return investmentAmountToWordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentAmountToWordsPrompt',
  input: {schema: InvestmentAmountToWordsInputSchema},
  output: {schema: InvestmentAmountToWordsOutputSchema},
  prompt: `You are an expert financial assistant specializing in converting numbers to their word equivalents in Spanish.

  Please convert the following investment amount to words, ensuring correct Spanish grammar and formatting.

  Amount: {{{amount}}}`,
});

const investmentAmountToWordsFlow = ai.defineFlow(
  {
    name: 'investmentAmountToWordsFlow',
    inputSchema: InvestmentAmountToWordsInputSchema,
    outputSchema: InvestmentAmountToWordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
