import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import routes from './routes.jsx'
import { Navbar } from './components/Navbar.jsx'

export default function Main() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </div>
  )
}