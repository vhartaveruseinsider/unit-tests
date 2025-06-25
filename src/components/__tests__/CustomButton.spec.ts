/**
 * CustomButton Component Tests
 * 
 * Testing Strategy:
 * 1. Focus on observable behavior and output
 * 2. Test what the user sees and interacts with
 * 3. Don't test implementation details (computed properties)
 * 4. Verify component state through its visible effects
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createWrapper } from '../../test/test-utils'
import { dataTestIds } from '../../test/dataTestIds'
import CustomButton from '../CustomButton.vue'

describe('CustomButton', () => {
  let wrapper: ReturnType<typeof createWrapper>
  const ids = dataTestIds.button

  // Create component with minimum required props
  beforeEach(() => {
    wrapper = createWrapper(CustomButton, {
      props: { label: 'Click me' }
    })
  })

  /**
   * Content Tests
   * Test what the user sees in the UI
   */
  it('renders with correct label', () => {
    const button = wrapper.findByTestId(ids.root)
    expect(button.textContent?.trim()).toBe('Click me')
  })

  /**
   * Event Tests
   * Test component's public API through events
   */
  it('emits click event when clicked', async () => {
    const button = wrapper.findByTestId(ids.root)
    await button.click()
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  /**
   * State-Based Visual Tests
   * Instead of testing computed properties directly,
   * we test their visible effects
   */
  describe('when disabled', () => {
    beforeEach(() => {
      wrapper = createWrapper(CustomButton, {
        props: {
          label: 'Click me',
          disabled: true
        }
      })
    })

    it('shows disabled state visually', () => {
      const button = wrapper.findByTestId(ids.root)
      // Test the outcome of buttonClasses computed property
      expect(button.classList.contains('custom-button--disabled')).toBe(true)
    })

    it('prevents user interaction', () => {
      const button = wrapper.findByTestId(ids.root) as HTMLButtonElement
      expect(button.disabled).toBe(true)
    })

    it('does not emit click events', async () => {
      const button = wrapper.findByTestId(ids.root)
      await button.click()
      expect(wrapper.emitted()).not.toHaveProperty('click')
    })
  })

  /**
   * Dynamic Behavior Tests
   * Test how component adapts to different props
   */
  describe('with name prop', () => {
    it('uses dynamic test ID', () => {
      wrapper = createWrapper(CustomButton, {
        props: {
          label: 'Click me',
          name: 'submit'
        }
      })
      
      // Test the outcome of testId computed property
      const button = wrapper.findByTestId(ids.withName('submit'))
      expect(button).toBeTruthy()
    })
  })
})
