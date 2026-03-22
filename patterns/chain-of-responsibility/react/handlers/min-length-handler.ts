import type { ValidationRequest, ValidationResult } from '../../shared/types';

export function createMinLengthHandler(minLength: number) {
  return function minLengthHandler(request: ValidationRequest): ValidationResult {
    if (request.value.length < minLength) {
      return {
        isValid: false,
        errors: [`${request.field} must be at least ${minLength} characters`],
      };
    }
    return { isValid: true, errors: [] };
  };
}
