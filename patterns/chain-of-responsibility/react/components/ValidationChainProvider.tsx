'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useValidationChain } from '../hooks/useValidationChain';

type ValidationContextValue = ReturnType<typeof useValidationChain>;

const ValidationChainContext = createContext<ValidationContextValue | null>(null);

export function ValidationChainProvider({ children }: { children: ReactNode }) {
  const value = useValidationChain();
  return (
    <ValidationChainContext.Provider value={value}>
      {children}
    </ValidationChainContext.Provider>
  );
}

export function useValidationChainContext() {
  const ctx = useContext(ValidationChainContext);
  if (!ctx) {
    throw new Error('useValidationChainContext must be used within ValidationChainProvider');
  }
  return ctx;
}
