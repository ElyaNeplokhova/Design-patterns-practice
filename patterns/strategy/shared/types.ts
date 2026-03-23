export interface ShippingRequest {
  weightKg: number;
  distanceKm: number;
  orderTotal: number;
}

export interface ShippingResult {
  method: string;
  cost: number;
  estimatedDays: number;
}

export interface ShippingStrategy {
  calculate(request: ShippingRequest): ShippingResult;
}
