import axios, { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const http = axios.create({
  baseURL,
  withCredentials: true,
})

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Only use client-side session (this file is bundled for the browser)
    const session = await getSession()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor for error handling
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

export const httpClient = {
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await http.get<T>(url, config)
    return response.data
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.post<T>(url, data, config)
    return response.data
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.put<T>(url, data, config)
    return response.data
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.patch<T>(url, data, config)
    return response.data
  },

  delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await http.delete<T>(url, config)
    return response.data
  },
}

export default httpClient
