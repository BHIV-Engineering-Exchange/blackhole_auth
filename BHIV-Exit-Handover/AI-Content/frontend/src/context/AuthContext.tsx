import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI, AuthResponse } from '../services/api'

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      const savedUser = localStorage.getItem('user')
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser))
          // Optionally verify token with backend
          // await authAPI.getProfile()
        } catch (err) {
          console.error('Auth check failed:', err)
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await authAPI.login({ username, password })
      
      // Store token
      localStorage.setItem('authToken', response.access_token)
      
      // Fetch and store user profile
      try {
        const profile = await authAPI.getProfile()
        const userData: User = {
          id: profile.id || profile.user_id,
          username: profile.username,
          email: profile.email || '',
        }
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      } catch (profileError) {
        // Fallback if profile fetch fails
        const userData: User = {
          id: '',
          username,
          email: '',
        }
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await authAPI.register({ username, email, password })
      
      // Auto-login after registration
      localStorage.setItem('authToken', response.access_token)
      
      const userData: User = {
        id: response.user?.id || '',
        username: response.user?.username || username,
        email: response.user?.email || email,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Registration failed. Please try again.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const clearError = () => setError(null)

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    error,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
