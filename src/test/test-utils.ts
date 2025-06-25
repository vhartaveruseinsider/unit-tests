/**
 * Test utilities that follow user-centric testing principles:
 * - Focus on user interactions and visible content
 * - Avoid implementation details
 * - Provide meaningful, reusable helper functions
 */

import { render as tlRender } from '@testing-library/vue'
import { vi } from 'vitest'
import type { RenderOptions } from '@testing-library/vue'

/**
 * CustomWrapper interface defines methods that focus on user-visible aspects:
 * - findByTestId: Finds elements by data-testid (preferred over class/id selectors)
 * - getByText: Finds elements by their visible text content
 * - emitted: Checks component events (part of public API)
 * - html: Gets rendered content for debugging
 */
export interface CustomWrapper {
  findByTestId: (id: string) => HTMLElement
  getByText: (text: string | RegExp) => HTMLElement
  emitted: () => Record<string, any[]>
  html: () => string
  unmount: () => void
}

/**
 * Factory function to create component wrappers with consistent configuration.
 * This approach:
 * - Provides a standardized way to create components for testing
 * - Encapsulates test setup logic
 * - Makes tests more maintainable and consistent
 * 
 * @example
 * const wrapper = createWrapper(MyComponent, {
 *   props: { title: 'Hello' }
 * })
 */
export function createWrapper<T = any>(Component: T, options: RenderOptions<T> = {}): CustomWrapper {
  const utils = tlRender(Component, {
    global: {
      stubs: {
        transition: false,
        ...options?.global?.stubs,
      },
      ...options.global,
    },
    ...options,
  })

  // Return only methods that focus on user-visible behavior
  return {
    // Prefer data-testid selectors over implementation details
    findByTestId: (id: string) => {
      return utils.container.querySelector(`[data-testid="${id}"]`) as HTMLElement
    },
    // Find elements by their visible text (user-centric)
    getByText: utils.getByText,
    // Access emitted events (component's public API)
    emitted: utils.emitted,
    // For debugging purposes
    html: () => utils.container.innerHTML,
    unmount: utils.unmount
  }
}

export { vi }
