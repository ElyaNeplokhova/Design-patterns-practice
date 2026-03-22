import { ValidationHandler } from './base-handler';
import type { ValidationRequest, ValidationResult } from '../../shared/types';

export class MinLengthHandler extends ValidationHandler {
  constructor(private readonly minLength: number) {
    super();
  }

  protected validate(request: ValidationRequest): ValidationResult {
    if (request.value.length < this.minLength) {
      return {
        isValid: false,
        errors: [`${request.field} must be at least ${this.minLength} characters`],
      };
    }
    return { isValid: true, errors: [] };
  }
}
