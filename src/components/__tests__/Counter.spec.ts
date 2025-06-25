/**
 * Counter Component Tests
 * 
 * Testing Strategy:
 * 1. Focus on user interactions and visible outcomes
 * 2. Use data-testid selectors for reliable element selection
 * 3. Test component behavior, not implementation
 * 4. Group related tests logically
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { dataTestIds } from '../../test/dataTestIds'
import { createCounter } from '../../test/factories/counter'
import type { CustomWrapper } from '../../test/test-utils'

describe('Counter', () => {
  // Use the dedicated factory for consistent component creation
  let wrapper: CustomWrapper
  const ids = dataTestIds.counter

  beforeEach(() => {
    wrapper = createCounter()
  })

  /**
   * Initial State Tests
   * Verify the component starts in the correct state
   */
  it('renders initial counter value', () => {
    const counterValue = wrapper.findByTestId(ids.value)
    // Test what user sees, not internal state
    expect(counterValue.textContent).toBe('Counter: 0')
  })

  /**
   * User Interaction Tests
   * Each test follows the pattern:
   * 1. Find interactive element
   * 2. Simulate user action
   * 3. Verify visible outcome
   */
  it('increments counter when increment button is clicked', async () => {
    const incrementButton = wrapper.findByTestId(ids.incrementButton)
    // Simulate user interaction
    await incrementButton.click()
    
    // Verify what user sees after action
    const counterValue = wrapper.findByTestId(ids.value)
    expect(counterValue.textContent).toBe('Counter: 1')
  })

  it('decrements counter when decrement button is clicked', async () => {
    const decrementButton = wrapper.findByTestId(ids.decrementButton)
    await decrementButton.click()
    
    // Test visible outcome, not internal counter value
    const counterValue = wrapper.findByTestId(ids.value)
    expect(counterValue.textContent).toBe('Counter: -1')
  })

  /**
   * Complex Interaction Flow
   * Tests multiple user actions in sequence
   */
  it('resets counter when reset button is clicked', async () => {
    // First modify the state
    const incrementButton = wrapper.findByTestId(ids.incrementButton)
    await incrementButton.click()
    
    const counterValueAfterIncrement = wrapper.findByTestId(ids.value)
    expect(counterValueAfterIncrement.textContent).toBe('Counter: 1')
    
    // Then test reset functionality
    const resetButton = wrapper.findByTestId(ids.resetButton)
    await resetButton.click()
    
    // Verify final visible state
    const counterValueAfterReset = wrapper.findByTestId(ids.value)
    expect(counterValueAfterReset.textContent).toBe('Counter: 0')
  })
})
