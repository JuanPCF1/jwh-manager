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
        .then((data) => {
          setWarehouses([
            ...warehouses,
            { ...newWarehouse, Location_ID: data.locationId },
          ]);
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
  const handleDeleteWarehouse = (locationId) => {
    fetch(`http://localhost:5001/api/warehouselocation/delete/${locationId}`, {
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
          warehouses.filter((warehouse) => warehouse.Location_ID !== locationId)
        );
      })
      .catch((err) =>
        console.error("Error deleting warehouse location:", err)
      );
  };

  const handleCreateSection = (warehouseId) => {
    alert(`Create section for warehouse ID: ${warehouseId}`);
  };

  const handleViewSections = (warehouseId) => {
    alert(`View sections for warehouse ID: ${warehouseId}`);
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
            onClick={() => setIsCreatingWarehouse(!isCreatingWarehouse)}
            className={styles.createWarehouseButton}
          >
            Create New Warehouse
          </button>
        </header>

        {isCreatingWarehouse && (
          <div className={styles.createWarehouseForm}>
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

        <section className={styles.warehouseListSection}>
          <h2>All Warehouses</h2>
          <div className={styles.warehouseList}>
            {warehouses.map((warehouse) => (
              <div key={warehouse.Location_ID} className={styles.warehouseItem}>
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
                    onClick={() => handleCreateSection(warehouse.Location_ID)}
                    className={styles.createSectionButton}
                  >
                    Create Section
                  </button>
                  <button
                    onClick={() => handleViewSections(warehouse.Location_ID)}
                    className={styles.viewSectionsButton}
                  >
                    View Sections
                  </button>
                  <button
                    onClick={() => handleDeleteWarehouse(warehouse.Location_ID)}
                    className={styles.deleteWarehouseButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Warehouse;