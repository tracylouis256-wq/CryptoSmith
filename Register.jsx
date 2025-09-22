import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/api'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      await auth.register({ email, password, name })
      navigate('/login')
    }catch(err){
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        {error && <div className="mb-2 text-red-400">{error}</div>}
        <input className="input mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input mb-4" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 rounded bg-accent text-black font-semibold">Register</button>
      </form>
    </div>
  )
}
