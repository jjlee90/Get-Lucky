import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import "./App.scss"
import "./scss/style.scss"
// import store from "./store"
import Dashboard from "./components/pages/Dashboard"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
