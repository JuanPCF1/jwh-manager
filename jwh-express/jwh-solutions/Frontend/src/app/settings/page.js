"use client";

import { useState } from "react";
import Sidebar from "@components/Sidebar";
import styles from "./Settings.module.css";

const Settings = () => {
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
  });

  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    username: userData.username,
    phone: userData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    setUserData((prev) => ({
      ...prev,
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
    }));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    setShowSuccess(true);
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isAdmin = userData.role === "Administrator";

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Administrator" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "User" },
  ];

  return (
    <div className={styles.settingsContainer}>
      <Sidebar />

      <main className={styles.settingsContent}>
        <header className={styles.settingsHeader}>
          <div className={styles.settingsTitle}>
            <h1>Settings</h1>
            <div className={styles.settingsSubtitle}>Manage your account</div>
          </div>
        </header>

        {showSuccess && (
          <div className={styles.successMessage}>Changes saved successfully!</div>
        )}

        {/* Profile Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.settingsCardHeader}>
            <h2>Profile Information</h2>
            <p>Update your personal information</p>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.settingsCardHeader}>
            <h2>Change Password</h2>
            <p>Update your password</p>
          </div>

          <form onSubmit={handlePasswordChange}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Admin Section - Only visible to admins */}
        {isAdmin && (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2>User Management</h2>
              <p>Manage system users</p>
              <button
                className={styles.toggleAdminButton}
                onClick={() => setShowAdmin(!showAdmin)}
              >
                {showAdmin ? "Hide Users" : "Show Users"}
              </button>
            </div>

            {showAdmin && (
              <div className={styles.usersTableContainer}>
                <table className={styles.usersTable}>
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
                          <button className={styles.actionButton}>Edit</button>
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
  );
};

export default Settings;
