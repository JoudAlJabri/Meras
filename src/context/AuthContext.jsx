import { createContext, useContext, useState, useEffect } from 'react'
import { apiGetMe } from '../api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Restore session from stored token on app load
  useEffect(() => {
    const token = localStorage.getItem('meras_token')
    if (!token) {
      setAuthLoading(false)
      return
    }
    apiGetMe(token)
      .then(({ user }) => setCurrentUser(user))
      .catch(() => localStorage.removeItem('meras_token'))
      .finally(() => setAuthLoading(false))
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('meras_token', token)
    setCurrentUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('meras_token')
    setCurrentUser(null)
  }

  const getToken = () => localStorage.getItem('meras_token')

  const isAuthenticated = currentUser !== null

  if (authLoading) return null

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
