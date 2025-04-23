"use client";

import { useState, useEffect } from "react";
import Sidebar from "@components/Sidebar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);

  // Fetch all companies
  useEffect(() => {
    fetch("http://localhost:5001/api/company/getAll")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  // Handle create company
  const handleCreateCompany = () => {
    fetch("http://localhost:5001/api/company/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Company_Name: newCompanyName }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setCompanies([...companies, { Company_Name: newCompanyName }]);
        setNewCompanyName("");
        setIsCreatingCompany(false);
      })
      .catch((err) => console.error("Error creating company:", err));
  };

  // Handle delete company
  const handleDeleteCompany = (Company_Name) => {
    fetch(`http://localhost:5001/api/company/delete/${Company_Name}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setCompanies(companies.filter((company) => company.Company_Name !== Company_Name));
      })
      .catch((err) => console.error("Error deleting company:", err));
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.dashboardTitle}>
            <h1>Dashboard</h1>
            <div className={styles.dashboardSubtitle}>Welcome back, John Doe</div>
          </div>
          <button
            onClick={() => setIsCreatingCompany(!isCreatingCompany)}
            className={styles.createCompanyButton}
          >
            Create Company
          </button>
        </header>

        {isCreatingCompany && (
          <div className={styles.createCompanyForm}>
            <h3 className={styles.formTitle}>Create New Company</h3>
            <div className={styles.formRow}>
              <input
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className={styles.formInput}
                placeholder="Enter company name"
              />
              <div className={styles.formActions}>
                <button onClick={handleCreateCompany} className={styles.saveButton}>
                  Save
                </button>
                <button onClick={() => setIsCreatingCompany(false)} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <section className={styles.dashboardStats}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>In Warehouse</h3>
            </div>
            <p>241</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Users</h3>
            </div>
            <p>3</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Expected</h3>
            </div>
            <p>500 in 1 Order</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Avg Sales</h3>
            </div>
            <p>25.5 / Day</p>
          </div>
        </section>

        <section className={styles.companyListSection}>
          <h2>All Companies</h2>
          <div className={styles.companyList}>
            {companies.map((company) => (
              <div key={company.Company_Name} className={styles.companyItem}>
                <p>{company.Company_Name}</p>
                <button
                  onClick={() => handleDeleteCompany(company.Company_Name)}
                  className={styles.deleteCompanyButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
