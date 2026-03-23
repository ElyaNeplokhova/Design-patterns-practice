/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShippingStrategy } from '../hooks/useShippingStrategy';
import type { ShippingRequest } from '../../shared/types';

const baseRequest: ShippingRequest = {
  weightKg: 2.5,
  distanceKm: 150,
  orderTotal: 75,
};

describe('useShippingStrategy', () => {
  it('defaults to standard strategy', () => {
    const { result } = renderHook(() => useShippingStrategy());
    expect(result.current.selected).toBe('standard');
    const calc = result.current.calculate(baseRequest);
    expect(calc.method).toBe('Standard');
  });

  it('uses initial strategy when provided', () => {
    const { result } = renderHook(() => useShippingStrategy('express'));
    expect(result.current.selected).toBe('express');
    const calc = result.current.calculate(baseRequest);
    expect(calc.method).toBe('Express');
  });

  it('calculates different results per strategy', () => {
    const { result } = renderHook(() => useShippingStrategy('standard'));
    const standard = result.current.calculate(baseRequest);

    act(() => result.current.setSelected('express'));
    const express = result.current.calculate(baseRequest);

    act(() => result.current.setSelected('overnight'));
    const overnight = result.current.calculate(baseRequest);

    act(() => result.current.setSelected('free'));
    const free = result.current.calculate({ ...baseRequest, orderTotal: 60 });

    expect(standard.cost).toBeLessThan(express.cost);
    expect(express.cost).toBeLessThan(overnight.cost);
    expect(free.cost).toBe(0);
  });

  it('exposes all strategy names', () => {
    const { result } = renderHook(() => useShippingStrategy());
    expect(result.current.strategies).toEqual(['standard', 'express', 'overnight', 'free']);
  });
});
