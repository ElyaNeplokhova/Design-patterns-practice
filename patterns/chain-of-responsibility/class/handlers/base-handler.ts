import type { ValidationRequest, ValidationResult } from '../../shared/types';

export abstract class ValidationHandler {
  protected next: ValidationHandler | null = null;

  setNext(handler: ValidationHandler): ValidationHandler {
    this.next = handler;
    return handler;
  }

  handle(request: ValidationRequest): ValidationResult {
    const result = this.validate(request);
    if (!result.isValid) return result;
    return this.next?.handle(request) ?? { isValid: true, errors: [] };
  }

  protected abstract validate(request: ValidationRequest): ValidationResult;
}
