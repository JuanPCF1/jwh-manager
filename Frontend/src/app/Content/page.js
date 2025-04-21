"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@components/Sidebar";
import styles from "./Content.module.css";

const ContentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSearchedCrateId = searchParams.get("crateId"); // Get the crateId from the query parameter

  const [crateID, setCrateID] = useState(preSearchedCrateId || ""); // Initialize with the query parameter
  const [crateDetails, setCrateDetails] = useState(null);
  const [crates, setCrates] = useState([
    { id: "C123", contents: "Books", location: "A1", status: "Active", type: "Books", dateIn: "2025-01-01", dateOut: "2025-12-31", cost: "$10", customer: "John Doe" },
    { id: "C124", contents: "Electronics", location: "B2", status: "Inactive", type: "Electronics", dateIn: "2025-02-01", dateOut: "2025-11-30", cost: "$20", customer: "Jane Smith" },
  ]);
  const [activeSection, setActiveSection] = useState(null); // Tracks the active section: "add", "remove", or "move"
  const [newCrate, setNewCrate] = useState({
    Container_ID: "",
    Section_ID: "",
    Location_Name: "",
    Store_Date: "",
    Type: "",
    Monthly_Cost: "",
    Status: "",
    Invoice_Code: "",
    Client_ID: "",
    Company_Name: "",
    Job: "",
  });
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    if (preSearchedCrateId) {
      handleSearch(); // Automatically search for the crate when the page loads
    }
  }, [preSearchedCrateId]);

  const handleSearch = () => {
    const foundCrate = crates.find((c) => c.id === crateID);
    if (foundCrate) {
      setCrateDetails(foundCrate);
      setActiveSection(null); // Close the section after searching
    } else {
      setCrateDetails({ error: "Crate not found" });
    }
  };

  const handleAddCrate = () => {
    setCrates([...crates, newCrate]);
    setActiveSection(null); // Close the section after adding
    setNewCrate({
      Container_ID: "",
      Section_ID: "",
      Location_Name: "",
      Store_Date: "",
      Type: "",
      Monthly_Cost: "",
      Status: "",
      Invoice_Code: "",
      Client_ID: "",
      Company_Name: "",
      Job: "",
    });
  };

  const handleRemoveCrate = () => {
    setCrates(crates.filter((crate) => crate.id !== crateDetails.id));
    setActiveSection(null); // Close the section after removing
    setCrateDetails(null);
    setCrateID("");
  };

  const handleMoveCrate = () => {
    if (crateDetails && newLocation) {
      setCrates(
        crates.map((crate) =>
          crate.id === crateDetails.id
            ? { ...crate, location: newLocation }
            : crate
        )
      );
      setActiveSection(null); // Close the section after moving
      setCrateDetails(null);
      setNewLocation("");
      setCrateID("");
    }
  };

  const handleSwitchSection = (section) => {
    setActiveSection(section); // Switch to the selected section
    setCrateDetails(null); // Reset any previous search results
    setNewLocation(""); // Clear the new location input
    setCrateID(""); // Clear the search input
  };

  return (
    <div className={styles.contentPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>Contents</h1>

        {/* Search Section */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Search Crates</div>
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Search by Crate ID"
              value={crateID}
              onChange={(e) => setCrateID(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>

        {/* Import/Export Section */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Import/Export</div>
          <div className={styles.importExportSection}>
            <button
              onClick={() => handleSwitchSection("add")}
              className={styles.actionButton}
            >
              Add Crate
            </button>
            <button
              onClick={() => handleSwitchSection("remove")}
              className={styles.actionButton}
            >
              Remove Crate
            </button>
            <button
              onClick={() => handleSwitchSection("move")}
              className={styles.actionButton}
            >
              Move Crate
            </button>
          </div>
        </div>

        {/* Add Crate Section */}
        {activeSection === "add" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>Add New Crate</div>
            <div className={styles.addCrateForm}>
              {Object.keys(newCrate).map((field) => (
                <div key={field} className={styles.formRow}>
                  <label htmlFor={field} className={styles.formLabel}>
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={newCrate[field]}
                    onChange={(e) =>
                      setNewCrate({ ...newCrate, [e.target.name]: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              ))}
              <div className={styles.formActions}>
                <button onClick={handleAddCrate} className={styles.confirmButton}>
                  Save
                </button>
                <button
                  onClick={() => setActiveSection(null)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Crate Section */}
        {activeSection === "remove" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>Remove Crate</div>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search by Crate ID"
                value={crateID}
                onChange={(e) => setCrateID(e.target.value)}
                className={styles.searchInput}
              />
              <button onClick={handleSearch} className={styles.searchButton}>
                Search
              </button>
            </div>
            {crateDetails && !crateDetails.error && (
              <div className={styles.crateRow}>
                <p>
                  <strong>Crate ID:</strong> {crateDetails.id}
                </p>
                <p>
                  <strong>Contents:</strong> {crateDetails.contents}
                </p>
                <p>
                  <strong>Location:</strong> {crateDetails.location}
                </p>
                <button
                  onClick={handleRemoveCrate}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {/* Move Crate Section */}
        {activeSection === "move" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>Move Crate</div>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search by Crate ID"
                value={crateID}
                onChange={(e) => setCrateID(e.target.value)}
                className={styles.searchInput}
              />
              <button onClick={handleSearch} className={styles.searchButton}>
                Search
              </button>
            </div>
            {crateDetails && !crateDetails.error && (
              <div className={styles.crateRow}>
                <p>
                  <strong>Crate ID:</strong> {crateDetails.id}
                </p>
                <p>
                  <strong>Contents:</strong> {crateDetails.contents}
                </p>
                <p>
                  <strong>Current Location:</strong> {crateDetails.location}
                </p>
                <div className={styles.newLocationSection}>
                  <label htmlFor="newLocation" className={styles.formLabel}>
                    New Location
                  </label>
                  <input
                    type="text"
                    id="newLocation"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <button
                  onClick={handleMoveCrate}
                  className={styles.confirmButton}
                >
                  Move Crate
                </button>
              </div>
            )}
          </div>
        )}

        {crateDetails && !crateDetails.error && (
          <div className={styles.crateDetails}>
            <h2>Crate Details</h2>
            <p><strong>ID:</strong> {crateDetails.id}</p>
            <p><strong>Contents:</strong> {crateDetails.contents}</p>
            <p><strong>Location:</strong> {crateDetails.location}</p>
            <p><strong>Status:</strong> {crateDetails.status}</p>
            <p><strong>Type:</strong> {crateDetails.type}</p>
            <p><strong>Date In:</strong> {crateDetails.dateIn}</p>
            <p><strong>Date Out:</strong> {crateDetails.dateOut}</p>
            <p><strong>Cost:</strong> {crateDetails.cost}</p>
            <p><strong>Customer:</strong> {crateDetails.customer}</p>
          </div>
        )}

        {crateDetails && crateDetails.error && (
          <div className={styles.crateDetails}>
            <h2>Error</h2>
            <p>{crateDetails.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage;