"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar";
import styles from "./Manage.module.css";

const Manage = () => {
  const router = useRouter();


  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("contract");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]); // New state for clients
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [newContract, setNewContract] = useState({
    "Job#": "",
    "Start_Date": new Date().toISOString().split("T")[0], // Sets default to today
    "Company_Name": "",
    "Client_ID": "",
  });

  const [newClient, setNewClient] = useState({
    Client_Name: "",
    Referred_by: "",
  });
  
  const [isCreating, setIsCreating] = useState(false); // Unified state for creation
  const [expandedContract, setExpandedContract] = useState(null); // Add a new state to track the expanded contract

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    if (searchType === "customer") {
      try {
        const res = await fetch(
          `http://localhost:5001/api/client/filter?Client_Name=${encodeURIComponent(searchTerm)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
  
        if (!res.ok) {
          throw new Error("Clients not found");
        }
  
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else if (searchType === "contract") {
      try {
        const res = await fetch(
          `http://localhost:5001/api/contract/${encodeURIComponent(searchTerm)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Contract(s) not found");
        }

        const data = await res.json();
        const results = Array.isArray(data) ? data : [data];
        setSearchResults(results);
      } catch (err) {
        console.error("Error fetching contract(s):", err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCompanyInputChange = async (e) => {
    const value = e.target.value;
    setNewContract({ ...newContract, "Company_Name": value });

    if (value.trim() === "") {
      setCompanySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/company/getBySimilarity/${encodeURIComponent(value)}`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setCompanySuggestions(data);
        setShowSuggestions(true);
      } else {
        setCompanySuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching company suggestions:", err);
      setCompanySuggestions([]);
    }
  };


  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (searchType === "contract") {
      try {
        const response = await fetch("http://localhost:5001/api/contract/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newContract),
        });

        if (!response.ok) {
          throw new Error("Failed to create contract");
        }

        const created = await response.json();
        await fetchContracts();
        setIsCreating(false);
        setNewContract({
          "Job#": "",
          "Start_Date": "",
          "Company_Name": "",
          "Client_ID": "",
        });

        // Show success message or update UI

      } catch (error) {
        console.error("Error creating contract:", error);

      }
    } else if (searchType === "customer") {
      try {
        const response = await fetch("http://localhost:5001/api/client/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newClient),
        });

        if (!response.ok) {
          throw new Error("Failed to create client");
        }

        const created = await response.json();
        await fetchClients();
        setIsCreating(false);
        setNewClient({
          Client_Name: "",
          Referred_by: "",
        });
        
        if (hasSearched) {
          handleSearch(new Event("submit"));
        }
        
        

        // Show success message

      } catch (error) {
        console.error("Error creating client:", error);

      }
    }
  };

  const handleDeleteContract = async (jobNumber) => {
    if (confirm("Are you sure you want to delete this contract?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/contract/delete/${jobNumber}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete contract");
        }

        // Remove the deleted contract from the state
        setContracts(contracts.filter((contract) => contract["Job#"] !== jobNumber));
        setSearchResults(searchResults.filter((contract) => contract["Job#"] !== jobNumber));

      } catch (error) {
        console.error("Error deleting contract:", error);

      }
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/client/delete/${clientId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete client");
        }

        // Remove the deleted client from the state
        setClients(clients.filter((client) => client.ID !== clientId));
        setSearchResults(searchResults.filter((client) => client.ID !== clientId));

      } catch (error) {
        console.error("Error deleting client:", error);

      }
    }
  };

  const fetchContracts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/contract/all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/client/getAll", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {


    fetchContracts();
    fetchClients();
  }, []);

  const handleViewCustomerCrates = (customerId) => {
    const customerCrates = crates.filter((crate) => crate.customerId === customerId);
    setSelectedCustomer({ id: customerId, crates: customerCrates });
  };

  const handleViewContractDetails = (jobNumber) => {
    if (expandedContract && expandedContract["Job#"] === jobNumber) {
      // Collapse if the same contract is clicked again
      setExpandedContract(null);
    } else {
      const contract = [...contracts, ...searchResults].find((c) => c["Job#"] === jobNumber);
      setExpandedContract(contract);
    }
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
          <button
            onClick={() => setIsCreating(true)}
            className={styles.createButton}
          >
            {searchType === "contract" ? "Create New Contract" : "Create New Client"}
          </button>
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
                  placeholder={`Search by ${searchType} ID or name`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
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
                <h2>{searchType === "contract" ? "Contracts" : "Customers"}</h2>
                <ul>
                  {searchResults.map((item) =>
                    searchType === "contract" ? (
                      <li key={`search-${item["Job#"]}`} className={styles.contractItem}>
                        <div onClick={() => handleViewContractDetails(item["Job#"])}>
                          {item["Job#"]}
                        </div>
                        <button
                          onClick={() => handleDeleteContract(item["Job#"])}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                        {expandedContract && expandedContract["Job#"] === item["Job#"] && (
                          <div className={styles.contractDetails}>
                            <p><strong>Start Date:</strong> {expandedContract["Start_Date"]?.split("T")[0]}</p>
                            <p><strong>Company Name:</strong> {expandedContract["Company_Name"]}</p>
                            <p><strong>Client ID:</strong> {expandedContract["Client_ID"]}</p>
                          </div>
                        )}
                      </li>
                    ) : (
                      <li key={item.ID} className={styles.customerItem}>
                        <div className={styles.customerInfo}>
                          {item.Client_Name}
                        </div>
                        <button
                          onClick={() => handleDeleteClient(item.ID)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <p>No {searchType === "contract" ? "contracts" : "customers"} found</p>
            )
          ) : searchType === "contract" ? (
            contracts.length > 0 ? (
              <div className={styles.resultsCard}>
                <h2>All Contracts</h2>
                <ul>
                  {contracts.map((contract) => (
                    <li key={`contract-${contract["Job#"]}`} className={styles.contractItem}>
                      <div onClick={() => handleViewContractDetails(contract["Job#"])}>
                        {contract["Job#"]}
                      </div>
                      <button
                        onClick={() => handleDeleteContract(contract["Job#"])}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                      {expandedContract && expandedContract["Job#"] === contract["Job#"] && (
                        <div className={styles.contractDetails}>
                          <p><strong>Start Date:</strong> {expandedContract["Start_Date"]?.split("T")[0]}</p>
                          <p><strong>Company Name:</strong> {expandedContract["Company_Name"]}</p>
                          <p><strong>Client ID:</strong> {expandedContract["Client_ID"]}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No contracts available</p>
            )
          ) : clients.length > 0 ? (
            <div className={styles.resultsCard}>
              <h2>All Customers</h2>
              <ul>
                {clients.map((client) => (
                  <li key={`client-${client.ID || client.Client_Name}`} className={styles.customerItem}>
                    <div className={styles.customerInfo}>
                      {client.Client_Name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No customers available</p>
          )}

          {isCreating && (
            <div className={styles.resultsCard}>
              <h2>
                {searchType === "contract" ? "Create New Contract" : "Create New Client"}
              </h2>
              <form className={styles.createForm} onSubmit={handleCreate}>
                {searchType === "contract" ? (
                  <>
                    <div className={styles.formRow}>
                      <label>Job#</label>
                      <input
                        type="text"
                        value={newContract["Job#"]}
                        onChange={(e) =>
                          setNewContract({ ...newContract, "Job#": e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={newContract["Start_Date"]}
                        onChange={(e) =>
                          setNewContract({ ...newContract, "Start_Date": e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Company Name</label>
                      <div className={styles.suggestionContainer}>
                        <input
                          type="text"
                          value={newContract["Company_Name"]}
                          onChange={handleCompanyInputChange}
                          onFocus={async () => {
                            if (newContract["Company_Name"].trim() !== "") {
                              // If input already has text, fetch suggestions
                              await handleCompanyInputChange({ target: { value: newContract["Company_Name"] } });
                            } else {
                              // If input is empty, you could show default suggestions or fetch all
                              try {
                                const res = await fetch("http://localhost:5001/api/company/getBySimilarity", {
                                  method: "GET",
                                  credentials: "include",
                                });
                                if (res.ok) {
                                  const data = await res.json();
                                  setCompanySuggestions(data);
                                  setShowSuggestions(true);
                                }
                              } catch (err) {
                                console.error("Error fetching default company suggestions:", err);
                              }
                            }
                          }}
                          
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // allow click before hide
                        />
                        {showSuggestions && companySuggestions.length > 0 && (
                          <ul className={styles.suggestionDropdown}>
                            {companySuggestions.map((company, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setNewContract({ ...newContract, "Company_Name": company.Company_Name });
                                  setShowSuggestions(false);
                                }}
                                className={styles.suggestionItem}
                              >
                                {company.Company_Name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <label>Client ID</label>
                      <input
                        type="text"
                        value={newContract["Client_ID"]}
                        onChange={(e) =>
                          setNewContract({ ...newContract, "Client_ID": e.target.value })
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.formRow}>
                      <label>Client Name</label>
                      <input
                        type="text"
                        value={newClient.Client_Name}
                        onChange={(e) =>
                          setNewClient({ ...newClient, Client_Name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Referred By</label>
                      <input
                        type="text"
                        value={newClient.Referred_by}
                        onChange={(e) =>
                          setNewClient({ ...newClient, Referred_by: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.saveButton}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className={styles.cancelButton}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}


        </section>
      </main>
    </div>
  );
};

export default Manage;
