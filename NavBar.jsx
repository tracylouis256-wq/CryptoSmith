import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(){
  const token = localStorage.getItem('cs_token')
  const logout = () => { localStorage.removeItem('cs_token'); window.location.href = '/login' }

  return (
    <nav className="w-full p-4 bg-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">CryptoSmith</div>
        <div className="text-sm text-gray-300">Craft Your Trades. Perfect Your Profits.</div>
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/bots/new">Create Bot</Link>
            <button onClick={logout} className="px-3 py-1 bg-red-600 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
