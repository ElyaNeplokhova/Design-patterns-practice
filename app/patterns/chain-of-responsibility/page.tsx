'use client';

import Link from 'next/link';
import { ValidationForm } from '@/patterns/chain-of-responsibility/react/components/ValidationForm';

export default function ChainOfResponsibilityPage() {
  return (
    <main>
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        ← Back
      </Link>
      <h1>Chain of Responsibility</h1>
      <p className="text-gray-600 mb-6">
        Validation chain: required → email format → min length (8) → max length (64).
        Chain stops at first failure.
      </p>
      <div className="max-w-md">
        <ValidationForm />
      </div>
    </main>
  );
}
