import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout(){
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="p-6 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
