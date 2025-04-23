"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar";
import styles from "./Manage.module.css";

const Manage = () => {
  const router = useRouter();

  // Mock data
  const customers = [
    { id: "CU001", name: "John Doe" },
    { id: "CU002", name: "Jane Smith" },
  ];

  const crates = [
    { id: "C123", contents: "Books", location: "A1", customerId: "CU001" },
    { id: "C124", contents: "Electronics", location: "B2", customerId: "CU002" },
    { id: "C125", contents: "Clothes", location: "C3", customerId: "CU001" },
  ];

  // const contracts = [
  //   { id: "CON001", job: "Job001", startDate: "2025-01-01", companyName: "ABC Corp", client: "John Doe", referredBy: "Jane Smith" },
  //   { id: "CON002", job: "Job002", startDate: "2025-02-01", companyName: "XYZ Inc", client: "Jane Smith", referredBy: "John Doe" },
  // ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("contract");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [newContract, setNewContract] = useState({
    "Job#": "",
    "Start_Date": "",
    "Company_Name": "",
    "Client_ID": "",
    "Referred_By": "",
  });
  const [isCreatingContract, setIsCreatingContract] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
  
    if (searchType === "customer") {
      const results = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    } else if (searchType === "contract") {
      try {
  
        const res = await fetch(`http://localhost:5001/api/contract/${encodeURIComponent(searchTerm)}`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!res.ok) {
          throw new Error("Contract(s) not found");
        }
  
        const data = await res.json();
  
        // Backend returns either an array or a single object
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
  


  const handleViewCustomerCrates = (customerId) => {
    const customerCrates = crates.filter((crate) => crate.customerId === customerId);
    setSelectedCustomer({ id: customerId, crates: customerCrates });
  };

  const handleViewContractDetails = (jobNumber) => {
    const contract = [...contracts, ...searchResults].find((c) => c["Job#"] === jobNumber);
    setSelectedContract(contract);
  };


  const handleCreateContract = async () => {
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

      setContracts([...contracts, created]);

      setIsCreatingContract(false);
      setNewContract({
        "Job#": "",
        "Start_Date": "",
        "Company_Name": "",
        "Client_ID": "",
        "Referred_By": "",
      });
      

    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };



  // Fetch all the contracts from the backend
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/contract/all", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
  
        // Keep DB-style keys
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };
  
    fetchContracts();
  }, []);
  



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
            onClick={() => setIsCreatingContract(true)}
            className={styles.createContractButton}
          >
            Create New Contract
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
            searchType === "customer" ? (
              searchResults.length > 0 ? (
                <div className={styles.resultsCard}>
                  <h2>Customers</h2>
                  <ul>
                    {searchResults.map((customer) => (
                      <li
                        key={customer.id}
                        onClick={() => handleViewCustomerCrates(customer.id)}
                        className={styles.customerItem}
                      >
                        {customer.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No customers found</p>
              )
            ) : searchResults.length > 0 ? (
              <div className={styles.resultsCard}>
                <h2>Contracts</h2>
                <ul>
                  {searchResults.map((contract) => (
                    <li
                      key={contract["Job#"]}
                      onClick={() => handleViewContractDetails(contract["Job#"])}
                      className={styles.contractItem}
                    >
                      {contract["Job#"]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No contracts found</p>
            )
          ) : contracts.length > 0 ? (
            <div className={styles.resultsCard}>
              <h2>All Contracts</h2>
              <div className={styles.contractList}>
                {contracts.map((contract) => (
                  <div key={contract["Job#"]} className={styles.contractItem}>
                    <div
                      className={styles.contractHeader}
                      onClick={() =>
                        setSelectedContract(
                          selectedContract?.["Job#"] === contract["Job#"] ? null : contract
                        )
                      }
                    >
                      {contract["Job#"]}
                    </div>
                    {selectedContract?.["Job#"] === contract["Job#"] && (
                      <div className={styles.contractDetails}>
                        <p>Start Date: {contract["Start_Date"]}</p>
                        <p>Company Name: {contract["Company_Name"]}</p>
                        <p>Client: {contract["Client_ID"]}</p>
                        <p>Referred By: {contract["Referred_By"]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No contracts available</p>
          )}

          {selectedCustomer && (
            <div className={styles.resultsCard}>
              <h2>Crates for {customers.find((c) => c.id === selectedCustomer.id).name}</h2>
              <ul>
                {selectedCustomer.crates.map((crate) => (
                  <li key={crate.id} className={styles.crateItem}>
                    {crate.contents} (ID: {crate.id})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedContract && (
            <div className={styles.resultsCard}>
              <h2>Contract Details</h2>
              <table className={styles.contractTable}>
                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Start Date</th>
                    <th>Company Name</th>
                    <th>Client</th>
                    <th>Referred By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedContract["Job#"]}</td>
                    <td>{selectedContract["Start_Date"]}</td>
                    <td>{selectedContract["Company_Name"]}</td>
                    <td>{selectedContract["Client_ID"]}</td>
                    <td>{selectedContract["Referred_By"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {isCreatingContract && (
            <div className={styles.resultsCard}>
              <h2>Create New Contract</h2>
              <form className={styles.contractForm}>
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
                  <input
                    type="text"
                    value={newContract["Company_Name"]}
                    onChange={(e) =>
                      setNewContract({ ...newContract, "Company_Name": e.target.value })
                    }
                  />
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

                <div className={styles.formRow}>
                  <label>Referred By</label>
                  <input
                    type="text"
                    value={newContract["Referred_By"]}
                    onChange={(e) =>
                      setNewContract({ ...newContract, "Referred_By": e.target.value })
                    }
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={handleCreateContract}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingContract(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!hasSearched && !isCreatingContract && contracts.length === 0 && (
            <div className={styles.initialSearchState}>
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
