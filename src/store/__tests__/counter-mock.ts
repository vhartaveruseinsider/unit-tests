/**
 * This file contains a mock implementation of the counter store
 * for use in component tests. This mock follows the same interface
 * as the real counter store but allows for controlled behavior
 * in tests.
 */

import { ref } from 'vue'
import { vi } from 'vitest'
import type { Ref } from 'vue'

type MockFunction = ReturnType<typeof vi.fn>

interface CounterStore {
  count: Ref<number>
  increment: MockFunction
  decrement: MockFunction
  reset: MockFunction
}

/**
 * Creates a mock implementation of the counter store with controlled behavior
 * and spies for all methods. This allows tests to verify interactions with
 * the store without using the real implementation.
 * 
 * @param initialValue - Optional initial value for the counter
 * @returns A mocked counter store instance with spies for all methods
 */
export function createMockCounterStore(initialValue = 0): CounterStore {
  const count = ref(initialValue)

  // Create spy functions for all methods
  const mockIncrement = vi.fn(() => {
    count.value++
  })

  const mockDecrement = vi.fn(() => {
    count.value--
  })

  const mockReset = vi.fn(() => {
    count.value = initialValue
  })

  return {
    count,
    increment: mockIncrement,
    decrement: mockDecrement,
    reset: mockReset
  }
}
