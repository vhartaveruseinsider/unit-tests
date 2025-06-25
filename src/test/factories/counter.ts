/**
 * Counter component factory
 * 
 * Benefits of using a factory:
 * 1. Consistent component creation across tests
 * 2. Encapsulates setup logic
 * 3. Makes tests more maintainable
 * 4. Provides type safety for props and options
 */
import { createWrapper } from '../test-utils'
import Counter from '../../components/Counter.vue'
import type { RenderOptions } from '@testing-library/vue'

export interface CounterOptions extends RenderOptions<typeof Counter> {
  initialValue?: number
}

export function createCounter(options: CounterOptions = {}) {
  const { initialValue, ...renderOptions } = options
  
  return createWrapper(Counter, {
    props: {
      ...(initialValue !== undefined && { initialValue }),
    },
    ...renderOptions
  })
}
