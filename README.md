# Vue Testing Best Practices
## Pain points
Pain points what is wrong and why => Go over to solution.

## Business Value: The Bottom Line

### 1. Cost Reduction & ROI
- **Catch Bugs Early, Save Money**: 4-5x cost savings compared to fixing in production
- **Ship Faster**: 20-30% faster feature delivery through confident iterations
- **Cut Maintenance Costs**: 40% reduction in maintenance time for well-tested code

### 2. Risk Management & Quality Assurance
- **Protect Your Business**: 60% fewer critical bugs reaching customers
- **Deploy with Confidence**: Safer, more frequent releases with minimal rollbacks
- **Maintain Business Operations**: Lower risk of service disruptions affecting revenue

### 3. Market Advantage & Customer Satisfaction
- **Beat Competitors to Market**: Accelerated feature delivery without sacrificing quality
- **Keep Customers Happy**: More reliable application with fewer disruptions
- **Build Brand Trust**: Reputation for delivering stable, high-quality software

### 4. Future-Proofing & Scalability
- **Adapt to Change**: Easier framework updates and migrations (e.g., Vue 3)
- **Enable Innovation**: Safer experimentation with new features and technologies
- **Scale with Confidence**: Code quality that grows reliably with your business


## Core Testing Principles

### 1. Test Behavior, Not Implementation ([vue test utils docs](https://test-utils.vuejs.org/guide/essentials/easy-to-test.html))

✅ **Do**:
- Test what the user sees and interacts with ( test public interface, not private )
- Focus on component outputs and user-visible behavior
- Verify template content and user interactions
- Test events and side effects (Vuex, Router, API calls)

❌ **Don't**:
- Test implementation details (private methods, state management internals) - it will be used for composables in vue 3 later, but only output(contract) 
- Rely on specific variable names or internal function calls
- Test framework functionality
- With migrating to vue3 half of unit test will break. Since vm will not be reactive as in vue 2. They did it on purpose.
Test public stuff, not private. Since we need to expose what we want to test, might be a bit troublesome. 

### 2. User-Centric Testing Approach

Focus on what matters to users:
- User interactions
- Displayed content
- Application behavior
- Error states and messages

Benefits:
- Catches real bugs that affect users
- Provides confidence in application behavior
- Tests remain valid during refactoring
- Closer to real application usage

### 3. Component Testing Strategy

#### Black Box Testing
Treat components as black boxes:
- Test props and events (the public API)
- Verify rendered output
- Test user interactions
- Don't test component internals

#### Component Integration
- Test parent-child component interactions through props
- Verify event handling
- Focus on component contracts, not implementation

### 4. Test Organization - what can be useful for us

#### Component Factory Pattern
```typescript
// factories/counter.ts
export function createCounter(options = {}) {
  return createWrapper(Counter, {
    props: {
      initialValue: 0,
      ...options
    }
  })
}
```

#### Element Finding Helpers
```typescript
// test-utils.ts
export function findButtonByTestId(wrapper: Wrapper, id: string) {
  return wrapper.findByTestId(id) as HTMLButtonElement
}

export function findTextContent(wrapper: Wrapper, testId: string) {
  return wrapper.findByTestId(testId).textContent
}
```

#### Centralized Test IDs
```typescript
// dataTestIds.ts
export const dataTestIds = {
  counter: {
    value: 'counter-value',
    incrementButton: 'increment-button'
  },
  // ... other components
} as const
```

#### Wrapper Extension
```typescript
interface CustomWrapper {
  findByTestId: (id: string) => HTMLElement
  getTextContent: (id: string) => string
  clickButton: (id: string) => Promise<void>
}
```

#### Factory Functions
```typescript
interface FactoryOptions {
  props?: Record<string, any>
  slots?: Record<string, any>
  global?: Record<string, any>
}

function createComponent<T>(
  component: T,
  options: FactoryOptions = {}
): CustomWrapper {
  // Component creation logic
}
```

### 5. Best Practices

#### Data Attributes
- Use data-testid for element selection
- Keep test IDs in a centralized location
- Use meaningful and descriptive IDs

```vue
<template>
  <button :data-testid="ids.incrementButton">
    {{ label }}
  </button>
</template>
```

#### Test Structure
```typescript
describe('Component', () => {
  // Factory setup
  const createComponent = (options = {}) => {
    return createWrapper(Component, options)
  }

  // Focus on behavior
  it('shows success message when task completes', async () => {
    const wrapper = createComponent()
    await wrapper.find('[data-testid="submit"]').trigger('click')
    expect(wrapper.find('[data-testid="message"]').text()).toBe('Success!')
  })
})
```
- Verify side effects through user actions

### 7. Testing Pyramid

1. **Unit/Component Tests** (Now we have mostly unit tests mixed with vue components)
   - Individual components
   - Props and events
   - User interactions

2. **Integration Tests**
   - Component combinations
   - Route transitions
   - State management


### 8. Working with AI/Copilot

When working with AI tools:
1. Provide clear testing patterns and guidelines
2. Share component factory patterns
3. Emphasize user-centric testing approach
4. Include examples of good and bad tests
5. Reference this documentation for consistency

We can add it to ai instructions(I can provide sample), so we make ai model to be aware of our tructure and needs

### 9. Test Example

```typescript
import { dataTestIds } from '@/test/dataTestIds'
import { createCounter } from '@/test/factories/counter'

describe('Counter', () => {
  const ids = dataTestIds.counter
  
  it('increments value when user clicks button', async () => {
    const wrapper = createCounter()
    
    await wrapper.findByTestId(ids.incrementButton).click()
    
    expect(wrapper.findByTestId(ids.value).textContent)
      .toBe('Counter: 1')
  })
})
```

## Additional Resources

- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/)


## Automated Component Testing Strategy

We should prioritize component tests over unit tests since they provide greater business value by testing actual user interfaces and behaviors, and implement them automatically via GitHub Actions to ensure consistent coverage with minimal developer effort.
@EvgeniyAreshkin suggested to make a rule to create component tests and for unit tests(computed, methods) add github action to generate with ai. 

### GitHub Actions Workflow Example

```yaml
# .github/workflows/component-tests.yml
name: Component Test Coverage

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]

jobs:
  test-components:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate AI Component Tests
        run: npm run generate-component-tests
        
      - name: Run Component Tests
        run: npm run test:components
        
      - name: Report Component Coverage
        uses: coverallsapp/github-action@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
