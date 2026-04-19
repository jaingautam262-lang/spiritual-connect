export interface CalculatorFormData {
  name: string;
  gender: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  tob: {
    hour: string;
    minute: string;
    second: string;
    unknown: boolean;
  };
  placeOfBirth: string;
}

export interface CalculatorResult {
  calculated: boolean;
  data: Record<string, unknown>;
}
