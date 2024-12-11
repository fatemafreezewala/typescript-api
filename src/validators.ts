import { Product, Service, Subscription } from "./types";

// Validation result interface
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Generic validation function
export const validateProduct = (data: Partial<Product>): ValidationResult => {
  if (!data.name) {
    return { isValid: false, error: "'name' is required for 'product'" };
  }
  if (typeof data.price !== "number") {
    return {
      isValid: false,
      error: "'price' is required and must be a number for 'product'",
    };
  }
  return { isValid: true };
};

export const validateService = (data: Partial<Service>): ValidationResult => {
  if (!data.name) {
    return { isValid: false, error: "'name' is required for 'service'" };
  }
  if (typeof data.duration !== "number") {
    return {
      isValid: false,
      error: "'duration' is required and must be a number for 'service'",
    };
  }
  return { isValid: true };
};

export const validateSubscription = (
  data: Partial<Subscription>
): ValidationResult => {
  if (!data.name) {
    return { isValid: false, error: "'name' is required for 'subscription'" };
  }
  if (typeof data.price !== "number") {
    return {
      isValid: false,
      error: "'price' is required and must be a number for 'subscription'",
    };
  }
  if (!data.billingCycle) {
    return {
      isValid: false,
      error:
        "'billingCycle' is required and must be a string for 'subscription'",
    };
  }
  return { isValid: true };
};
