import type { ShippingRequest, ShippingResult } from '../../shared/types';

export function standardShipping(request: ShippingRequest): ShippingResult {
  return {
    method: 'Standard',
    cost: 4.99 + request.weightKg * 0.5,
    estimatedDays: 7,
  };
}
