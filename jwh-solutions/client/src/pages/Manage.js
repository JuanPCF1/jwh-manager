"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import "./Manage.css"

const Manage = () => {
  const navigate = useNavigate()


  // Replace the mock data and handleSearch function with this:
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("contract") // 'contract' or 'customer'
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)

    try {
      // This is where you would make an actual API call
      // Example:
      // const response = await fetch(`/api/${searchType}s/search?term=${searchTerm}`);
      // const data = await response.json();
      // setSearchResults(data);

      // For now, we'll just set empty results after a delay
      setTimeout(() => {
        setSearchResults([])
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error searching:", error)
      setSearchResults([])
      setIsLoading(false)
    }
  }

  const handleViewDetails = (id) => {
    // Navigate to details page (to be implemented)
    alert(`View details for ${id}`)
  }

  // Replace the results section with this updated version that handles the initial state:
  return (
    <div className="manage-container">
      <Sidebar />

      <main className="manage-content">
        <header className="manage-header">
          <div className="manage-title">
            <h1>Manage</h1>
            <div className="manage-subtitle">Search and manage contracts and customers</div>
          </div>
        </header>

        <section className="search-section">
          <div className="search-card">
            <div className="search-header">
              <h2>Search by {searchType === "contract" ? "Contract" : "Customer"}</h2>
              <div className="search-type-toggle">
                <button className={searchType === "contract" ? "active" : ""} onClick={() => setSearchType("contract")}>
                  Contracts
                </button>
                <button className={searchType === "customer" ? "active" : ""} onClick={() => setSearchType("customer")}>
                  Customers
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder={`Search by ${searchType} ID, name, or ${searchType === "contract" ? "customer" : "contact"}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
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

              <div className="search-filters">
                {searchType === "contract" && (
                  <>
                    <div className="filter-group">
                      <label>Status</label>
                      <select>
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label>Date Range</label>
                      <div className="date-inputs">
                        <input type="date" placeholder="From" />
                        <input type="date" placeholder="To" />
                      </div>
                    </div>
                  </>
                )}

                {searchType === "customer" && (
                  <div className="filter-group">
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

        <section className="results-section">
          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Searching...</p>
            </div>
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className="results-card">
                <div className="results-header">
                  <h2>Search Results</h2>
                  <span className="results-count">
                    {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
                  </span>
                </div>

                {searchType === "contract" ? (
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Contract ID</th>
                        <th>Name</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{/* Contract results will be mapped here when API is connected */}</tbody>
                  </table>
                ) : (
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Active Contracts</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{/* Customer results will be mapped here when API is connected */}</tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="no-results">
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
            <div className="initial-search-state">
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
              <p>Use the search form above to find what you're looking for</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Manage

