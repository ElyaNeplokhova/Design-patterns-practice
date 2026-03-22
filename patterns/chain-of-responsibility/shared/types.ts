export interface ValidationRequest {
  field: string;
  value: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
