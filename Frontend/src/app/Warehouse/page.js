"use client";

import { useState } from "react";
import Sidebar from "@components/Sidebar";
import styles from "./Warehouse.module.css";

const Warehouse = () => {
  const [isCreatingWarehouse, setIsCreatingWarehouse] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    locationName: "",
    numSections: "",
    owningCompany: "",
  });
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleCreateWarehouse = () => {
    if (
      newWarehouse.locationName &&
      newWarehouse.numSections &&
      newWarehouse.owningCompany
    ) {
      setWarehouses([...warehouses, { ...newWarehouse, id: Date.now() }]);
      setNewWarehouse({ locationName: "", numSections: "", owningCompany: "" });
      setIsCreatingWarehouse(false);
    }
  };

  const handleCreateSection = (warehouseId) => {
    alert(`Create section for warehouse ID: ${warehouseId}`);
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
                value={newWarehouse.locationName}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    locationName: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label># of Sections</label>
              <input
                type="number"
                value={newWarehouse.numSections}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    numSections: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formRow}>
              <label>Owning Company</label>
              <input
                type="text"
                value={newWarehouse.owningCompany}
                onChange={(e) =>
                  setNewWarehouse({
                    ...newWarehouse,
                    owningCompany: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formActions}>
              <button onClick={handleCreateWarehouse}>Save</button>
              <button onClick={() => setIsCreatingWarehouse(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <section className={styles.warehouseListSection}>
          <h2>All Warehouses</h2>
          <div className={styles.warehouseList}>
            {warehouses.map((warehouse) => (
              <div key={warehouse.id} className={styles.warehouseItem}>
                <div className={styles.warehouseDetails}>
                  <p>
                    <strong>Location:</strong> {warehouse.locationName}
                  </p>
                  <p>
                    <strong>Sections:</strong> {warehouse.numSections}
                  </p>
                  <p>
                    <strong>Owning Company:</strong> {warehouse.owningCompany}
                  </p>
                </div>
                <button
                  onClick={() => handleCreateSection(warehouse.id)}
                  className={styles.createSectionButton}
                >
                  Create Section
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Warehouse;