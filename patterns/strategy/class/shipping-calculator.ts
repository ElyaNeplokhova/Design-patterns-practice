import type { ShippingStrategy, ShippingRequest, ShippingResult } from '../shared/types';

export class ShippingCalculator {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  calculate(request: ShippingRequest): ShippingResult {
    return this.strategy.calculate(request);
  }
}
