/**
 * CustomButton component factory
 * 
 * This factory demonstrates:
 * 1. Type-safe props
 * 2. Default configuration
 * 3. Flexible customization
 * 4. Clear documentation
 */
import { createWrapper } from '../test-utils'
import CustomButton from '../../components/CustomButton.vue'
import type { RenderOptions } from '@testing-library/vue'

export interface CustomButtonProps {
  label: string
  disabled?: boolean
  name?: string
}

export interface CustomButtonOptions extends Omit<RenderOptions<typeof CustomButton>, 'props'> {
  props?: CustomButtonProps
}

/**
 * Creates a CustomButton component for testing
 * @param options Configuration options including props and render options
 * @returns A wrapped component with test utilities
 * 
 * @example
 * const button = createCustomButton({
 *   props: { label: 'Click me', name: 'submit' }
 * })
 */
export function createCustomButton(options: CustomButtonOptions = {}) {
  return createWrapper(CustomButton, {
    props: {
      label: 'Default Label',
      ...options.props
    },
    ...options
  })
}
