/**
 * Mock implementation of TodoService for testing.
 * This mock allows controlling API responses and tracking calls
 * for testing components that use TodoService.
 */

import { vi } from 'vitest'
import type { ApiResponse, Todo } from '../todo-service'

export class MockTodoService {
  getTodoById = vi.fn(async (id: number): Promise<ApiResponse<Todo>> => {
    return {
      data: {
        id,
        title: 'Mock Todo',
        completed: false,
        userId: 1
      },
      status: 200
    }
  })

  createTodo = vi.fn(async (todo: Omit<Todo, 'id'>): Promise<ApiResponse<Todo>> => {
    return {
      data: {
        ...todo,
        id: Math.floor(Math.random() * 1000) + 1
      },
      status: 201
    }
  })

  updateTodo = vi.fn(async (id: number, updates: Partial<Omit<Todo, 'id'>>): Promise<ApiResponse<Todo>> => {
    return {
      data: {
        id,
        title: 'Mock Todo',
        completed: false,
        userId: 1,
        ...updates
      },
      status: 200
    }
  })

  deleteTodo = vi.fn(async (id: number): Promise<ApiResponse<void>> => {
    return {
      data: undefined,
      status: 204
    }
  })
}
