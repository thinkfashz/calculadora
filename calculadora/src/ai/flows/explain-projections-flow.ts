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
  prompt: `You are a seasoned negotiation expert advising an investor about a partnership with a construction startup. Your goal is to frame the project's profitability in a compelling way, emphasizing the strong return on investment and the strategic benefits of the deal structure. Address the investor directly.

Analyze the following project data and generate a concise, persuasive summary (2-3 short paragraphs).

- Begin by directly addressing the investor and presenting the project's gross profit as a clear indicator of its viability.
- Clearly state the investor's 30% share, framing it as a direct and attractive return from this single project.
- Highlight the strategic value of the 40% Reinvestment Fund. Explain that this fund is the engine for accelerating capital recovery, directly benefiting the investor by paying back their initial investment faster.
- Conclude by stating the projected number of projects required to recover the full initial investment. Frame this as a clear, achievable timeline for a full return of capital, after which the investor's primary financial commitment is complete, yet they have enabled a successful venture.
- Keep the tone professional, confident, and focused on the benefits for the investor. Use Chilean Pesos (CLP) for all currency values.

Project Data:
- Sale Price: {{{salePrice}}} CLP
- Construction Cost: {{{constructionCost}}} CLP
- Gross Profit: {{{grossProfit}}} CLP
- Investor's Share (30%): {{{investorShare}}} CLP
- Founder's Share (30%): {{{founderShare}}} CLP
- Reinvestment Fund (40%): {{{reinvestmentFund}}} CLP
- Total Initial Investment to Recover: {{{totalInvestment}}} CLP
- Estimated Projects to Recover Capital: {{{projectsToRecover}}}

Generate the explanation for the investor based on this data.
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
