"use client";

import { useState } from "react";
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

  const contracts = [
    { id: "CON001", job: "Job001", startDate: "2025-01-01", companyName: "ABC Corp", client: "John Doe", referredBy: "Jane Smith" },
    { id: "CON002", job: "Job002", startDate: "2025-02-01", companyName: "XYZ Inc", client: "Jane Smith", referredBy: "John Doe" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("contract");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [newContract, setNewContract] = useState({
    id: "",
    job: "",
    startDate: "",
    companyName: "",
    client: "",
    referredBy: "",
  });
  const [isCreatingContract, setIsCreatingContract] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      if (searchType === "customer") {
        const results = customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      } else if (searchType === "contract") {
        const results = contracts.filter((contract) =>
          contract.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleViewCustomerCrates = (customerId) => {
    const customerCrates = crates.filter((crate) => crate.customerId === customerId);
    setSelectedCustomer({ id: customerId, crates: customerCrates });
  };

  const handleViewContractDetails = (contractId) => {
    const contract = contracts.find((c) => c.id === contractId);
    setSelectedContract(contract);
  };

  const handleCreateContract = () => {
    setContracts([...contracts, newContract]);
    setIsCreatingContract(false);
    setNewContract({
      id: "",
      job: "",
      startDate: "",
      companyName: "",
      client: "",
      referredBy: "",
    });
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
          ) : hasSearched && searchType === "customer" ? (
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
          ) : hasSearched && searchType === "contract" ? (
            searchResults.length > 0 ? (
              <div className={styles.resultsCard}>
                <h2>Contracts</h2>
                <ul>
                  {searchResults.map((contract) => (
                    <li
                      key={contract.id}
                      onClick={() => handleViewContractDetails(contract.id)}
                      className={styles.contractItem}
                    >
                      {contract.id}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No contracts found</p>
            )
          ) : null}

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
                    <td>{selectedContract.job}</td>
                    <td>{selectedContract.startDate}</td>
                    <td>{selectedContract.companyName}</td>
                    <td>{selectedContract.client}</td>
                    <td>{selectedContract.referredBy}</td>
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
                  <label>Contract ID</label>
                  <input
                    type="text"
                    value={newContract.id}
                    onChange={(e) =>
                      setNewContract({ ...newContract, id: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Job</label>
                  <input
                    type="text"
                    value={newContract.job}
                    onChange={(e) =>
                      setNewContract({ ...newContract, job: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newContract.startDate}
                    onChange={(e) =>
                      setNewContract({ ...newContract, startDate: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={newContract.companyName}
                    onChange={(e) =>
                      setNewContract({ ...newContract, companyName: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Client</label>
                  <input
                    type="text"
                    value={newContract.client}
                    onChange={(e) =>
                      setNewContract({ ...newContract, client: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Referred By</label>
                  <input
                    type="text"
                    value={newContract.referredBy}
                    onChange={(e) =>
                      setNewContract({ ...newContract, referredBy: e.target.value })
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

          {!hasSearched && !isCreatingContract && (
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
