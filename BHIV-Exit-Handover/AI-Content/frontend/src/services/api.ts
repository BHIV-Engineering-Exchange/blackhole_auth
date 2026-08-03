import axios, { AxiosError } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000'

// Export API_BASE_URL for use in components
export { API_BASE_URL }

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

// Auth API
export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user?: {
    id: string
    username: string
    email: string
  }
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Backend expects form data for login
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)
    
    const response = await api.post<AuthResponse>('/users/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/register', credentials)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  getDemoLogin: async () => {
    const response = await api.get('/demo-login')
    return response.data
  },
}

// Content/Upload API
export interface UploadResponse {
  content_id: string
  message: string
  file_path?: string
  content_type?: string
}

export const contentAPI = {
  uploadFile: async (file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    // Backend requires title field
    formData.append('title', file.name.replace(/\.[^/.]+$/, '')) // filename without extension
    formData.append('description', `Uploaded file: ${file.name}`)
    
    const response = await api.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      },
    })
    return response.data
  },

  generateVideo: async (contentId: string) => {
    const response = await api.post('/generate-video', { content_id: contentId })
    return response.data
  },

  getContent: async (contentId: string) => {
    const response = await api.get(`/content/${contentId}`)
    return response.data
  },

  listContents: async () => {
    const response = await api.get('/contents')
    return response.data
  },

  downloadVideo: async (contentId: string) => {
    const response = await api.get(`/download/${contentId}`, {
      responseType: 'blob',
    })
    return response.data
  },

  streamVideo: (contentId: string) => {
    return `${API_BASE_URL}/stream/${contentId}`
  },
}

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health')
    return response.data
  },
}

export default api
