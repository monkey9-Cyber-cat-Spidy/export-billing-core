import { ExportBillingEngine } from '../src/services/billingEngine';
import { MilestoneBillingItem } from '../src/types';

describe('ExportBillingEngine Unit Tests', () => {
  it('should accurately calculate milestone total and converted INR value with arbitrary precision', () => {
    const items: MilestoneBillingItem[] = [
      {
        milestoneId: 'm-1',
        description: 'Frontend React Architecture',
        developerHours: 40,
        hourlyRate: 35.0,
        currency: 'USD'
      },
      {
        milestoneId: 'm-2',
        description: 'PostgreSQL Database Indexing',
        developerHours: 20,
        hourlyRate: 35.0,
        currency: 'USD'
      }
    ];

    const invoice = ExportBillingEngine.calculateInvoice(
      'INV-EXP-2026-001',
      'Nordic Health Group',
      'Norway',
      'USD',
      items
    );

    expect(invoice.totalDue).toBe(2100.0); // (40+20) * 35 = 2100
    expect(invoice.equivalentInINR).toBe(175350.0); // 2100 * 83.5
    expect(invoice.isSezZeroRated).toBe(true);
  });
});
