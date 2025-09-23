'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/investment-amount-spell-out.ts';
import '@/ai/flows/explain-projections-flow.ts';
import '@/ai/flows/refine-contract-flow.ts';
