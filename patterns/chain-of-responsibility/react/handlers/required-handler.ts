import type { ValidationRequest, ValidationResult } from '../../shared/types';

export function requiredHandler(request: ValidationRequest): ValidationResult {
  const trimmed = request.value.trim();
  if (!trimmed) {
    return {
      isValid: false,
      errors: [`${request.field} is required`],
    };
  }
  return { isValid: true, errors: [] };
}
