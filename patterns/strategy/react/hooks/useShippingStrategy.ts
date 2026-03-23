import { useState, useCallback, useMemo } from 'react';
import type { ShippingRequest, ShippingResult } from '../../shared/types';
import { standardShipping } from '../strategies/standard-shipping';
import { expressShipping } from '../strategies/express-shipping';
import { overnightShipping } from '../strategies/overnight-shipping';
import { freeShipping } from '../strategies/free-shipping';

type StrategyFn = (request: ShippingRequest) => ShippingResult;
type StrategyName = 'standard' | 'express' | 'overnight' | 'free';

const strategyMap: Record<StrategyName, StrategyFn> = {
  standard: standardShipping,
  express: expressShipping,
  overnight: overnightShipping,
  free: freeShipping,
};

export function useShippingStrategy(initial: StrategyName = 'standard') {
  const [selected, setSelected] = useState<StrategyName>(initial);

  const calculate = useCallback(
    (request: ShippingRequest): ShippingResult => strategyMap[selected](request),
    [selected]
  );

  const strategies = useMemo(() => Object.keys(strategyMap) as StrategyName[], []);

  return { selected, setSelected, calculate, strategies };
}
