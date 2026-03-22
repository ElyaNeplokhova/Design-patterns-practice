import { useMemo, useCallback } from 'react';
import type { ValidationRequest, ValidationResult } from '../../shared/types';
import { requiredHandler } from '../handlers/required-handler';
import { emailHandler } from '../handlers/email-handler';
import { createMinLengthHandler } from '../handlers/min-length-handler';
import { createMaxLengthHandler } from '../handlers/max-length-handler';

type HandlerFn = (request: ValidationRequest) => ValidationResult;

function runChain(handlers: HandlerFn[], request: ValidationRequest): ValidationResult {
  for (const handler of handlers) {
    const result = handler(request);
    if (!result.isValid) return result;
  }
  return { isValid: true, errors: [] };
}

export function useValidationChain() {
  const chain = useMemo(() => {
    const minLen = createMinLengthHandler(2);
    const maxLen = createMaxLengthHandler(64);
    return [requiredHandler, emailHandler, minLen, maxLen];
  }, []);

  const validate = useCallback(
    (field: string, value: string): ValidationResult => {
      return runChain(chain, { field, value });
    },
    [chain]
  );

  return { validate };
}
