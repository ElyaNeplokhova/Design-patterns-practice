import type { ValidationRequest, ValidationResult } from '../../shared/types';

export function createMaxLengthHandler(maxLength: number) {
  return function maxLengthHandler(request: ValidationRequest): ValidationResult {
    if (request.value.length > maxLength) {
      return {
        isValid: false,
        errors: [`${request.field} must be at most ${maxLength} characters`],
      };
    }
    return { isValid: true, errors: [] };
  };
}
