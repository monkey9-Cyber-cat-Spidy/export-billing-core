export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface MilestoneBillingItem {
  milestoneId: string;
  description: string;
  developerHours: number;
  hourlyRate: number;
  currency: SupportedCurrency;
}

export interface ExportInvoice {
  invoiceNumber: string;
  clientName: string;
  clientCountry: string;
  currency: SupportedCurrency;
  subtotal: number;
  exportTaxDeduction: number;
  totalDue: number;
  equivalentInINR: number;
  exchangeRateUsed: number;
  isSezZeroRated: boolean;
  issuedAt: string;
}
