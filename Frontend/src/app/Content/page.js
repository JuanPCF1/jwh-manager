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
    Store_Date: new Date().toISOString().split("T")[0], // today's date in YYYY-MM-DD
    Type: "",
    Monthly_Cost: "172.00",
    Status: "",
    Invoice_Code: "",
    Client_ID: "",
    Company_Name: "",
    Job: "",
  });
  const [newLocation, setNewLocation] = useState("");
  const [editCrate, setEditCrate] = useState(null);

  // Fetch all crates on page load
  useEffect(() => {
    fetch("http://localhost:5001/api/content/getAll") 
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCrates(data))
      .catch((err) => console.error("Error fetching crates:", err));
  }, []);

  const fetchCrates = () => {
    fetch("http://localhost:5001/api/content/getAll")
      .then((res) => res.json())
      .then((data) => setCrates(data))
      .catch((err) => console.error("Error fetching crates:", err));
  };
  
  // Search for a specific crate
  const handleSearch = () => {
    fetch("http://localhost:5001/api/content/filter?Container_ID=" + crateID)
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
    const payload = {
      ...newCrate,
      ["Job#"]: newCrate.Job,
    };
    delete payload.Job;
  
    fetch("http://localhost:5001/api/content/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add crate.");
        return res.json();
      })
      .then(() => {
        fetchCrates(); // Refresh full list
        setActiveSection(null);
        setNewCrate({
          Container_ID: "",
          Section_ID: "",
          Location_Name: "",
          Store_Date: new Date().toISOString().split("T")[0],
          Type: "",
          Monthly_Cost: "172.00",
          Status: "",
          Invoice_Code: "",
          Client_ID: "",
          Company_Name: "",
          Job: "",
        });
      })
      .catch((err) => console.error("Error creating crate:", err));
  };
  


  const handleRemoveCrate = (containerId) => {
    fetch(`http://localhost:5001/api/content/delete/${containerId}`, {
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
        setCrates(crates.filter((crate) => crate.Container_ID !== containerId));
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

  const handleEditCrate = (crate) => {
    setEditCrate(crate);
  };

  const handleSaveEditCrate = () => {
    if (!editCrate || !editCrate.Container_ID) {
      console.error("No crate selected for editing.");
      return;
    }

    fetch(`http://localhost:5001/api/content/update/${editCrate.Container_ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCrate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message); // Log success message
        // Update the crate in the local state
        setCrates(
          crates.map((crate) =>
            crate.Container_ID === editCrate.Container_ID ? editCrate : crate
          )
        );
        setEditCrate(null); // Clear the edit form
      })
      .catch((err) => console.error("Error updating crate:", err));
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
                    {field === "Type" ? "Type of Content" : field.replace(/_/g, " ")}
                  </label>

                  {field === "Status" ? (
                    <>
                      <input
                        list="status-options"
                        id="Status"
                        name="Status"
                        value={newCrate["Status"]}
                        onChange={(e) =>
                          setNewCrate({ ...newCrate, Status: e.target.value })
                        }
                        className={styles.formInput}
                      />
                      <datalist id="status-options">
                        <option value="S/O" />
                        <option value="Clean" />
                        <option value="N/R" />
                        <option value="TBC" />
                      </datalist>
                    </>
                  ) : field === "Invoice_Code" ? (
                    <>
                      <input
                        list="invoice-options"
                        id="Invoice_Code"
                        name="Invoice_Code"
                        value={newCrate["Invoice_Code"]}
                        onChange={(e) =>
                          setNewCrate({ ...newCrate, Invoice_Code: e.target.value })
                        }
                        className={styles.formInput}
                      />
                      <datalist id="invoice-options">
                        <option value="0" />
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                      </datalist>
                    </>
                  ) : (
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
                  )}
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
                  onClick={() => handleRemoveCrate(crateDetails.Container_ID)}
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
                {editCrate && editCrate.Container_ID === crate.Container_ID ? (
                  <div>
                    {Object.keys(editCrate).map((field) => (
                      <div key={field} className={styles.formRow}>
                        <label htmlFor={field} className={styles.formLabel}>
                          {field === "Type" ? "Type of Content" : field.replace(/_/g, " ")}
                        </label>
                        <input
                          type="text"
                          id={field}
                          name={field}
                          value={editCrate[field] || ""}
                          onChange={(e) =>
                            setEditCrate({
                              ...editCrate,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className={styles.formInput}
                        />
                      </div>
                    ))}

                    <div className={styles.formActions}>
                      <button
                        onClick={handleSaveEditCrate}
                        className={styles.confirmButton}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCrate(null)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>ID:</strong> {crate.Container_ID}
                    </p>
                    <p>
                      <strong>Contents:</strong> {crate.Type}
                    </p>
                    <p>
                      <strong>Location:</strong> {crate.Location_Name} - {crate.Section_ID}
                    </p>
                    <p>
                      <strong>Status:</strong> {crate.Status}
                    </p>
                    <p>
                      <strong>Monthly Cost:</strong> {crate.Monthly_Cost}
                    </p>
                    <div className={styles.crateActions}>
                      <button
                        onClick={() => handleEditCrate(crate)}
                        className={styles.actionButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveCrate(crate.Container_ID)}
                        className={styles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
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