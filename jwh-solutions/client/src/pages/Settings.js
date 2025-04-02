"use client"

import { useState } from "react"
import Sidebar from "../components/sidebar"
import "./Settings.css"

const Settings = () => {
  // Mock user data - in a real app, this would come from your authentication system
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
  })

  // State for form data
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    username: userData.username,
    phone: userData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false)

  // State for showing admin section
  const [showAdmin, setShowAdmin] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault()

    // Update the user data (mock update)
    setUserData((prev) => ({
      ...prev,
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
    }))

    // Show success message
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault()

    // Show success message
    setShowSuccess(true)

    // Clear password fields
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  // Check if user is admin
  const isAdmin = userData.role === "Administrator"

  // Mock users for admin section
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Administrator" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "User" },
  ]

  return (
    <div className="settings-container">
      <Sidebar />

      <main className="settings-content">
        <header className="settings-header">
          <div className="settings-title">
            <h1>Settings</h1>
            <div className="settings-subtitle">Manage your account</div>
          </div>
        </header>

        {showSuccess && <div className="success-message">Changes saved successfully!</div>}

        {/* Profile Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>Profile Information</h2>
            <p>Update your personal information</p>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>Change Password</h2>
            <p>Update your password</p>
          </div>

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" value={formData.currentPassword} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" value={formData.newPassword} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Admin Section - Only visible to admins */}
        {isAdmin && (
          <div className="settings-card">
            <div className="settings-card-header">
              <h2>User Management</h2>
              <p>Manage system users</p>
              <button className="toggle-admin-button" onClick={() => setShowAdmin(!showAdmin)}>
                {showAdmin ? "Hide Users" : "Show Users"}
              </button>
            </div>

            {showAdmin && (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="action-button">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Settings

