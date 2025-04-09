"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password")
      return
    }

    // In a real application, you would verify credentials with your backend
    // For now, we'll just simulate a successful login

    // Clear any previous errors
    setError("")

    // Redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>JWH Manager</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

