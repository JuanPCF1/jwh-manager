"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar";
import styles from "./Manage.module.css";

const Manage = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("contract");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    try {
      setTimeout(() => {
        setSearchResults([]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    alert(`View details for ${id}`);
  };

  return (
    <div className={styles.manageContainer}>
      <Sidebar />

      <main className={styles.manageContent}>
        <header className={styles.manageHeader}>
          <div className={styles.manageTitle}>
            <h1>Manage</h1>
            <div className={styles.manageSubtitle}>
              Search and manage contracts and customers
            </div>
          </div>
        </header>

        <section className={styles.searchSection}>
          <div className={styles.searchCard}>
            <div className={styles.searchHeader}>
              <h2>
                Search by {searchType === "contract" ? "Contract" : "Customer"}
              </h2>
              <div className={styles.searchTypeToggle}>
                <button
                  className={searchType === "contract" ? styles.active : ""}
                  onClick={() => setSearchType("contract")}
                >
                  Contracts
                </button>
                <button
                  className={searchType === "customer" ? styles.active : ""}
                  onClick={() => setSearchType("customer")}
                >
                  Customers
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputContainer}>
                <input
                  type="text"
                  placeholder={`Search by ${searchType} ID, name, or ${
                    searchType === "contract" ? "customer" : "contact"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Search
                </button>
              </div>

              <div className={styles.searchFilters}>
                {searchType === "contract" && (
                  <>
                    <div className={styles.filterGroup}>
                      <label>Status</label>
                      <select>
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className={styles.filterGroup}>
                      <label>Date Range</label>
                      <div className={styles.dateInputs}>
                        <input type="date" placeholder="From" />
                        <input type="date" placeholder="To" />
                      </div>
                    </div>
                  </>
                )}

                {searchType === "customer" && (
                  <div className={styles.filterGroup}>
                    <label>Active Contracts</label>
                    <select>
                      <option value="">All</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className={styles.resultsSection}>
          {isLoading ? (
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
              <p>Searching...</p>
            </div>
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className={styles.resultsCard}>
                <div className={styles.resultsHeader}>
                  <h2>Search Results</h2>
                  <span className={styles.resultsCount}>
                    {searchResults.length}{" "}
                    {searchResults.length === 1 ? "result" : "results"} found
                  </span>
                </div>

                <table className={styles.resultsTable}>
                  <thead>
                    <tr>
                      {searchType === "contract" ? (
                        <>
                          <th>Contract ID</th>
                          <th>Name</th>
                          <th>Customer</th>
                          <th>Status</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Actions</th>
                        </>
                      ) : (
                        <>
                          <th>Customer ID</th>
                          <th>Name</th>
                          <th>Contact Person</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Active Contracts</th>
                          <th>Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Placeholder for future mapped results */}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.noResults}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters</p>
              </div>
            )
          ) : (
            <div className={styles.initialSearchState}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3>Search for contracts or customers</h3>
              <p>Use the search form above to find what youre looking for</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Manage;
