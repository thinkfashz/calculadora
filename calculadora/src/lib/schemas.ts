import { z } from "zod";

export const contractSchema = z.object({
  founderName: z.string().min(1, "Nombre del fundador es requerido"),
  founderRut: z.string().min(1, "RUT del fundador es requerido"),
  founderDomicile: z.string().min(1, "Domicilio del fundador es requerido"),
  investorName: z.string().min(1, "Nombre del inversionista es requerido"),
  investorRut: z.string().min(1, "RUT del inversionista es requerido"),
  investorDomicile: z.string().min(1, "Domicilio del inversionista es requerido"),
  agreementDay: z.string().min(1, "Día es requerido"),
  agreementMonth: z.string().min(1, "Mes es requerido"),
  agreementYear: z.string().min(4, "Año debe tener 4 dígitos"),
  companyRut: z.string().min(1, "RUT de la empresa es requerido"),
  investmentAmount: z.coerce.number({invalid_type_error: "Debe ser un número."}).min(0, "Debe ser un número positivo."),
});

export type ContractData = z.infer<typeof contractSchema>;

export type FullContractData = {
  founderName: string;
  founderRut: string;
  founderDomicile: string;
  investorName: string;
  investorRut: string;
  investorDomicile: string;
  agreementDay: string;
  agreementMonth: string;
  agreementYear: string;
  companyRut: string;
  investmentAmount: number;
  investmentAmountInWords: string;
}

// Schema for explain-projections-flow.ts
export const ExplainProjectionsInputSchema = z.object({
  salePrice: z.number().describe('The total sale price of the project.'),
  constructionCost: z
    .number()
    .describe('The total construction cost of the project.'),
  grossProfit: z.number().describe('The gross profit of the project.'),
  founderShare: z.number().describe("The founder's share of the profit."),
  investorShare: z.number().describe("The investor's share of the profit."),
  reinvestmentFund: z
    .number()
    .describe('The amount allocated to the reinvestment fund.'),
  totalInvestment: z
    .number()
    .describe('The total initial investment to be recovered.'),
  projectsToRecover: z
    .number()
    .describe('The estimated number of projects to recover the investment.'),
});
export type ExplainProjectionsInput = z.infer<
  typeof ExplainProjectionsInputSchema
>;

export const ExplainProjectionsOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A detailed but easy-to-understand explanation of the projection.'),
});
export type ExplainProjectionsOutput = z.infer<
  typeof ExplainProjectionsOutputSchema
>;

// Schema for investment-amount-spell-out.ts
export const InvestmentAmountToWordsInputSchema = z.object({
  amount: z.number().describe('The investment amount in numbers.'),
});
export type InvestmentAmountToWordsInput = z.infer<
  typeof InvestmentAmountToWordsInputSchema
>;

export const InvestmentAmountToWordsOutputSchema = z.object({
  amountInWords: z.string().describe('The investment amount in words.'),
});
export type InvestmentAmountToWordsOutput = z.infer<
  typeof InvestmentAmountToWordsOutputSchema
>;

// Schema for refine-contract-flow.ts
export const RefineContractContentInputSchema = z.object({
  contractHtml: z.string().describe('The current HTML content of the contract preview.'),
  founderName: z.string(),
  founderRut: z.string(),
  founderDomicile: z.string(),
  investorName: z.string(),
  investorRut: z.string(),
  investorDomicile: z.string(),
  agreementDay: z.string(),
  agreementMonth: z.string(),
  agreementYear: z.string(),
  companyRut: z.string(),
  investmentAmount: z.number(),
  investmentAmountInWords: z.string(),
});
export type RefineContractContentInput = z.infer<
  typeof RefineContractContentInputSchema
>;

export const RefineContractContentOutputSchema = z.object({
  refinedHtml: z.string().describe('The refined HTML content for the contract, ready for PDF generation.'),
});
export type RefineContractContentOutput = z.infer<
  typeof RefineContractContentOutputSchema
>;
