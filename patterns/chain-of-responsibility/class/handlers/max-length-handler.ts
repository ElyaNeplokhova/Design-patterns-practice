import { ValidationHandler } from './base-handler';
import type { ValidationRequest, ValidationResult } from '../../shared/types';

export class MaxLengthHandler extends ValidationHandler {
  constructor(private readonly maxLength: number) {
    super();
  }

  protected validate(request: ValidationRequest): ValidationResult {
    if (request.value.length > this.maxLength) {
      return {
        isValid: false,
        errors: [`${request.field} must be at most ${this.maxLength} characters`],
      };
    }
    return { isValid: true, errors: [] };
  }
}
