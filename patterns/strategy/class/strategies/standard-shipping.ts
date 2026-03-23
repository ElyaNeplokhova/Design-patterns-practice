import type { ShippingStrategy, ShippingRequest, ShippingResult } from '../../shared/types';

export class StandardShipping implements ShippingStrategy {
  calculate(request: ShippingRequest): ShippingResult {
    return {
      method: 'Standard',
      cost: 4.99 + request.weightKg * 0.5,
      estimatedDays: 7,
    };
  }
}
