import type { ShippingStrategy, ShippingRequest, ShippingResult } from '../../shared/types';

export class ExpressShipping implements ShippingStrategy {
  calculate(request: ShippingRequest): ShippingResult {
    return {
      method: 'Express',
      cost: 9.99 + request.weightKg * 1.0 + request.distanceKm * 0.01,
      estimatedDays: 3,
    };
  }
}
