import '@testing-library/jest-dom'
import { expect } from 'vitest'

expect.extend({
  toBeInTheDocument(received: any) {
    if (received === null) {
      return {
        pass: false,
        message: () => 'element could not be found in the document',
      }
    }
    return {
      pass: true,
      message: () => 'element was found in the document',
    }
  },
  toBeDisabled(received: any) {
    const pass = received.disabled === true
    return {
      pass,
      message: () => pass
        ? 'element is disabled'
        : 'element is not disabled',
    }
  },
})
