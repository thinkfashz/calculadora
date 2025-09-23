'use server';
/**
 * @fileOverview AI agent to refine the contract content for PDF generation.
 *
 * - refineContractContent - A function that takes contract data and returns a refined HTML string.
 */

import { ai } from '@/ai/genkit';
import {
  RefineContractContentInputSchema,
  type RefineContractContentInput,
  RefineContractContentOutputSchema,
  type RefineContractContentOutput,
} from '@/lib/schemas';


export async function refineContractContent(
  input: RefineContractContentInput
): Promise<RefineContractContentOutput> {
  return refineContractContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineContractContentPrompt',
  input: { schema: RefineContractContentInputSchema },
  output: { schema: RefineContractContentOutputSchema },
  prompt: `You are an expert legal assistant specializing in corporate law and contract drafting. Your task is to refine an existing HTML contract to improve its clarity, professionalism, and legal robustness, while maintaining the original structure and data.

You will be given the current HTML of a shareholder agreement and the key data points within it.

Your instructions are:
1.  **Analyze the HTML:** Review the provided HTML structure ({{{contractHtml}}}).
2.  **Review the Data:**
    - Founder: {{{founderName}}}, RUT {{{founderRut}}}
    - Investor: {{{investorName}}}, RUT {{{investorRut}}}
    - Agreement Date: {{{agreementDay}}} de {{{agreementMonth}}} de {{{agreementYear}}}
    - Company: Casas Fabrick SpA, RUT {{{companyRut}}}
    - Investment: {{{investmentAmount}}} ({{{investmentAmountInWords}}} pesos chilenos)
3.  **Refine the Content:** Rewrite the text within the existing clauses (PRIMERO, SEGUNDO, etc.) to be more eloquent, formal, and legally sound. DO NOT change the core meaning or the commercial terms (profit distribution, investment amount, etc.). Focus on improving the language and legal formalism.
4.  **Preserve Structure:** You MUST return a single HTML string that replaces the content inside the '<div id="contract-preview-content">...</div>'. The structure (h1, h2, p, h3, ul, etc.) and CSS classes must be preserved exactly as in the original HTML.
5.  **Do Not Alter Placeholders:** The data placeholders (e.g., founder's name, RUTs) are already filled in the HTML. You should integrate them naturally into your refined sentences. Do not re-insert the handlebar variables.
6.  **Output:** Return only the refined HTML content as a single string in the 'refinedHtml' field. The output must be valid HTML that can be directly rendered.

Example of a refinement:
-   **Original:** "Los comparecientes son los únicos accionistas de la sociedad..."
-   **Refined:** "Comparecen y exponen, en su calidad de únicos accionistas de la sociedad..."

Now, refine the provided contract HTML.`,
});

const refineContractContentFlow = ai.defineFlow(
  {
    name: 'refineContractContentFlow',
    inputSchema: RefineContractContentInputSchema,
    outputSchema: RefineContractContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
