import type { ShippingStrategy, ShippingRequest, ShippingResult } from '../../shared/types';

export class OvernightShipping implements ShippingStrategy {
  calculate(request: ShippingRequest): ShippingResult {
    return {
      method: 'Overnight',
      cost: 19.99 + request.weightKg * 2.0 + request.distanceKm * 0.05,
      estimatedDays: 1,
    };
  }
}
