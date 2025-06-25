/**
 * Unit tests for the counter store mock.
 * These tests verify that our mock implementation correctly
 * tracks calls and maintains expected behavior.
 */

import { describe, expect, it } from 'vitest'
import { createMockCounterStore } from './counter-mock'

describe('createMockCounterStore', () => {
  it('initializes with default value of 0', () => {
    const store = createMockCounterStore()
    expect(store.count.value).toBe(0)
  })

  it('initializes with provided value', () => {
    const store = createMockCounterStore(5)
    expect(store.count.value).toBe(5)
  })

  describe('increment', () => {
    it('increases the count and tracks calls', () => {
      const store = createMockCounterStore(0)
      store.increment()
      expect(store.count.value).toBe(1)
      expect(store.increment).toHaveBeenCalledTimes(1)
    })
  })

  describe('decrement', () => {
    it('decreases the count and tracks calls', () => {
      const store = createMockCounterStore(5)
      store.decrement()
      expect(store.count.value).toBe(4)
      expect(store.decrement).toHaveBeenCalledTimes(1)
    })
  })

  describe('reset', () => {
    it('resets to initial value and tracks calls', () => {
      const store = createMockCounterStore(5)
      store.increment()
      store.increment()
      expect(store.count.value).toBe(7)
      store.reset()
      expect(store.count.value).toBe(5)
      expect(store.reset).toHaveBeenCalledTimes(1)
    })
  })

  describe('spy behavior', () => {
    it('allows mocking implementation', () => {
      const store = createMockCounterStore(0)
      store.increment.mockImplementation(() => {
        store.count.value += 2 // Double increment
      })
      store.increment()
      expect(store.count.value).toBe(2)
    })

    it('allows inspecting call arguments', () => {
      const store = createMockCounterStore(0)
      store.increment()
      store.increment()
      expect(store.increment.mock.calls).toHaveLength(2)
    })

    it('allows clearing call history', () => {
      const store = createMockCounterStore(0)
      store.increment()
      store.increment.mockClear()
      expect(store.increment).toHaveBeenCalledTimes(0)
    })

    it('maintains independent state between instances', () => {
      const store1 = createMockCounterStore(0)
      const store2 = createMockCounterStore(10)

      store1.increment()
      store2.decrement()

      expect(store1.count.value).toBe(1)
      expect(store2.count.value).toBe(9)
      expect(store1.increment).toHaveBeenCalledTimes(1)
      expect(store2.decrement).toHaveBeenCalledTimes(1)
    })
  })
})
