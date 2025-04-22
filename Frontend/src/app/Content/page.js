"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@components/Sidebar";
import styles from "./Content.module.css";

const ContentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSearchedCrateId = searchParams.get("crateId");

  const [crateID, setCrateID] = useState(preSearchedCrateId || "");
  const [crateDetails, setCrateDetails] = useState(null);
  const [crates, setCrates] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
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

  // Fetch all crates on page load
  useEffect(() => {
    fetch("http://localhost:5001/api/content/getAll") // Replace with your backend's base URL
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCrates(data))
      .catch((err) => console.error("Error fetching crates:", err));
  }, []);

  // Search for a specific crate
  const handleSearch = () => {
    fetch("http://localhost:5001/api/content/filter?Section_ID")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCrates(data); // Display only the filtered crate
        } else {
          setCrates([]); // Clear the list if no crate is found
        }
      })
      .catch((err) => console.error("Error searching for crate:", err));
  };

  const handleAddCrate = () => {
    setCrates([...crates, newCrate]);
    setActiveSection(null);
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
    if (!crateDetails || !crateDetails.Container_ID) {
      console.error("No crate selected for removal.");
      return;
    }

    fetch(`http://localhost:5001/api/content/delete/${crateDetails.Container_ID}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message); // Log success message
        // Remove the crate from the local state
        setCrates(crates.filter((crate) => crate.Container_ID !== crateDetails.Container_ID));
        setActiveSection(null);
        setCrateDetails(null);
        setCrateID("");
      })
      .catch((err) => console.error("Error removing crate:", err));
  };

  const handleMoveCrate = () => {
    if (crateDetails && newLocation) {
      setCrates(
        crates.map((crate) =>
          crate.Container_ID === crateDetails.Container_ID
            ? { ...crate, Location_Name: newLocation }
            : crate
        )
      );
      setActiveSection(null);
      setCrateDetails(null);
      setNewLocation("");
      setCrateID("");
    }
  };

  const handleSwitchSection = (section) => {
    setActiveSection(section);
    setCrateDetails(null);
    setNewLocation("");
    setCrateID("");
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
                  <strong>Crate ID:</strong> {crateDetails.Container_ID}
                </p>
                <p>
                  <strong>Contents:</strong> {crateDetails.Type}
                </p>
                <p>
                  <strong>Location:</strong> {crateDetails.Location_Name}
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
                  <strong>Crate ID:</strong> {crateDetails.Container_ID}
                </p>
                <p>
                  <strong>Contents:</strong> {crateDetails.Type}
                </p>
                <p>
                  <strong>Current Location:</strong> {crateDetails.Location_Name}
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

        {/* Display All Crates */}
        <div className={styles.cratesList}>
          <h2>All Crates</h2>
          {crates.length > 0 ? (
            crates.map((crate) => (
              <div key={crate.Container_ID} className={styles.crateRow}>
                <p><strong>ID:</strong> {crate.Container_ID}</p>
                <p><strong>Contents:</strong> {crate.Type}</p>
                <p><strong>Location:</strong> {crate.Location_Name}</p>
                <p><strong>Status:</strong> {crate.Status}</p>
                <p><strong>Monthly Cost:</strong> {crate.Monthly_Cost}</p>
              </div>
            ))
          ) : (
            <p>No crates available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;