# Copilot Instructions: Component-Based Testing

When generating unit tests for this Vue project, follow these specific guidelines to maintain consistency with our established testing patterns.

## Core Testing Principles

1. **Component-Based Testing Focus**
   - Test components as a user would interact with them
   - Focus on visible outputs and behavior, not implementation details
   - Test what the component does, not how it does it

2. **Test Structure Pattern**
   - Place tests in `__tests__` folder next to the implementation files
   - Name test files `ComponentName.spec.ts` matching the component name exactly
   - Structure tests with descriptive `describe` and `it` blocks with clear user-focused language

3. **Reuse Existing Utilities**
   - Use the project's `createWrapper` utility from `src/test/test-utils.ts`
   - Use component factory functions from `src/test/factories/` directory
   - Create new factory functions following existing patterns when needed
   - Use `dataTestIds` from `src/test/dataTestIds.ts` for element selection

## Test File Structure

Follow this structure for consistency:

```typescript
/**
 * ComponentName Component Tests
 * 
 * Testing Strategy:
 * 1. Focus on user interactions and visible outcomes
 * 2. Use data-testid selectors for reliable element selection
 * 3. Test component behavior, not implementation
 * 4. Group related tests logically
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { dataTestIds } from '../../test/dataTestIds'
import { createComponentName } from '../../test/factories/component-name'
import type { CustomWrapper } from '../../test/test-utils'

describe('ComponentName', () => {
  // Use the dedicated factory for consistent component creation
  let wrapper: CustomWrapper
  const ids = dataTestIds.componentName

  beforeEach(() => {
    wrapper = createComponentName()
  })

  /**
   * Initial State Tests
   * Verify the component starts in the correct state
   */
  it('renders initial state correctly', () => {
    // Test what user sees, not internal state
  })

  /**
   * User Interaction Tests
   * Each test follows the pattern:
   * 1. Find interactive element
   * 2. Simulate user action
   * 3. Verify visible outcome
   */
  it('responds appropriately to user interaction', async () => {
    // Simulate user interaction
    // Verify what user sees after action
  })
})
```

## Element Selection

- **Always** use `data-testid` selectors via `wrapper.findByTestId(ids.elementId)` 
- **Never** use CSS selectors, classes, or IDs for element selection
- Use the centralized `dataTestIds` object for all test IDs

## Component Factory Pattern

When creating factories for new components:

```typescript
/**
 * ComponentName component factory
 */
import { createWrapper } from '../test-utils'
import ComponentName from '../../components/ComponentName.vue'
import type { RenderOptions } from '@testing-library/vue'

export interface ComponentNameOptions extends RenderOptions<typeof ComponentName> {
  // Add component-specific options here
}

export function createComponentName(options: ComponentNameOptions = {}) {
  return createWrapper(ComponentName, {
    props: {
      // Default props
      ...options.props,
    },
    ...options
  })
}
```

## Test Data IDs

When adding new components, add their test IDs to the central `dataTestIds.ts` file:

```typescript
export const dataTestIds = {
  // ...existing components
  componentName: {
    elementId: 'component-name-element-id',
    buttonId: 'component-name-button-id'
  }
} as const
```

## Testing User Interactions

1. Find elements using test IDs
2. Trigger events using testing-library methods (`click()`, `input()`, etc.)
3. Verify visible outcomes (text content, classes, etc.)

```typescript
it('shows success message when form is submitted', async () => {
  // Setup
  await wrapper.findByTestId(ids.nameInput).setValue('Test User')
  
  // Action
  await wrapper.findByTestId(ids.submitButton).click()
  
  // Assertion - verify what the user would see
  expect(wrapper.findByTestId(ids.message).textContent).toBe('Success!')
})
```

## DON'T

- Don't test implementation details or private methods
- Don't access component internals
- Don't create new testing patterns or utilities when existing ones can be used
- Don't use snapshot testing for components
- Don't test framework behavior

Remember: Tests should verify component behavior from a user's perspective, not implementation details.
