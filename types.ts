export interface ExpenseCategories {
  housing: number;
  food: number;
  consumables: number;
  medical: number;
  transport: number;
  hobbies: number; // Corresponds to "Electronic Girlfriend"
}

export type ExpenseKey = keyof ExpenseCategories;

export interface SimulationResult {
  yearsToGoal: number;
  isAchievable: boolean;
  yearlySavings: number;
}