import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import BotBuilder from './pages/BotBuilder'
import BotDetail from './pages/BotDetail'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route element={<Layout/>}>
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/bots/new" element={<ProtectedRoute><BotBuilder/></ProtectedRoute>} />
        <Route path="/bots/:id" element={<ProtectedRoute><BotDetail/></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  )
}
