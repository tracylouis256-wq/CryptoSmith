import { useState, useEffect } from 'react'

export default function useAuth(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('cs_token')
    if(token) setUser({ token })
  }, [])

  const login = (token) => {
    localStorage.setItem('cs_token', token)
    setUser({ token })
  }
  const logout = () => {
    localStorage.removeItem('cs_token')
    setUser(null)
  }

  return { user, login, logout }
}
