import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

//hook to actually use the auth context
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('http://localhost:3000/api/sessions/verify', {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
        console.log(data.user)

        if (data.user.role === 'AUTHOR') {
          setIsAuthor(true)
        } else {
          setIsAuthor(false)
        }
      } else {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('token')
      }

    } catch (error) {
      console.error('Error verifying token', error)
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('token')
    }
  }

  const login = (token) => {
    localStorage.setItem('token', token)
    fetchUser()
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <AuthContext.Provider value={{ user,isAuthenticated, isAuthor, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
