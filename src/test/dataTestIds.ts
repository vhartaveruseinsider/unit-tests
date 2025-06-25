/**
 * Centralized test IDs for component selectors.
 * Benefits of this approach:
 * 1. Single source of truth for all test IDs
 * 2. TypeScript autocompletion and type safety
 * 3. Easy refactoring - change ID in one place
 * 4. Clear contract between components and tests
 */

export const dataTestIds = {
  // Group test IDs by component for better organization
  counter: {
    // IDs reflect user-visible elements and actions
    value: 'counter-value',
    incrementButton: 'increment-button',
    decrementButton: 'decrement-button',
    resetButton: 'reset-button'
  },
  
  // Reusable component with dynamic ID generation
  button: {
    // Default ID for basic usage
    root: 'custom-button',
    // Factory function for dynamic IDs based on button purpose
    withName: (name: string) => `custom-button-${name}`
  }
} as const  // Use const assertion for better type inference
