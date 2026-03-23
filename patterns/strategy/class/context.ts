import { ShippingCalculator } from './shipping-calculator';
import { StandardShipping } from './strategies/standard-shipping';
import { ExpressShipping } from './strategies/express-shipping';
import { OvernightShipping } from './strategies/overnight-shipping';
import { FreeShipping } from './strategies/free-shipping';
import type { ShippingRequest } from '../shared/types';

const request: ShippingRequest = {
  weightKg: 2.5,
  distanceKm: 150,
  orderTotal: 75,
};

const calculator = new ShippingCalculator(new StandardShipping());

const strategies = [
  new StandardShipping(),
  new ExpressShipping(),
  new OvernightShipping(),
  new FreeShipping(),
];

function runExample(): void {
  console.log('Strategy Pattern — Shipping Calculator\n');
  console.log(`Order: ${request.weightKg}kg, ${request.distanceKm}km, $${request.orderTotal}\n`);

  for (const strategy of strategies) {
    calculator.setStrategy(strategy);
    const result = calculator.calculate(request);
    const days = result.estimatedDays === 1 ? 'day' : 'days';
    console.log(`${result.method}: $${result.cost.toFixed(2)} (${result.estimatedDays} ${days})`);
  }
}

runExample();
