'use client';

import Link from 'next/link';
import { ShippingCalculator } from '@/patterns/strategy/react/components/ShippingCalculator';

export default function StrategyPage() {
  return (
    <main>
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        ← Back
      </Link>
      <h1>Strategy</h1>
      <p className="text-gray-600 mb-6">
        Shipping cost calculator: choose a strategy (Standard, Express, Overnight, Free)
        to see different pricing algorithms. Each strategy calculates cost independently.
      </p>
      <div className="max-w-md">
        <ShippingCalculator />
      </div>
    </main>
  );
}
