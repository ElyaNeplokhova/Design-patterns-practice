import { describe, it, expect } from 'vitest';
import { ShippingCalculator } from '../shipping-calculator';
import { StandardShipping } from '../strategies/standard-shipping';
import { ExpressShipping } from '../strategies/express-shipping';
import { OvernightShipping } from '../strategies/overnight-shipping';
import { FreeShipping } from '../strategies/free-shipping';
import type { ShippingRequest } from '../../shared/types';

/**
 * Tests for the Strategy pattern — class-based implementation.
 * Covers: (1) each strategy in isolation, (2) context switching, (3) edge cases.
 */
describe('Strategy — Class', () => {
  const baseRequest: ShippingRequest = {
    weightKg: 2.5,
    distanceKm: 150,
    orderTotal: 75,
  };

  describe('StandardShipping in isolation', () => {
    it('calculates flat rate plus weight-based cost', () => {
      const strategy = new StandardShipping();
      const result = strategy.calculate(baseRequest);
      expect(result.method).toBe('Standard');
      expect(result.estimatedDays).toBe(7);
      // 4.99 + 2.5 * 0.5 = 4.99 + 1.25 = 6.24
      expect(result.cost).toBeCloseTo(6.24);
    });

    it('handles zero weight', () => {
      const strategy = new StandardShipping();
      const result = strategy.calculate({
        ...baseRequest,
        weightKg: 0,
      });
      expect(result.cost).toBeCloseTo(4.99);
    });
  });

  describe('ExpressShipping in isolation', () => {
    it('calculates premium cost with weight and distance', () => {
      const strategy = new ExpressShipping();
      const result = strategy.calculate(baseRequest);
      expect(result.method).toBe('Express');
      expect(result.estimatedDays).toBe(3);
      // 9.99 + 2.5 * 1.0 + 150 * 0.01 = 9.99 + 2.5 + 1.5 = 13.99
      expect(result.cost).toBeCloseTo(13.99);
    });
  });

  describe('OvernightShipping in isolation', () => {
    it('calculates highest cost for fastest delivery', () => {
      const strategy = new OvernightShipping();
      const result = strategy.calculate(baseRequest);
      expect(result.method).toBe('Overnight');
      expect(result.estimatedDays).toBe(1);
      // 19.99 + 2.5 * 2.0 + 150 * 0.05 = 19.99 + 5 + 7.5 = 32.49
      expect(result.cost).toBeCloseTo(32.49);
    });
  });

  describe('FreeShipping in isolation', () => {
    it('grants free shipping when order meets threshold', () => {
      const strategy = new FreeShipping();
      const result = strategy.calculate({
        ...baseRequest,
        orderTotal: 50,
      });
      expect(result.method).toBe('Free');
      expect(result.cost).toBe(0);
      expect(result.estimatedDays).toBe(10);
    });

    it('charges standard rate when order below threshold', () => {
      const strategy = new FreeShipping();
      const result = strategy.calculate({
        ...baseRequest,
        orderTotal: 49,
      });
      expect(result.cost).toBeCloseTo(6.24);
      expect(result.estimatedDays).toBe(7);
    });

    it('boundary: exactly at threshold qualifies for free', () => {
      const strategy = new FreeShipping();
      const result = strategy.calculate({
        ...baseRequest,
        orderTotal: 50,
      });
      expect(result.cost).toBe(0);
    });
  });

  describe('ShippingCalculator context switching', () => {
    it('delegates to current strategy', () => {
      const calculator = new ShippingCalculator(new StandardShipping());
      const result = calculator.calculate(baseRequest);
      expect(result.method).toBe('Standard');
      expect(result.cost).toBeCloseTo(6.24);
    });

    it('uses new strategy after setStrategy', () => {
      const calculator = new ShippingCalculator(new StandardShipping());
      calculator.setStrategy(new ExpressShipping());
      const result = calculator.calculate(baseRequest);
      expect(result.method).toBe('Express');
      expect(result.cost).toBeCloseTo(13.99);
    });

    it('switches strategies multiple times', () => {
      const calculator = new ShippingCalculator(new StandardShipping());

      calculator.setStrategy(new OvernightShipping());
      expect(calculator.calculate(baseRequest).method).toBe('Overnight');

      calculator.setStrategy(new FreeShipping());
      const freeResult = calculator.calculate({ ...baseRequest, orderTotal: 60 });
      expect(freeResult.method).toBe('Free');
      expect(freeResult.cost).toBe(0);
    });
  });
});
