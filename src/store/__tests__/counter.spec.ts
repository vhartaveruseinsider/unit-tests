/**
 * Unit tests for the counter store.
 * These tests follow black-box testing principles by focusing on
 * observable behaviors rather than internal implementation details.
 */

import { describe, expect, it } from 'vitest'
import { useCounter } from '../counter'

describe('useCounter', () => {
  it('initializes with a default value of 0', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  it('initializes with a provided value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  describe('increment', () => {
    it('increases the count by 1', () => {
      const { count, increment } = useCounter(0)
      increment()
      expect(count.value).toBe(1)
    })

    it('can be called multiple times', () => {
      const { count, increment } = useCounter(0)
      increment()
      increment()
      increment()
      expect(count.value).toBe(3)
    })
  })

  describe('decrement', () => {
    it('decreases the count by 1', () => {
      const { count, decrement } = useCounter(5)
      decrement()
      expect(count.value).toBe(4)
    })

    it('can go into negative numbers', () => {
      const { count, decrement } = useCounter(0)
      decrement()
      expect(count.value).toBe(-1)
    })

    it('can be called multiple times', () => {
      const { count, decrement } = useCounter(5)
      decrement()
      decrement()
      decrement()
      expect(count.value).toBe(2)
    })
  })

  describe('reset', () => {
    it('resets the count to the initial value', () => {
      const { count, increment, reset } = useCounter(5)
      increment()
      increment()
      expect(count.value).toBe(7)
      reset()
      expect(count.value).toBe(5)
    })

    it('resets to 0 when no initial value was provided', () => {
      const { count, increment, reset } = useCounter()
      increment()
      increment()
      expect(count.value).toBe(2)
      reset()
      expect(count.value).toBe(0)
    })
  })

  describe('store behavior', () => {
    it('maintains independent state between instances', () => {
      const counter1 = useCounter(0)
      const counter2 = useCounter(10)

      counter1.increment()
      counter2.decrement()

      expect(counter1.count.value).toBe(1)
      expect(counter2.count.value).toBe(9)
    })

    it('preserves reactivity when returning count', () => {
      const { count, increment } = useCounter(0)
      expect(count.value).toBe(0)
      increment()
      expect(count.value).toBe(1)
    })
  })
})
