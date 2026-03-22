'use client';

import { useState } from 'react';
import { useValidationChain } from '../hooks/useValidationChain';

export function ValidationForm() {
  const { validate } = useValidationChain();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    const result = validate('email', email);
    setErrors(result.errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const result = validate('email', email);
    setErrors(result.errors);
    if (result.isValid) {
      alert('Submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          placeholder="user@example.com"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-invalid={touched && errors.length > 0}
        />
        {touched && errors.length > 0 && (
          <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
