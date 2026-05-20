import Decimal from 'decimal.js';
import { SupportedCurrency, MilestoneBillingItem, ExportInvoice } from '../types';

export class ExportBillingEngine {
  // Exchange rate store against INR (sample reference values)
  private static exchangeRates: Record<SupportedCurrency, number> = {
    USD: 83.50,
    EUR: 89.20,
    GBP: 104.80,
    INR: 1.00
  };

  public static calculateInvoice(
    invoiceNumber: string,
    clientName: string,
    clientCountry: string,
    currency: SupportedCurrency,
    items: MilestoneBillingItem[]
  ): ExportInvoice {
    let subtotalDecimal = new Decimal(0);

    for (const item of items) {
      const itemTotal = new Decimal(item.developerHours).times(item.hourlyRate);
      subtotalDecimal = subtotalDecimal.plus(itemTotal);
    }

    const rate = this.exchangeRates[currency];
    const totalDue = subtotalDecimal.toNumber();
    const inrValue = subtotalDecimal.times(rate).toDecimalPlaces(2).toNumber();

    return {
      invoiceNumber,
      clientName,
      clientCountry,
      currency,
      subtotal: totalDue,
      exportTaxDeduction: 0, // Zero-rated under Indian SEZ export regulations (LUT scheme)
      totalDue,
      equivalentInINR: inrValue,
      exchangeRateUsed: rate,
      isSezZeroRated: true,
      issuedAt: new Date().toISOString()
    };
  }
}
