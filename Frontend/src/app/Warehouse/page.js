"use client";

import { useState, useEffect } from "react";
import Sidebar from "@components/Sidebar";
import styles from "./Warehouse.module.css";

const Warehouse = () => {
  const [isCreatingWarehouse, setIsCreatingWarehouse] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    Location_Name: "",
    Num_of_Sections: "",
    Owning_Company: "",
  });
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [newSection, setNewSection] = useState({
    Section_ID: "",
    Location_Name: "",
    Status: "",
  });
  const [sections, setSections] = useState([]);

  // Fetch all warehouses from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/warehouselocation/getAll")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setWarehouses(data))
      .catch((err) => console.error("Error fetching warehouses:", err));
  }, []);

  // Create a new warehouse
  const handleCreateWarehouse = () => {
    if (
      newWarehouse.Location_Name &&
      newWarehouse.Num_of_Sections &&
      newWarehouse.Owning_Company
    ) {
      fetch("http://localhost:5001/api/warehouselocation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWarehouse),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          return fetch("http://localhost:5001/api/warehouselocation/getAll");
        })
        .then((res) => res.json())
        .then((data) => {
          setWarehouses(data);
          setNewWarehouse({
            Location_Name: "",
            Num_of_Sections: "",
            Owning_Company: "",
          });
          setIsCreatingWarehouse(false);
        })

        .catch((err) =>
          console.error("Error creating warehouse location:", err)
        );
    }
  };

  // Delete a warehouse
  const handleDeleteWarehouse = (Location_Name) => {
    fetch(`http://localhost:5001/api/warehouselocation/delete/${Location_Name}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setWarehouses(
          warehouses.filter((warehouse) => warehouse.Location_Name !== Location_Name)
        );
      })
      .catch((err) =>
        console.error("Error deleting warehouse location:", err)
      );
  };

  // Create a new section
  const handleCreateSection = () => {
    if (newSection.Section_ID && newSection.Location_Name && newSection.Status) {
      fetch("http://localhost:5001/api/section/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSection),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setSections([...sections, newSection]);
          setNewSection({
            Section_ID: "",
            Location_Name: "",
            Status: "",
          });
          setIsCreatingSection(false);
        })
        .catch((err) => console.error("Error creating section:", err));
    }
  };

  // View sections for a specific warehouse
  const handleViewSections = (Location_Name) => {
    fetch(`http://localhost:5001/api/section/filter?Location_Name=${Location_Name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSections(data); // Update the sections state with the filtered sections
        setSelectedWarehouse(Location_Name); // Set the selected warehouse name
      })
      .catch((err) => console.error("Error fetching sections:", err));
  };

  // Add the handleDeleteSection function
  const handleDeleteSection = (Section_ID) => {
    fetch(`http://localhost:5001/api/section/delete/${Section_ID}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSections(sections.filter((section) => section.Section_ID !== Section_ID));
      })
      .catch((err) => console.error("Error deleting section:", err));
  };

  return (
    <div className={styles.warehouseContainer}>
      <Sidebar />

      <main className={styles.warehouseContent}>
        <header className={styles.warehouseHeader}>
          <div className={styles.warehouseTitle}>
            <h1>Warehouse</h1>
            <div className={styles.warehouseSubtitle}>
              Manage and create warehouses and sections
            </div>
          </div>
          <button
            onClick={() => {
              setIsCreatingWarehouse(!isCreatingWarehouse);
              setIsCreatingSection(false); // Ensure the other form is hidden
            }}
            className={styles.createWarehouseButton}
          >
            Create New Warehouse
          </button>
        </header>

        {isCreatingWarehouse && (
          <div className={styles.createWarehouseForm}>
            <h3>Create New Warehouse</h3> {/* Header for Create Warehouse */}
            <div className={styles.formRow}>
              <label>Location Name</label>
              <input
                type="text"
                value={newWarehouse.Location_Name}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    Location_Name: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label># of Sections</label>
              <input
                type="number"
                value={newWarehouse.Num_of_Sections}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    Num_of_Sections: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label>Owning Company</label>
              <input
                type="text"
                value={newWarehouse.Owning_Company}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    Owning_Company: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formActions}>
              <button
                onClick={handleCreateWarehouse}
                className={styles.saveButton}
              >
                Save
              </button>
              <button
                onClick={() => setIsCreatingWarehouse(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isCreatingSection && (
          <div className={styles.createWarehouseForm}>
            <h3>Create New Section</h3> {/* Header for Create Section */}
            <div className={styles.formRow}>
              <label>Section ID</label>
              <input
                type="text"
                value={newSection.Section_ID}
                onChange={(e) =>
                  setNewSection({ ...newSection, Section_ID: e.target.value })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label>Location Name</label>
              <input
                type="text"
                value={newSection.Location_Name}
                onChange={(e) =>
                  setNewSection({ ...newSection, Location_Name: e.target.value })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label>Status</label>
              <input
                type="text"
                value={newSection.Status}
                onChange={(e) =>
                  setNewSection({ ...newSection, Status: e.target.value })
                }
              />
            </div>
            <div className={styles.formActions}>
              <button
                onClick={handleCreateSection}
                className={styles.saveButton}
              >
                Save
              </button>
              <button
                onClick={() => setIsCreatingSection(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <section className={styles.warehouseListSection}>
          <h2>All Warehouses</h2>
          <div className={styles.warehouseList}>
            {warehouses.map((warehouse, index) => (
              <div key={`warehouse-${warehouse.Location_Name || index}`} className={styles.warehouseItem}>
                <div className={styles.warehouseDetails}>
                  <p>
                    <strong>Location:</strong> {warehouse.Location_Name}
                  </p>
                  <p>
                    <strong>Sections:</strong> {warehouse.Num_of_Sections}
                  </p>
                  <p>
                    <strong>Owning Company:</strong> {warehouse.Owning_Company}
                  </p>
                </div>
                <div className={styles.warehouseActions}>
                  <button
                    onClick={() => {
                      setIsCreatingSection(true);
                      setIsCreatingWarehouse(false); // Ensure the other form is hidden
                      setNewSection({
                        ...newSection,
                        Location_Name: warehouse.Location_Name,
                      });
                    }}
                    className={styles.createSectionButton}
                  >
                    Create Section
                  </button>
                  <button
                    onClick={() => {
                      handleViewSections(warehouse.Location_Name);
                      setSelectedWarehouse(warehouse.Location_Name); // Set the selected warehouse name
                    }}
                    className={styles.viewSectionsButton}
                  >
                    View Sections
                  </button>
                  <button
                    onClick={() => handleDeleteWarehouse(warehouse.Location_Name)}
                    className={styles.deleteWarehouseButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {sections.length > 0 && (
          <section className={styles.warehouseListSection}>
            <h2>Sections in {selectedWarehouse}</h2> {/* Display the selected warehouse name */}
            <div className={styles.warehouseList}>
              {sections.map((section, index) => (
                <div key={`section-${section.Section_ID || index}`} className={styles.warehouseItem}>
                  <div className={styles.warehouseDetails}>
                    <p>
                      <strong>Section ID:</strong> {section.Section_ID}
                    </p>
                    <p>
                      <strong>Location Name:</strong> {section.Location_Name}
                    </p>
                    <p>
                      <strong>Status:</strong> {section.Status}
                    </p>
                  </div>
                  <div className={styles.warehouseActions}>
                    <button
                      onClick={() => handleDeleteSection(section.Section_ID)}
                      className={styles.deleteSectionButton}
                    >
                      Delete Section
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Warehouse;