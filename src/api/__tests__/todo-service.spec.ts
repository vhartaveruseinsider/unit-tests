/**
 * Unit tests for TodoService.
 * These tests verify API interaction patterns and error handling.
 */

import { describe, expect, it, vi, beforeEach } from 'vitest'
import axios, { AxiosError } from 'axios'
import type { Todo } from '../todo-service'
import { TodoService } from '../todo-service'

// Mock axios module
vi.mock('axios')

describe('TodoService', () => {
  let todoService: TodoService

  beforeEach(() => {
    todoService = new TodoService()
    vi.clearAllMocks()
  })

  describe('getTodoById', () => {
    const mockTodo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      userId: 1
    }

    it('successfully fetches a todo by id', async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: mockTodo,
        status: 200
      })

      const result = await todoService.getTodoById(1)

      expect(vi.mocked(axios.get)).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1')
      expect(result).toEqual({
        data: mockTodo,
        status: 200
      })
    })

    it('handles network errors appropriately', async () => {
      const errorMessage = 'Network Error'
      const error = new AxiosError()
      error.message = errorMessage
      vi.mocked(axios.get).mockRejectedValueOnce(error)

      await expect(todoService.getTodoById(1)).rejects.toThrow(
        `Failed to fetch todo #1: ${errorMessage}`
      )
    })
  })

  describe('createTodo', () => {
    const newTodo = {
      title: 'New Todo',
      completed: false,
      userId: 1
    }

    const createdTodo: Todo = {
      ...newTodo,
      id: 1
    }

    it('successfully creates a new todo', async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        data: createdTodo,
        status: 201
      })

      const result = await todoService.createTodo(newTodo)

      expect(vi.mocked(axios.post)).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        newTodo
      )
      expect(result).toEqual({
        data: createdTodo,
        status: 201
      })
    })

    it('handles creation errors appropriately', async () => {
      const errorMessage = 'Failed to create todo'
      const error = new AxiosError()
      error.message = errorMessage
      vi.mocked(axios.post).mockRejectedValueOnce(error)

      await expect(todoService.createTodo(newTodo)).rejects.toThrow(
        `Failed to create todo: ${errorMessage}`
      )
    })
  })

  describe('updateTodo', () => {
    const updates = {
      title: 'Updated Todo',
      completed: true
    }

    const updatedTodo: Todo = {
      id: 1,
      userId: 1,
      ...updates
    }

    it('successfully updates a todo', async () => {
      vi.mocked(axios.patch).mockResolvedValueOnce({
        data: updatedTodo,
        status: 200
      })

      const result = await todoService.updateTodo(1, updates)

      expect(vi.mocked(axios.patch)).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/1',
        updates
      )
      expect(result).toEqual({
        data: updatedTodo,
        status: 200
      })
    })

    it('handles update errors appropriately', async () => {
      const errorMessage = 'Failed to update todo'
      const error = new AxiosError()
      error.message = errorMessage
      vi.mocked(axios.patch).mockRejectedValueOnce(error)

      await expect(todoService.updateTodo(1, updates)).rejects.toThrow(
        `Failed to update todo #1: ${errorMessage}`
      )
    })
  })

  describe('deleteTodo', () => {
    it('successfully deletes a todo', async () => {
      vi.mocked(axios.delete).mockResolvedValueOnce({
        data: {},
        status: 200
      })

      const result = await todoService.deleteTodo(1)

      expect(vi.mocked(axios.delete)).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
      expect(result).toEqual({
        data: {},
        status: 200
      })
    })

    it('handles deletion errors appropriately', async () => {
      const errorMessage = 'Failed to delete todo'
      const error = new AxiosError()
      error.message = errorMessage
      vi.mocked(axios.delete).mockRejectedValueOnce(error)

      await expect(todoService.deleteTodo(1)).rejects.toThrow(
        `Failed to delete todo #1: ${errorMessage}`
      )
    })
  })
})
