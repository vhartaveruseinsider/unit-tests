/**
 * Mock implementation of an API service using axios.
 * This service demonstrates proper error handling, typing,
 * and follows best practices for testable API calls.
 */

import axios, { AxiosError } from 'axios'

export interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export interface ApiResponse<T> {
  data: T
  status: number
}

export class TodoService {
  private baseUrl = 'https://jsonplaceholder.typicode.com'

  /**
   * Fetches a todo item by its ID
   * @param id - The ID of the todo to fetch
   * @returns Promise with the todo item
   */
  async getTodoById(id: number): Promise<ApiResponse<Todo>> {
    try {
      const response = await axios.get<Todo>(`${this.baseUrl}/todos/${id}`)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to fetch todo #${id}: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Creates a new todo item
   * @param todo - The todo item to create (without ID)
   * @returns Promise with the created todo item
   */
  async createTodo(todo: Omit<Todo, 'id'>): Promise<ApiResponse<Todo>> {
    try {
      const response = await axios.post<Todo>(`${this.baseUrl}/todos`, todo)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to create todo: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Updates an existing todo item
   * @param id - The ID of the todo to update
   * @param updates - The fields to update
   * @returns Promise with the updated todo item
   */
  async updateTodo(id: number, updates: Partial<Omit<Todo, 'id'>>): Promise<ApiResponse<Todo>> {
    try {
      const response = await axios.patch<Todo>(`${this.baseUrl}/todos/${id}`, updates)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to update todo #${id}: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Deletes a todo item
   * @param id - The ID of the todo to delete
   * @returns Promise with the deletion status
   */
  async deleteTodo(id: number): Promise<ApiResponse<{}>> {
    try {
      const response = await axios.delete(`${this.baseUrl}/todos/${id}`)
      return {
        data: {},
        status: response.status
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to delete todo #${id}: ${error.message}`)
      }
      throw error
    }
  }
}
