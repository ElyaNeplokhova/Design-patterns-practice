import type { ShippingStrategy, ShippingRequest, ShippingResult } from '../../shared/types';

const FREE_SHIPPING_THRESHOLD = 50;

export class FreeShipping implements ShippingStrategy {
  calculate(request: ShippingRequest): ShippingResult {
    const qualifies = request.orderTotal >= FREE_SHIPPING_THRESHOLD;
    return {
      method: 'Free',
      cost: qualifies ? 0 : 4.99 + request.weightKg * 0.5,
      estimatedDays: qualifies ? 10 : 7,
    };
  }
}
