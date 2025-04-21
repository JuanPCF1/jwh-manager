"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Signup.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await createEmployee({
        Employee_Name: formData.fullName,
        Username: formData.username,
        Password: formData.password,
      });

      alert("Account created successfully! Please login.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create account: " + err.message);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h1>Create Account</h1>
        {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.signupButton}>
            Create Account
          </button>
        </form>
        <div className={styles.loginLink}>
          <p>
            Already have an account? <Link href="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export async function createEmployee({ Employee_Name, Username, Password }) {
  try {
    const response = await fetch('http://localhost:5000/api/employee/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // required if your backend uses sessions/cookies
      body: JSON.stringify({ Employee_Name, Username, Password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create employee');
    }

    const data = await response.json();
    return data; // contains message and employeeId
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
}

export default Signup;
