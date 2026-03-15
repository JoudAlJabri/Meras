// Authentication system
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) { // component
  const [currentUser, setCurrentUser] = useState(null) // State

  // currentUser will look like:
  // { id: 1, name: 'Sara', email: 'sara@gmail.com', role: 'explorer' }
  // role can be: 'explorer', 'guide', 'admin'

  const login = (userData) => {
    setCurrentUser(userData)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const isAuthenticated = currentUser !== null

  return (
    <AuthContext.Provider value={{  // Provide data to the entire app -> This shares these values globally: (currentUser, login,logout, and isAthenticated) now any component can access them
      currentUser, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook so you can use auth anywhere with just:
// const { currentUser, login, logout } = useAuth() Instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext)
}