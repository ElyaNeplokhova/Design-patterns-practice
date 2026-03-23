'use client';

import { useState } from 'react';
import { useShippingStrategy } from '../hooks/useShippingStrategy';

export function ShippingCalculator() {
  const { selected, setSelected, calculate, strategies } = useShippingStrategy();
  const [weightKg, setWeightKg] = useState(2.5);
  const [distanceKm, setDistanceKm] = useState(150);
  const [orderTotal, setOrderTotal] = useState(75);

  const request = { weightKg, distanceKm, orderTotal };
  const result = calculate(request);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium mb-1">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="distance" className="block text-sm font-medium mb-1">
            Distance (km)
          </label>
          <input
            id="distance"
            type="number"
            min="0"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="orderTotal" className="block text-sm font-medium mb-1">
            Order total ($)
          </label>
          <input
            id="orderTotal"
            type="number"
            min="0"
            step="0.01"
            value={orderTotal}
            onChange={(e) => setOrderTotal(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Shipping strategy</label>
        <div className="flex flex-wrap gap-2">
          {strategies.map((strategy) => (
            <label
              key={strategy}
              className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                selected === strategy ? 'bg-blue-50 border-blue-500' : ''
              }`}
            >
              <input
                type="radio"
                name="strategy"
                value={strategy}
                checked={selected === strategy}
                onChange={() => setSelected(strategy)}
                className="sr-only"
              />
              <span className="capitalize">{strategy}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-md border">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Result</h3>
        <p className="text-lg font-semibold">
          {result.method}: ${result.cost.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          Estimated delivery: {result.estimatedDays} day
          {result.estimatedDays !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
