import { ValidationHandler } from './base-handler';
import type { ValidationRequest, ValidationResult } from '../../shared/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class EmailHandler extends ValidationHandler {
  protected validate(request: ValidationRequest): ValidationResult {
    if (!EMAIL_REGEX.test(request.value)) {
      return {
        isValid: false,
        errors: [`${request.field} must be a valid email`],
      };
    }
    return { isValid: true, errors: [] };
  }
}
